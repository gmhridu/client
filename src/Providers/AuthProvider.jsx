import React, { createContext, useState } from 'react';


export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
 const [user, setUser] = useState(null)
 const [loading, setLoading] = useState(true)

 const createUser = (email, password) => {
  
 }
 
 const authInfo = {

 }
 return (
  <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
 );
};

export default AuthProvider;