import { useState, useEffect } from 'react';

import { ShortCourse } from '../types';

const useCourseOptions = () => {
  const [options, setOptions] = useState([]);
  const [courses, setCourses] = useState<ShortCourse[]>([])

  useEffect(() => {
    fetch('/api/short-courses')
      .then(res => res.json())
      .then((data) => {
        setOptions(data.map((course: ShortCourse) => {
          return {
            value: course.id.toString(),
            label: course.code + ': ' + course.title
          }
        }));
        setCourses(data);
      })
  }, [])

  return {options, courses};
}

export default useCourseOptions;
