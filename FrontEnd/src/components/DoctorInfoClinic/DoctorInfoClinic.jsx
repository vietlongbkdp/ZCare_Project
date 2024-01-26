import DoctorComponent from "./DoctorComponent";
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function DoctorInfoClinic({specialityId,clinicId,doctorName}) {
    const [doctorInfo, setDoctorInfo] = useState([]);

    useEffect(() => {
        const fetchDoctorInfo = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/doctor/search', {
                    params: {
                        specialityId: specialityId,
                        clinicId:clinicId,
                        doctorName:doctorName
                    }
                });
                if (response.status === 200) {
                    setDoctorInfo(response.data);
                }
            } catch (error) {
                console.error('Error fetching doctor info:', error);
            }
        };
        fetchDoctorInfo();
    }, []);

    return (
        <>
            {doctorInfo.map((doctor, index) => (
                <DoctorComponent key={doctor.id} doctor={doctor} />
            ))}

        </>
    );
}

export default DoctorInfoClinic;