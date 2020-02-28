import React, { Component } from 'react';
import { getAds, getTags } from '../js/api.js';
import { Link } from "react-router-dom";
//import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";
import imgNoDisponible from '../img/noDisponible.jpg'
import { Card, CardColumns, Form, Col, Button }  from 'react-bootstrap';

import Navbarr from './navbar';

export default class AdBoard extends Component {

    constructor(props) {
        super(props);

        // console.log ("sessionStorage.getItem('search')", sessionStorage.getItem('search'));
        // if(sessionStorage.getItem('search'))
        //     console.log ("HAY ALGO");
        // else
        //     console.log ("NO HAY NADA");
        
        this.state = {
            search: sessionStorage.getItem('search') ? sessionStorage.getItem('search') : '',
            data: [],
            tags: [],
            params: {
                name: sessionStorage.getItem('name') ? sessionStorage.getItem('name') : '',
                minPrice: sessionStorage.getItem('minPrice') ? sessionStorage.getItem('minPrice') : '',
                maxPrice: sessionStorage.getItem('maxPrice') ? sessionStorage.getItem('maxPrice') : '',
                venta: sessionStorage.getItem('venta') ? sessionStorage.getItem('venta') : '',
                tag: sessionStorage.getItem('tag') ? sessionStorage.getItem('tag') : '',
            }
        };
    }

    loadTags = () => {
        // console.log("Entramos en loadTags");
        getTags()
        //.then(data => console.log("loadTags (data):", data))
        .then(data => this.setState({ tags: data }));
        // console.log("this.state.tags:", this.state.tags);
        // console.log("Salimos de loadTags");
    }

    // loadAds = (search) => {
    //     console.log("Entramos en loadAds");
    //     getAds(search)
    //     .then(data => this.setState({ data: data }));
    //     console.log("this.state.data (loadAds):", this.state.data);
    //     console.log("Salimos de loadAds");
    // }

    loadAds = async (search) => {
        // console.log("Entramos en loadAds");
        // getAds(search)
        // .then(data => this.setState({ data: data }));

        const ads = await getAds(search);
        if (ads.error) {
            //alert('No está logado o su sesión ha expirado. Le redireccionamos a Log In para que lo vuelva a realizar.');
            alert('You are not logged in, or your session has been expired. \n\nWe redirect you to Log In to do it again.');
            this.props.history.push('/login');
        } else {
            this.setState({
                data: ads.results,
        });
        return ads.results;
        }

        // console.log("this.state.data (getAds):", this.state.data);
        // console.log("Salimos de getAds");
    }

    componentDidMount() {
        // Sólo se llama una vez, en el cliente, en comparación con el componentWillMount() que se llama dos veces, una vez al servidor y una vez al cliente. 
        // Se llama después del renderizado inicial cuando el cliente recibió datos del servidor y antes de que los datos se muestren en el navegador. 
        // Debido al hecho de que los datos no se cargarán hasta después del procesamiento inicial, el desarrollador NECESITA configurar correctamente el estado inicial de los componentes.
        // console.log("Entramos en componentDidMount");
        this.loadAds(this.state.search)
        this.loadTags()
        // console.log("Salimos de componentDidMount");
    }

