import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {User} from "../models/user";
import {connect} from "react-redux";

const Nav = (props: {user: User}) => {

    const logout = async () => {
        await axios.post('logout', {});
    }

    return (
        <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">&#9806; Node-React-Admin</a>

            <ul className="my-2 my-md-0 mr-md-3">
                <Link to="/profile" className="p-2 m-2 text-info text-decoration-none">&#128100; {props.user.name}</Link>
                <Link to="/login" className="p-2 btn btn-danger"
                    onClick={logout}
                >&#128274; Logout</Link>
            </ul>
        </nav>
    );
};

const mapStateToProps = (state: {user: User}) => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps)(Nav);