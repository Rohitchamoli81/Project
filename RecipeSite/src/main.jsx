  import { StrictMode } from 'react'
  import { createRoot } from 'react-dom/client'
  import './index.css'
  import App from './App.jsx'
  import {store} from './store/store'
  import { Provider } from 'react-redux'
  import { Home ,AllRecipe ,Meal ,Detail,Login,Signup,AddBlog,EditPost,DeletePost,AllBlog,MyBlog} from './pages/index'
  import { AuthLayout } from './components'
  import { RouterProvider,createBrowserRouter } from 'react-router-dom'

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
          path:'/recipes/:category',
          element:<AllRecipe/>
        },
        {
          path:'/meal/:category',
          element:<Meal/>
        },
        {
          path:'/detail/:id',
          element:<Detail/>
        },
        {
          path:'/login',
          element:<Login/>
        },
        {
          path:'/signup',
          element:<Signup/>
        },{
          path:'/add-blog',
          element:<AuthLayout authenticated>
            <AddBlog/>
            </AuthLayout>
        },{
          path:'/edit-post/:id',
          element:<AuthLayout authenticated>
            <EditPost/>
            </AuthLayout>
        },{
          path:'/allBlog',
          element:<AllBlog/>
        },
        {
          path:'/post/:id',
          element:<DeletePost/>
        },
        {
          path:'/myBlog',
          element:<AuthLayout authenticated>
            <MyBlog/>
            </AuthLayout>
        }
      ]
    }
  ])

  createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>,
  )
