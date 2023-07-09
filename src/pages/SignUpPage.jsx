import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import apiAuth from "../services/apiAuth"

export default function SignUpPage() {

  const [form, setForm] = useState({email: '', name: '', senha: '', repetirSenha: ''})
  const navegate = useNavigate()

  function formulario(e){
    setForm({...form, [e.target.name]: e.target.value})

  }

  


  function cadastroLogin(e){
    e.preventDefault()

    if (form.senha !== form.repetirSenha) {
      alert("As senhas não coincidem. Verifique os campos de senha.");
      return;
    }

    if (form.senha.length < 3) {
      alert("Senha inválida. A senha deve ter no mínimo três caracteres.");
      return;
    }
    
    const body = {
      email: form.email,
      name: form.name,
      senha: form.senha,
      repetirSenha: form.repetirSenha
    };    


    apiAuth.cadastro(body)
    .then(res=>{

      navegate("/")

    })
    .catch(err=>{
      if (err.response && err.response.status === 422) 
      {alert("E-mail no formato invalido");} 
     else if (err.response && err.response.status === 409) {
      alert("e-mail já cadastrado")
      } else {
        alert("Ocorreu um erro durante o cadastro. Por favor, tente novamente mais tarde.");
      }

    })

  }
  return (
    <SingUpContainer>
      <form onSubmit={cadastroLogin}>
        <MyWalletLogo to="/"/>
        <input placeholder="Nome" type="text" name="name" required value={form.name} onChange={formulario}/>
        <input placeholder="E-mail" type="email" name="email" required value={form.email} onChange={formulario}/>
        <input placeholder="Senha" type="password" autocomplete="new-password" required name="senha" value={form.senha} onChange={formulario}/>
        <input placeholder="Confirme a senha" type="password" autocomplete="new-password" required name="repetirSenha" value={form.repetirSenha} onChange={formulario}/>
        <button type="submit">Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
