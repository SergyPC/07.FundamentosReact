import React, { Component } from 'react';
// import ReactDOM from 'react-dom'
// import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch, withRouter, Redirect } from 'react-router-dom';
import { userLogin } from '../js/api.js';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '' ,
            password: ''
        };
    };

    handleClickButton = () => {
        this.setState({
            username: '',
            password: ''
        });
    };

    handleChageUsername = (event) => {
        this.setState({
            username: event.target.value
        });
    };

    handleChangePassword = (event) => {
        this.setState({
            password: event.target.value
        });
    };

    getLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await userLogin(this.state.username, this.state.password);
            //response ? this.props.history.push("/dashboard") : console.log("error login")
            console.log('Redireccionamos a dashboard');
            this.props.history.push('/dashboard');
        } catch (error) {
            console.error(`The user name, ${this.state.username}, doesn't exist (${error}).`);
            alert(`The user name, ${this.state.username}, doesn't exist.`)
        }
    }

    render = () => {
        const {username, password} = this.state;

        return (
            <div>
                <h2>Login</h2>
                <form onSubmit={this.getLogin}>
                    <label for='username' className='form-label'> Username </label>
                    &nbsp;
                    <input type='text'
                        name='username' 
                        id='username' 
                        className='form-input' 
                        placeholder='username'
                        value={username}
                        onChange={this.handleChageUsername} 
                        required/>
                    <br />
                    <label for='password' className='form-label'> password </label>
                    &nbsp;
                    <input type='password'
                        name='password' 
                        id='password' 
                        className='password form-input' 
                        placeholder='password'
                        value ={password}
                        onChange={this.handleChangePassword}  
                        required /> 
                    <br /> 
                    <input type='submit' value='Login' />
                    &nbsp;
                    <input type ='reset'  value ='Clear' onClick ={this.handleClickButton} />
                </form>
                Are you not registered?
                &nbsp;
                <Link to="/register">
                    <button>Go to register</button>
                </Link>
            </div>
        );
    };
}