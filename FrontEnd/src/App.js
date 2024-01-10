import Header from './components/Header/Header';
import MapRender from "./components/MapRender/MapRender";
import ClinicList from "./components/Clinic/ClinicList";
import Footer from './components/Footer/Footer';

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
