import { useLocation } from "react-router-dom";
import { useState } from 'react';


export const EditForm = () => {
  const { state: course } = useLocation();
  return (
    <form>
      <input type="hidden" name="id" />
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Course title</label>
        <input className="form-control" id="title"  />
      </div>
      <div className="mb-3">
        <label htmlFor="meets" className="form-label">Meeting time</label>
        <input className="form-control" id="meets" />
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
};

export default EditForm;


export const useForm = (validate, submit) => {
  const [errors, setErrors] = useState(null);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const entries = Array.from(new FormData(form).entries());
    const errors = entries.map(([key, val]) => [key, validate(key, val)]);
    errors.forEach(([key, val]) => { form[key].setCustomValidity(val) });

    if (errors.some(([key, val]) => val !== '')) {
      setErrors(Object.fromEntries(errors));
    } else {
      setErrors(null);
      submit(Object.fromEntries(entries));
    }
  }

  return [errors, handleSubmit];
}
