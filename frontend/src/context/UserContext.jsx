import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {api_url} from "../config.json"

export const UserContext = createContext();

export const UserProvider = ({ children }) => {


    
    const navigate = useNavigate();
   
    const [currentUser, setCurrentUser] = useState(null);
    const [auth_token, setAuthToken] = useState(()=> localStorage.getItem("access_token"));



    

    // All functions to manage user data

    // ========= Function to register a user ==========
    function register_user(username, email, password)
    {
        toast.loading("Registering user...");

        fetch(`${api_url}/create_user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username: username,email: email, password: password})
            }
        )
        .then(response => response.json())
        .then(res => {
            
            if(res.error){
                toast.dismiss();
                toast.error(res.error)

            }
            else if(res.success){
                  toast.dismiss();
                  toast.success(res.success)
                //   navigate to login page
                    navigate("/login");
            }
            else{
                toast.dismiss();
                toast.error("An error occurred while registering the user.")
            }
        })
        
    }

    // ======== Function to login a user ========
    function login_user(email, password){
        toast.loading("Logging you in...");

        fetch(`${api_url}/api/token/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, password})
            }
        )
        .then(response => response.json())
        .then(res => {
            console.log('====================================');
            console.log(res);
            console.log('====================================');
            if(res.error){
                toast.dismiss();
                toast.error(res.error)

            }
            else if(res.access){
                  toast.dismiss();
                  toast.success("Logged in successfully!");

                //   save token to localstorage
                localStorage.setItem("access_token", res.access);
                setAuthToken(res.access)
                  
                navigate("/");
            }
            else if(res.detail){
                  toast.dismiss();
                  toast.error(res.detail);
            }
            else{
                toast.dismiss();
                toast.error("An error occurred while logging in!")
            }
        })
        
    }

    // ======= Function to logout a user ========
    function logout_user(){

        toast.success("Logout success");
        localStorage.removeItem("access_token");
        setAuthToken(null);
        setCurrentUser(null);
        navigate("/login");
    
    }

   

    // ======= get current user data =======
    useEffect(() => {
        if(auth_token){
             fetch(`${api_url}/current_user`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth_token}`
            } })
            .then(response => response.json())
            .then(res => {
                console.log("res ", res);
                
                
                if(res.email){
                    setCurrentUser(res);

                }
            })
        }
    }, [auth_token]);






    const context_data={
       register_user,

        auth_token,
        currentUser,
        
        login_user,
        logout_user,
    }

    return(
        <UserContext.Provider value={context_data}>
            {children}
        </UserContext.Provider>
    )

};