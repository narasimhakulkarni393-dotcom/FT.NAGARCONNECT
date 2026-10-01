export function generateComplaintIdDisplay(firebaseId: string, createdAt: Date): string {
  const year = createdAt.getFullYear();
  // Use first 6 characters of Firebase ID, converted to a number-like format
  const randomPart = Math.abs(
    parseInt(firebaseId.substring(0, 6).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0).toString(), 10)
  ) % 1000000;

  return `NC-${year}-${randomPart.toString().padStart(6, '0')}`;
}
