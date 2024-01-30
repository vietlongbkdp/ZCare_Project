import { useEffect } from 'react';
import axios from 'axios';

const ReminderTimer = () => {
    useEffect(() => {
        const interval = setInterval(() => {
            axios.post('http://localhost:8080/api/booking/send')
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

    return null;
};

export default ReminderTimer;