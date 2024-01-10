import './App.css';
import Header from './components/Header/Header';
import DoctorInfoClinic from './components/DoctorInfoClinic/DoctorInfoClinic';
import MapRender from "./components/MapRender/MapRender";
import DoctorInfoClinic from "./components/DoctorInfoClinic/DoctorInfoClinic";
import ClinicList from "./components/Clinic/ClinicList";
export default function App() {

    return (
        <>
            <Header />
            <ClinicList />
            <MapRender/>
            <Footer />
        </>
    )
}
