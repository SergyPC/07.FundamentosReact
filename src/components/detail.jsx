import React, {Component} from 'react';
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";

export default class Detail extends Component {
    constructor(props) {
        super(props);
    };
    render = () => {
        return (
            <div>
                Estamos en Detail
            </div>
        );
    };
}