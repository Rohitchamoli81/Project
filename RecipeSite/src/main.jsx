  import { StrictMode } from 'react'
  import { createRoot } from 'react-dom/client'
  import './index.css'
  import App from './App.jsx'
  import {store} from './store/store'
  import { Provider } from 'react-redux'
  import { Home ,AllRecipe ,Meal ,Detail} from './pages/index'
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
        }
      ]
    }
  ])

  createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>,
  )
