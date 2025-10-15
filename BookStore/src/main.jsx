import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import {Home ,Detail,AllPost,Signin,Signup} from './pages/index'
import 'antd/dist/reset.css';

const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
    {
    path:'/',
    element:<Home/>
  },
  {
    path:'/book/:id',
    element:<Detail/>
  },
  {
    path:'/books/:category',
    element:<AllPost/>
  },
  {
    path:'/signin',
    element:<Signin/>
  },
  {
    path:'/signup',
    element:<Signup/>
  }
    ]
  }

])

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router ={router}/>
  </Provider>,
)
