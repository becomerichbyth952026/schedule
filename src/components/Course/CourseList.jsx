import { useState } from 'react';
import { getCourseTerm,terms,hasConflict,getCourseNumber,toggle } from '../../utilities/times';
import { Course } from '../Course';
import { TermSelector } from './Term.jsx';





export const CourseList = ({ courses }) => {
  const [term, setTerm] = useState('Fall');
  const [selected, setSelected] = useState([]);
  if (selected.some(course => course !== courses[course.id])) {
    setSelected([])
  };
  
  const termCourses = Object.values(courses).filter(course => term === getCourseTerm(course));
  console.log(term,'term')
  return (
    <>
      <TermSelector term={term} setTerm={setTerm} />
      <div className="course-list">
      { 
        termCourses.map(course =>
          <Course key={ course.id } course={ course }
            selected={selected} setSelected={ setSelected } 
          />) 
      }
      </div>
    </>
  );
};


