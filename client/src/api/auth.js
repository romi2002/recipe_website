import axios from "axios"
import UserDataAtom from "../recoil/auth/UserDataAtom"
import {useRecoilState} from "recoil"

const serverUrl = "http://localhost:3000"

export default class Auth {
    static createUser(email, password){
        return axios.post(serverUrl + "/users/create_user", {
            email:email,
            password:password
        })
    }

    static login(email, password){
        return axios.post(serverUrl + '/users/login', {
            email:email,
            password:password
        }).then(res => {
            return res.data.token
        })
    }

    static validateToken(token){
        return axios.post(serverUrl + '/users/is_valid_token', {
            token:token
        })
    }
}