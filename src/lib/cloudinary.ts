import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function uploadToCloudinary(
  file: string,
  options: {
    folder?: string
    publicId?: string
    overwrite?: boolean
    resourceType?: 'image' | 'video' | 'raw' | 'auto'
  } = {}
) {
  const { folder = 'lewitt-signs', publicId, overwrite = true, resourceType = 'auto' } = options

  const result = await cloudinary.uploader.upload(file, {
    folder,
    public_id: publicId,
    overwrite,
    resource_type: resourceType,
    transformation: [
      { quality: 'auto:best' },
      { fetch_format: 'auto' },
    ],
  })

  return {
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
    format: result.format,
    bytes: result.bytes,
  }
}

export async function deleteFromCloudinary(publicId: string) {
  return cloudinary.uploader.destroy(publicId)
}

export async function getCloudinaryResources(options: {
  folder?: string
  maxResults?: number
} = {}) {
  const { folder = 'lewitt-signs', maxResults = 100 } = options

  const result = await cloudinary.api.resources({
    type: 'upload',
    prefix: folder,
    max_results: maxResults,
  })

  return result.resources
}

export function getOptimizedImageUrl(url: string, options: {
  width?: number
  height?: number
  quality?: string | number
  format?: string
} = {}) {
  const { width, height, quality = 'auto', format = 'auto' } = options

  // If it's not a Cloudinary URL, return as is
  if (!url.includes('res.cloudinary.com')) {
    return url
  }

  // Add transformation parameters
  const baseUrl = url.split('upload/')[0] + 'upload/'
  const transformations: string[] = []

  if (width) transformations.push(`w_${width}`)
  if (height) transformations.push(`h_${height}`)
  transformations.push(`q_${quality}`)
  transformations.push(`f_${format}`)

  return baseUrl + transformations.join(',') + '/' + url.split('upload/')[1]
}

export { cloudinary }
