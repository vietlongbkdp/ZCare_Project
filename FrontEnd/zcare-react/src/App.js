import './App.css';
import Header from "./components/Header/Header";
// import DoctorInfoClinic from "./components/DoctorInfoClinic/DoctorInfoClinic";
import Footer from "./components/Footer/Footer";
import AdminCooperate from "./components/Cooperate/AdminCooperate";
// import MapRender from "./components/MapRender/MapRender";
// import Cooperate from "./components/Cooperate/Cooperate";

export default function App() {
    return (
        <>
            <Header/>
            {/*<DoctorInfoClinic/>*/}
            {/*<MapRender/>*/}
            {/*<Cooperate/>*/}
            <AdminCooperate/>
            <Footer/>
        </>
    )
}
