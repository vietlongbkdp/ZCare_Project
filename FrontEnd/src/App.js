import './App.css';
import Header from './components/Header/Header';
import DoctorInfoClinic from './components/DoctorInfoClinic/DoctorInfoClinic';

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
