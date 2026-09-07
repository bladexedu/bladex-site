/** Card avatar sizing — kept for ConsultantPhoto call sites. */
export const CONSULTANT_PHOTO_CARD = { width: 160, height: 160, quality: 75 };

/** Profile dialog avatar sizing — kept for ConsultantPhoto call sites. */
export const CONSULTANT_PHOTO_DIALOG = { width: 176, height: 176, quality: 80 };

/** Returns the original URL until Supabase Pro image transforms are enabled. */
export function getOptimizedConsultantPhotoUrl(photoUrl) {
  return photoUrl || null;
}
