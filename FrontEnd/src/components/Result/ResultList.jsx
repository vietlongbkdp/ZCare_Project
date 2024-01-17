import React, {useEffect, useState} from 'react';
import axios from "axios";
import {toast} from "react-toastify";

function ResultList() {
    const [resultList,setResultList]=useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/result")
            .then(response => {
                setResultList(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);
    return (
        <div>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">File</th>
                    <th scope="col">FileNAme</th>
                </tr>
                </thead>
                <tbody>
                {resultList.map((result) => (
                    <tr key={result.id}>
                        <th scope="row">{result.id}</th>
                        <td>
                            <a href={`http://localhost:8080/api/result/${result.id}`} target="_blank"
                               rel="noopener noreferrer">
                               Download
                            </a>
                        </td>
                        <td>{result.fileName}</td>
                    </tr>
                ))}

                </tbody>
            </table>
        </div>
    );
}

export default ResultList;