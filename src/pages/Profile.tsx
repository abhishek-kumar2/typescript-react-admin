import axios from 'axios';
import React, {Dispatch, SyntheticEvent, useEffect, useState} from 'react';
import Wrapper from "../components/Wrapper";
import {connect} from "react-redux";
import {User} from "../models/user";
import {setUser} from "../redux/actions/setUserAction";

const Profile = (props: {user: User, setUser: (user: User) => void}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        setFirstName(props.user.first_name);
        setLastName(props.user.last_name);
        setEmail(props.user.email);
    }, [props.user]);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        const {data} = await axios.put('users/info', {
            first_name: firstName,
            last_name: lastName,
            email
        });

        props.setUser(new User(
            data.id,
            data.first_name,
            data.last_name,
            data.email,
            data.role
        ));
    };

    const changePass = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.put('users/password', {
            password,
            confirm_password: confirmPassword
        });
    };

    return (
        <Wrapper>
            <h3>Account Information</h3>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label htmlFor="fName">First Name</label>
                    <input type="text" className="form-control" id="fName"
                           defaultValue={firstName}
                           onChange={e => setFirstName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="lName">Last Name</label>
                    <input type="text" className="form-control" id="lName"
                           defaultValue={lastName}
                           onChange={e => setLastName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email"
                           defaultValue={email}
                           onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <button className="btn btn-outline-primary">Save</button>
            </form>

            <h3 className="mt-4">Change Password</h3>
            <form onSubmit={changePass}>
                <div className="mb-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" onChange={e => setPassword(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" onChange={e => setConfirmPassword(e.target.value)}/>
                </div>
                <button className="btn btn-outline-primary">Save</button>
            </form>
        </Wrapper>
    );
};

const mapStateToProps = (state: {user: User}) => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        setUser: (user: User) => dispatch(setUser(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);