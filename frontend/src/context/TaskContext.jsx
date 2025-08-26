import { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {api_url} from "../config.json"
import { UserContext } from './UserContext';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    
    const {auth_token} = useContext(UserContext)





    const context_data={
   
    }

    return(
        <TaskContext.Provider value={context_data}>
            {children}
        </TaskContext.Provider>
    )

};