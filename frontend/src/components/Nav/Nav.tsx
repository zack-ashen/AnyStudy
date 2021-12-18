import { Link } from 'react-router-dom';

import './Nav.css'

type NavProps = {
  authButton: JSX.Element;
}

const Nav = ({ authButton }: NavProps) => (
  <nav>
    <Link to="/"><h1>AnyStudy</h1></Link>
    <div className="navDetails">
      {authButton}
    </div>
  </nav>
);


export default Nav;
