import { useState } from "react";
import { createContext } from "react";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged , signInWithEmailAndPassword,  signOut } from "firebase/auth";
import { useEffect } from "react";
import app from "../../firebase/firebase.config";

export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true)

    const userSignIn = (email , password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth , email , password)
    }

    const createUser = (email , password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth , email , password)
    }

    const logOut = () => {
      return signOut(auth)
    }

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth , currentUser => {
        setUser(currentUser)
        setLoading(false)
        console.log('current-user' , currentUser)
      })
    
      return () => {
        return unsubscribe();
      }
    }, [])
     

    const authInfo = {
        user,
        loading,
        createUser,
        userSignIn,
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;