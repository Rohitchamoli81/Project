import React,{useEffect, useState} from 'react'
import {Nav , Header , Button, Footer ,PostSlider } from '../components/index'
import { useSelector } from 'react-redux'
import {groupBooksByCategory} from '../components/Categories/Categories'
import { useNavigate } from 'react-router-dom'

function Home() {

    const storebooks = useSelector(state=>state.books.books)
    console.log(storebooks[0].category);
    const navigate  = useNavigate()
    
    const [category,setcategory] = useState("Technology & Computing")
    const [personal,setPersonal] = useState('Arts & Literature') 
    const groupbooks = groupBooksByCategory(storebooks)
return (
    <div>
        <Header/>
        <div className='text-center font-bold text-black  flex flex-col mt-4 '>
            <span className='text-4xl pb-2'>PROFESSIONAL</span>
            <div className='text-3xl cursor-pointer'>
                    <span
                    onClick={()=>setcategory("Technology & Computing")}
                    className={category==='Technology & Computing'?"text-orange-500":""}
                    >Technology & Computing | </span>
                    <span
                    onClick={()=>setcategory("Business & Finance")}
                    className={category==='Business & Finance'?"text-orange-500":""}
                    >Business & Finance | </span>
                    <span
                    onClick={()=>setcategory("Science & Academics")}
                    className={category==='Science & Academics'?"text-orange-500":""}
                    >Science & Academics | </span>
            </div>  
        </div>
        <PostSlider books={groupbooks[category]?.slice(0,10)||[]}/>
        <Button handleButton={()=>navigate(`/books/${category}`)}
            children={'view all '}
            divclassName='flex justify-center'
            className="btn btn-neutral mt-4 bg-amber-600 border-0 text-black "
            />
        <div className='text-center font-bold text-black  flex flex-col mt-10'>
            <span className='text-4xl pb-2'>PERSONAL</span>
            <div className='text-3xl cursor-pointer'>
                    <span
                    onClick={()=>setPersonal('Arts & Literature')}
                    className={personal==='Arts & Literature'?"text-orange-500":""}
                    >Arts & Literature | </span>
                    <span
                    onClick={()=>setPersonal('Sports & Recreation')}
                    className={personal==='Sports & Recreation'?"text-orange-500":""}
                    >Sports & Recreation | </span>
                    <span
                    onClick={()=>setPersonal('Lifestyle & General')}
                    className={personal==='Lifestyle & General'?"text-orange-500":""}
                    >Lifestyle & General | </span>
            </div>  
        </div>
        <PostSlider books={groupbooks[personal]?.slice(0,10)||[]} />
        <Button handleButton={()=>navigate(`/books/${personal}`)}
            children={'view all '}
            divclassName='flex justify-center'
            className="btn btn-neutral mt-4 bg-amber-600 border-0 text-black "
            />
    </div>
)
}

export default Home
