import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import {toast} from "react-toastify";

// function MyModal({ show, handleClose }) {
//     const [doctor, setDoctor] = useState({
//         id: 0,
//         doctorName: '',
//         position: '',
//
//         email: '',
//         phone: '',
//         doctorInfor: '',
//
//     })
//     const postData = () => {
//         fetch('http://localhost:8080/api/doctor', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(doctor)
//         })
//             .then(response => response.json())
//             .then(data => {
//                 console.log(data); // Xử lý phản hồi từ server
//                 handleClose(); // Đóng modal sau khi hoàn thành yêu cầu
//             })
//             .catch(error => {
//                 console.error(error);
//             });
//     };
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setDoctor(prevDoctor => ({
//             ...prevDoctor,
//             [name]: value
//         }));
//     };
//
//
//     return (
//         <>
//             {/*<Button variant="primary" onClick={handleShow}>*/}
//             {/*    Open Modal*/}
//             {/*</Button>*/}
//
//             <Modal show={show} onHide={handleClose}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>Add Employee</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <form>
//                         {/* Nội dung form */}
//                         <div className="mb-3">
//                             <label htmlFor="doctorName" className="form-label">Date of Birth</label>
//                             <input type="text" className="form-control" id="doctorName" name="doctorName"
//                                    value={doctor.doctorName}
//                                    onChange={handleInputChange}/>
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="position" className="form-label">Date of Birth</label>
//                             <input type="text" className="form-control" id="position" name="position"
//                                    value={doctor.position}
//                                    onChange={handleInputChange}/>
//                         </div>
//
//                         <div className="mb-3">
//                             <label htmlFor="email" className="form-label">Email</label>
//                             <input type="email" className="form-control" id="email" name="email" value={doctor.email}
//                                    onChange={handleInputChange}/>
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="phone" className="form-label">Phone</label>
//                             <input type="text" className="form-control" id="phone" name="phone" value={doctor.phone}
//                                    onChange={handleInputChange}/>
//                         </div>
//                         <div className="mb-3">
//                             <label htmlFor="doctorInfo" className="form-label">Doctor Information</label>
//                             <textarea className="form-control" id="doctorInfo" name="doctorInfo"
//                                       value={doctor.doctorInfor} onChange={handleInputChange}/>
//                         </div>
//
//                     </form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>
//                         Close
//                     </Button>
//                     <Button variant="primary" onClick={postData}>
//                         Save Changes
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     );
// }
//
// export default MyModal;

// ...

function MyModal({ show, handleClose, isEditMode, editedDoctor, update, setUpdate }) {


    const [doctor, setDoctor] = useState({
        id: 0,
        doctorName: "",
        position: "",
        email: "",
        phone: "",
        doctorInfor: "",
        // clinic: "",
        // speciality:""
    });


    useEffect(() => {
        if (editedDoctor) {
            setDoctor(editedDoctor);
        } else {
            setDoctor({
                id: 0,
                doctorName: "",
                position: "",
                email: "",
                phone: "",
                doctorInfor: "",
                // clinic: "",
                // speciality:""
            });
        }
    }, [editedDoctor]);
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setDoctor(prevDoctor => ({
            ...prevDoctor,
            [name]: value
        }));
    };

    const resetModal = () => {
        setDoctor({
            id: 0,
            doctorName: "",
            position: "",
            dob: "",
            email: "",
            phone: "",
            doctorInfor: "",
            // clinic: "",
            // speciality:""
        });
        handleClose();
    };


    // const postData = () => {
    //     const url = isEditMode ? `http://localhost:8080/api/doctor/${doctor.id}` : 'http://localhost:8080/api/doctor';
    //
    //     const method = isEditMode ? 'PATCH' : 'POST';
    //
    //     fetch(url, {
    //         method: method,
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(doctor)
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data); // Xử lý phản hồi từ server
    //             handleClose(); // Đóng modal sau khi hoàn thành yêu cầu
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // };

    // const postData = () => {
    //     const url = isEditMode ? `http://localhost:8080/api/doctor/${doctor.id}` : 'http://localhost:8080/api/doctor';
    //
    //     const method = isEditMode ? 'PATCH' : 'POST';
    //
    //     fetch(url, {
    //         method: method,
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(doctor)
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data); // Xử lý phản hồi từ server
    //             handleClose(); // Đóng modal sau khi hoàn thành yêu cầu
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // };
    const postData = () => {
        if (isEditMode) {
            patchData();
        } else {
            createData();
        }
    };

    const createData = () => {
        const url = 'http://localhost:8080/api/doctor';

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(doctor),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data); // Xử lý phản hồi từ server
                setUpdate(pre => !pre)
                toast.success("thành công")
                handleClose(); // Đóng modal sau khi hoàn thành yêu cầu
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const patchData = () => {
        const url = `http://localhost:8080/api/doctor/${doctor.id}`;

        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(doctor),
        })
            .then((response) => response.json())
            .then((data) => {
                setUpdate(pre => !pre)
                toast.success("thành công")
                console.log(data); // Xử lý phản hồi từ server
                handleClose(); // Đóng modal sau khi hoàn thành yêu cầu
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <>
            {/* ... */}

            {/*<Modal show={show} onHide={handleClose}>*/}
            <Modal show={show} onHide={resetModal}>
                <Modal.Header closeButton>
                    {/* ... */}
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <form>
                            {/* Nội dung form */}
                            <div className="mb-3">
                                <label htmlFor="doctorName" className="form-label">DOCTOR NAME</label>
                                <input type="text" className="form-control" id="doctorName" name="doctorName"
                                       value={doctor.doctorName}
                                       onChange={handleInputChange}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="position" className="form-label">POSITION</label>
                                <input type="text" className="form-control" id="position" name="position"
                                       value={doctor.position}
                                       onChange={handleInputChange}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="dob" className="form-label">POSITION</label>
                                <input type="date" className="form-control" id="dob" name="dob"
                                       value={doctor.dob}
                                       onChange={handleInputChange}/>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" name="email"
                                       value={doctor.email}
                                       onChange={handleInputChange}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">Phone</label>
                                <input type="text" className="form-control" id="phone" name="phone" value={doctor.phone}
                                       onChange={handleInputChange}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="doctorInfor" className="form-label">INFOR</label>
                                <input type="text" className="form-control" id="doctorInfor" name="doctorInfor"
                                       value={doctor.doctorInfor}
                                       onChange={handleInputChange}/>
                            </div>



                        </form>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    {/*<Button variant="secondary" onClick={handleClose}>*/}
                    {/*    Close*/}
                    {/*</Button>*/}
                    <Button variant="secondary" onClick={resetModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={postData}>
                        {isEditMode ? 'Update' : 'Save Changes'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
    export default MyModal;
