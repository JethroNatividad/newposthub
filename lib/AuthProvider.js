import { createContext, useState } from "react"

// get token in localstorage
const AuthContext = createContext({
    auth: {
        token: null,
        user: null,
    }
})

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: null,
        user: null,
    })

    function setToken(token) {
        // set token in state
        setAuth({
            ...auth,
            token,
        })

    }

    const setUser = (user) => {
        // set user in state
        setAuth({
            ...auth,
            user,
        })
    }

    return (
        <AuthContext.Provider value={ { auth, setUser, setToken } }>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContext