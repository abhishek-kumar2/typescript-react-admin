import axios from 'axios';
import React from 'react';

const ImageUpload = (props: { uploaded: (url: string) => void }) => {

    const upload = async (files: FileList | null) => {
        if(files === null) return;

        const formData = new FormData();
        formData.append('image', files[0]);

        try {
            const {data} = await axios.post('upload', formData);
            props.uploaded(data.url);
        } catch (error: any) {
            console.log(`${error.response.status}: ${error.response.statusText}`);
        }
    };

    return (
        <label className="btn btn-primary">
            Upload <input type="file" hidden onChange={e => upload(e.target.files)}/>
        </label>
    );
};

export default ImageUpload;