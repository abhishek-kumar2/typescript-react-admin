import React, {useEffect, useState} from 'react';
import Wrapper from "../../components/Wrapper";
import {Link} from "react-router-dom";
import axios from 'axios';
import {Order} from "../../models/order";
import Paginator from "../../components/Paginator";
import {OrderItem} from "../../models/order-item";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        (
            async () => {
                try {
                    const {data} = await axios.get(`orders?page=${page}`);
                    setOrders(data.data)
                    setTotal(data.meta.total);
                    setLastPage(data.meta.last_page);
                } catch (error: any) {
                    console.log(`${error.response.status}: ${error.response.statusText}`);
                }
            }
        )();
    }, [page]);

    return (
        <Wrapper>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <Link to={'/orders'} className="btn btn-sm btn-outline-secondary">Add</Link>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Total</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                    {orders.map((o: Order) => {
                        return (
                            <>
                                <tr key={o.id}>
                                    <td>{o.id}</td>
                                    <td>{o.name}</td>
                                    <td>{o.email}</td>
                                    <td>{o.total}</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td colSpan={5}>
                                        <div>
                                            <table className="table table-sm">
                                                <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Product Title</th>
                                                    <th>Quantity</th>
                                                    <th>Price</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {o.order_items.map((i: OrderItem) => {
                                                    return (
                                                        <tr key={i.id}>
                                                            <td>{i.id}</td>
                                                            <td>{i.product_title}</td>
                                                            <td>{i.quantity}</td>
                                                            <td>{i.price}</td>
                                                        </tr>
                                                    )
                                                })}
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>

                                </tr>
                            </>
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

export default Orders;