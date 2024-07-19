import { useContext } from "react"
import { AuthContext } from "../contexts/auth"
import { Navigate } from "react-router-dom"

function Private({children}){
    const {signed, loading} = useContext(AuthContext)

    if(loading){
        return (
            <div></div>
        )
    }

    if(!signed){
        return <Navigate to="/"/>
    }
    
    return children
}

export default Private