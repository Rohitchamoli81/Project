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
    return post?.authorId === userId
})

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
        }
    } catch (error) {
        console.log('DeletePost::Delete::Error',error);
        throw error
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
        <div className="py-8">
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={imageUrl}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${id}`}>
                                <CardBtn bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </CardBtn>
                            </Link>
                            <CardBtn bgColor="bg-red-500 " onClick={handleDelete}>
                                Delete
                            </CardBtn>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
        </div>
    ) : null;
}


export default DeletePost
