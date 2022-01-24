 import axios from 'axios';
import React, {SyntheticEvent, useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom';
import Wrapper from "../../components/Wrapper";
import {Permission} from "../../models/permission";

const RoleCreate = () => {
    const [permissions, setPermissions] = useState([]);
    const [selected, setSelected] = useState([] as number[]);
    const [name, setName] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get('permissions');
                setPermissions(data);
            }
        )();
    }, []);

    const check = (id: number) => {
        if(selected.some(s => s === id)) {
            setSelected(selected.filter(s => s !== id));
            return;
        }
        setSelected([...selected, id]);
    };

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            await axios.post('roles', {

                name,
                permissions: selected
            });

            setRedirect(true);
        } catch (error: any) {
            console.log(`${error.response.status}: ${error.response.statusText}`);
        }
    };

    if(redirect) {
        return <Navigate to={'/roles'} />
    }

    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">Name</label>
                    <input type="text" className="form-control" id="firstName"
                           onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    {permissions.map((p: Permission) => {
                        return (
                            <div className="form-check" key={p.id}>
                                <input className="form-check-input" type="checkbox"
                                       value={p.name}
                                       onChange={() => check(p.id)}
                                />
                                <label className="form-check-label text-capitalize" htmlFor="flexCheckDefault">
                                    {p.name.replace('_', ' ')}
                                </label>
                            </div>
                        )
                    })}
                </div>

                <button className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    );
};

export default RoleCreate;