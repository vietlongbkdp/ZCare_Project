import 'react-toastify/dist/ReactToastify.css';
import User from "./components/Doctor/TableDoctor"
import Pagerbase from "./components/Dashboard/Paperbase"
import DoctorInfor from "./components/Cooperate/AdminCooperate"
import {Route, Routes} from "react-router-dom";
export default function App() {
    return (
        <Routes>
            <Route path={"admin"} element={<Pagerbase/>}>
                <Route path={"user"} element={<User/>}></Route>
                <Route path={"doctorInfor"} element={<DoctorInfor/>}></Route>
            </Route>
            <Route path={"cooperate"} element={<Pagerbase/>}>
                {/*<Route path={"user"} element={<User/>}></Route>*/}
                <Route path={"doctorInfor"} element={<DoctorInfor/>}></Route>
            </Route>
            <Route path={"user"} element={<Pagerbase/>}>
                {/*<Route path={"user"} element={<User/>}></Route>*/}
                <Route path={"doctorInfor"} element={<DoctorInfor/>}></Route>
            </Route>
        </Routes>
    )
}
