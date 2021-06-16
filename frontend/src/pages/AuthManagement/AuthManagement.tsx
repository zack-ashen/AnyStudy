import Nav from '../../components/Nav/Nav';
import { NavDisplay } from '../../types';
import AuthForm from '../../components/AuthForm/AuthForm';
import { useState } from 'react'

type AuthManagementProps = {
  signIn: boolean;
}

const AuthManagement = ({ signIn }: AuthManagementProps) => {
  const navDisplay = signIn ? NavDisplay.NOTHING : NavDisplay.SIGN_IN;
  const [signedIn, setSignedIn] = useState<boolean>(false);

  const auth = (e: any) => {

  }

  return (
    <div className="AuthManagement">
      <Nav navDisplay={navDisplay} />
      <AuthForm signIn={signIn} auth={auth} />
    </div>
  )
}

export default AuthManagement
