import React, { Component } from 'react';
//import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";
import { createAd, getAds, getTags } from '../js/api.js';
import Navbarr from './navbar';
import { Form, Col, Button }  from 'react-bootstrap';

export default class CreateAd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: 0,
            description: '',
            tags: [],
            optionsTag: [],
            type: '',
            photo: '',

            lifestyle: false,
            mobile: false,
            motor: false,
            work: false,
        };
    }

    handleChange = (event) => {
        // const name = event.target.name;
        // const value = event.target.value;
        // this.setState({
        //     [name]: value
        // });
        // //console.log("name/value: ", name, "/", value);

        const name = event.target.name;
        const value = event.target.value;
        if(name!=='lifestyle' || name!=='mobile' || name!=='motor' || name!=='work') {
            this.setState({
                [name]: value
            });
        }

        if(name==='lifestyle' || name==='mobile' || name==='motor' || name==='work') {
            //console.log("---event.target: ", event.target.checked)
            this.setState({ [name]: event.target.checked });
        }
    }

    loadAds = async (search) => {
        const ads = await getAds(search);
        if (ads.error) {
            alert('You are not logged in, or your session has been expired. \n\nWe redirect you to Log In to do it again.');
            this.props.history.push('/login');
        } else {
            this.setState({
                data: ads.results,
        });
        return ads.results;
        }
    }

    // loadTags = () => {
    //     getTags()
    //     .then(data => this.setState({ tags: data }));
    // }

    loadTags = () => {
        getTags()
        .then(data => this.setState({ optionsTag: data }));
    }

    // loadTagsAsync = async () => {
    //     // getTags()
    //     // .then(data => this.setState({ optionsTag: data }));

    //     const tags = await getTagss();

    //     if (tags.error) {
    //         console.log("tags.error1:", tags.error);
    //         alert('You are not logged in, or your session has been expired. \n\nWe redirect you to Log In to do it again.');
    //         this.props.history.push('/login');
    //     } else {
    //         console.log("tags.error2:", tags.error);
    //         this.setState({
    //             optionsTag: tags.results,
    //     });
    //     return tags.results;
    //     }
    // }
    
    // loadTags = () => {
    //     // console.log("Entramos en loadTags");
    //     getTags()
    //     .then(data => this.setState({ optionsTag: data }));
    //     // console.log("this.state.optionsTag:", this.state.optionsTag);
    //     // console.log("Salimos de loadTags");
    // }

    componentDidMount() {
        // if (adCreated.error === 'Error: Not logged in') {
        //     alert('You are not logged in, or your session has been expired. \n\nWe redirect you to Log In to do it again.');
        //     this.props.history.push('/login');
        // }
        
        this.loadAds("name=ProbandoQueEstamosLogados...");
        
        this.loadTags();
        // this.loadTagsAsync();
    }

    sendCreateAd = async (event) => {
        event.preventDefault();
        // const { name, price, description, tags, type, photo } = this.state;

        const { name, price, description, lifestyle, mobile, motor, work, type, photo } = this.state;

        // console.log('name=', name);
        // console.log('price=', price);
        // console.log('description=', description);
        // //console.log('tags=', tags);
        // console.log('lifestyle=', lifestyle);
        // console.log('mobile=', mobile);
        // console.log('motor=', motor);
        // console.log('work=', work);
        // console.log('type=', type);
        // console.log('photo=', photo);

        // let tags = [];
        // if (lifestyle)
        //     tags.push(lifestyle);
        // if (mobile)
        //     tags.push(mobile);
        // if (motor)
        //     tags.push(motor);
        // if (work)
        //     tags.push(work);
        // // console.log('tags=', tags);

        // const adCreated = await createAd(name, price, description, tags, type, photo);
        // // const adCreated = await createAd(name, price, description, lifestyle, type, photo);
        
        let myTags = [];
        if (lifestyle)
            myTags.push('lifestyle');
        if (mobile)
            myTags.push('mobile');
        if (motor)
            myTags.push('motor');
        if (work)
            myTags.push('work');
        
        const adCreated = await createAd (name, price, description, myTags, type, photo);
        

        if (adCreated.error === 'Error: Not logged in') {
            alert('You are not logged in, or your session has been expired. \n\nWe redirect you to Log In to do it again.');
            this.props.history.push('/login');
        }
        else if (adCreated.error) {
        //if (adCreated.error === 'Error: Not logged in') {
            console.log(adCreated.error);
            alert('The ad could not be created (try again or later).');
        } else {
            alert('The ad was created successfully.');
            this.props.history.push('/dashboard?');
        }
    }

    returnToDashboard = () => {
        this.props.history.push(`/dashboard?`);
    }

    returnToLogin = () => {
        this.props.history.push(`/login`);
    }

    render() {
        return (
        <div>

            <Navbarr />
            <h1 className='titleName'>Create Advertisement</h1>
            <form onSubmit={this.sendCreateAd}>

                {/* <Form.Control as="select" 
                    name="type"
                    onChange={this.handleChange}
                    value={this.state.venta} required>
                    <option value="" defaultValue>Select the type of ad (Buy/Sell)</option>
                    <option value="false">Buy</option>
                    <option value="true">Sell</option>
                </Form.Control> */}

                <Form.Group controlId="formGridTitle">
                    <Form.Label className='label'>Title of the ad:</Form.Label>
                    <Form.Control type="text" 
                        name="name" 
                        maxLength="50"
                        placeholder="Add the title of the ad" 
                        onChange={this.handleChange}
                        required />
                </Form.Group>

                <Form.Group controlId="formBasicCheckbox"> 
                <Form.Label className='label'>Tags of the ad:</Form.Label>
                {this.state.optionsTag.map(item => {
                    if (item !== null) {
                        return (
                            <Form.Check type="switch" name={item} id={item} key={item} value={item} label={item} onChange={this.handleChange} />
                        )
                    }
                })}
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="formGridMinPrice">
                        <Form.Label className='label'>Type of ad:</Form.Label>
                        <Form.Control as="select" 
                            name="type"
                            onChange={this.handleChange}
                            value={this.state.venta} required>
                            <option value="" defaultValue>Select the type of ad (Buy/Sell)</option>
                            <option value="buy">Buy</option>
                            <option value="sell">Sell</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridMaxPrice">
                        <Form.Label className='label'>Price of the ad:</Form.Label>
                        <Form.Control type="number" 
                            name="price" 
                            placeholder="Add the price of the ad" 
                            onChange={this.handleChange}
                            required />
                    </Form.Group>
                </Form.Row>
                
                <Form.Group controlId="formGridPhoto">
                    <Form.Label className='label'>Ad photo link:</Form.Label>
                    <Form.Control type="text" 
                        name="photo" 
                        maxLength="120"
                        placeholder="Add the link to the ad photo" 
                        onChange={this.handleChange}
                        required />
                </Form.Group>

                <Form.Group controlId="formGridDescription">
                    <Form.Label className='label'>Description of the ad:</Form.Label>
                    <Form.Control as="textarea" 
                        name="description"
                        rows="3"
                        maxLength="85"
                        placeholder="Add the description of the ad"
                        onChange={this.handleChange}
                        required />
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} md="8" controlId="formGridCreateAd">
                        <Button type="submit" variant="primary" size="lg" block>
                            Create advertisement
                        </Button>
                    </Form.Group>

                    <Form.Group as={Col} md="2" controlId="formGridReturnAds">
                        <Button variant="warning" size="lg" block onClick={this.returnToDashboard}>
                            Return to Ads 
                        </Button>
                    </Form.Group>

                    <Form.Group as={Col} md="2" controlId="formGridLogOut">
                        <Button variant="danger" size="lg" block onClick={this.returnToLogin}>
                            Log Out
                        </Button>
                    </Form.Group>
                </Form.Row>

                {/* <Form.Control type="number" 
                    name="price" 
                    placeholder="Add the price of the ad" 
                    onChange={this.handleChange}
                    required /> */}
                
                

                

                {/* <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control as="textarea" rows="3" placeholder="Add the description of the ad..." />
                </Form.Group> */}

                {/* <input onChange={this.handleChange} name="name" type="text" maxLength="50" placeholder="Ad Name" required />
                <input onChange={this.handleChange} name="price" type="number" placeholder="Ad Price" required />
                <input onChange={this.handleChange} name="description" type="text" maxLength="85" placeholder="Ad Description" required /> */}
                
                {/* <input onChange={this.handleChange} name="tags" type="text" placeholder="Ad Tags" /> */}

                

                {/* <Form.Group controlId="exampleForm.ControlSelect2">
                    <Form.Label>Select tag</Form.Label>
                    <Form.Control as="select" multiple name="tag" onChange={this.handleChange}>
                        {this.state.optionsTag.map(item => {
                            if (item !== null) {
                                return (
                                    <option value={item} key={item}>{item}</option>
                                )
                            }
                        })}
                    </Form.Control>
                </Form.Group> */}



                {/* <select name="tag"
                        onChange={this.handleChange}> Select tag
                            {this.state.optionsTag.map(item => {
                            if (item !== null) {
                                return (
                                    <option value={item} key={item}>{item}</option>
                                )
                            }
                        })}
                </select> */}

                {/* <input onChange={this.handleChange} name="type" type="text" placeholder="Ad Type" /> */}
                
                {/* <select name="type"
                    onChange={this.handleChange}
                    value={this.state.venta} required> Select type (Buy/Sell)
                        <option value="buy">Buy</option>
                        <option value="sell">Sell</option>
                </select>
                <input onChange={this.handleChange} name="photo" type="text" maxLength="85" placeholder="Ad Photo" required />
                <button type="submit">Create advertisement</button> */}

                



            </form>
            <br />
        </div>

        )
    }
}