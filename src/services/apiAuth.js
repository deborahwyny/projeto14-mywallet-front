import axios from "axios";

const BASE_URL = "http://localhost:4000"

function login(body){
    const promisse = axios.post(`http://localhost:4000/loginUser`, body)
    return promisse
}

function cadastro(body){
    const promisse = axios.post(`http://localhost:4000/cadastroUser`, body)
    return promisse

}

const apiAuth = {login, cadastro}

export default apiAuth