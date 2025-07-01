import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {auth} from '../../firebase/firebase.init'
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';

const googleProvider=new GoogleAuthProvider()

const AuthProvider = ({children}) => {

    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)

    // create user----------
    const createUser=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    // Sign in user-------
    const signInUser=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email,password)
    }

    // sign in with google-------
    const signInWithGoogle=()=>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    // log out user---------
    const logOut=()=>{
      setLoading(true)
      return signOut(auth)
    }
    // update user profile----
    const updateUserProfile=profileInfo=>{
      return updateProfile(auth.currentUser,profileInfo)
    }

    // unSubscribe------------
  useEffect(()=>{
    const unSubscribe=onAuthStateChanged(auth, currentUser=>{
        setUser(currentUser)
        console.log('user in the auth state change', currentUser)
        setLoading(false)
    })
    return ()=>{
        return unSubscribe()
    }
  },[])


    const authInfo={
        createUser,
        signInUser,
        logOut,
        updateUserProfile,
        user,
        setUser,
        loading,
        setLoading,
        signInWithGoogle,
    }

    return (
      <AuthContext value={authInfo}>
          {children}
      </AuthContext>
            
        
    );
};

export default AuthProvider;