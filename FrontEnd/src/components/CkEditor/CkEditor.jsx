import React, {useContext, useState} from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import HTMLReactParser from 'html-react-parser';
import axios from 'axios';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ApiContext} from "../ApiContext/ApiProvider";
export default function CkEditor({ setEditorContent }) {
    const [dataInput, setDataInput] = useState('')
    const { API } = useContext(ApiContext)
    function handleFileUpload(loader) {
        return {
            upload: () => {
                return new Promise((resolve, reject) => {
                    const body = new FormData();
                    loader.file.then((file) => {
                        body.append('image', file);
                        axios.post(`${API}/api/product-images`, body, {
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
    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setDataInput(data);
        setEditorContent(data);
    };

    return (
        <>
            <div className="container">
                <label htmlFor="">Content:</label>
                <div>
                    <CKEditor
                        editor={ClassicEditor}
                        data=""
                        config={{
                            extraPlugins: [uploadPlugin]
                        }}
                        onReady={(editor) => {
                        }}
                        onBlur={handleEditorChange}
                    />
                </div>
            </div>
        </>
    )
}