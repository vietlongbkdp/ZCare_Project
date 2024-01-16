import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import HTMLReactParser from 'html-react-parser';
import axios from 'axios';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Container } from '@mui/material';

export default function ClinicEditor() {
    const [dataInput, setDataInput] = useState('')

    function handleFileUpload(loader) {
        return {
            upload: () => {
                return new Promise((resolve, reject) => {
                    const body = new FormData();
                    loader.file.then((file) => {
                        body.append('image', file);
                        axios.post('http://localhost:8080/api/avatar', body, {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        })
                            .then((response) => {
                                console.log('my res', response.data.fileUrl);
                                resolve({ default: `${response.data.fileUrl}` })
                            })
                            .catch((error) => { 
                                console.log(error);
                            });
                    })
                })
            }
        }
    }

    function uploadPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return handleFileUpload(loader);
        };
    }

    return (
        <>
            <Container>
                <label htmlFor="">Thông tin phòng khám:</label>
                <div>
                    <CKEditor
                        editor={ClassicEditor}
                        data=""
                        config={{
                            extraPlugins: [uploadPlugin]
                        }}
                        onReady={(editor) => {
                        }}
                        onBlur={(event, editor) => {
                            const data = editor.getData();
                            setDataInput(data)
                        }}
                    />
                </div>

                <div className="container bg-warning w-100 mt-4">
                    <p>This is content</p>
                    {HTMLReactParser(dataInput)}
                </div>
            </Container>
        </>
    )
}


