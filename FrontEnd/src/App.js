import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import App1 from "./components/Dashboard/AdminNav"

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
