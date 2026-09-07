"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { aspectRatioOptions, creditFee, defaultValues, transformationTypes } from "@/constants"
import { CustomField } from "./CustomField"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { useEffect, useState, useTransition } from "react"
import { AspectRatioKey, debounce, deepMergeObjects } from "@/lib/utils"
import MediaUploader from "./MediaUploader"
import TransformedImage from "./TransformedImage"
import { updateCredits } from "@/lib/actions/user.actions"
import { getCldImageUrl } from "next-cloudinary"
import { addImage, updateImage } from "@/lib/actions/image.actions"
import { useRouter } from "next/navigation"
import { InsufficientCreditsModal } from "./InsufficientCreditsModal"
import { Coins, ImagePlus, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"


export const formSchema = z.object({
    title: z.string(),
    aspectRatio: z.string().optional(),
    color: z.string().optional(),
    prompt: z.string().optional(),
    publicId: z.string(),
})

const TransformationFrom = ({ action, data = null, userId, type, creditBalance, config = null }: TransformationFormProps) => {

    const transformationType = transformationTypes[type];
    const [image, setImage] = useState(data);
    const [newTransformation, setNewTransformation] = useState<Transformations | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isTransforming, setIsTransforming] = useState(false);
    const [transformationConfig, setTransformationConfig] = useState(config);
    const router = useRouter()
    const { toast } = useToast()

    const [, startTransition] = useTransition()

    const initialValues = data && action === 'Update' ? {
        title: data?.title,
        aspectRatio: data?.aspectRatio,
        color: data?.color,
        prompt: data?.prompt,
        publicId: data?.publicId,
    } : defaultValues

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues,
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true);

        if (data || image) {
            const transformationUrl = getCldImageUrl({
                width: image?.width,
                height: image?.height,
                src: image?.publicId,
                ...transformationConfig
            })

            const imageData = {
                title: values.title,
                publicId: image?.publicId,
                transformationType: type,
                width: image?.width,
                height: image?.height,
                config: transformationConfig,
                secureURL: image?.secureURL,
                transformationURL: transformationUrl,
                aspectRatio: values.aspectRatio,
                prompt: values.prompt,
                color: values.color,
            }

            if (action === 'Add') {
                try {
                    const newImage = await addImage({
                        image: imageData,
                        userId,
                        path: '/'
                    })

                    if (newImage) {
                        toast({
                            title: "Saved to library",
                            description: "Your transformation has been saved successfully.",
                        })
                        form.reset()
                        setImage(data)
                        router.push(`/transformations/${newImage._id}`)
                    } else {
                        toast({
                            title: "Save failed",
                            description: "Unable to save image. Please try again.",
                            variant: "destructive",
                        })
                    }
                } catch (error) {
                    console.error(error);
                    toast({
                        title: "Save failed",
                        description: error instanceof Error ? error.message : "An unexpected error occurred",
                        variant: "destructive",
                    })
                }
            }

            if (action === 'Update') {
                try {
                    const updatedImage = await updateImage({
                        image: {
                            ...imageData,
                            _id: data._id
                        },
                        userId,
                        path: `/transformations/${data._id}`
                    })

                    if (updatedImage) {
                        toast({
                            title: "Updated successfully",
                            description: "Your changes have been saved.",
                        })
                        router.push(`/transformations/${updatedImage._id}`)
                    } else {
                        toast({
                            title: "Update failed",
                            description: "Unable to update image. Please try again.",
                            variant: "destructive",
                        })
                    }
                } catch (error) {
                    console.error(error);
                    toast({
                        title: "Update failed",
                        description: error instanceof Error ? error.message : "An unexpected error occurred",
                        variant: "destructive",
                    })
                }
            }
        }

        setIsSubmitting(false)
    }

    const onSelectFieldHandler = (value: string, onChangeField: (value: string) => void) => {
        const imageSize = aspectRatioOptions[value as AspectRatioKey]

        setImage((prevState: any) => ({
            ...prevState,
            aspectRatio: imageSize.aspectRatio,
            width: imageSize.width,
            height: imageSize.height
        }))

        setNewTransformation(transformationType.config)

        return onChangeField(value)
    }

    const onInputChangeHandler = (fieldName: string, value: string, type: string, onChangeField: (value: string) => void) => {
        debounce(() => {
            setNewTransformation((prevState: any) => ({
                ...prevState,
                [type]: {
                    ...prevState?.[type],
                    [fieldName === 'prompt' ? 'prompt' : 'to']: value
                }
            }))
        }, 1000)();
        return onChangeField(value)
    }

    const onTransformationHandler = async () => {

        setIsTransforming(true)

        setTransformationConfig(
            deepMergeObjects(newTransformation, transformationConfig)
        )

        setNewTransformation(null);

        startTransition(async () => {
            await updateCredits(userId, creditFee)
        })
    }

    useEffect(() => {
        if (image && (type === 'restore' || type === 'removeBackground')) {
            setNewTransformation(transformationType.config)
        }
    }, [image, transformationType.config, type])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="transformation-form">
                <div className="studio-panel">
                    <div className="studio-toolbar">
                        <div><span className="studio-eyebrow">Canvas</span><strong>{transformationType.title}</strong></div>
                        <span className="credit-pill"><Coins size={13} /> {Math.abs(creditFee)} credit</span>
                    </div>
                    <div className="media-uploader-field">
                        <CustomField
                            control={form.control}
                            name="publicId"
                            className="flex size-full flex-col"
                            render={({ field }) => (
                                <MediaUploader onValueChange={field.onChange} setImage={setImage} publicId={field.value} image={image} type={type} />
                            )}
                        />
                        <TransformedImage image={image} type={type} title={form.getValues().title}
                            isTransforming={isTransforming} setIsTransforming={setIsTransforming}
                            transformationConfig={transformationConfig} />
                    </div>
                    <div className="media-uploader-tip"><ImagePlus size={13} /><span>Your original stays untouched. Lumina creates the transformed version separately.</span></div>
                </div>

                <div className="studio-panel studio-side">
                    <div className="studio-side-heading"><div><span className="studio-eyebrow">Edit settings</span><strong>Fine-tune your result</strong></div><Sparkles size={17} /></div>
                    {creditBalance < Math.abs(creditFee) && <InsufficientCreditsModal />}

                    <div className="form-section">
                        <CustomField control={form.control} name="title" formLabel="Project name" className="w-full"
                            render={({ field }) => <Input {...field} placeholder="Give this edit a name" className="input-field" />} />
                    </div>

                    {type === 'fill' && (
                        <div className="form-section">
                            <CustomField control={form.control} name="aspectRatio" formLabel="Canvas ratio" className="w-full"
                                render={({ field }) => (
                                    <Select onValueChange={(value) => onSelectFieldHandler(value, field.onChange)} value={field.value}>
                                        <SelectTrigger className="select-field"><SelectValue placeholder="Select size" /></SelectTrigger>
                                        <SelectContent>{Object.keys(aspectRatioOptions).map((key) => (
                                            <SelectItem key={key} value={key} className="select-item">{aspectRatioOptions[key as AspectRatioKey].label}</SelectItem>
                                        ))}</SelectContent>
                                    </Select>
                                )} />
                        </div>
                    )}

                    {(type === 'remove' || type === 'recolor') && (
                        <div className="form-section prompt-field">
                            <CustomField control={form.control} name="prompt"
                                formLabel={type === 'remove' ? 'What should disappear?' : 'What should change?'}
                                className="w-full"
                                render={({ field }) => <Input value={field.value} placeholder={type === 'remove' ? 'e.g. person in the background' : 'e.g. the chair'} className="input-field"
                                    onChange={(e) => onInputChangeHandler('prompt', e.target.value, type, field.onChange)} />} />
                        </div>
                    )}

                    {type === 'recolor' && (
                        <div className="form-section">
                            <CustomField control={form.control} name="color" formLabel="New color" className="w-full"
                                render={({ field }) => <Input value={field.value} placeholder="e.g. forest green" className="input-field"
                                    onChange={(e) => onInputChangeHandler('color', e.target.value, 'recolor', field.onChange)} />} />
                        </div>
                    )}

                    <div className="studio-info">
                        <span>Available credits</span><strong>{creditBalance ?? 0}</strong>
                        <span>Cost</span><strong>{Math.abs(creditFee)}</strong>
                    </div>
                    <Button type="button" className="submit-button" disabled={isTransforming || newTransformation === null || !image?.publicId || creditBalance < Math.abs(creditFee)}
                        onClick={onTransformationHandler}>
                        {isTransforming ? 'Processing…' : 'Apply transformation'}
                    </Button>
                    <Button type="submit" className="submit-button secondary-submit" disabled={isSubmitting || !image?.publicId}>
                        {isSubmitting ? 'Saving…' : 'Save to library'}
                    </Button>
                </div>
            </form>
        </Form>
    );
    ;
};

export default TransformationFrom;