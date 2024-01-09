import React, {useEffect, useState} from 'react';
import axios from "axios";

function AdminCooperate() {
    const [cooperateList, setCooperateList] = useState([]);

    useEffect(() => {
        const getAllCooperate = async() =>{
            try {
                const response = await axios.get('http://localhost:8080/api/cooperate');
                setCooperateList(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        getAllCooperate();
    }, []);

    const handleClick=(id)=>{
        console.log(id)
    }

    return (
        <>
            <div className={"container d-flex flex-column col-9 mt-4 mb-5 pb-5"}>
               <h4 className={"d-flex justify-content-center"}>Danh sách hợp tác cùng ZCare</h4>
                <table className="table table-striped table-hover ">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Số Điện thoại</th>
                        <th scope="col">Email</th>
                        <th scope="col">Tên phòng khám</th>
                        <th scope="col">Địa chỉ</th>
                        <th scope="col">Nội dung</th>
                        <th scope="col">Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cooperateList.length > 0 ? (
                        cooperateList.map((cooperate) => (
                            <tr key={cooperate.id}>
                                <th scope="row">{cooperate.id}</th>
                                <td>{cooperate.fullName}</td>
                                <td>{cooperate.phone}</td>
                                <td>{cooperate.email}</td>
                                <td>{cooperate.clinicName}</td>
                                <td>{cooperate.address}</td>
                                <td>{cooperate.content}</td>
                                <td>
                                    <button className={"btn btn-primary"} onClick={()=>{handleClick(cooperate.id)}}>Xác nhận</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">No data available</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default AdminCooperate;