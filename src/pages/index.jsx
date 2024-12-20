import SignupForm from '../components/SignupForm';
import Image from '../assets/image.png';
import { useState } from 'react';

function Index() {
    const [display, setDisplay] = useState({ display: '' });
    const [showConfirmation, setShowConfirmation] = useState(false);

    const buyHandler = () => {
        setDisplay({ display: 'none' });
        setShowConfirmation(true);
    };

    return (
        <>
            <div className='contentContainer'>
                <img style={display} className="image" src={Image} alt="Image Of Orange Rabbit Festival 2023" />
                <SignupForm buyHandler={buyHandler} display={display} setDisplay={setDisplay} showConfirmation={showConfirmation} setShowConfirmation={setShowConfirmation} />
            </div>
        </>
    );
}

export default Index;