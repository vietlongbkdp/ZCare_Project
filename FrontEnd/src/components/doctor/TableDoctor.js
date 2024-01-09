import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// import {useEffect, useState} from "react";
// import MyModal from "./ModalAdd";
// import { Button } from 'react-bootstrap';


// function GetAllDoctor (){
//     const [showModal, setShowModal] = useState(false);
//     const [selectedDoctor, setSelectedDoctor] = useState(null);
//
//     const handleShowModal = () => {
//         setShowModal(true);
//     };
//
//     const handleCloseModal = () => {
//         setShowModal(false);
//     };
//     const handleEditDoctor = (doctor) => {
//         setSelectedDoctor(doctor);
//         setShowModal(true);
//     };
//
//     const [doctorList, setDoctorList] = useState([]);
//     useEffect(() => {
//         fetch('http://localhost:8080/api/doctor')
//             .then(response => response.json())
//             .then(data => {
//                 setDoctorList(data)
//             })
//     },[])
//   return (
//       <>
//           <div>
//               <Button variant="primary" onClick={handleShowModal}>
//                   Open Modal
//               </Button>
//
//               {/* Hiển thị modal */}
//               <MyModal show={showModal} handleClose={handleCloseModal} />
//
//               <table className="table table-striped">
//                   <thead>
//                   <tr>
//                       <th scope="col">#</th>
//                       <th scope="col">DOCTOR NAME</th>
//                       <th scope="col">POSITION</th>
//                       <th scope="col">DOB</th>
//                       <th scope="col">EMAIL</th>
//                       <th scope="col">PHONE</th>
//                       <th scope="col">DOCTOR-INFOR</th>
//                       <th scope="col">CREATE AT</th>
//                       <th scope="col">CLINIC</th>
//                       <th scope="col">AVATAR</th>
//                       <th scope="col">SPECIALITY</th>
//                       <th scope="col">ACTION</th>
//                   </tr>
//                   </thead>
//                   <tbody>
//                   {doctorList.map(obj => (
//                       <tr key={obj.id}>
//                           <th scope="row">{obj.id}</th>
//                           <td>{obj.doctorName}</td>
//                           <td>{obj.position}</td>
//                           <td>{obj.dob}</td>
//                           <td>{obj.email}</td>
//                           <td>{obj.phone}</td>
//                           <td>{obj.doctorInfor}</td>
//                           <td>{obj.createAT}</td>
//                           <td></td>
//                           <td>
//                               <img src={obj.avatarImg} style={{height: "20px"}} alt="Avatar"/>
//                           </td>
//                           <td>
//
//                           </td>
//                           <td>
//                               <button type="button" className="btn btn-primary" style={{marginRight: "5px"}}
//                                       onClick={() => handleEditDoctor(obj)}>
//                                   <i className="fa-solid fa-pen-to-square"></i></button>
//
//                                   <button type="button" className="btn btn-danger" style={{marginRight: "5px"}}
//
//                                   ><i
//                                       className="fa-solid fa-delete-left"></i></button>
//                           </td>
//                       </tr>
//                       ))
//
//                   }
//                   </tbody>
//               </table>
//           </div>
//       </>
// )
// }
//
// export default GetAllDoctor;

import { useEffect, useState } from "react";
import MyModal from "./ModalAdd";
import { Button } from 'react-bootstrap';
import Swal from "sweetalert2";
import "./style.css"

function GetAllDoctor() {
    const [showModal, setShowModal] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [editedDoctor, setEditedDoctor] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [update, setUpdate] = useState(true)

    const handleShowModal = () => {
        setSelectedDoctor(null); // Reset selectedDoctor khi mở modal
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleEditDoctor = (id) => {
        const doctor = doctorList.find(obj => obj.id === id);
        console.log(doctor)
        setEditedDoctor(doctor);
        setIsEditMode(true);
        setShowModal(true);
    };


    const [doctorList, setDoctorList] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8080/api/doctor')
            .then(response => response.json())
            .then(data => {
                setDoctorList(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [update]);

    const handDelete = (id) =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await fetch(`http://localhost:8080/api/doctor/${id}`, {
                        method: 'DELETE',
                    });
                 setUpdate(prevState => !prevState)
                 toast.success("thành công")
                } catch (error) {
                    toast.error("thất bại")
                }

                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }

        })
    }

        const columnStyle = {
            textTransform: 'uppercase',
            fontSize: '14px',
            color: 'white'
        };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <>
            <div >
                <Button variant="primary" onClick={handleShowModal}>
                    Open Modal
                </Button>

                {/* Hiển thị modal */}
                <MyModal
                    show={showModal}
                    handleClose={handleCloseModal}
                    isEditMode={isEditMode}
                    doctor={selectedDoctor}
                    editedDoctor={editedDoctor}
                    update={update}
                    setUpdate={setUpdate}

                />

                <table className="table table-striped main-doctor" style={{width: "1500px"}}>
                    <thead>
                    <tr style={{backgroundColor:"#11cdef"}}>
                        <th scope="col" style={columnStyle}>#</th>
                        <th scope="col" style={columnStyle}>NAME</th>
                        <th scope="col" style={columnStyle}>POSITION</th>
                        <th scope="col" style={columnStyle}>DOB</th>
                        <th scope="col" style={columnStyle}>EMAIL</th>
                        <th scope="col" style={columnStyle}>PHONE</th>
                        <th scope="col" style={columnStyle}>DOCTOR-INFOR</th>
                        <th scope="col" style={columnStyle}>CREATE AT</th>
                        <th scope="col" style={columnStyle}>CLINIC</th>
                        <th scope="col" style={columnStyle}>AVATAR</th>
                        <th scope="col" style={columnStyle}>SPECIALITY</th>
                        <th scope="col" style={columnStyle}>ACTION</th>

                    </tr>
                    </thead>
                    <tbody>
                    {doctorList.map(obj => (
                        <tr key={obj.id}>
                            <th scope="row">{obj.id}</th>
                            <td>{obj.doctorName}</td>
                            <td>{obj.position.name}</td>
                            <td>{formatDate(obj.dob)}</td>
                            <td>{obj.email}</td>
                            <td>{obj.phone}</td>
                            <td>{obj.doctorInfor}</td>
                            <td>{obj.createAT}</td>

                            <td></td>
                            {/*<td>{obj.clinic.clinicName}</td>*/}
                            <td>
                                <img src={obj.avatarImg} style={{height: "20px"}} alt="Avatar"/>
                            </td>
                            <td>
                                {/*{obj.speciality.specialtyName}*/}
                            </td>
                            <td>
                                <button type="button" className="btn btn-primary" style={{marginRight: "5px"}}
                                        onClick={() => handleEditDoctor(obj.id)}>
                                    <i className="fa-solid fa-pen-to-square"></i></button>

                                <button type="button" className="btn btn-danger" style={{marginRight: "5px"}}
                                        onClick={() => handDelete(obj.id)}
                                ><i
                                    className="fa-solid fa-delete-left"></i></button>
                            </td>
                        </tr>
                    ))

                    }
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default GetAllDoctor;