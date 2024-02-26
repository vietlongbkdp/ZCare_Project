import {useContext, useEffect} from 'react';
import axios from 'axios';
import {ApiContext} from "../ApiContext/ApiProvider";

const ReminderTimer = () => {
    const { API } = useContext(ApiContext)
    useEffect(() => {
        const interval = setInterval(() => {
            axios.post(`${API}/api/booking/send`)
                .then(res => {
                    console.log('Reminder emails sent successfully.');
                })
                .catch(error => {
                    console.log('Error occurred while sending reminder emails.');
                });
        }, 5 * 60 * 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            axios.post(`${API}/api/booking/setSchedule`)
                .then(res => {
                    console.log('cập nhâp trạng thái thành công');
                })
                .catch(error => {
                    console.log('cập nhâp trạng thái thất bại');
                });
        },  5 * 60 * 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return null;
};

export default ReminderTimer;