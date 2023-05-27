import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import { Dropdown } from "flowbite-react";

import "./styles.css"

import Register from "./pages/Register"
import Login from "./pages/Login"
import Single from "./pages/Single"
import Write from "./pages/Write"
import Home from "./pages/Home"
import Footer from "./components/Footer";
import Navibar from "./components/Navibar";
import Verify from "./pages/Verify";
import Verification from "./pages/Verification";
import NavibarLogged from "./components/NavibarLogged";
import Profile from "./pages/Profile";
import BlogTeknologi from "./pages/categories/BlogTeknologi";
import BlogOlahraga from "./pages/categories/BlogOlahraga";
import BlogSearch from "./pages/categories/BlogSearch";
import ChangePassword from "./pages/ChangePassword";
import BlogTopTen from "./pages/categories/BlogTopTen";
import ChangeUsername from "./pages/ChangeUsername";
import ChangeEmail from "./pages/ChangeEmail";
import ChangePhone from "./pages/ChangePhone";
import ChangeProfileP from "./pages/ChangeProfileP";


function LayoutLogged(){
  if(localStorage.getItem("token")){
    return <NavibarLogged/>
  }
    return <Navibar/>
}

const Layout = () => {
  return (
    <>
    <LayoutLogged/>
    <Outlet/>
    <Footer/>
    </>
  );
};  

export const LoginContext = createContext({
    token:"",
    setToken: () => {},
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      
      {
        path: "/post/:id",
        element: <Single/>,
      },
      {
        path: "/write",
        element: <Write/>,
      },
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/profile",
        element: <Profile/>,
      },
      {
        path: "/btech",
        element: <BlogTeknologi/>,
      },
      {
        path: "/bolahraga",
        element: <BlogOlahraga/>,
      },
      {
        path: "/bsearch",
        element: <BlogSearch/>,
      },
      {
        path: "/blogtopten",
        element: <BlogTopTen/>,
      },
    ],
  },
      {
        path: "/register",
        element: <Register/>,
      },
      {
        path: "/verify",
        element: <Verify/>,
      },
      {
        path: "/verification/:token",
        element: <Verification/>,
      },
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/cpass",
        element: <ChangePassword/>,
      },
      {
        path: "/cusername",
        element: <ChangeUsername/>,
      },
      {
        path: "/cemail",
        element: <ChangeEmail/>,
      },
      {
        path: "/cphone",
        element: <ChangePhone/>,
      },
      {
        path: "/changepp",
        element: <ChangeProfileP/>,
      },
]);

function App() {

  const [token, setToken] = useState("");

  useEffect(() => {
    const tokenStg = localStorage.getItem("token");
    if (tokenStg) {
      setToken(tokenStg);
    }
  }, []);

  return (
    <div className="app">
      <div className="container">
        <LoginContext.Provider value = {{token, setToken}}>
          <RouterProvider router={router} />
        </LoginContext.Provider>
      </div>
    </div>
  );
}



export default App;
