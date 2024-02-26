import DoctorComponent from "./DoctorComponent";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import Loading from "../Loading/Loading";
import {ApiContext} from "../ApiContext/ApiProvider";

function DoctorInfoClinic({specialityId,clinicId,doctorName}) {
    const [doctorInfo, setDoctorInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const { API } = useContext(ApiContext)
    useEffect(() => {
        const fetchDoctorInfo = async () => {
            try {
                const response = await axios.get(`${API}/api/doctor/search`, {
                    params: {
                        specialityId: specialityId,
                        clinicId:clinicId,
                        doctorName:doctorName
                    }
                });
                if (response.status === 200) {
                    setDoctorInfo(response.data);
                    setLoading(false)
                }
            } catch (error) {
                console.error('Error fetching doctor info:', error);
                setLoading(false)
            }
        };
        fetchDoctorInfo();
    }, []);

    return (
        <>
            {loading && <Loading/>}
            {doctorInfo.map((doctor, index) => (
                <DoctorComponent key={doctor.id} doctor={doctor} />
            ))}

        </>
    );
}

export default DoctorInfoClinic;