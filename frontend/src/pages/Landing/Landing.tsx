import { useEffect, useState } from 'react'
import Nav from '../../components/Nav/Nav';
import CourseCard from '../../components/CourseCard/CourseCard'

import jsonToCourse from '../../util';
import { Course } from '../../types';

import './Landing.css'

const Landing = () => {
  const [sampleCourse, setSampleCourse] = useState<Course>();

  useEffect(() => {
    fetch("/api/courses/random/")
      .then(res => res.json())
      .then(data => setSampleCourse(jsonToCourse(data)))
  }, [])

  return (
    <div className="Landing">
      <Nav />
      <h1 className="tagline">A better way to choose courses.</h1>
      
      {sampleCourse && 
        <CourseCard course={sampleCourse} />
      }
      <button value="Get Started" className="getStartedButton">Get Started</button>
    </div>
  );
}

export default Landing;