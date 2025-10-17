
import {createBrowserRouter , RouterProvider} from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import CommentsPage from "./pages/CommentsPage";
import BlogList from "./pages/BlogList";
import AddBlogs from "./pages/AddBlogs";
import SignIn from "./pages/SignIn";
import AppLayOut from "./LayOut/AppLayOut";
import PublicRoute from "./safty/PublicRoute"
import ProtectedRoute from "./safty/ProtectedRoute";
import ErrorPage from "./pages/ErrorPage"
function App() {
 
const router =  createBrowserRouter([
  {
    path:"/",
    element:(<ProtectedRoute>
      <AppLayOut/>
    </ProtectedRoute>),
    errorElement:<ErrorPage/>,
    children:[
      {
        path:"/",
        element:<DashBoard/>
      },
       {
        path:"/comments",
        element:<CommentsPage/>
      },
       {
        path:"/bloglist",
        element:<BlogList/>
      },
       {
        path:"/addblogs",
        element:<AddBlogs/>
      },
    ]
  },
  {
    path:"/signin",
    element:(<PublicRoute>
      <SignIn/>
    </PublicRoute>)
  }
])
  return <RouterProvider router={router}/>
}

export default App
