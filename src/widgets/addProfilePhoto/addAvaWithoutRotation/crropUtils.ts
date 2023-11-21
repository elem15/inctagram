const createImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new Image()

    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', error => reject(error))
    image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
    image.src = url
  })
}

function getRadianAngle(degreeValue: number): number {
  return (degreeValue * Math.PI) / 180
}

export default async function getCroppedImg(
  imageSrc: string | null,
  pixelCrop: { x: number; y: number; width: number; height: number } | null,
  rotation = 0
): Promise<string | null> {
  if (!imageSrc) return null
  if (!pixelCrop) return null
  const image = await createImage(imageSrc)

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  const maxSize = Math.max(image.width, image.height)
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2))

  // set each dimension to double the largest dimension to allow for a safe area for the
  // image to rotate in without being clipped by the canvas context
  canvas.width = safeArea
  canvas.height = safeArea

  // translate canvas context to a central location on the image to allow rotating around the center.
  ctx?.translate(safeArea / 2, safeArea / 2)
  ctx?.rotate(getRadianAngle(rotation))
  ctx?.translate(-safeArea / 2, -safeArea / 2)

  // draw rotated image and store data.
  ctx?.drawImage(image, safeArea / 2 - image.width * 0.5, safeArea / 2 - image.height * 0.5)

  const data = ctx?.getImageData(0, 0, safeArea, safeArea)

  if (!data) {
    throw new Error('Failed to retrieve image data')
  }

  // set canvas width to the final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  // paste the generated rotated image with correct offsets for x,y crop values.
  ctx?.putImageData(
    data,
    0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x,
    0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y
  )

  // As Base64 string
  // return canvas.toDataURL("image/jpeg");
  return canvas.toDataURL('image/jpeg')
}
