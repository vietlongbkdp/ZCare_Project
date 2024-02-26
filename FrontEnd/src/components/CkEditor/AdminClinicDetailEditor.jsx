import React, {useContext, useEffect, useState} from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import axios from 'axios';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Typography } from '@mui/material';
import './CkEditor.css'
import {ApiContext} from "../ApiContext/ApiProvider";

export default function ClinicAdminEditor({ register, setValue, getValues }) {
    console.log('vao ckeditor')
    const { API } = useContext(ApiContext)
    function handleFileUpload(loader) {
        return {
            upload: () => {
                return new Promise((resolve, reject) => {
                    const body = new FormData();
                    loader.file.then((file) => {
                        body.append('image', file);
                        axios.post(`${API}/api/avatar`, body, {
                            headers: {
                                "Content-Type": "multipart/form-data",
                            },
                        })
                            .then((response) => {
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
                <Typography sx={{ textAlign: 'left', mb: 2, fontWeight: 'bold' }} >Thông tin phòng khám:</Typography>
                <CKEditor
                    editor={ClassicEditor}
                    data=""
                    config={{
                        extraPlugins: [uploadPlugin]
                    }}
                    onReady={(editor) => {
                        console.log('ready ckeditor')
                        if (getValues("clinicInfo")) {
                            console.log('ready ckeditor 1')
                            editor.setData(getValues("clinicInfo"))
                        }
                    }}
                    onBlur={(event, editor) => {
                        const data = editor.getData();
                        setValue('clinicInfo', data)
                    }}
                />
            </div>
        </>
    )
}


