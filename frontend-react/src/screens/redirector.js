import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { userAtom } from "../atoms/userAtom";
export default function Redirector(){
    const [user,] = useAtom(userAtom);
    const history = useHistory();
    useEffect(()=>{
        if(!user['userType']) return history.replace('/login');
        if(user['userType']==='user'){
             return  history.replace('/wallet')
        }
        history.replace('/merchant/dashboard');
    },[])
    return null;
}