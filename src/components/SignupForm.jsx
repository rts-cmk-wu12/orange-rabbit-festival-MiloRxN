import InputComponent from "./inputs/InputComponent";
import { useRef, useState, useEffect } from "react";
import CalenderIcon from "../assets/svg/calender.svg";
import MapIcon from "../assets/svg/map.svg";
import ArrowIcon from "../assets/svg/Arrow.svg";
import TrashCan from "../assets/svg/trashcan.svg";
import confirmationIcon from "../assets/svg/confirmed.svg";
import "../sass/signup.scss";

function SignupForm({ buyHandler, display, showConfirmation, setShowConfirmation, setDisplay }) {
    const formElement = useRef(null);
    const [participants, setParticipants] = useState([]);
    const [showParticipants, setShowParticipants] = useState(false);

    useEffect(() => {
        const storedParticipants = JSON.parse(localStorage.getItem("participants")) || [];
        setParticipants(storedParticipants);
    }, []);

    const moreTickets = () => {
        localStorage.removeItem("participants");
        setParticipants([]);
        setShowParticipants(false);
        setShowConfirmation(false);
        setDisplay({ display: '' })
    };


    const submitHandler = (event) => {
        event.preventDefault();
        if (!formElement.current.checkValidity()) {
            return;
        }
        const data = new FormData(formElement.current);
        const dataObject = Object.fromEntries(data.entries());
        const newParticipant = { ...dataObject, id: Date.now() };

        const updatedParticipants = [...participants, newParticipant];
        setParticipants(updatedParticipants);
        localStorage.setItem("participants", JSON.stringify(updatedParticipants));
        setShowParticipants(true);
        formElement.current.reset();
    };

    const deleteParticipant = (id) => {
        const updatedParticipants = participants.filter((participant) => participant.id !== id);
        setParticipants(updatedParticipants);
        localStorage.setItem("participants", JSON.stringify(updatedParticipants));
    };

    return (
        <div className="signup-container">
            {showConfirmation ? (
                <div className="confirmation">
                    <img className="confirmation__icon" src={confirmationIcon} alt="confirmation icon" />
                    <p className="confirmation__smallHeading">confirmation</p>
                    <h1 className="confirmation__heading">Signup complete</h1>
                    <p className="confirmation__message">We look forward seeing you at the event</p>
                    <button onClick={moreTickets} className="confirmation__button">Order more tickets</button>
                </div>
            ) : (
                <>
                    <section className="signup" style={display}>
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

                        <form ref={formElement} className="signup-form" onSubmit={submitHandler} noValidate>
                            <InputComponent givenType="text" name="fullName" placeholder="Full name" className="signup-form__input" label="Your name" />
                            <InputComponent givenType="email" name="email" placeholder="Email" className="signup-form__input" label="Email Address" />
                            <InputComponent givenType="tel" name="phone" placeholder="Phone" className="signup-form__input" label="Phone number" />
                            <InputComponent givenType="text" name="date" placeholder="DD-MM-YYYY" className="signup-form__input" label="Your birthdate" />
                            <button type="submit" className="signup-form__button">
                                Add participant <span className="signup-form__icon">+</span>
                            </button>
                        </form>
                    </section>

                    {showParticipants && (
                        <section className="participants" style={display}>
                            <div className="participants__container">
                                <h2 className="participants__heading">your participants</h2>
                                {participants.length === 0 ? (<p className="participants__count">{participants.length} participant</p>)
                                    : (<p className="participants__count">{participants.length} participants</p>)}
                            </div>

                            <ul className="participants__list">
                                {participants.length === 0 ? (
                                    <p className="participants__list-message">No Participants added...</p>
                                ) : (
                                    <>
                                        {participants.map((participant) => (
                                            <li key={participant.id} className="participants__item">
                                                <strong className="participants__name"><span>{participant.fullName}</span></strong>
                                                <p className="participants__birthdate">Birthdate: <span>{participant.date}</span></p>
                                                <p className="participants__email">Email: <span>{participant.email}</span></p>
                                                <p className="participants__phone">Phone: <span>{participant.phone}</span></p>
                                                <img src={TrashCan} alt="Trashcan icon" className="participants__delete-button" onClick={() => deleteParticipant(participant.id)} />
                                            </li>
                                        ))}
                                    </>
                                )}
                            </ul>

                            <button onClick={buyHandler} type="button" className="participants__submit-button"><span>Submit</span> <img src={ArrowIcon} alt="Arrow Icon" /></button>
                        </section>
                    )}
                </>
            )}
        </div>
    );
}

export default SignupForm;