# NagaraConnect

A production-quality full-stack civic issue reporting platform built with React, Vite, TypeScript, Firebase, and 3D visualization.

## Overview

NagaraConnect empowers citizens to report real-world municipal problems (potholes, garbage, broken streetlights, water leakage, drainage issues, etc.) with real location data and user-uploaded photographs. Track your reports in real-time as municipal authorities process them.

**Key Features:**
- ✅ Real user authentication (Firebase Auth)
- ✅ Real complaint data (Firestore)
- ✅ Real image uploads (Firebase Storage)
- ✅ Real location detection & geocoding (Geolocation API + OpenStreetMap)
- ✅ Immersive 3D city visualization (Three.js)
- ✅ Smooth animations and transitions (Framer Motion)
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Accessibility-first approach (reduced motion support, keyboard navigation)

## Technology Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Three.js & @react-three/fiber** - 3D visualization
- **Lucide React** - Icons

### Backend & Services
- **Firebase Authentication** - User auth
- **Firebase Firestore** - Real-time database
- **Firebase Storage** - Image hosting
- **OpenStreetMap Nominatim** - Reverse geocoding (free, no API key)

## Project Structure

```
nagaraconnect/
├── src/
│   ├── components/
│   │   ├── 3d/              # 3D scene components
│   │   ├── complaint/       # Complaint display components
│   │   ├── layout/          # Navigation, footer
│   │   ├── location/        # Location detection
│   │   └── ui/              # Reusable UI components
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Page components
│   ├── services/            # Firebase & external services
│   ├── types/               # TypeScript interfaces
│   ├── utils/               # Helper functions
│   ├── routes/              # Route configuration
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── firebase/                # Firestore security rules
├── .env.example             # Environment variables template
├── index.html               # HTML template
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies
```

## Setup Instructions

### Prerequisites
- Node.js 16+ and npm
- A Firebase project with:
  - Authentication enabled (Email/Password)
  - Firestore database created
  - Storage bucket created

### 1. Clone & Install

```bash
cd nagaraconnect
npm install
```

### 2. Configure Firebase

Copy `.env.example` to `.env` and fill in your Firebase credentials:

```bash
cp .env.example .env
```

Edit `.env` with your Firebase project details:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Deploy Firestore Rules

Deploy the security rules from `firebase/firestore.rules`:

```bash
firebase deploy --only firestore:rules
```

Or use the Firebase Console:
1. Go to Firestore Database > Rules
2. Copy contents of `firebase/firestore.rules`
3. Publish

### 4. Set Storage Rules

In Firebase Console, go to Storage > Rules and set:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /complaints/{userId}/{complaintId}/{allPaths=**} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

### 5. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:5173`

## Building for Production

```bash
npm run build
npm run preview
```

## Features & Workflows

### Authentication
- **Register**: Full name, email, password (8+ chars, uppercase, lowercase, number)
- **Login**: Email/password with persistent sessions
- **Forgot Password**: Email-based password reset
- **Logout**: Secure session termination

### Reporting a Civic Issue (5-Step Flow)

1. **Category Selection**: Choose issue type
   - Road Damage
   - Garbage Accumulation
   - Broken Streetlight
   - Water Leakage
   - Drainage Problem
   - Public Infrastructure
   - Other

2. **Issue Details**: Enter title (5-100 chars) & description (10-2000 chars)

3. **Location**: 
   - Auto-detect with browser geolocation
   - Manual address entry
   - Real-time reverse geocoding

4. **Photo Upload**:
   - Drag & drop or file picker
   - Supports JPG, PNG, WEBP (max 5MB)
   - Preview before submission
   - Remove unwanted photos

5. **Review & Submit**:
   - Verify all details
   - View selected photos
   - Submit with unique complaint ID

### Complaint Tracking

**Status Timeline:**
- SUBMITTED → UNDER_REVIEW → IN_PROGRESS → RESOLVED → CLOSED

**Real-Time Updates:**
- Firestore listeners auto-update when status changes
- No manual refresh needed

**My Complaints Page:**
- View all submitted complaints
- Filter by status
- Click to see full details

**Complaint Details:**
- Full description and images
- Location with coordinates
- Submit/update dates
- Visual status timeline

### Profile
- View account information
- Email and creation date
- Secure, read-only profile

## Design System

