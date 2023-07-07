import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import apiAuth from "../services/apiAuth"
import { useContext, useState } from "react"
import { UserContext } from "../contexts/userContext"


export default function SignInPage() {

  const [form, setForm] = useState({ email: '', senha: '' })
  const {user, setUser} = useContext(UserContext)

  const navegate = useNavigate()

  function formulario(e){
    setForm({...form, [e.target.name]: e.target.value})

  }

  function login(e){
    e.preventDefault()
    console.log('aqui')
    const body = { email: form.email, senha: form.senha }
    apiAuth.login(body)
      .then(res =>{
        console.log('aqui2')
        console.log(res.data);
        //const { token, usuario } = res.data;
        //const id = usuario._id;
       // const name = usuario.name;\
       const { token } = res.data;
       setUser({ token });

        navegate("/home");
      })
        
      .catch(err=>{
        if (err.response && err.response.status === 404) {
          alert("E-mail não cadastrado");
        } else if (err.response && err.response.status === 401) {
          alert("Senha incorreta. Verifique sua senha e tente novamente.");
        } else {
          alert("Ocorreu um erro durante o login. Por favor, tente novamente mais tarde.");
        }
        console.log(err)
      })

  }
  

  return (
    <SingInContainer>
      <form onSubmit={login}>
        <MyWalletLogo />
        <input placeholder="E-mail"  name="email" required value={form.email} onChange={formulario}/>
        <input placeholder="Senha" type="password" autocomplete="new-password" required name="senha" value={form.senha} onChange={formulario}/>
        <button type="submit">Entrar</button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
