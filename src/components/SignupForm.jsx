import InputComponent from "./inputs/InputComponent";
import '../sass/signup.scss'
import { useRef } from "react";
function SignupForm() {
    const submitHandler = useRef(null);
    return (
        <>
            <form className="signup-form" ref={submitHandler}>
                <InputComponent givenType="text" name="fullName" placeholder="Full name" className='signup-form__input' />
                <InputComponent givenType="email" name="email" placeholder="Email" className='signup-form__input' />
                <InputComponent givenType="tel" name="phone" placeholder="Phone number" className='signup-form__input' />
                <InputComponent givenType="text" name="date" placeholder="Your birthday" className='signup-form__input' />
                <InputComponent givenType="submit" className="signup-form__button" />
            </form>
        </>
    );
}

export default SignupForm;