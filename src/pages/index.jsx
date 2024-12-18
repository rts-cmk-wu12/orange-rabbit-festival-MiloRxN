import SignupForm from '../components/SignupForm';
import Image from '../assets/image.png';
function Index() {
    return (
        <>
            <div className='contentContainer'>
                <img className="mediumImage" src={Image} alt="Image Of Orange Rabbit Festival 2023" />
                <SignupForm />
            </div>

        </>
    );
}

export default Index;