import { v2 as cloudinary } from 'cloudinary'
import { config } from '../config.js'

const { cloudName, apiKey, apiSecret, folder } = config.cloudinary

export const cloudinaryConfigured = () => Boolean(cloudName && apiKey && apiSecret)

if (cloudinaryConfigured()) {
  cloudinary.config({ cloud_name: cloudName, api_key: apiKey, api_secret: apiSecret, secure: true })
}

// Uploads an image buffer into the site's Cloudinary folder. Resolves to the upload result.
export function uploadImage(buffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (err, result) => (err ? reject(err) : resolve(result))
    )
    stream.end(buffer)
  })
}