    handleChange = event => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
            params:{...this.state.params, [name]: value}
        })
        sessionStorage.setItem(name,value);
    }

    sendSearch = event => {
        event.preventDefault();

        const {name, minPrice, maxPrice, venta, tag} = this.state.params;

        // console.log("Entramos en sendSearch");
        // console.log("this.state.params (sendSearch):", this.state.params)
        // console.log("name (sendSearch):", name)
        // console.log("venta (sendSearch):", venta)
        // console.log("tag (sendSearch):", tag)

        // let queryParams =`price=${this.state.params.minPrice}-${this.state.params.maxPrice}&venta=${this.state.params.venta}`;
        // if(this.state.params.name) {queryParams = queryParams + `&name=${this.state.params.name}`}
        
        let queryParams = "true";

        queryParams = name !== '' ? queryParams += `&name=${name}` : queryParams += '';
        queryParams = venta !== '' ? queryParams += `&venta=${venta}` : queryParams += '';
        queryParams = tag ? queryParams += `&tag=${tag}` : queryParams += '';
        if(minPrice && maxPrice) {
            queryParams = queryParams += `&price=${minPrice}-${maxPrice}`
        }
        else {
            if(minPrice || maxPrice) {
                queryParams = (!minPrice && maxPrice) ? queryParams += `&price=0-${maxPrice}` : queryParams += `&price=${minPrice}-1000000000000`;
            }
        }

        this.setState({search: queryParams});
        this.props.history.push(`/dashboard?${queryParams}`);
        sessionStorage.setItem("search", queryParams);

        this.loadAds(queryParams);

        // console.log("Salimos de sendSearch");

    }

    clearFilter = () => {
        this.setState({
            params: { ...this.state.params,
                name: '',
                minPrice: '',
                maxPrice: '',
                venta: '',
                tag: '',
            }
        })
        sessionStorage.clear();
        this.props.history.push(`/dashboard?`);
        this.loadAds('');
    }

    returnToLogin = () => {
        this.props.history.push(`/login`);
    }

    render() {
        // console.log("this.state.params (render):", this.state.params)
        // console.log("this.state.tags (render):", this.state.tags)
        
        const {name, minPrice, maxPrice, venta, tag} = this.state.params;

        return (
            // <FilterBar data={this.state.data}/> --> convertirlo en componente de filtro
            <div>

                {/* <Navbarr params={this.state.params} /> */}
                <Navbarr />

                <form onSubmit={this.sendSearch}>
                    
                    <Form.Group controlId="exampleForm.ControlSelect1">

                        <Form.Row>
                            <Form.Group as={Col} md="2.5" controlId="formGridTypeSearch">
                                <Form.Label className='label'>What are you looking for?</Form.Label>
                                <Form.Control as="select" 
                                        name="venta"
                                        onChange={this.handleChange}
                                        // value={sessionStorage.getItem("venta")}>
                                        value={venta}>
                                    <option value="" defaultValue>Select Buy/Sell</option>
                                    <option value="false">Buy</option>
                                    <option value="true">Sell</option>
                                    </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} md="2.5" controlId="formGridTypeTags">
                                <Form.Label>&nbsp;</Form.Label>
                                <Form.Control as="select" 
                                    name="tag"
                                    onChange={this.handleChange}
                                    value={tag}>
                                    {/* value={sessionStorage.getItem("tag")}> */}
                                        <option value="" defaultValue>Select tag</option>
                                        {this.state.tags.map(itemTag => {
                                            if (itemTag !== null) {
                                                return (
                                                    <option key={itemTag} value={itemTag}>{itemTag}</option>
                                                );
                                            }
                                        })}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridLookingFor">
                                <Form.Label>&nbsp;</Form.Label>
                                <Form.Control type="text"
                                    placeholder="Enter what you are looking for"
                                    // value= {this.state.params.name}
                                    value= {name}
                                    name="name"
                                    onChange={this.handleChange} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridMinPrice">
                                <Form.Label className='label'>Minimal price</Form.Label>
                                <Form.Control type="number" 
                                    placeholder="Enter minimal price" 
                                    onChange={this.handleChange}
                                    name="minPrice" 
                                    // value = {sessionStorage.getItem("minPrice")} />
                                    value = {minPrice} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridMaxPrice">
                                <Form.Label className='label'>Maximum price</Form.Label>
                                <Form.Control type="number" 
                                    placeholder="Enter maximum price" 
                                    onChange={this.handleChange}
                                    name="maxPrice" 
                                    // value= {sessionStorage.getItem("maxPrice")}/>
                                    value= {maxPrice}/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} md="8" controlId="formGridSearch">
                                <Button type="submit" variant="primary" size="lg" block>
                                    Search ADs
                                </Button>
                            </Form.Group>

                            <Form.Group as={Col} md="2" controlId="formGridClearFilter">
                                <Button variant="warning" size="lg" block onClick={this.clearFilter}>
                                    ClearFilter
                                </Button>
                            </Form.Group>

                            <Form.Group as={Col} md="2" controlId="formGridLogOut">
                                <Button variant="danger" size="lg" block onClick={this.returnToLogin}>
                                    Log Out
                                </Button>
                            </Form.Group>
                        </Form.Row>

                        {/* <Button type="submit" variant="primary" size="lg" block>
                            Search ADs
                        </Button> */}
                    </Form.Group>

                </form>

                <div>
                <CardColumns>
                    {this.state.data.map(card => {
                        // let photo = '';
                        // if( (card.photo.indexOf("http://") > -1) || (card.photo.indexOf("https://") > -1) )
                        //     photo = card.photo;
                        // else
                        //     photo = 'http://www.sogarca.com/wp-content/uploads/2015/06/No-disponible.jpg';

                        
                        //const photo = ((card.photo.indexOf("http://") > -1) || (card.photo.indexOf("https://") > -1)) ? card.photo : 'http://www.sogarca.com/wp-content/uploads/2015/06/No-disponible.jpg';
                        const photo = ((card.photo.indexOf("http://") > -1) || (card.photo.indexOf("https://") > -1)) ? card.photo : imgNoDisponible;

                        return (
                            <Card key={card._id}>
                                <Card.Img variant="top" src={photo} />
                                <Card.Body>
                                    <Link to={`/dashboard/${card._id}`}>
                                        <Card.Title>{card.name}</Card.Title>
                                    </Link>
                                    <Card.Text>
                                        Type: {card.type}
                                        <br />
                                        Price: {card.price}€
                                        <br /><br />
                                        Description:
                                        <br />
                                        {card.description}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">Last updated: {card.updatedAt}</small>
                                </Card.Footer>
                            </Card>
                        );
                    })}
                </CardColumns>
                </div>
            </div>
        )
    }
}