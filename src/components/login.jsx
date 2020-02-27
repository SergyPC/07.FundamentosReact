import React, { Component } from 'react';
// import ReactDOM from 'react-dom'
// import axios from 'axios';
import { Link } from 'react-router-dom';
//import { BrowserRouter as Router, Route, Link, Switch, withRouter, Redirect } from 'react-router-dom';
import { userLogin } from '../js/api.js';
import { Card, InputGroup, Form, FormControl, Col, Button }  from 'react-bootstrap';
import Navbarr from './navbar';
import login from '../img/login.png'
import contrasena from '../img/password.png'

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
        const { username, password } = this.state;

        // try {
        //     const response = await userLogin(username, password);
        //     //response ? this.props.history.push("/dashboard") : console.log("error login")
        //     //console.log('Redireccionamos a dashboard');
        //     //this.props.history.push('/dashboard');
        // } catch (error) {
        //     console.error(`The user name, ${this.state.username}, doesn't exist (${error}).`);
        //     alert(`The user name, ${this.state.username}, doesn't exist.`);
        // }
              
        const isLoginCorrect = await userLogin(username, password);

        // console.log("isLoginCorrect.success:", isLoginCorrect.success);
        // console.log("isLoginCorrect.error:", isLoginCorrect.error);

        isLoginCorrect.error ? alert(`The username, ${this.state.username}, doesn't exist.`) : this.props.history.push('/dashboard');

        // if (isLoginCorrect.error) {
        //     alert(`The user name, ${this.state.username}, doesn't exist.`);
        // } else {
        //     this.props.history.push('/dashboard');
        // }

    }

    render = () => {
        const {username, password} = this.state;

        return (
            <div className='padre-logIn-SignUp'>
            <div className='hijo-logIn-SignUp'>
                
                {/* <Navbarr params={this.state} /> */}
                <Navbarr />

                <form onSubmit={this.getLogin}>
                <Form.Group >
                <Card key='1'>
                    {/* <Card.Img variant="top" src={photo} /> */}
                    <Card.Body>
                        <Card.Title className='centrado'>Log in to your account</Card.Title>
                        <Card.Text>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="logintext"><Card.Img variant="top" src={login} /></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="text"
                                placeholder="Enter Username"
                                // value= {this.state.params.name}
                                value= {username}
                                name="username"
                                onChange={this.handleChageUsername}
                                required 
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="contrasenatext"><Card.Img variant="top" src={contrasena} /></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="password"
                                placeholder="Enter Password"
                                // value= {this.state.params.name}
                                value= {password}
                                name="password"
                                onChange={this.handleChangePassword}
                                required 
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <Button type="submit" variant="primary" size="lg" block>
                                Log In
                            </Button>
                            <Button variant="warning" size="lg" block onClick={this.handleClickButton}>
                                Clear
                            </Button>   
                        </InputGroup>
                        
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className='centrado'>
                        <normal className="text-muted">New to MegaANUNCIOS?</normal>
                        &nbsp;
                        <Card.Link href="/register">Sign Up{/* Go to register */}</Card.Link>
                        {/* <small className="text-muted">New to GUAGUAPOP? Sign Up</small> */}
                    </Card.Footer>
                </Card>
                </Form.Group>
                </form>
            </div>
            </div>
        );
    };
}