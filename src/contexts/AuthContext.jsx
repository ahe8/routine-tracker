import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
   const [currentUser, setCurrentUser] = useState(); 
    
    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function signin(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }
    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
        })

        return unsubscribe;
    }, [])


    const value = {
        currentUser,
        signup,
        signin,
    };
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}