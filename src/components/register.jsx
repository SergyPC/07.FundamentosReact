import React, { Component } from 'react';
// import ReactDOM from 'react-dom'
// import axios from 'axios';
//import { BrowserRouter as Router, Route, Link, Switch, withRouter, Redirect } from 'react-router-dom';
import { userRegister } from '../js/api.js';
import { Card, InputGroup, Form, Button }  from 'react-bootstrap';
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

    createRegister = async (event) => {
        event.preventDefault();
        const { username, password } = this.state;

        // try {
        //     const response = await userRegister(this.state.username, this.state.password);
        //     //response ? this.props.history.push("/login") : console.log("error registering")
        //     //console.log('Redireccionamos a Login');
        //     window.alert(`The user name, ${this.state.username}, has been successfully registered`);
        //     this.props.history.push('/login');

        // } catch (error) {
        //     console.error(`The user name, ${this.state.username}, is already registered (${error}).`);
        //     alert(`The user name, ${this.state.username}, is already registered.`);
        // }

        const isRegisterCorrect = await userRegister(username, password);

        // console.log("isRegisterCorrect.success:", isRegisterCorrect.success);
        // console.log("isRegisterCorrect.error:", isRegisterCorrect.error);

        //isRegisterCorrect.error ? alert(`The user name, ${this.state.username}, is already registered.`) :  this.props.history.push('/login');

        if (isRegisterCorrect.error) {
            alert(`The username, ${this.state.username}, is already registered.`);
        } else {
            alert(`The username, ${this.state.username}, has been successfully registered`)
            this.props.history.push('/login');
        }
    }

    render = () => {
        const {username, password} = this.state;

        return (
            <div className='padre-logIn-SignUp'>
            <div className='hijo-logIn-SignUp'>
                
                {/* <Navbarr params={this.state} /> */}
                <Navbarr />

                <form onSubmit={this.createRegister}>
                {/* <Form.Group controlId="exampleForm.ControlSelect1"> */}
                <Form.Group>
                <Card key='1'>
                    {/* <Card.Img variant="top" src={photo} /> */}
                    <Card.Body>
                        <Card.Title className='centrado'>Sign up for free account</Card.Title>
                        <Card.Text>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1"><Card.Img variant="top" src={login} /></InputGroup.Text>
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
                                <InputGroup.Text id="basic-addon2"><Card.Img variant="top" src={contrasena} /></InputGroup.Text>
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
                                Create free account
                            </Button>
                            <Button variant="warning" size="lg" block onClick={this.handleClickButton}>
                                Clear
                            </Button>   
                        </InputGroup>
                        
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className='centrado'>
                        <normal className="text-muted">Are you registered?</normal>
                        &nbsp;
                        <Card.Link href="/login">Log In</Card.Link>
                    </Card.Footer>
                </Card>
                </Form.Group>
                </form>
            </div>
            </div>
        );
    };
}