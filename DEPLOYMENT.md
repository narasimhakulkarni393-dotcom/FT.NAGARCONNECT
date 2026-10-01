# NagaraConnect Deployment Guide

## ✅ Deployment Fixed

The build error has been resolved:
- ✅ Three.js upgraded to 0.160.0 (compatible with @react-three/fiber)
- ✅ .npmrc configured for proper dependency resolution
- ✅ vercel.json set up for Vercel deployment

---

## 🚀 Deploy to Vercel

### Step 1: Connect Your Repository
1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "Add New..." → "Project"
4. Select `FT.NAGARCONNECT` repository
5. Click "Import"

### Step 2: Configure Environment Variables
In Vercel dashboard, go to **Settings** → **Environment Variables** and add:

```
VITE_FIREBASE_API_KEY = [Your Firebase API Key]
VITE_FIREBASE_AUTH_DOMAIN = [Your Firebase Auth Domain]
VITE_FIREBASE_PROJECT_ID = [Your Firebase Project ID]
VITE_FIREBASE_STORAGE_BUCKET = [Your Firebase Storage Bucket]
VITE_FIREBASE_MESSAGING_SENDER_ID = [Your Messaging Sender ID]
VITE_FIREBASE_APP_ID = [Your Firebase App ID]
```

**Get these from:**
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to Project Settings → Service Accounts
4. Copy the values and paste them in Vercel environment variables

### Step 3: Deploy
1. Click "Deploy"
2. Vercel will automatically build and deploy
3. You'll get a production URL (e.g., `https://ft-nagarconnect.vercel.app`)

---

## 🌐 Other Deployment Options

### Firebase Hosting
```bash
npm run build
firebase deploy
```

### Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

### AWS Amplify
```bash
npm run build
amplify publish
```

---

## 🔧 Local Development

```bash
# Clone the repo
git clone https://github.com/narasimhakulkarni393-dotcom/FT.NAGARCONNECT.git
cd FT.NAGARCONNECT

# Install dependencies
npm install

# Create .env file with Firebase credentials
cp .env.example .env
# Edit .env with your values

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## 📋 Pre-Deployment Checklist

- [x] Dependencies fixed (Three.js 0.160.0)
- [x] .npmrc configured
- [x] vercel.json added
- [x] Environment variables documented
- [x] Firebase rules set up
- [x] Storage rules configured
- [x] README complete
- [ ] Firebase credentials added to Vercel
- [ ] Production domain configured
- [ ] HTTPS enabled
- [ ] Security headers set

---

## 🐛 Troubleshooting

### Build fails with dependency errors
✅ Fixed: Using `npm install` with `.npmrc` flag

### Firebase authentication not working
- Ensure `VITE_FIREBASE_AUTH_DOMAIN` is correct
- Check Firebase Console → Authentication → Settings

### Images not uploading
- Verify Firebase Storage bucket name
- Check Storage security rules
- Ensure user is authenticated

### Real-time updates not working
- Check Firestore database connection
- Verify Firestore security rules
- Check browser console for errors

---

## 📊 Deployment Status

✅ **Ready for Production**

- Repository: https://github.com/narasimhakulkarni393-dotcom/FT.NAGARCONNECT
- Commits: 3 (Initial + Dependency Fix + Vercel Config)
- Build Command: `npm run build`
- Output: `dist/`
- Node Version: 18+ recommended

---

## 🎯 Next Steps

1. **Add to Vercel**
   - Visit https://vercel.com
   - Import `FT.NAGARCONNECT` repository
   - Add environment variables
   - Deploy

2. **Set Up Firebase**
   - Ensure Firestore rules deployed
   - Configure Storage rules
   - Test authentication

3. **Monitor Production**
   - Check Vercel logs
   - Monitor Firebase usage
   - Review error tracking

---

Built with ❤️ for better cities. 🏙️
