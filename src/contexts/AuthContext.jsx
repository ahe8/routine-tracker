import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getNumberOfDaysInMonth } from '../utils';

const AuthContext = createContext();
const provider = new GoogleAuthProvider();

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
    
    async function googleSignIn() {
        const result = await signInWithPopup(auth, provider)

        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;

        const firstName = user.displayName.split(" ")[0];

        const userInfo = {
            user_id: user.uid,
            first_name: firstName,
            email: user.email,
        }

        return userInfo;
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
        googleSignIn
    };
    
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}