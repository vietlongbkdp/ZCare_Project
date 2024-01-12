import 'react-toastify/dist/ReactToastify.css';
import User from "./components/Doctor/TableDoctor"
import Pagerbase from "./components/Dashboard/Paperbase"
import DoctorInfor from "./components/Cooperate/AdminCooperate"
import {Route, Routes} from "react-router-dom";
import AddDoctor from "./components/ClinicAdmin/AddModal"
import ClinicAdmin from "./components/ClinicAdmin/ClinicAdmin"
import AddClinic from "./components/ClinicAdmin/AddModal"
export default function App() {
    return (
        <ClinicAdmin/>
        // <Routes>
        //     <Route path={"admin"} element={<Pagerbase/>}>
        //         <Route path={"user"} element={<User/>}></Route>
        //         <Route path={"doctorInfor"} element={<DoctorInfor/>}></Route>
        //         <Route path={"clinic"} element={<ClinicAdmin/>}>
        //
        //         </Route>
        //
        //     </Route>
        //     <Route path={"cooperate"} element={<Pagerbase/>}>
        //         <Route path={"doctorInfor"} element={<DoctorInfor/>}></Route>
        //     </Route>
        //     <Route path={"user"} element={<Pagerbase/>}>
        //
        //         <Route path={"doctorInfor"} element={<DoctorInfor/>}></Route>
        //     </Route>
        // </Routes>

        // <Routes>
        //     <Route path="admin" element={<Pagerbase />}>
        //         <Route path="user" element={<User />} />
        //         <Route path="doctorInfor" element={<DoctorInfor />}>
        //             <Route path="add" element={<AddDoctor />} />
        //             <Route path="edit" element={<AddDoctor />} />
        //
        //         </Route>
        //     </Route>
        //     <Route path="cooperate" element={<Pagerbase />}>
        //         <Route path="doctorInfor" element={<DoctorInfor />} />
        //     </Route>
        //     <Route path="user" element={<Pagerbase />}>
        //         <Route path="doctorInfor" element={<DoctorInfor />} />
        //     </Route>
        // </Routes>
    )
}
