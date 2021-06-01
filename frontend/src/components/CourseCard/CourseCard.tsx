import ExpandableText from '../ExpandableText/ExpandableText'
import { Course } from '../../types';

import './CourseCard.css'

type CourseCardProps = {
  course: Course;
}

const descriptionStyle:React.CSSProperties = {
  margin: '0 0 0.5rem 0'
}

const CourseCard = ({ course }: CourseCardProps) => (
    <div className="CourseCard">
      <h2 className="courseHeadline">{course.code}: {course.title}</h2>
      <ExpandableText text={course.description} cutoff={600} style={descriptionStyle}/>
      <div className="tagContainer">
        {course.tags.map((tag, index) => (
          <p className="tag" key={index}>{tag}</p>
        ))} 
      </div>
    </div>
);

export default CourseCard;