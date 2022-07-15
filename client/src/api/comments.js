import axios from "axios"

const serverUrl = "http://localhost:3000/comments/"

export default class Comments {
    static postComment(data){
        return axios.post(serverUrl, data)
    }
}