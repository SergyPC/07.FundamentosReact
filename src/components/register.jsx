import React, { Component } from 'react';
// import ReactDOM from 'react-dom'
// import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch, withRouter, Redirect } from 'react-router-dom';
import { userRegister } from '../js/api.js';

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

    createRegister = async (event) => {
        event.preventDefault();
        //alert('UserName: ' + this.state.username + " - Password: "  + this.state.password);

        // const response = await fetch('http://34.89.93.186:8080/apiv1/register',{
        //     method: 'POST',
        //     body: JSON.stringify({
        //         username: this.state.username,
        //         password: this.state.password
        //     }),
        //     headers:{
        //         'Content-Type':'application/json'
        //     },
        //     credentials: 'include'
        // });
        // console.log(response);
        
        // const response = await axios.post(
        //     'http://34.89.93.186:8080/apiv1/register',
        //     {
        //         username: this.state.username,
        //         password: this.state.password
        //     },
        //     { withCredentials: true }
        // );
        try {
            const response = await userRegister(this.state.username, this.state.password);
            //response ? this.props.history.push("/login") : console.log("error registering")
            //console.log('response.status', response.status);

            console.log('Redireccionamos a Login');
            window.alert(`The user name, ${this.state.username}, has been successfully registered`);
            this.props.history.push('/login');

            // const response = await axios.post(
            //     'http://34.89.93.186:8080/apiv1/register',
            //     {
            //         username: this.state.username,
            //         password: this.state.password
            //     },
            //     { withCredentials: true }
            // )

            // console.log('Redireccionamos a Login');
            // this.props.history.push('/login');
            //this.props.history.push('/detail/${advert.id}');

            // if (response.status === 200) {
            //     console.log('Redireccionar a Login');
            //     this.props.history.push('/login');
            //     //console.log('Response:', response);
            // }

        } catch (error) {
            console.error(`The user name, ${this.state.username}, is already registered (${error}).`);
            alert(`The user name, ${this.state.username}, is already registered.`)
        }

        

        // const response = await axios.post(
        //     'http://34.89.93.186:8080/apiv1/register',
        //     {
        //         username: this.state.username,
        //         password: this.state.password
        //     },
        //     { withCredentials: true }
        // )
        // .then ( 
        //     () => { 
        //         // ReactDOM.render(<Redirect to='/login' />)
        //         // location.href="./login.jsx";
        //         console.log("Redireccionar a Login")
        //         //console.log("Response:", response)
        //     }
        // )
        // .catch ( 
        //     () => (alert(`This user name (${this.state.username}) is already registered`))
        // )
        // .then( () => ( console.log("Salimos de Register") )
        // );
        
        // if (response.status === 200) {
        //     console.log("Redireccionar a Login");
        //     // ReactDOM.render(<Redirect to='/login' />)
        //     // location.href="./login.jsx";
        // }

        // .then ( 
        //     () => { 
        //         console.log("Redireccionar a Login")
        //         console.log("Response:", response)
        //         ReactDOM.render(<Redirect to='/login' />)    
        //     } 
        // )

        
        // if (response.status === 200) {
        //     // <Route component={Login} />
        //     // location.href="./login.jsx";
        //     console.log("Redireccionar a Login");
        // }
        // else if (response.status === 500) {
        //     alert(`This user name (${this.state.username}) is already registered`);
        // }

    }

    render = () => {
        const {username, password} = this.state;

        return (
            <div>
                <h2>Register</h2>
                <form onSubmit={this.createRegister}>
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
                    <input type='submit' value='Register' />
                    &nbsp;
                    <input type ='reset'  value ='Clear' onClick ={this.handleClickButton} />
                </form>
                
                Are you registered?
                &nbsp;
                <Link to="/login">
                    <button>Go to login</button>
                </Link>

            </div>
            
        );
    };
}