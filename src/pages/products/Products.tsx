import React, {useEffect, useState} from 'react';
import Wrapper from "../../components/Wrapper";
import {Link} from "react-router-dom";
import axios from 'axios';
import {Product} from "../../models/product";
import Paginator from "../../components/Paginator";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1)
    const [lastPage, setLastPage] = useState(0)
    const [total, setTotal] = useState(0);

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get(`products?page=${page}`);
                setProducts(data.data);
                setLastPage(data.meta.last_page);
                setTotal(data.meta.total);
            }
        )();
    }, [page]);

    const del = async (id: number) => {
        if(window.confirm('Are you sure you want to delete this record?')) {
            try {
                await axios.delete(`products/${id}`);
                setProducts(products.filter((p: Product) => p.id !== id));
            } catch (error: any) {
                console.log(`${error.response.status}: ${error.response.statusText}`);
            }
        }
    };

    return (
        <Wrapper>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <Link to={'/products/create'} className="btn btn-sm btn-outline-secondary">Add</Link>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {products.map((p: Product) => {
                        return (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td><img alt={p.title} src={p.image} width="70" /></td>
                                <td>{p.title}</td>
                                <td>{p.description}</td>
                                <td>$ {p.price}</td>
                                <td>
                                    <div className="btn-group">
                                        <Link to={`/products/${p.id}/edit`} role="button" className="btn btn-outline-info">Edit</Link>
                                        <button type="button" className="btn btn-outline-danger" onClick={() => del(p.id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
            <div className="float-end">Total records: {total}</div>
            <br/>
            <Paginator page={page} lastPage={lastPage} pageChanged={setPage}/>
        </Wrapper>
    );
};

export default Products;