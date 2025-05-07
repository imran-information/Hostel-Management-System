import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebase.init";



const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const updateProfileUser = (name, photoURL) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL
        })
    }


    // manage user 
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
        if (currentUser.email) {
            setUser(currentUser)
            console.log("current User---> ", currentUser);
        }

        return () => unsubscribe()
    })

    const userInfo = {
        user,
        loading,
        createUser,
        loginUser,
        updateProfileUser

    }


    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;