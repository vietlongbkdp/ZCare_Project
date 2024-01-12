import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import {useState} from "react";
import {TextField} from "@mui/material";
import axios from "axios";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function RatingDoctor() {
    const [ratingValue, setRatingValue] = useState(0);
    const [commentValue, setCommentValue] = useState('');

    const handleCommentChange = (event) => {
        setCommentValue(event.target.value);
    };
    const handleClick = (value) => {
        setRatingValue(value);
    };
    const saveRating = () => {
        const data = {
            star:  ratingValue,
            comment: commentValue
        };
        console.log(data)
        axios.post('http://localhost:8080/api/rating/create', data)
            .then(response => {
                console.log(response.data);
                setRatingValue(0);
                setCommentValue("");
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
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
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <TextField
                        label="Comment"
                        multiline
                        rows={4}
                        variant="outlined"
                        style={{width:"50%"}}
                        onChange={handleCommentChange}
                        value={commentValue}
                    />
                    <div className={"mt-2"}>
                        <button  type="submit">Submit</button>
                    </div>

                </div>
            </form>
        </>
    );
}

export default RatingDoctor;
