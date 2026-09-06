"use client"

import { useToast } from "@/hooks/use-toast"
import { dataUrl, getImageSize } from "@/lib/utils"
import { CldImage, CldUploadWidget } from "next-cloudinary"
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props"
import Image from "next/image"
import { ImagePlus, RefreshCw, UploadCloud } from "lucide-react"

type MediaUploaderProps = {
  onValueChange: (value: string) => void
  setImage: React.Dispatch<any>
  publicId: string
  image: any
  type: string
}

const MediaUploader = ({ onValueChange, setImage, publicId, image, type }: MediaUploaderProps) => {
  const { toast } = useToast()

  const onUploadSuccessHandler = (result: any) => {
    setImage((prevState: any) => ({
      ...prevState,
      publicId: result?.info?.public_id,
      width: result?.info?.width,
      height: result?.info?.height,
      secureURL: result?.info?.secure_url,
    }))

    onValueChange(result?.info?.public_id)

    toast({
      title: "Image uploaded successfully",
      description: "1 credit was deducted from your account",
      duration: 5000,
      className: "success—toast",
    })
  }

  const onUploadErrorHandler = () => {
    toast({
      title: "Something went wrong while uploading",
      description: "Please try again",
      duration: 5000,
      className: "error—toast",
    })
  }

  return (
    <CldUploadWidget
      uploadPreset="AImagery"
      options={{ multiple: false, resourceType: "image" }}
      onSuccess={onUploadSuccessHandler}
      onError={onUploadErrorHandler}
    >
      {({ open }) => (
        <div className="media-uploader"> 
          <div className="media-uploader-heading">
            <div>
              <span className="media-uploader-kicker">SOURCE IMAGE</span>
              <h3>Original</h3>
            </div>
            {publicId && (
              <button type="button" className="media-uploader-change" onClick={() => open()}>
                <RefreshCw size={13} /> Replace
              </button>
            )}
          </div>

          {publicId ? (
            <div className="media-uploader-preview">
              <CldImage
                width={getImageSize(type, image, "width")}
                height={getImageSize(type, image, "height")}
                src={publicId}
                alt="Uploaded source image"
                sizes="(max-width: 767px) 100vw, 50vw"
                placeholder={dataUrl as PlaceholderValue}
                className="media-uploader_cldImage"
              />
              <div className="media-uploader-preview-bar">
                <div><span>Ready to transform</span><small>{image?.width || "—"} × {image?.height || "—"} px</small></div>
                <button type="button" onClick={() => open()}><RefreshCw size={13} /> Replace</button>
              </div>
            </div>
          ) : (
            <button type="button" className="media-uploader_cta" onClick={() => open()}>
              <span className="media-uploader_cta-icon"><Image src="/lumina-icon.png" alt="" width={26} height={26} /></span>
              <strong>Drop an image here</strong>
              <span>or click to browse from your device</span>
              <span className="media-uploader_cta-button"><UploadCloud size={14} /> Choose image</span>
              <small>JPG, PNG or WebP · Up to your current upload limit</small>
            </button>
          )}

          
        </div>
      )}
    </CldUploadWidget>
  )
}

export default MediaUploader
