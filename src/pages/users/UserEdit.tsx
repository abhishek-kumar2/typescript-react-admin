import React, {SyntheticEvent, useEffect, useState} from 'react';
import {Role} from "../../models/role";
import { Navigate, useParams } from 'react-router-dom';
import Wrapper from "../../components/Wrapper";
import axios from 'axios';

const UserEdit = (props: any) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [roleId, setRoleId] = useState('');
    const [roles, setRoles] = useState([]);
    const [redirect, setRedirect] = useState(false);
    const {id} = useParams();

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get(`users/${id}`);
                setFirstName(data.first_name);
                setLastName(data.last_name);
                setEmail(data.email);
                setRoleId(data.role.id);

                const response = await axios.get('roles');
                setRoles(response.data);
            }
        )()
    }, []);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            await axios.put(`users/${id}`, {
                first_name: firstName,
                last_name: lastName,
                email,
                role_id: roleId
            });

            setRedirect(true)
        } catch (error: any) {
            console.log(`${error.response.status}: ${error.response.statusText}`);
        }

    };

    if(redirect) {
        return <Navigate to={'/users'}/>
    }

    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="firstName"
                           defaultValue={firstName}
                           onChange={e => setFirstName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="lastName"
                           defaultValue={lastName}
                           onChange={e => setLastName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="emailId" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="emailId"
                           defaultValue={email}
                           onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">Role</label>
                    <select className="form-select" id="role"
                            value={roleId}
                            onChange={e => setRoleId(e.target.value)}>
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

export default UserEdit;