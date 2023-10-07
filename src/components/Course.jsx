import React from 'react'
import { hasConflict,getCourseTerm,getCourseNumber,toggle } from '../utilities/times';
import { useNavigate } from 'react-router-dom';



export const Course = ({ course, selected, setSelected }) => {
  const isSelected = selected.includes(course);
  const isDisabled = !isSelected && hasConflict(course, selected);
  const navigate = useNavigate();
  const style = {
    backgroundColor: isDisabled? 'lightgrey' : isSelected ? 'lightgreen' : 'white'
  };
  return (
    <div className="card m-1 p-2" 
      style={style}
      onClick={isDisabled ? null : () =>  setSelected(toggle(course, selected))}
      onDoubleClick={() => navigate('/edit', { state: course })}>
      <div className="card-body">
        <div className="card-title">{ getCourseTerm(course) } CS { getCourseNumber(course) }</div>
        <div className="card-text">{ course.title }</div>
        <div className="card-text">{ course.meets }</div>
      </div>
    </div>
  );
};