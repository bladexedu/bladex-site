/**
 * Builds a smaller Supabase Storage image URL when transforms are available.
 * Falls back to the original URL for non-Supabase or unrecognized paths.
 *
 * @see https://supabase.com/docs/guides/storage/serving/image-transformations
 */
/** Set VITE_SUPABASE_IMAGE_TRANSFORMS=true only if Storage image transforms are enabled (Supabase Pro). */
const TRANSFORMS_ENABLED =
  import.meta.env.VITE_SUPABASE_IMAGE_TRANSFORMS === 'true';

export function getOptimizedConsultantPhotoUrl(
  photoUrl,
  { width = 160, height = 160, quality = 75, resize = 'cover' } = {},
) {
  if (!photoUrl) return null;
  if (!TRANSFORMS_ENABLED) return photoUrl;

  try {
    const parsed = new URL(photoUrl);
    if (!parsed.hostname.includes('supabase.co')) return photoUrl;
    if (!parsed.pathname.includes('/storage/v1/object/')) return photoUrl;

    const transform = new URLSearchParams({
      width: String(width),
      height: String(height),
      resize,
      quality: String(quality),
    });

    const publicMatch = parsed.pathname.match(/\/storage\/v1\/object\/public\/(.+)/);
    if (publicMatch) {
      const out = new URL(
        `${parsed.origin}/storage/v1/render/image/public/${publicMatch[1]}`,
      );
      transform.forEach((value, key) => out.searchParams.set(key, value));
      return out.toString();
    }

    const signMatch = parsed.pathname.match(/\/storage\/v1\/object\/sign\/(.+)/);
    if (signMatch) {
      const out = new URL(
        `${parsed.origin}/storage/v1/render/image/sign/${signMatch[1]}`,
      );
      parsed.searchParams.forEach((value, key) => out.searchParams.set(key, value));
      transform.forEach((value, key) => out.searchParams.set(key, value));
      return out.toString();
    }

    return photoUrl;
  } catch {
    return photoUrl;
  }
}

/** Card avatar (80px display → 160px source for retina) */
export const CONSULTANT_PHOTO_CARD = { width: 160, height: 160, quality: 75 };

/** Profile dialog avatar (88px display → 176px source) */
export const CONSULTANT_PHOTO_DIALOG = { width: 176, height: 176, quality: 80 };
