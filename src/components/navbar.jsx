import React, { Component } from 'react';
import { Navbar, Nav, Form, FormControl, Button }  from 'react-bootstrap';

export default class Navbarr extends Component {
    constructor(props) {
        super(props); 
    }

    // goToCreateAd = (event) => {
    //     // console.log("event", event);
    //     // console.log("this.state (NAVBAR):", this.state);
    //     event.preventDefault();
    //     this.props.history.push('/login');
    // }

    render() {
        return (
            <div>
                <header className="App-header">
                    <nav id="navbar" className="app-navbar">
                    <div className="navbar-logo">
                        <h1>MegaANUNCIOS</h1>
                    </div>
                    </nav>
                </header>
                {/* <Button variant="outline-light" onClick="{this.goToCreateAd}">Crear Anuncio</Button> */}
                {/* <Button variant="warning" size="lg" block onClick={this.goToCreateAd}>
                    Crear Anuncio
                </Button> */}
                {/* <Navbar bg="primary" variant="dark">
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-light">Search</Button>
                    </Form>
                </Navbar> */}
            </div>
        )
    }
}