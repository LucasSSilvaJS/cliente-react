import {createContext, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {auth, db} from '../services/firebaseConnection'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {doc, getDoc, setDoc} from 'firebase/firestore'
import {toast} from 'react-toastify'

export const AuthContext = createContext({})

function AuthProvider({children}){
    const [user, setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        async function loadUser(){
            const storageUser = localStorage.getItem('@ticketPRO')
            if(storageUser){
                setUser(JSON.parse(storageUser))
                setLoading(false)
            }
            setLoading(false)
        }

        loadUser()
    }, [])
    
    async function signIn(email, password){
        setLoadingAuth(true)

        await signInWithEmailAndPassword(auth, email, password)
        .then( async (value) => {
            let uid = value.user.uid

            const docRef = doc(db, 'users', uid)
            const docSnap = await getDoc(docRef)

            let data = {
                uid,
                nome: docSnap.data().nome,
                email: value.user.email,
                avatarUrl: docSnap.data().avatarUrl
            }

            setUser(data)
            storageUser(data)
            setLoadingAuth(false)
            toast.success('Bem-vindo de volta!')
            navigate('/dashboard')
        })
        .catch((error) => {
            console.log(error)
            setLoadingAuth(false)
            toast.error('Ops! Algo deu errado!')
        })
    }

    async function signUp(email, password, name){
        setLoadingAuth(true)

        await createUserWithEmailAndPassword(auth, email, password)
        .then( async (value) => {
            let uid = value.user.uid

            await setDoc(doc(db, 'users', uid), {
                nome: name,
                avatarUrl: null
            })
            .then( () => {
                let data = {
                    uid,
                    nome: name,
                    email: value.user.email,
                    avatarUrl: null
                }

                setUser(data)
                storageUser(data)
                setLoadingAuth(false)
                toast.success('Seja bem-vindo ao sistema!')
                navigate('/dashboard')
            })
        })
        .catch((error) => {
            console.log(error)
            setLoadingAuth(false)
        })
    }

    function storageUser(data){
        localStorage.setItem('@ticketPRO', JSON.stringify(data))
    }

    async function logOut(){
        await signOut(auth)
        localStorage.removeItem('@ticketPRO')
        setUser(null)
    }

    return(
        <AuthContext.Provider 
            value={{
                signed: !!user,
                user,
                signIn,
                signUp,
                logOut,
                loadingAuth,
                loading,
                storageUser,
                setUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider