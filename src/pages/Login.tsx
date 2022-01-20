import axios from 'axios';
import React, {SyntheticEvent, useState} from 'react';
import { Navigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            const {data} = await axios.post('login', {
                email,
                password
            });

            setRedirect(true);
            console.log(data);
        } catch (e: any) {
            console.log(`${e.response.status}: ${e.response.statusText}`);
        }
    }

    if(redirect) {
        return <Navigate to={'/'}/>;
    }

    return (
        <main className="form-signin">
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Please login</h1>

                <input type="email" className="form-control mb-2" placeholder="Email" required
                       onChange={e => setEmail(e.target.value)}
                />
                <input type="password" className="form-control mb-2" placeholder="Password" required
                       onChange={e => setPassword(e.target.value)}
                />

                <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
            </form>
        </main>
    );
};

export default Login;