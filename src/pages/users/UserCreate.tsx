import axios from 'axios';
import React, {SyntheticEvent, useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom';
import Wrapper from "../../components/Wrapper";
import {Role} from "../../models/role";

const UserCreate = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [roleId, setRoleId] = useState('');
    const [roles, setRoles] = useState([]);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get('roles');

                setRoles(data);
            }
        )();
    }, []);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            await axios.post('users', {
                first_name: firstName,
                last_name: lastName,
                email,
                role_id: roleId
            });

            setRedirect(true);
        } catch (error: any) {
            console.log(`${error.response.status}: ${error.response.statusText}`);
        }
    };

    if(redirect) {
        return <Navigate to={'/users'} />
    }

    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="firstName"
                           onChange={e => setFirstName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="lastName"
                           onChange={e => setLastName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="emailId" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="emailId"
                           onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">Role</label>
                    <select className="form-select" id="role"
                           onChange={e => setRoleId(e.target.value)}>
                        <option selected>Please select a role...</option>
                        {roles.map((r: Role) => {
                            return (
                                <option key={r.id} value={r.id}>{r.name}</option>
                            )
                        })}
                    </select>
                </div>

                <button className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    );
};

export default UserCreate;