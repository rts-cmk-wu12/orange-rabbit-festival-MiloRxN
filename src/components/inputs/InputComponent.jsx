import { useInputHandler } from "./inputHandlers";
import './main.scss';

function InputComponent({ givenType = 'text', ...props }) {
  const { inputReference, inputHandler, error, inputClass, messageClass } = useInputHandler();

  return (
    <div className="input-wrapper">
      {props.label ? (<label><span>{props.label}</span></label>) : (<p className="signup-form__error">No label found</p>)}
      <input ref={inputReference} onInput={inputHandler} type={givenType} {...props} className={inputClass} required />
      {error && <p className={`signup-form__error ${messageClass}`}>{error}</p>}
    </div>
  );
}

export default InputComponent;