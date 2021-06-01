import { NavDisplay } from '../../types'
import { useHistory, Link } from 'react-router-dom';

import './Nav.css'

type NavProps = {
  navDisplay: NavDisplay;
}

const Nav = ({ navDisplay }: NavProps) => {
  const history = useHistory();

  return (
    <nav>
      <Link to="/"><h1>AnyStudy</h1></Link>
      <div className="navDetails">
        {navDisplay === NavDisplay.SIGN_IN &&
          <button 
            value="Sign In" 
            className="signInButton"
            onClick={() => history.push('/signin')}>
              Sign In
            </button>
        }
      </div>
    </nav>
  );
}

export default Nav;