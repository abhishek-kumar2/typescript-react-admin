import React, {SyntheticEvent, useEffect, useState} from 'react';
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import {Navigate, useParams} from "react-router-dom";
import ImageUpload from "../../components/ImageUpload";

const ProductEdit = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState(0);
    const [redirect, setRedirect] = useState(false);
    const {id} = useParams();

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get(`products/${id}`);
                setTitle(data.title);
                setDescription(data.description);
                setImage(data.image);
                setPrice(data.price);
            }
        )();

    }, []);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            await axios.put(`products/${id}`, {
                title,
                description,
                image,
                price
            });

            setRedirect(true);
        } catch (error: any) {
            console.log(`${error.response.status}: ${error.response.statusText}`);
        }
    };

    if(redirect) {
        return <Navigate to={'/products'} />
    }

    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title"
                           defaultValue={title}
                           onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description"
                              defaultValue={description}
                              onChange={e => setDescription(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Image</label>
                    <div className="input-group">
                        <input type="text" className="form-control" id="image"
                               value={image}
                               onChange={e => setImage(e.target.value)}
                        />
                        <ImageUpload uploaded={setImage}/>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="number" className="form-control" id="price"
                           value={price}
                           onChange={e => setPrice(parseInt(e.target.value))}
                    />
                </div>

                <button className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    );
};

export default ProductEdit;