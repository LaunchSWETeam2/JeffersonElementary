import { AtmOutlined } from '@material-ui/icons';
import React, {useState, createContext, useContext, useEffect} from 'react';
import { auth } from '../auth/firebaseAuth';

const AuthContext = createContext()

function useAuth(){
    return useContext(AuthContext);
}

function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password){
        return auth.signInWithEmailAndPassword(email,password)
    }

    function logout(){
        return auth.signOut()
    }

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user=>{
            setCurrentUser(user)
            setLoading(false)//won't load children till current user is loaded
        })
        return unsubscribe //unsubscribe on unmount
    },[])

    const value = {
        currentUser,
        signup,
        login,
        logout,
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>            
    )
}

export default AuthProvider
export { useAuth }
