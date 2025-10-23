import React,{useState, useEffect} from 'react'
import { useNavigate ,useParams } from 'react-router-dom'
import { Postform } from '../components'
import { useSelector } from 'react-redux'
import { postService } from '@/appwrite/post'

function EditPost() {
    const navigate = useNavigate()
    const [post,setPost] = useState([])
    const {id} = useParams()
    const {posts} = useSelector((state) => state.posts)
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
                console.log('EditPost::FetchPost::Error',error);
                // navigate('/')
            }
        }
        fetchPost()
    }, [id, navigate])

return (
    <div>
        <Postform post={post}/>
    </div>
)
}

export default EditPost
