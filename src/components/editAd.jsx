import React, { Component } from 'react';
//import { BrowserRouter as Router, Route, Link, Switch, withRouter } from "react-router-dom";
import { editAd, getAd, getTags } from '../js/api.js';
import Navbarr from './navbar';
import { Form, Col, Button }  from 'react-bootstrap';

export default class EditAd extends Component {
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
        const id = this.props.match.params._id;
        this.loadAd (id);
    }

    handleChange = (event) => {
        const { lifestyle, mobile, motor, work } = this.state;
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

    loadAd = async (id) => {
        // console.log ("ENTRAMOS EN loadAd");
        const ad = await getAd(id);
        if (ad.error) {
            alert('You are not logged in, or your session has been expired. \n\nWe redirect you to Log In to do it again.');
            this.props.history.push('/login');
        } else {
            this.setState({
                name: ad.result.name,
                price: ad.result.price,
                description: ad.result.description,
                tags: ad.result.tags,
                type: ad.result.type,
                photo: ad.result.photo,
        });

        if(this.state.tags.indexOf('lifestyle')>-1)
            this.setState({ lifestyle: true });
        if(this.state.tags.indexOf('mobile')>-1)
            this.setState({ mobile: true });
        if(this.state.tags.indexOf('motor')>-1)
            this.setState({ motor: true });
        if(this.state.tags.indexOf('work')>-1)
            this.setState({ work: true });

        return ad.result;
        }
    }

    loadTags = () => {
        getTags()
        .then(data => this.setState({ optionsTag: data }));
    }

    componentDidMount() {
        this.loadTags();
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     // console.log ("ENTRAMOS EN componentDidUpdate");
    //     console.log('*** this.state.lifestyle (componentDidUpdate):', this.state.lifestyle);
    //     // console.log('*** prevState.lifestyle (componentDidUpdate):', prevState.lifestyle);
    //     console.log('*** this.state.mobile (componentDidUpdate):', this.state.mobile);
    //     // console.log('*** prevState.mobile (componentDidUpdate):', prevState.mobile);
    //     console.log('*** this.state.motor (componentDidUpdate):', this.state.motor);
    //     // console.log('*** prevState.motor (componentDidUpdate):', prevState.motor);
    //     console.log('*** this.state.work (componentDidUpdate):', this.state.work);
    //     // console.log('*** prevState.work (componentDidUpdate):', prevState.work);
    // }

    sendEditAd = async (event) => {
        event.preventDefault();
        const { name, price, description, tags, lifestyle, mobile, motor, work, type, photo } = this.state;

        let myTags = [];
        if (lifestyle)
            myTags.push('lifestyle');
        if (mobile)
            myTags.push('mobile');
        if (motor)
            myTags.push('motor');
        if (work)
            myTags.push('work');
        
        const adEdited = await editAd (name, price, description, myTags, type, photo, this.props.match.params._id);
        
        if (adEdited.error === 'Error: Not logged in') {
            alert('You are not logged in, or your session has been expired. \n\nWe redirect you to Log In to do it again.');
            this.props.history.push('/login');
        }
        else if (adEdited.error) {
            console.log(adEdited.error);
            alert('The ad could not be edited (try again or later).');
        } else {
            alert('The ad was edited successfully.');
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
        const { name, price, description, tags, optionsTag, type, photo } = this.state;

        const selectedBuy = (type === 'buy') ? '1' : '0';
        const selectedSell = (type === 'sell') ? '1' : '0';
        const selectBuySell = [selectedBuy.concat('-buy-Buy'), selectedSell.concat('-sell-Sell')];

        let checked = 0;

        return (
        <div>

            <Navbarr />
            <h1 className='titleName'>Edit Advertisement</h1>
            <form onSubmit={this.sendEditAd}>

                <Form.Group controlId="formGridTitle">
                    <Form.Label className='label'>Title of the ad:</Form.Label>
                    <Form.Control type="text" 
                        name="name" 
                        value={name}
                        maxLength="50"
                        placeholder="Add the title of the ad" 
                        onChange={this.handleChange}
                        required />
                </Form.Group>

                <Form.Group controlId="formBasicCheckbox"> 
                <Form.Label className='label'>Tags of the ad:</Form.Label>
                {optionsTag.map(item => {
                    if (item !== null) {
                        checked = 0;
                        tags.map(tag => {
                            if(item === tag) 
                                checked = 1;
                        })
                        if(checked)
                            return ( <Form.Check type="switch" defaultChecked name={item} id={item} key={item} value={item} label={item} onChange={this.handleChange} /> )
                        else
                            return ( <Form.Check type="switch" name={item} id={item} key={item} value={item} label={item} onChange={this.handleChange} /> )
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
                            {selectBuySell.map(item => {
                            const option = item.split("-");
                            if (option[0]==="1") 
                                return ( <option value={option[1]} key={item} selected>{option[2]}</option> )
                            else 
                                return ( <option value={option[1]} key={item}>{option[2]}</option> )
                            })}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridMaxPrice">
                        <Form.Label className='label'>Price of the ad:</Form.Label>
                        <Form.Control type="number" 
                            name="price" 
                            value={price}
                            placeholder="Add the price of the ad" 
                            onChange={this.handleChange}
                            required />
                    </Form.Group>
                </Form.Row>
                
                <Form.Group controlId="formGridPhoto">
                    <Form.Label className='label'>Ad photo link:</Form.Label>
                    <Form.Control type="text" 
                        name="photo" 
                        value={photo}
                        maxLength="120"
                        placeholder="Add the link to the ad photo" 
                        onChange={this.handleChange}
                        required />
                </Form.Group>

                <Form.Group controlId="formGridDescription">
                    <Form.Label className='label'>Description of the ad:</Form.Label>
                    <Form.Control as="textarea" 
                        name="description"
                        value={description}
                        rows="3"
                        maxLength="85"
                        placeholder="Add the description of the ad"
                        onChange={this.handleChange}
                        required />
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} md="8" controlId="formGridCreateAd">
                        <Button type="submit" variant="primary" size="lg" block>
                            Edit advertisement
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
            </form>
            <br />
        </div>
        )
    }
}