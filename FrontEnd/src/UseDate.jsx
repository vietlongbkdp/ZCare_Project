import {useEffect, useState} from 'react';

function UseDate() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [recentDates, setRecentDates] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        setCurrentDate(new Date()); // Cập nhật ngày hiện tại
        const getRecentDates = () => {
            const today = new Date();
            const recentDates = [];

            // Lấy 3 ngày gần nhất
            for (let i = 0; i < 3; i++) {
                const date = new Date(today);
                date.setDate(today.getDate() + i);
                recentDates.push(date);
            }

            setRecentDates(recentDates);
        };

        getRecentDates();
    }, []);

    const handleChange = (event) => {
        setSelectedDate(event.target.value);
    };

    useEffect(() => {
        if (selectedDate !== '') {
            const selected = new Date(selectedDate);
            setCurrentDate(selected);
        }
    }, [selectedDate]);

    return { currentDate, recentDates, selectedDate, handleChange };
}

export default UseDate;