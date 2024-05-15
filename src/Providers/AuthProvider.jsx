import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import useAxiosSecure from '../hooks/useAxiosSecure'



export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
 const axiosSecure = useAxiosSecure();
 const [user, setUser] = useState(null);
 const [loading, setLoading] = useState(true);

 const createUser = (email, password) => {
   setLoading(true);
   return createUserWithEmailAndPassword(auth, email, password);
 };

 const signIn = (email, password) => {
   setLoading(true);
   return signInWithEmailAndPassword(auth, email, password);
 };

 const signInWithGoogle = () => {
   setLoading(true);
   return signInWithPopup(auth, googleProvider);
 };

 const logOut = async () => {
   try {
     setLoading(true);
     await axiosSecure.post(`/logout`, {}, { withCredentials: true });
     await signOut(auth);
     setUser(null);
   } catch (error) {
     console.error("Error logging out:", error);
   } finally {
     setLoading(false);
   }
 };

 const updateUserProfile = (name, photo) => {
   return updateProfile(auth.currentUser, {
     displayName: name,
     photoURL: photo,
   });
 };

 useEffect(() => {
   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
     setUser(currentUser);
     setLoading(false);
   });
   return () => {
     unsubscribe();
   };
 }, []);

 const authInfo = {
   user,
   setUser,
   loading,
   setLoading,
   createUser,
   signIn,
   signInWithGoogle,
   logOut,
   updateUserProfile,
 };
 return (
   <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
 );
};

export default AuthProvider;
