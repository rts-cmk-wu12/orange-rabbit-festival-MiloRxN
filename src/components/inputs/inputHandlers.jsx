import { useEffect, useRef, useState } from "react";

export function useInputHandler() {
    const inputReference = useRef(null);
    const [error, setError] = useState('');
    const [inputClass, setInputClass] = useState('');
    const [messageClass, setMessageClass] = useState('');

    useEffect(() => {
        inputReference.current.setCustomValidity(error)
    }, [error])

    function inputHandler(event) {
        let value = inputReference.current.value;
        const name = inputReference.current.name;
        console.log(name);

        // Matching ValidationFeedback with givenType
        if (name === 'firstName' || name === 'lastName') {
            if (value.length < 2) {
                setError(`${name === 'firstName' ? 'First' : 'Last'} Name must be at least 2 characters long. Current length: ${value.length}`);
                setInputClass('error');
                setMessageClass('error');
            } else {
                setError('');
                setInputClass('correct');
                setMessageClass('correct');
            }
        } else if (name === 'fullName') {
            const nameRegex = /^[a-zA-Z]{2,} [a-zA-Z]{2,}$/;
            const minLength = 6;
            if (value.length < minLength) {
                setError(`Full Name must be at least ${minLength} characters long. Current length: ${value.length}`);
                setInputClass('error');
                setMessageClass('error');
            } else if (!nameRegex.test(value)) {
                setError('Full Name must contain at least a first and last name with at least two characters each.');
                setInputClass('error');
                setMessageClass('error');
            } else {
                setError('');
                setInputClass('correct');
                setMessageClass('correct');
            }
        } else if (name === 'email') {
            if (!value.includes('@')) {
                setError('Email must contain an "@" symbol.');
                setInputClass('error');
                setMessageClass('error');
            } else if (!value.includes('.')) {
                setError('Email must contain a "." symbol.');
                setInputClass('error');
                setMessageClass('error');
            } else {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    setError('Please enter a valid email address.');
                    setInputClass('error');
                    setMessageClass('error');
                } else {
                    setError('');
                    setInputClass('correct');
                    setMessageClass('correct');
                }
            }
        } else if (name === 'phone') {
            const phoneRegex = /^\+45\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}$/;
            if (!phoneRegex.test(value.replace(/\s+/g, ''))) {
                setError(`Phone Number ${value} is not valid. Please enter a valid phone number.`);
                setInputClass('error');
                setMessageClass('error');
            } else {
                setError('');
                setInputClass('correct');
                setMessageClass('correct');
            }
        } else if (name === 'date') {
            const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
            const [day, month, year] = value.split('-').map(Number);
            const inputDate = new Date(year, month - 1, day);
            const currentDate = new Date();
            const minDate = new Date(currentDate.getFullYear() - 16, currentDate.getMonth(), currentDate.getDate());

            if (!dateRegex.test(value)) {
                setError('Date must be in DD-MM-YYYY format.');
                setInputClass('error');
                setMessageClass('error');
            } else if (inputDate > currentDate) {
                setError('Birthdate cannot be in the future.');
                setInputClass('error');
                setMessageClass('error');
            } else if (inputDate > minDate) {
                setError('You must be at least 16 years old.');
                setInputClass('error');
                setMessageClass('error');
            } else {
                setError('');
                setInputClass('correct');
                setMessageClass('correct');
            }
        }
    }

    return { inputReference, inputHandler, error, inputClass, messageClass };
}