import { async } from '@firebase/util';
import {db } from "../firebase/config"
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    singOut,
    signOut
} from 'firebase/auth'

import {useState, useEffect} from "react"

export const useAuthentication = ()=>{
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();

    function checkIfIsCancelled(){
        if(cancelled){
            return;
        };
    };

    const createUser = async (data)=>{
        checkIfIsCancelled();

        setLoading(true);
        setError(null)

        try {

            const {user} = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            )

            await updateProfile(user,{
                displayName: data.displayName
            });

            setLoading(false);  
            return user

        } catch (error) {
            console.log(error.message);
            console.log(typeof error.message);

            let systemErrorMessage

            if(error.message.includes("Password")){
                systemErrorMessage = "A senha deve conter no mínimo 6 caracteres"
            }else if(error.message.includes("email-already")){
                systemErrorMessage = "Email já cadastrado"
            }else{
                systemErrorMessage = "Ocorreu um erro, tente novamente mais tarde"
            }

            setLoading(false);  
            setError(systemErrorMessage)
        }

            
    };

    
    const logout = ()=>{
        checkIfIsCancelled();
        signOut(auth);
    }

    const login = async(data)=>{
        checkIfIsCancelled();
        setError("");
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            setLoading(false);
        } catch (error) {
            let systemErrorMessage

            if(error.message.includes("user-not-found")){        
                systemErrorMessage = "usuário não encontrado";
            }else if(error.message.includes("wrong-password")){
                systemErrorMessage = "Senha incorreta"
            }else{
                systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde"
            }  
            
            setError(systemErrorMessage);
            setLoading(false);
        }
    };

    useEffect (()=>{
        return ()=> setCancelled(true);
    },[])

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login
    }
}

