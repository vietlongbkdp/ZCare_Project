import './App.css';
// import AdminCooperate from "./components/Cooperate/AdminCooperate";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MusculoskeletalInfo from "./components/Specialist/MusculoskeletalInfo";
import NerveInfo from "./components/Specialist/NerveInfo";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import MapRender from "./components/MapRender/MapRender";
// import App1 from "./components/Dashboard/AdminNav"
import DoctorInfoClinic from "./components/DoctorInfoClinic/DoctorInfoClinic";
import Clinic from "./components/Clinic/Clinic";
import ClinicList from "./components/Clinic/ClinicList";
export default function App() {

    return (
        <>
            {/*<App1/>*/}
            <Header/>
                <ClinicList/>
            {/*<MapRender/>*/}
            <Footer/>

        </>
    )
}
