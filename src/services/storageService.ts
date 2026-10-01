import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './firebase';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const storageService = {
  validateImage(file: File): { valid: boolean; error?: string } {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return { valid: false, error: 'Please upload JPG, PNG, or WEBP images only' };
    }

    if (file.size > MAX_FILE_SIZE) {
      return { valid: false, error: 'Image must be less than 5MB' };
    }

    return { valid: true };
  },

  async uploadComplaintImage(
    userId: string,
    complaintId: string,
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<string> {
    const validation = this.validateImage(file);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    const timestamp = Date.now();
    const filename = `${file.name.split('.')[0]}-${timestamp}.${file.type.split('/')[1]}`;
    const storagePath = `complaints/${userId}/${complaintId}/${filename}`;
    const storageRef = ref(storage, storagePath);

    const uploadTask = await uploadBytes(storageRef, file, {
      contentType: file.type,
    });

    const downloadUrl = await getDownloadURL(uploadTask.ref);
    return downloadUrl;
  },

  async deleteImage(imageUrl: string): Promise<void> {
    try {
      // Extract path from download URL
      const decodedUrl = decodeURIComponent(imageUrl);
      const pathMatch = decodedUrl.match(/o\/(.*?)\?/);
      if (!pathMatch) return;

      const storagePath = pathMatch[1];
      const imageRef = ref(storage, storagePath);
      await deleteObject(imageRef);
    } catch (error) {
      console.error('Failed to delete image:', error);
    }
  },
};
