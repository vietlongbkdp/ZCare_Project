import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import axios from 'axios';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Box, Typography } from '@mui/material';
import './CkEditor.css'

// ClassicEditor.create(document.querySelector('#editor'), {
//     plugins: [AlignmentPlugin], 
//     toolbar: ['alignLeft', 'alignCenter', 'alignRight'],
// });

export default function ClinicEditor({ setValue, getValues }) {

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

    // const parsedContent = HTMLReactParser(dataInput, {
    //     replace: (domNode) => {
    //         if (domNode.name === 'img') {
    //             domNode.attribs.class = 'custom-image';
    //         }
    //         return undefined;
    //     },
    // });

    return (
        <>
            <div>
                <Typography sx={{ textAlign: 'left' }}  >Thông tin phòng khám:</Typography>
                <CKEditor
                    editor={ClassicEditor}
                    data=""
                    config={{
                        extraPlugins: [uploadPlugin]
                    }}
                    onReady={(editor) => {
                        if (getValues("clinicInfo")) {
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


