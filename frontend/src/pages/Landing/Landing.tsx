import { useEffect, useState } from 'react'

import Nav from '../../components/Nav/Nav';
import CourseCard from '../../components/CourseCard/CourseCard'
import { jsonToCourse } from '../../util/index';
import { Course } from '../../types';

import './Landing.css'

type LandingProps = {
  loginButton: JSX.Element;
  signUpButton: JSX.Element;
}

const Landing = ({ loginButton, signUpButton } : LandingProps) => {
  const [sampleCourse, setSampleCourse] = useState<Course>();
  
  useEffect(() => {
    fetch("/api/courses/random/")
      .then(res => res.json())
      .then(data => setSampleCourse(jsonToCourse(data)))
  }, [])

  return (
    <div className="Landing">
      <Nav authButton={loginButton}/>
      <h1 className="tagline">A better way to choose courses.</h1>
      {sampleCourse && 
        <CourseCard course={sampleCourse} />
      }
      {signUpButton}
    </div>
  );
}

export default Landing;
