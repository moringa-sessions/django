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

        fetch(`${api_url}/users`, {
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
    function login_user(username, password){
        toast.loading("Logging you in...");

        fetch(`${api_url}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username: username, password: password})
            }
        )
        .then(response => response.json())
        .then(res => {
            if(res.error){
                toast.dismiss();
                toast.error(res.error)

            }
            else if(res.access_token){
                  toast.dismiss();
                  toast.success("Logged in successfully!");

                //   save token to localstorage
                localStorage.setItem("access_token", res.access_token);
                setAuthToken(res.access_token)
                  
                //   navigate to question page
                    navigate("/students");
            }
            else{
                toast.dismiss();
                toast.error("An error occurred while logging in!")
            }
        })
        
    }

    // ======= Function to logout a user ========
    function logout_user(){
        fetch(`${api_url}/logout`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${auth_token}`,
            }
        }
        )   
        .then(response => response.json())
        .then(res => {
            if(res.success){
                toast.success(res.success);
                localStorage.removeItem("access_token");
                setAuthToken(null);
                setCurrentUser(null);
                navigate("/login");
            }
            else{
                toast.error("An error occurred while logging out!")
            }
        })   

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
                
                if(res.msg){
                    toast.error( res.msg);
                }
                else{
                    console.log("Current user responsexxx ", res);
                    setCurrentUser(res);
                    

                }
            })
        }
    }, [auth_token]);


   const xxxx="test"




    const context_data={
        xxxx,
        auth_token,
        currentUser,
        register_user,
        login_user,
        logout_user,
    }

    return(
        <UserContext.Provider value={context_data}>
            {children}
        </UserContext.Provider>
    )

};