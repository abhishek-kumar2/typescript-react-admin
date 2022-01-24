import React, {useEffect, useState} from 'react';
import Wrapper from "../../components/Wrapper";
import axios from 'axios';
import {User} from "../../models/user";
import {Link} from "react-router-dom";
import Paginator from "../../components/Paginator";

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
                                    <div className="btn-group">
                                        <Link to={`/users/${user.id}/edit`} role="button" className="btn btn-outline-info">Edit</Link>
                                        <button type="button" className="btn btn-outline-danger" onClick={() => del(user.id)}>Delete</button>
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
}

export default Users;