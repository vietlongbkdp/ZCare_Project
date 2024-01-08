import './App.css';
import Header from "./components/Header/Header";
import DoctorInfoClinic from "./components/DoctorInfoClinic/DoctorInfoClinic";
import Footer from "./components/Footer/Footer";
import MapRender from "./components/MapRender/MapRender";
export default function App() {
    return (
        <>
            <Header/>
            <DoctorInfoClinic/>
            <MapRender/>
            <Footer/>
        </>
    )
}