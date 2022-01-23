import React, {useEffect, useState} from 'react';
import Wrapper from "../../components/Wrapper";
import axios from 'axios';
import {User} from "../../models/user";
import {Link} from "react-router-dom";

const Users = () => {
    const [users, setUsers] = useState([new User()]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get(`users?page=${page}`);

                setUsers(data.data);
                setLastPage(data.meta.last_page);
                setTotal(data.meta.total);
            }
        )();
    }, [page]);

    const next = () => {
        if(page < lastPage) {
            setPage(page + 1);
        }
    };

    const previous = () => {
        if(page > 1) {
            setPage(page - 1);
        }
    };

    const del = async (id: number) => {
        if(window.confirm('Are you sure you want to delete this record?')) {
            try {
                await axios.delete(`users/${id}`);

                setUsers(users.filter((u: User) => u.id !== id));
            } catch (error: any) {
                console.log(`${error.response.status}: ${error.response.statusText}`);
            }
        }
    };

    return (
        <Wrapper>
            <div className="pt-3 pb-2 mb-3 border-bottom">
                <Link to={'/users/create'} className="btn btn-sm btn-outline-secondary">Add</Link>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user: User) => {
                        return (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role.name}</td>
                                <td>
                                    <Link to={'/user.id'} role="button" className="btn btn-outline-info me-2">Edit</Link>
                                    <button type="button" className="btn btn-outline-danger" onClick={() => del(user.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
            <div className="float-end">Total records: {total}</div>
            <br/>
            <nav>
                <ul className="pagination">
                    <li className="page-item">
                        <a className="page-link" onClick={previous}>Previous</a>
                    </li>
                    <li className="page-item">
                        <a className="page-link" onClick={next}>Next</a>
                    </li>
                </ul>
            </nav>
        </Wrapper>
    );
}

export default Users;