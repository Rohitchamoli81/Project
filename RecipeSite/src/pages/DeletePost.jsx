import React,{useState,useEffect} from 'react'
import { useNavigate ,useParams } from 'react-router-dom'
import {postService} from '@/appwrite/post'
import { fileService } from '@/appwrite/file'
import { useSelector } from 'react-redux'
import parse from 'html-react-parser'
import { Link } from 'react-router-dom'
import { CardBtn } from '@/components'

function DeletePost() {
const navigate = useNavigate()
const {id} = useParams()
const [imageUrl, setImageUrl] = useState('/images/default.png')
const userId = useSelector((state) => state.auth.user?.$id)
const isAuthor = useSelector((state) => {
    const post = state.posts.posts.find((p) => p.id === id)
    return post?.userId === userId
})
console.log(userId);
console.log("isAuthor",isAuthor);




const {posts} = useSelector((state) => state.posts)
const [post,setPost] = useState(null)

useEffect(() => {
    const fetchPost = async () => {
        try {
            if(id){
                const post = posts.find((p) => p.id === id)
                if(post){
                    setPost(post)
                } else {
                    const response = await postService.getPost(id)
                    setPost(response)
                }
            }
        } catch (error) {
            console.log('DeletePost::FetchPost::Error',error);
            navigate('/')
        }
    }
    fetchPost()
}, [id, navigate])

const handleDelete = async () => {
    try {
        if(post){
            await postService.deletePost(post.id||post.$id)
            .then((post)=>{
                if(post.featuredImage){
                    fileService.deleteFile(post.featuredImage)
                }
            })
            navigate('/allBlog')
        }
    } catch (error) {
        console.log('DeletePost::Delete::Error',error);
        throw error
        navigate('/')
    }
}

useEffect(() => {
    if (post && post.featuredImage) {
        fileService.getFilePreview(post.featuredImage)
            .then(url => setImageUrl(url))
            .catch(err => {
                console.log("Image preview error:", err)
                setImageUrl('/images/default.png')
            })
    }
}, [post])


return post ? (
        <div className="py-8 mt-16 px-4 md:px-8 lg:px-16">
                <div className=" flex justify-center mb-4 relative border rounded-xl p-2 w-full h-64 md:h-[600px] overflow-hidden">
                    <img
                        src={imageUrl}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6 flex flex-col gap-4">
                            <Link to={`/edit-post/${id}`}>
                                <CardBtn  className=" w-full p-4 rounded-sm  bg-green-500">
                                    Edit
                                </CardBtn>
                            </Link>
                            <CardBtn  className="bg-red-500 p-4 rounded-sm" onClick={handleDelete}>
                                Delete
                            </CardBtn>
                        </div>
                    )}
                </div>
                <div className='text-center px-4 md:px-8 '>
                    <div className="w-full mb-6 ">
                        <h1 className="text-2xl font-bold">{post.title}</h1>
                    </div>
                    <div className="browser-css ">
                        {parse(post.content)}
                    </div>
                </div>
        </div>
    ) : null;
}


export default DeletePost
