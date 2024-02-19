import React, { useState, useEffect } from 'react';

function ThePresentTime() {
    const [currentTime, setCurrentTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);
    return (
        <div>
            <h1>Giờ hiện tại:</h1>
            <p>{currentTime.toLocaleTimeString()}</p>
        </div>
    );
}

export default ThePresentTime;