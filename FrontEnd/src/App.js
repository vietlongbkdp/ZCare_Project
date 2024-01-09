import './App.css';
// import AdminCooperate from "./components/Cooperate/AdminCooperate";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MusculoskeletalInfo from "./components/Specialist/MusculoskeletalInfo";
import NerveInfo from "./components/Specialist/NerveInfo";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import DoctorInfo from "./components/DoctorInfo/DoctorInfo";
import DoctorInfoClinic from "./components/DoctorInfoClinic/DoctorInfoClinic";
// import DoctorInfo from "./components/DoctorInfo/DoctorInfo";
// import Cooperate from "./components/Cooperate/Cooperate";
// import Dashboard from "./Dashboard";
export default function App() {
    return (
        <>
            {/*<Dashboard/>*/}
            {/*<AdminCooperate/>*/}
            {/*<Cooperate/>*/}
            {/*<DoctorInfo/>*/}
            <Header/>
            <NerveInfo/>
            <DoctorInfoClinic/>
            <DoctorInfoClinic/>
            <Footer/>
            <ToastContainer icon={false} />
        </>
    )
}
