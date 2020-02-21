import React, {Component} from 'react';
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
    };
    render = () => {
        return (
            <div>
                <h2>Login</h2>
                Are you not registered?
                <Link to="/register">
                    <button>Go to register</button>
                </Link>
            </div>
        );
    };
}