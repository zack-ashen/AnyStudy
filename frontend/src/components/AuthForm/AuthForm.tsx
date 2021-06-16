import { useState } from 'react';
import './AuthForm.css';
import googleLogo from './google_logo.svg';

type AuthFormProps = {
  signIn: boolean;
  auth: React.FormEventHandler;
}

const AuthForm = ({ signIn, auth }: AuthFormProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  
  const formTitle = signIn ? "Sign In" : "Sign Up";

  return (
    <form className="AuthForm" onSubmit={auth}>
      <h2 className="formTitle">{formTitle}</h2>
      {!signIn && 
        <><label className="authLabel">
          Name
        </label>
        <input 
          className="authInput"
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} /></> 
      }

      <label className="authLabel">
        Email Address
      </label>
      <input 
        className="authInput"
        type="text" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} />

      <label className="authLabel">
        Password
      </label>
      <input 
        className="authInput"
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} />
      
      <input className="authButton" type="submit" value={formTitle} />

      <div className="divider" />

      <button className="googleAuthButton">
        <img className="googleLogo" src={googleLogo} />{formTitle} with Google
      </button>
    </form>
  )
}

export default AuthForm;