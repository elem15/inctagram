// import { ChangeEvent, useRef, useState } from 'react'
//
// import { Div } from '@storybook/components'
// import { useRouter } from 'next/router'
//
// import { DeleteIcon } from '@/shared/assets/icons/DeleteIcon'
// import { Button } from '@/shared/components'
// import { useTranslation } from '@/shared/lib'
// import { AddPostModalData } from '@/widgets/addPostModal/AddPostModal'
// type Props = {
//   inputRef: HTMLInputElement
// }
// export const AddPostModalMob = ({ inputRef }: Props) => {
//   const router = useRouter()
//   const [imageSrc, setImageSrc] = useState<string | null>(null)
//   const [photos, setPhotos] = useState<File[]>([])
//   const { t } = useTranslation()
//   const [errorText, setErrorText] = useState<string | undefined>()
//   const handleCLickCreate = () => {
//     router.pathname = '/create'
//   }
//   const readFile = (file: File) => {
//     return new Promise<string>(resolve => {
//       const reader = new FileReader()
//
//       reader.addEventListener('load', () => resolve(reader.result as string))
//       reader.readAsDataURL(file)
//     })
//   }
//   const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.currentTarget.files && e.currentTarget.files.length > 0) {
//       const file = e.currentTarget.files[0]
//       const acceptedTypes = ['image/jpeg', 'image/png']
//       const maxSizeBytes = 20 * 1024 * 1024
//
//       if (!acceptedTypes.includes(file.type)) {
//         setErrorText(t.add_profile_photo.error_type_of_photo)
//
//         return
//       }
//
//       if (file.size > maxSizeBytes) {
//         setErrorText(t.add_profile_photo.error_size_photo)
//
//         return
//       }
//       let imageDataUrl: any = await readFile(file)
//
//       setImageSrc(imageDataUrl)
//       // addNewCropper(imageDataUrl)
//     }
//   }
//
//   return (
//     <div>
//       <input
//         accept={'image/jpeg, image/png'}
//         onChange={onFileChange}
//         ref={inputRef}
//         style={{ display: 'none' }}
//         type={'file'}
//       />
//       <Button variant={'link'}>
//         <DeleteIcon />
//       </Button>
//       <AddPostModalData />
//       <Button>Next</Button>
//     </div>
//   )
// }
