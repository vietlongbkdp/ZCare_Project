import './App.css';
// import AdminCooperate from "./components/Cooperate/AdminCooperate";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DoctorInfo from "./components/DoctorInfo/DoctorInfo";
// import Cooperate from "./components/Cooperate/Cooperate";
// import Dashboard from "./Dashboard";
export default function App() {
    return (
        <>
            {/*<Dashboard/>*/}
            {/*<AdminCooperate/>*/}
            {/*<Cooperate/>*/}
            <DoctorInfo/>
            <ToastContainer icon={false} />
        </>
    )
}
