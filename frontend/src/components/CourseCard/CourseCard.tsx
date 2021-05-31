import { useState, useEffect } from 'react'
import { Course } from '../../types';

import './CourseCard.css'

type CourseCardProps = {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  const [description, setDescription] = useState<string>(course.description);
  const [expanded, setExpanded] = useState<boolean>(false);

  useEffect(() => {
    const descrList = description.split("");
    if (!expanded && descrList.length > 600) {
      let ind = 599;
      for (let i = 0; i < 600; i++) {
        if (descrList[i] === ".") {
          ind = i;
        }
      }
      setDescription((descrList.slice(0, ind+1).join("")) + "...");
    } else if (!expanded && descrList.length < 600) {
      console.log("running pt2")
      setExpanded(false);
    } else if (expanded) {
      setDescription(course.description);
    }
  }, [expanded])

  return (
    <div className="CourseCard">
      <h2 className="courseHeadline">{course.code}: {course.title}</h2>

      {!expanded 
        ? <p className="courseDescription">
            {description}<span onClick={() => setExpanded(true)}>more info</span>
          </p>
        : <p className="courseDescription">{description}</p>
      }
      
      <div className="tagContainer">
        {course.tags.map((tag, index) => (
          <p className="tag" key={index}>{tag}</p>
        ))} 
      </div>
    </div>
  );
}

export default CourseCard;