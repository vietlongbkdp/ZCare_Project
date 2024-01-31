import React from 'react';
import { CircularProgress } from '@mui/material';
import './Loading.css';

function Loading() {
    return (
        <div className="loading-overlay">
            <div className="loading-spinner">
                <CircularProgress/>
            </div>
        </div>
    );
}

export default Loading;