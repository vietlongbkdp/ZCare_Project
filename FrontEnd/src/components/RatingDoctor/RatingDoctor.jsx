import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import {useContext, useState} from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {toast} from "react-toastify";
import Cookies from "js-cookie";
import {ApiContext} from "../ApiContext/ApiProvider";

function RatingDoctor({doctorId,setRatingSubmitted,ratingSubmitted}) {
    const [ratingValue, setRatingValue] = useState(0);
    const [commentValue, setCommentValue] = useState('');
    const [error, setError] = useState('');
    const userId = Cookies.get('userId');
    const { API } = useContext(ApiContext)
    const handleCommentChange = (event) => {
        setCommentValue(event.target.value);
    };

    const handleClick = (value) => {
        setRatingValue(value);
    };

    const saveRating = () => {
        const data = {
            star: ratingValue,
            comment: commentValue
        };
        console.log(data);

        axios.post(`${API}/api/rating/create/${doctorId}/${userId}`, data)
            .then(response => {
                console.log(response.data);
                setRatingValue(0);
                setCommentValue("");
                setRatingSubmitted(!ratingSubmitted);
                toast.success("Đánh giá thành công");
            })
            .catch(error => {
                if (error.response && error.response.status === 409) {
                    toast.error("Đã đánh giá, không được đánh giá lại");
                } else {
                    toast.error("Bạn cần phải khám bệnh trước khi đánh giá")
                }
                console.error('Error:', error);
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (ratingValue === 0 || commentValue.trim() === '') {
            setError("Vui lòng điền đầy đủ số sao và bình luận");
            return;
        }
        setError("");
        saveRating();
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box component="fieldset" borderColor="transparent">
                    <Rating
                        name="size-large"
                        value={ratingValue}
                        onClick={(event) => {
                            handleClick(event.target.value);
                        }}
                        size="large"
                    />
                </Box>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField
                        label="Comment"
                        multiline
                        rows={4}
                        variant="outlined"
                        style={{ width: "50%" }}
                        onChange={handleCommentChange}
                        value={commentValue}
                    />
                    {error && (
                        <Typography color="error" variant="caption">
                            {error}
                        </Typography>
                    )}
                    <div className={"mt-2"}>
                        <Button type={"submit"} variant="contained">Đánh giá</Button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default RatingDoctor;