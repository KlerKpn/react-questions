import axios from 'axios'
import { AUTH_SUCCESS, AUTH_LOGOUT } from './actionTypes'

export function auth(email, password, isLogin) {
    return async dispath => {
        const authData = {
            email, password, returnSecureToken: true
        }

        let url

        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD3n5whqK2ox8JE9sUOHTUneONonSLH4as'
        } else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD3n5whqK2ox8JE9sUOHTUneONonSLH4as'
        }

        const response = await axios.post(url, authData)
        const data = response.data

        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)

        localStorage.setItem('token', data.idToken)
        localStorage.setItem('userId', data.localId)
        localStorage.setItem('expirationDate', expirationDate)

        dispath(authSuccess(data.idToken))
        dispath(autoLogout(data.expiresIn))
    }
}

export function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}

export function autoLogout(time) {
    return dispath => {
        setTimeout(() => {
            dispath(logout())
        }, time * 1000)
    }
}

export function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')
    return {
        type: AUTH_LOGOUT
    }
}

export function autoLogin() {
    return dispath => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispath(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate <= new Date()) {
                dispath(logout())
            } else {
                dispath(authSuccess(token))
                dispath(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}