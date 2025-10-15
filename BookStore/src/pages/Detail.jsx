import React, { useState ,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector ,useDispatch } from 'react-redux'
import { addCard as addBookToCard } from '@/store/cardSlice'
import cardService from '../appwrite/card'
import card from 'daisyui/components/card'
import { useNavigate } from 'react-router-dom'

function Detail() {
  const {id} = useParams()
  const numberId = Number(id)
  const [discount , setDiscount] = useState(0)
  const books = useSelector(state=>state.books.books)
  console.log(numberId);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const book = books.find((book)=>(
    book.id===numberId
  ))

  const userData = useSelector(state=>state.auth.userData)

  const userStatus = useSelector(state=>state.auth.status)


// add card function and dispatch to local wishlist storage

  const addCard = async()=>{
    const userId = userData.$id
    if(!userStatus){
      return navigate('/login')
    }
    if(!book) return alert("Book not found")

      const author = book.author?book.author:"Unknown Author"
      const price = String(book.price?book.price:0)

    try {
        const result = await cardService.addbook({
        bookId:id,
        userId,
        bookData:{
          title:book.title,
          author,
          price,
          featuredImage:book.featuredImage,
      }
    })

    dispatch(addBookToCard({
      title:book.title,
      featuredImage:book.featuredImage,
      price,
      bookId:id,
      userId,
      author,
      id:result.$id,
    }))

    return result
    } catch (error) {
      console.log("Error while adding book to card",error);
      throw error
    }
  } 


  if(!book) return<div>Book Not Found</div>

  useEffect(() => {
  if (book?.retail && book?.price) {
    const less = Math.ceil(((book.retail-book.price) / book.price) * 100)
    setDiscount(less)
  }
}, [book])

//window scrolling to top on page load

useEffect(()=>{
        window.scrollTo({top:0,behavior:'smooth'})
    },[])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 h-fit mt-15">
      {/* Left Side - Image */}
      <div className="flex justify-center mt-15">
        <img
          src={book.featuredImage}
          alt="Book Cover"
          className="rounded-lg shadow-lg max-h-[600px] "
        />
      </div>

      {/* Right Side - Details */}
      <div className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-black">
          Title:{book.title}
        </h1>
        <p className="text-gray-600">by {book.author}</p>


        {/* Price */}
        <div className="text-xl">
          <span className="line-through text-gray-400 mr-2"> {book.retail>book.price?( Rs. book.retail):" "}</span>
          <span className="font-bold text-orange-600">Rs. {book.price}</span>
          <span className="ml-2 text-sm text-green-600">{book.retail>book.price?`Save ${discount}%`:""}</span>
        </div>

        {/* Stock Info */}
        <p className="text-red-600">Only 1 left in stock</p>
        <p>
          <span className="font-semibold text-black">Binding:</span> Paperback
        </p>
        <p>
          <span className="font-semibold text-black">Condition:</span> Gently Used
        </p>

        {/* Offers */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-sm space-y-2">
          <p className="font-bold text-orange-600">
            Grab 20% Off on Books <br />
            <span className="text-gray-700 font-normal">
              Add 5 or more books to cart 📚
            </span>
          </p>
          <p className="font-bold text-orange-600">
            Flat 25% Off on Reading Lights <br />
            <span className="text-gray-700 font-normal">
              Add 3 or more lights to cart 💡
            </span>
          </p>
          <p className="font-bold text-orange-600">
            30% Off on Bookmarks & Candles <br />
            <span className="text-gray-700 font-normal">
              Add 3 or more items to cart 🕯️
            </span>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3 mt-4">
          <button className="border border-gray-400 rounded-lg py-2 font-medium hover:bg-gray-100" onClick={addCard}> 
            Add To Cart
          </button>
          <button className="bg-orange-600 text-white py-2 rounded-lg font-medium hover:bg-orange-700">
            Buy Now
          </button>
        </div>

        {/* Delivery Info */}
        <p className="text-gray-500 text-sm mt-2">
          Delivery within 4–6 business days
        </p>
      </div>
    </div>
  )
}

export default Detail
