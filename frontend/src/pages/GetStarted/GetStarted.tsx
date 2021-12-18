
import UserForm from '../../components/UserForm/UserForm'; 

const GetStarted = () => {

  return (
    <div className="GetStarted">
      <h3 className="formDirections">Please enter some basic information about yourself so we can suggest the best courses...</h3>
      <UserForm /> 
    </div>
  );
}

export default GetStarted;
