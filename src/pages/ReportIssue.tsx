import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLocation as useLocationHook } from '../hooks/useLocation';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { LocationDetector } from '../components/location/LocationDetector';
import { AddressPreview } from '../components/location/AddressPreview';
import { complaintService } from '../services/complaintService';
import { storageService } from '../services/storageService';
import { notificationService } from '../services/notificationService';
import { validation } from '../utils/validation';
import { Upload, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

type ComplaintCategory = 'ROAD_DAMAGE' | 'GARBAGE' | 'STREETLIGHT' | 'WATER_LEAKAGE' | 'DRAINAGE' | 'PUBLIC_INFRASTRUCTURE' | 'OTHER';

interface ReportFormState {
  category: ComplaintCategory | '';
  title: string;
  description: string;
  latitude: number | null;
  longitude: number | null;
  address: string;
  images: File[];
}

export const ReportIssue: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { location, detectLocation, loading: locationLoading } = useLocationHook();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ReportFormState>({
    category: '',
    title: '',
    description: '',
    latitude: null,
    longitude: null,
    address: '',
    images: [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  if (!user) {
    navigate('/login');
    return null;
  }

  const categories: { value: ComplaintCategory; label: string }[] = [
    { value: 'ROAD_DAMAGE', label: 'Road Damage' },
    { value: 'GARBAGE', label: 'Garbage Accumulation' },
    { value: 'STREETLIGHT', label: 'Broken Streetlight' },
    { value: 'WATER_LEAKAGE', label: 'Water Leakage' },
    { value: 'DRAINAGE', label: 'Drainage Problem' },
    { value: 'PUBLIC_INFRASTRUCTURE', label: 'Public Infrastructure' },
    { value: 'OTHER', label: 'Other' },
  ];

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = [...formData.images];
    const newPreviews = [...imagePreview];

    for (const file of files) {
      const validation = storageService.validateImage(file);
      if (!validation.valid) {
        notificationService.error(validation.error || 'Invalid image');
        continue;
      }
      newImages.push(file);
      newPreviews.push(URL.createObjectURL(file));
    }

    setFormData({ ...formData, images: newImages });
    setImagePreview(newPreviews);
  };

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPreviews = imagePreview.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
    setImagePreview(newPreviews);
  };

  const handleLocationSelect = (latitude: number, longitude: number, address: string) => {
    setFormData({ ...formData, latitude, longitude, address });
  };

  const validateStep = (stepNum: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (stepNum === 1) {
      if (!formData.category) newErrors.category = 'Please select a category';
    } else if (stepNum === 2) {
      if (!validation.isValidTitle(formData.title)) {
        newErrors.title = 'Title must be 5-100 characters';
      }
      if (!validation.isValidDescription(formData.description)) {
        newErrors.description = 'Description must be 10-2000 characters';
      }
    } else if (stepNum === 3) {
      if (!formData.latitude || !formData.longitude) {
        newErrors.location = 'Please set a location';
      }
      if (!validation.isValidAddress(formData.address)) {
        newErrors.address = 'Please enter a valid address';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(5)) return;

    setSubmitting(true);
    try {
      // Upload images
      const imageUrls: string[] = [];
      for (const image of formData.images) {
        try {
          const url = await storageService.uploadComplaintImage(user.uid, 'temp', image);
          imageUrls.push(url);
        } catch (error) {
          throw new Error('Failed to upload image');
        }
      }

      // Create complaint
      const complaintId = await complaintService.createComplaint(
        user.uid,
        formData.category as ComplaintCategory,
        formData.title,
        formData.description,
        formData.address,
        formData.latitude!,
        formData.longitude!,
        imageUrls
      );

      notificationService.success('Complaint submitted successfully!');
      navigate(`/complaint-submitted/${complaintId}`);
    } catch (error) {
      notificationService.error(error instanceof Error ? error.message : 'Failed to submit complaint');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Report Civic Issue</h1>
      <p className="text-gray-600 mb-8">Help us improve your city by reporting an issue</p>

      {/* Step Indicator */}
      <div className="mb-8 flex justify-between">
        {[1, 2, 3, 4, 5].map((s) => (
          <div key={s} className={`flex-1 h-2 mx-1 rounded ${s <= step ? 'bg-blue-600' : 'bg-gray-200'}`} />
        ))}
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        {/* Step 1: Category */}
        {step === 1 && (
          <Card className="p-8">
            <h2 className="text-xl font-semibold mb-6">Select Issue Category</h2>
            <div className="space-y-3">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => { setFormData({ ...formData, category: cat.value }); setErrors({}); }}
                  className={`w-full p-4 text-left rounded-lg border-2 transition ${
                    formData.category === cat.value
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            {errors.category && <p className="text-sm text-red-600 mt-4">{errors.category}</p>}
          </Card>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <Card className="p-8 space-y-4">
            <h2 className="text-xl font-semibold mb-6">Issue Details</h2>
            <Input
              label="Issue Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              error={errors.title}
              placeholder="Brief title of the issue"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
                rows={5}
                placeholder="Provide details about the issue"
              />
              {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
            </div>
          </Card>
        )}

        {/* Step 3: Location */}
        {step === 3 && (
          <Card className="p-8 space-y-6">
            <h2 className="text-xl font-semibold mb-6">Issue Location</h2>
            <LocationDetector onLocationSelected={handleLocationSelect} />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Or Enter Manually</label>
              <Input
                label="Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                error={errors.address}
                placeholder="Street address or landmark"
              />
            </div>

            {formData.address && (
              <AddressPreview
                address={formData.address}
                latitude={formData.latitude ?? undefined}
                longitude={formData.longitude ?? undefined}
              />
            )}
            {errors.location && <p className="text-sm text-red-600">{errors.location}</p>}
          </Card>
        )}

        {/* Step 4: Images */}
        {step === 4 && (
          <Card className="p-8">
            <h2 className="text-xl font-semibold mb-6">Upload Photos</h2>
            <div className="mb-6">
              <label className="flex items-center justify-center w-full p-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition">
                <div className="text-center">
                  <Upload size={32} className="mx-auto mb-2 text-gray-400" />
                  <p className="text-sm font-medium text-gray-900">Upload images</p>
                  <p className="text-xs text-gray-600">JPG, PNG, WEBP up to 5MB</p>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageSelect}
                  className="hidden"
                />
              </label>
            </div>

            {imagePreview.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {imagePreview.map((preview, idx) => (
                  <div key={idx} className="relative group">
                    <img src={preview} alt={`Preview ${idx}`} className="h-32 w-full rounded-lg object-cover" />
                    <button
                      onClick={() => removeImage(idx)}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <p className="text-sm text-gray-600 mt-4">
              {formData.images.length > 0 ? `${formData.images.length} image(s) selected` : 'No images selected'}
            </p>
          </Card>
        )}

        {/* Step 5: Review */}
        {step === 5 && (
          <Card className="p-8 space-y-6">
            <h2 className="text-xl font-semibold mb-6">Review Your Report</h2>
            
            <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Category</p>
                <p className="font-medium text-gray-900">
                  {categories.find((c) => c.value === formData.category)?.label}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Title</p>
                <p className="font-medium text-gray-900">{formData.title}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Description</p>
                <p className="text-gray-900">{formData.description}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-medium text-gray-900">{formData.address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Photos</p>
                <p className="font-medium text-gray-900">{formData.images.length} image(s)</p>
              </div>
            </div>

            {imagePreview.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {imagePreview.map((preview, idx) => (
                  <img key={idx} src={preview} alt={`Review ${idx}`} className="h-24 w-full rounded-lg object-cover" />
                ))}
              </div>
            )}
          </Card>
        )}
      </motion.div>

      {/* Navigation Buttons */}
      <div className="flex gap-4 mt-8">
        {step > 1 && (
          <Button variant="outline" onClick={handlePrevious} className="flex items-center gap-2">
            <ChevronLeft size={20} />
            Previous
          </Button>
        )}
        {step < 5 ? (
          <Button onClick={handleNext} className="ml-auto flex items-center gap-2">
            Next <ChevronRight size={20} />
          </Button>
        ) : (
          <Button onClick={handleSubmit} loading={submitting} className="ml-auto">
            Submit Report
          </Button>
        )}
      </div>
    </div>
  );
};
