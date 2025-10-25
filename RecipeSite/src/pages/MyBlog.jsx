import React,{useEffect,useState} from 'react'
import { BlogCard } from '../components/index'
import { useSelector } from 'react-redux'
import { useNavigate , useParams } from 'react-router-dom'

function MyBlog() {
    const  user  = useSelector((state) => state.auth.user)
    const authLoading = useSelector((state) => state.auth.loading)
    const navigate = useNavigate();
    const posts = useSelector((state) => state.posts.posts);
    
    const postLoading = useSelector((state) => state.posts.loading);
    const [userPosts, setUserPosts] = useState([]);
    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            if(posts){
                const filteredPosts = posts.filter((post) => post.userId === user.$id);
                setUserPosts(filteredPosts);
            }
        }
    }, [user, navigate, posts]);

return (
    authLoading || postLoading ? <div>loading...</div>:
    !posts? <div className='mt-20 text-center text-2xl font-semibold'>No Posts Available</div> :
    <div>
        <div className='relative mt-16'>
            <img className='w-full h-90' src="/thumbnail/banner.png" alt="" />
            <div className='absolute inset-0 flex flex-col items-center justify-center'>
                <h1 className='text-black text-5xl font-semibold'>Personal Blog</h1>
                <p className='text-center text-gray-700 mt-4 max-w-3xl px-4 font-semibold'>
                Discover tips, trends, and stories to enhance your culinary journey. From expert advice to creative ideas, explore everything food enthusiasts need to stay inspired!
                </p>
            </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6'>
            {
                userPosts.map((post)=>(
                    <BlogCard  key={post.id} post={post}
                    onClick={()=> navigate(`/post/${post.id}`)}
                    />
                ))
            }
        </div>
    </div>
)
}

export default MyBlog
