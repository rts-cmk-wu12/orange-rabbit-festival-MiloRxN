// import InputComponent from "./inputs/InputComponent";
// import { useRef } from "react";
// import CalenderIcon from "../assets/svg/calender.svg";
// import MapIcon from "../assets/svg/map.svg";
// import "../sass/signup.scss";

// function SignupForm() {
//     const formElement = useRef(null);

//     function submitHandler(event) {
//         event.preventDefault();

//         const data = new FormData(formElement.current);
//         const dataObject = Object.fromEntries(data.entries());

//         const uniqueKey = `${dataObject.email}-${Date.now()}`;
//         localStorage.setItem(uniqueKey, JSON.stringify(dataObject));

//         formElement.current.reset();


//     }


//     return (
//         <section className="signup">
//             <div className="signup__header">
//                 <p className="signup__header__subheading">SIGNUP FOR THE EVENT</p>
//                 <h1 className="signup__header__title">Orange Rabbit Festival 2023</h1>
//                 <div className="signup__header__details">
//                     <p>
//                         <img src={CalenderIcon} alt="Calender icon" className="signup__icon" /> 24 June 2025 – 1 July 2025
//                     </p>
//                     <p>
//                         <img src={MapIcon} alt="Map icon" className="signup__icon" /> Bunny Avenue 22, 2300, Rabbitkilde
//                     </p>
//                 </div>
//             </div>

//             <form ref={formElement} className="signup-form" onSubmit={submitHandler}>
//                 <InputComponent givenType="text" name="fullName" placeholder="Full name" className="signup-form__input" label="Your name" />
//                 <InputComponent givenType="email" name="email" placeholder="Email" className="signup-form__input" label="Email Address" />
//                 <InputComponent givenType="tel" name="phone" placeholder="Phone" className="signup-form__input" label="Phone number" />
//                 <InputComponent givenType="text" name="date" placeholder="DD-MM-YYYY" className="signup-form__input" label="Your birthdate" />
//                 <button type="submit" className="signup-form__button">
//                     Add participant <span className="signup-form__icon">+</span>
//                 </button>
//             </form>
//         </section>
//     );
// }

// export default SignupForm;

import InputComponent from "./inputs/InputComponent";
import { useRef, useState, useEffect } from "react";
import CalenderIcon from "../assets/svg/calender.svg";
import MapIcon from "../assets/svg/map.svg";
import ArrowIcon from "../assets/svg/Arrow.svg";
import "../sass/signup.scss";

function SignupForm() {
    const formElement = useRef(null);
    const [participants, setParticipants] = useState([]);

    // Load participants from localStorage on component mount
    useEffect(() => {
        const storedParticipants = JSON.parse(localStorage.getItem("participants")) || [];
        setParticipants(storedParticipants);
    }, []);

    const submitHandler = (event) => {
        event.preventDefault();

        const data = new FormData(formElement.current);
        const dataObject = Object.fromEntries(data.entries());
        const newParticipant = { ...dataObject, id: Date.now() };

        const updatedParticipants = [...participants, newParticipant];
        setParticipants(updatedParticipants);
        localStorage.setItem("participants", JSON.stringify(updatedParticipants));

        formElement.current.reset();
    };

    const deleteParticipant = (id) => {
        const updatedParticipants = participants.filter((participant) => participant.id !== id);
        setParticipants(updatedParticipants);
        localStorage.setItem("participants", JSON.stringify(updatedParticipants));
    };

    return (
        <div className="signup-container">
            <section className="signup">
                <div className="signup__header">
                    <p className="signup__header__subheading">SIGNUP FOR THE EVENT</p>
                    <h1 className="signup__header__title">Orange Rabbit Festival 2023</h1>
                    <div className="signup__header__details">
                        <p>
                            <img src={CalenderIcon} alt="Calender icon" className="signup__icon" /> 24 June 2025 – 1 July 2025
                        </p>
                        <p>
                            <img src={MapIcon} alt="Map icon" className="signup__icon" /> Bunny Avenue 22, 2300, Rabbitkilde
                        </p>
                    </div>
                </div>

                <form ref={formElement} className="signup-form" onSubmit={submitHandler}>
                    <InputComponent givenType="text" name="fullName" placeholder="Full name" className="signup-form__input" label="Your name" />
                    <InputComponent givenType="email" name="email" placeholder="Email" className="signup-form__input" label="Email Address" />
                    <InputComponent givenType="tel" name="phone" placeholder="Phone" className="signup-form__input" label="Phone number" />
                    <InputComponent givenType="text" name="date" placeholder="DD-MM-YYYY" className="signup-form__input" label="Your birthdate" />
                    <button type="submit" className="signup-form__button">
                        Add participant <span className="signup-form__icon">+</span>
                    </button>
                </form>
            </section>
            <div className="participants">
                <h2 className="participants__heading">Your Participants</h2>
                {participants.length === 0 ? (
                    <p className="participants__count">No participants added...</p>
                ) : (
                    <>
                        <p className="participants__count">
                            {participants.length} {participants.length === 1 ? "Participant" : "Participants"}
                        </p>
                        <ul className="participants__list">
                            {participants.map((participant) => (
                                <li key={participant.id}>
                                    <p>
                                        <strong>{participant.fullName}</strong>
                                        <br />
                                        Birthdate: {participant.date}
                                        <br />
                                        Email: {participant.email}
                                        <br />
                                        Phone: {participant.phone}
                                    </p>
                                    <button onClick={() => deleteParticipant(participant.id)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
                <button type="submit">Submit <img src={ArrowIcon} alt="Arrow Icon" /></button>
            </div>
        </div>
    );
}

export default SignupForm;
