import { useEffect, useState } from 'react'
import Nav from '../../components/Nav/Nav';
import CourseCard from '../../components/CourseCard/CourseCard'
import jsonToCourse from '../../util';
import { Course, NavDisplay } from '../../types';
import { useHistory } from 'react-router-dom';

import './Landing.css'

const Landing = () => {
  const history = useHistory();
  const [sampleCourse, setSampleCourse] = useState<Course>();

  useEffect(() => {
    fetch("/api/courses/random/")
      .then(res => res.json())
      .then(data => setSampleCourse(jsonToCourse(data)))
  }, [])

  return (
    <div className="Landing">
      <Nav navDisplay={NavDisplay.SIGN_IN}/>
      <h1 className="tagline">A better way to choose courses.</h1>
      
      {sampleCourse && 
        <CourseCard course={sampleCourse} />
      }
      <button 
        value="Get Started" 
        className="getStartedButton" 
        onClick={() => history.push('/signup')}>
          Get Started
        </button>
    </div>
  );
}

export default Landing;