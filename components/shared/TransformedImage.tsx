'use client'

import { dataUrl, debounce, download, getImageSize } from '@/lib/utils';
import { CldImage, getCldImageUrl } from 'next-cloudinary';
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import React from 'react';
import { Sparkles } from 'lucide-react';

const TransformedImage = ({ image, type, title, setIsTransforming, isTransforming, transformationConfig, hasDownload = false }: TransformedImageProps) => {

    const downloadHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        download(getCldImageUrl({
            width: image?.width,
            height: image?.height,
            src: image?.publicId,
            ...transformationConfig
        }), title)
    }



    return (
        <div className='transformed-result'>
            <div className="transformed-result-heading">
                <div>
                    <span className="media-uploader-kicker">OUTPUT PREVIEW</span>
                    <h3>Transformed</h3>
                </div>
                {
                    hasDownload && (
                        <button className='download-btn' aria-label="Download transformed image"
                            onClick={downloadHandler}>
                            <Image
                                src='/assets/icons/download.svg'
                                alt='download'
                                width={24}
                                height={24}
                                className='pb-[6px]'>
                            </Image>
                        </button>
                    )
                }
            </div>
            {
                image?.publicId && transformationConfig ? (
                    <div className="transformed-result-preview">
                        <CldImage
                            width={getImageSize(type, image, "width")}
                            height={getImageSize(type, image, "height")}
                            src={image?.publicId}
                            alt={image?.title}
                            sizes={"(max-width: 767px) 100vw, 50vw"}
                            placeholder={dataUrl as PlaceholderValue}
                            className="transformed-image"
                            onLoad={() => {
                                setIsTransforming && setIsTransforming(false);
                            }}
                            onError={() => {
                                debounce(() => {
                                    setIsTransforming && setIsTransforming(false);
                                }, 8000)()
                            }}
                            {...transformationConfig}
                        />

                        {isTransforming && (
                            <div className="transforming-loader">
                                <Image
                                    src="/assets/icons/spinner.svg"
                                    width={50}
                                    height={50}
                                    alt="spinner"
                                />
                                <p className="text-white/80">Please wait...</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="transformed-placeholder">
                        <span className="transformed-placeholder-mark"><Sparkles size={18} /></span>
                        <strong>Your result will appear here</strong>
                        <span>Apply a transformation to preview the finished image.</span>
                    </div>
                )
            }
        </div>
    );
};

export default TransformedImage;