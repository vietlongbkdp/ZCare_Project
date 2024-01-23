import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import axios from 'axios';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Typography } from '@mui/material';
import './CkEditor.css'

export default function DoctorEditor({ setValue, getValues }) {

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
            <div>
                <Typography sx={{ textAlign: 'left', mb: 2, fontWeight: 'bold' }} >Thông tin bác sĩ:</Typography>
                <CKEditor
                    editor={ClassicEditor}
                    data=""
                    config={{
                        extraPlugins: [uploadPlugin]
                    }}
                    onReady={(editor) => {
                        if (getValues("doctorInfo")) {
                            editor.setData(getValues("doctorInfo"))
                        }
                    }}
                    onBlur={(event, editor) => {
                        const data = editor.getData();
                        setValue('doctorInfo', data)
                    }}
                />
            </div>
        </>
    )
}

