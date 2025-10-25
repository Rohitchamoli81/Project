import React,{useState ,useEffect} from 'react'
import {Input,Select,RTE,CardBtn} from '../index'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch ,useSelector } from 'react-redux'
import { postService } from '@/appwrite/post'
import {  fileService } from '@/appwrite/file'
import { addPost, updatePost, } from '@/store/postSlice'


function Postform({post}) {

    const user = useSelector(state=>state.auth.user)

    const { register, handleSubmit, setValue, getValues , control } = useForm({
        defaultValues:{
            title: post?.title || '',
            content: post?.content || '',
            featuredImage: post?.featuredImage || null,
            id: post?.id || null,
            area: post?.area || '',
            status: post?.status || 'draft',
        }
    });
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [imageUrl, setImageUrl] = useState(null)

    useEffect(() => {
        if (post?.featuredImage) {
            fileService.getFilePreview(post.featuredImage)
            .then(url => setImageUrl(url))
            .catch(err => console.error("Error loading image preview:", err))
        }
}, [post?.featuredImage])



    const DefaultImage = async()=>{
        const img = await fetch('/images/default.jpg')
        const blob = await img.blob()
        return new File([blob], "default.jpg", { type: blob.type });
    }

    const onSubmit = async(data)=>{
        const defaultImage = await DefaultImage()
        try {
            if(post){
                // update post
                const file =  data.image[0] ? await fileService.uploadFile(data.image?.[0]) : post.featuredImage
                if(file&&data.image?.[0]){
                    await fileService.deleteFile(post.featuredImage)
                }
                const dpPost = await postService.updatePost(post.id,{
                    ...data,
                    featuredImage: file ? file.$id : post.featuredImage,

                })

                if(dpPost){
                    dispatch(updatePost({
                        id: dpPost.$id,
                        title: dpPost.title,
                        content: dpPost.content,
                        area: dpPost.area.trim().toLowerCase(),
                        status : dpPost.status,
                        featuredImage:  dpPost.featuredImage,
                    }))
                    navigate(`/post/${dpPost.$id}`)
                }
                else{
                    dispatch(setLocalError("Error in updating post"))
                    console.log("Can't update post ");
                }
            }
            else{
                // create post
                const file =  data.image ? await fileService.uploadFile(data.image?.[0]) : await fileService.uploadFile(defaultImage)

                const newPost = await postService.createPost({
                    ...data,
                    featuredImage: file.$id,
                    userId: user.$id,
                    area: data.area.trim().toLowerCase() || 'general',
                })
                if(newPost){
                    dispatch(addPost({
                        id: newPost.$id,
                        title: newPost.title,
                        content: newPost.content,
                        area: newPost.area,
                        status : newPost.status,
                        userId: newPost.userId,
                        featuredImage: newPost.featuredImage,
                    }))
                    navigate('/allBlog')
                }
            }
        } catch (error) {
            console.log("Error in submit",error);
            
        }
    }

return (
    <div>
        <div className='relative mt-16'>
            <img className='w-full h-90' src="/thumbnail/banner.png" alt="" />
            <div className='absolute inset-0 flex flex-col items-center justify-center'>
                <p className='text-sm uppercase tracking-wider mb-2 font-semibold'>DELICIOUS RECIPES AWAIT</p>
                <h1 className='text-black text-5xl font-semibold'>Add Recipe</h1>
                <p className='text-center text-gray-700 mt-4 max-w-3xl px-4 font-semibold'>
                    Discover and share your favorite recipes on Platea! Add your own delicious dishes and inspire others with new culinary creations
                </p>
            </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-wrap mt-10 gap-4 justify-center'>
            <Input
                label="Title"
                type="text"
                name="title"
                required={true}
                className="w-full mb-4"
                {...register('title')}
            />
            <RTE
                label="Content"
                name="content"
                control={control}
                defaultValue={post ? post.content : ''} 
                className="w-full mb-4"
            />
            <Input
                label="Featured Image"
                type="file"
                name="image"
                required={false}
                className="w-full mb-4"
                accept="image/*"
                {...register('image')}
            />
            <Input
            type="text"
            label="Area"
            name="area"
            required={true}
            className="w-full mb-4" 
            {...register('area')}
            />
            {
                post &&(
                    <div className='w-full mb-4 '>
                    <img src={imageUrl} alt={post.title} className='max-h-48 object-cover'/>
                    </div>
                )
            }
            <Select
                label="Status"
                name="status"
                required={true}
                {...register('status')}
                options={[
                    {value: 'draft', label: 'Draft'},
                    {value: 'published', label: 'Published'},
                ]}
                className="w-full  mb-4 "
            />
            <CardBtn
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded flex items-center justify-center mb-4 "
                >
                {post ? 'Update Post' : 'Create Post'}
            </CardBtn>
        </form>
    </div>
)
}

export default Postform
