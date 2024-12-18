import { useRef, useState } from "react";
import './main.scss'

function InputComponent({ givenType = 'text', ...props }) {
  const inputReference = useRef(null);
  const [error, setError] = useState(null);

  function inputHandler(event) {
    const value = inputReference.current.value;
    const name = inputReference.current.name;
    console.log(name)

    // Matching ValidationFeedback with givenType
    if (givenType === 'text' && name === 'firstName') {
      if (value.length < 2) {
        setError('First Name is not valid!');
      } else {
        setError(null);
      }


    } else if (givenType === 'text' && name === 'lastName') {
      if (value.length < 2) {
        setError('Last Name is not valid!');
      } else {
        setError(null);
      }

    } else if (givenType === 'email') {
      if (!value.includes('@')) {
        setError('Invalid Email! ');
      } else {
        setError(null);
      }
    }


  }

  return (
    <label className="input-wrapper">
      <input ref={inputReference} onInput={inputHandler} type={givenType} {...props} />
      {error && <p className="signup-form__error">{error}</p>}
    </label>
  );
}

export default InputComponent;
