import React, {SyntheticEvent, useEffect, useState} from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Wrapper from "../../components/Wrapper";
import axios from 'axios';
import {Permission} from "../../models/permission";

const RoleEdit = (props: any) => {
    const [permissions, setPermissions] = useState([]);
    const [selected, setSelected] = useState([] as number[]);
    const [name, setName] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {id} = useParams();

    useEffect(() => {
        (
            async () => {
                const response = await axios.get('permissions');
                setPermissions(response.data);

                const {data} = await axios.get(`roles/${id}`);
                setName(data.name);
                setSelected(data.permissions.map((p: Permission) => p.id));
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
            await axios.put(`roles/${id}`, {
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
                           defaultValue={name}
                           onChange={e => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    {permissions.map((p: Permission) => {
                        return (
                            <div className="form-check" key={p.id}>
                                <input className="form-check-input" type="checkbox"
                                       value={p.name}
                                       checked={selected.some(s => s === p.id)}
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

export default RoleEdit;