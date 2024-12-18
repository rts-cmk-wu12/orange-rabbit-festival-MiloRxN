import InputComponent from "./inputs/InputComponent";
import { useRef } from "react";
import { MdOutlineCalendarToday, MdOutlineLocationOn } from "react-icons/md";
import "../sass/signup.scss";

function SignupForm() {
    const submitHandler = useRef(null);

    return (
        <section className="signup">
            <div className="signup__header">
                <p className="signup__subheading">SIGNUP FOR THE EVENT</p>
                <h1 className="signup__title">Orange Rabbit Festival 2023</h1>
                <div className="signup__details">
                    <p>
                        <MdOutlineCalendarToday className="signup__icon" /> 24 June 2025 – 1 July 2025
                    </p>
                    <p>
                        <MdOutlineLocationOn className="signup__icon" /> Bunny Avenue 22, 2300, Rabbitkilde
                    </p>
                </div>
            </div>

            <form className="signup-form" ref={submitHandler}>
                <InputComponent givenType="text" name="fullName" placeholder="Full name" className="signup-form__input" label="Your name" />
                <InputComponent givenType="email" name="email" placeholder="Email" className="signup-form__input" label="Email Address" />
                <InputComponent givenType="tel" name="phone" placeholder="Phone" className="signup-form__input" label="Phone number" />
                <InputComponent givenType="text" name="date" placeholder="DD-MM-YYYY" className="signup-form__input" label="Your birthdate" />
                <button type="button" className="signup-form__button">
                    Add participant <span className="signup-form__icon">+</span>
                </button>
            </form>
        </section>
    );
}

export default SignupForm;
