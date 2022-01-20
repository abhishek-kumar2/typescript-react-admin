import React, {Component, SyntheticEvent} from 'react';
import '../Login.css';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

class Register extends Component {
    first_name = '';
    last_name = '';
    email = '';
    password = '';
    confirm_password = '';
    state = {
        redirect: false
    }

    submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8001/api/register', {
                first_name: this.first_name,
                last_name: this.last_name,
                email: this.email,
                password: this.password,
                confirm_password: this.confirm_password
            });

            if (response.status === 200) {
                this.setState({
                    redirect: true
                })
            }
        } catch (error: any) {
            console.log(`${error.response.status}: ${error.response.statusText}`);
        }
    }

    render() {
        if(this.state.redirect) {
            return <Navigate to={'/login'}/>
        }

        return (
            <main className="form-signin">
                <form onSubmit={this.submit}>
                    <h1 className="h3 mb-3 fw-normal">Please register</h1>

                    <input type="text" className="form-control mb-2" placeholder="First Name" required
                           onChange={e => this.first_name = e.target.value}
                    />
                    <input type="text" className="form-control mb-2" placeholder="Last Name" required
                           onChange={e => this.last_name = e.target.value}
                    />
                    <input type="email" className="form-control mb-2" placeholder="Email" required
                           onChange={e => this.email = e.target.value}
                    />
                    <input type="password" className="form-control mb-2" placeholder="Password" required
                           onChange={e => this.password = e.target.value}
                    />
                    <input type="password" className="form-control mb-3" placeholder="Confirm Password" required
                           onChange={e => this.confirm_password = e.target.value}
                    />

                    <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
                </form>
            </main>
        );
    }
}

export default Register;