### Color Palette
- **Primary**: Blue (#0066cc, #0099ff)
- **Success**: Green (#10b981)
- **Warning**: Yellow (#f59e0b)
- **Error**: Red (#ef4444)
- **Neutral**: Gray (#1f2937 - #f9fafb)

### Typography
- **Headings**: Bold, modern sans-serif
- **Body**: Regular weight, high contrast

### Depth & Spacing
- **Shadows**: Realistic, subtle elevation
- **Rounded Corners**: 8px (cards), 4px (buttons)
- **Padding**: 4px/8px/16px/24px scale

## 3D Visualization

### City Scene
- Realistic grid-based map
- Auto-rotating camera
- Interactive controls (desktop)
- Simplified on mobile

### Components
- **CityGrid**: Grid pattern representing urban structure
- **LocationMarker3D**: Animated location pin
- **CivicNetwork**: Connected network visualization
- **FloatingMapLayer**: Subtle parallax effect

## Animation & Motion

### Timing
- Micro-interactions: 100-180ms
- Component transitions: 200-350ms
- Page transitions: 300-500ms
- 3D transitions: 500-800ms

### Easing
- Smooth, physics-based easing
- Accessible: Respects prefers-reduced-motion

## Accessibility

✅ Keyboard Navigation
✅ Focus States
✅ Semantic HTML
✅ ARIA Labels
✅ High Contrast (WCAG AA)
✅ Reduced Motion Support
✅ Screen Reader Friendly

## Data Privacy & Security

### User Data
- Passwords hashed by Firebase Auth
- Email encrypted in transit
- No password exposure in UI

### Complaint Data
- Only owned by reporting user
- Firestore rules enforce access control
- Images stored in user-scoped paths

### Image Uploads
- File type validation (JPG/PNG/WEBP only)
- File size limit (5MB)
- Scanned by Firebase Storage

## API Integrations

### OpenStreetMap Nominatim
- Free reverse geocoding (no API key needed)
- Converts coordinates → readable addresses
- Fallback to coordinate display if unavailable

### Browser Geolocation
- HTTPS only
- User permission required
- Graceful fallback to manual entry

## Environment Variables

Required for development and production:

```env
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

⚠️ Never commit `.env` file. Use `.env.example` as template.

## Testing Checklist

- [ ] Authentication flow (register, login, logout, forgot password)
- [ ] Route protection (unauthenticated users redirected)
- [ ] Report issue 5-step flow
- [ ] Location detection (with & without permission)
- [ ] Image upload & preview
- [ ] Complaint submission
- [ ] Complaint details page
- [ ] My Complaints list with real-time updates
- [ ] Status timeline visualization
- [ ] Profile page
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Reduced motion preferences
- [ ] Error states & error messages
- [ ] Empty states

## Performance Optimizations

- **Code Splitting**: Route-based lazy loading
- **Image Optimization**: Compressed uploads, efficient display
- **3D Optimization**: Simplified scenes on mobile
- **Bundle Size**: Tree-shaking, production builds

## Known Limitations

- Reverse geocoding dependent on OpenStreetMap availability
- Real-time updates require active Firestore listener
- 3D scenes simplified on mobile for performance
- Maximum 5 images per complaint

## Troubleshooting

### Firebase Connection Issues
- Verify API key in `.env`
- Check Firebase project settings
- Ensure Firestore & Storage are enabled
- Review security rules

### Image Upload Fails
- Check file type (JPG/PNG/WEBP only)
- Verify file size < 5MB
- Ensure user authenticated
- Check Storage rules

### Geolocation Not Working
- Use HTTPS (required by browser)
- Check if browser supports Geolocation API
- Verify location permission granted
- Fallback to manual entry available

### 3D Scene Not Rendering
- Check WebGL support in browser
- Verify Three.js library loaded
- Check browser console for errors
- Fallback to 2D on older devices

## Future Enhancements

- Municipal dashboard (admin-only, if scope changes)
- Real-time notifications via push
- Photo gallery with multi-image support
- Advanced filtering and search
- Data analytics dashboard
- Email digest of reports
- Community voting on issues
- Integration with municipal systems

## License

MIT License - See LICENSE file

## Support

For issues and questions:
1. Check this README
2. Review the code comments
3. Check browser console for errors
4. Verify Firebase setup

## Contributing

This is a production-quality demonstration project. For modifications:
1. Follow TypeScript strictness
2. Maintain responsive design
3. Update documentation
4. Test all user flows
5. Keep security rules updated

---

**Built with ❤️ for better cities**
