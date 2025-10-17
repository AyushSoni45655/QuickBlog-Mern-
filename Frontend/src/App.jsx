import {createBrowserRouter, RouterProvider} from "react-router-dom";
import AppLayOut from "./LayOut/AppLayOut";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import DetailsPage from "./pages/DetailsPage";
import Login from "./pages/Account/Login";
import SignUp from "./pages/Account/SignUp"
import ProtectedRoute from "./safety_routes/ProtectedRoute";
import PublicRoute from "./safety_routes/PublicRoute";
function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      errorElement:<ErrorPage/>,
      element:(<ProtectedRoute>
        <AppLayOut/>
      </ProtectedRoute>),
      children:[
        {
          path:"/",
          element:<Home/>
        },
         {
          path:"/home/:id",
          element:<DetailsPage/>
        }
      ]

    },
    {
      path:"/signin",
      element:(
        <PublicRoute>
          <Login/>
        </PublicRoute>
      )
    },
     {
      path:"/signup",
      element:(
        <PublicRoute>
          <SignUp/>
        </PublicRoute>
      )
    }
  ])

  return <RouterProvider router={router}/>
}

export default App
