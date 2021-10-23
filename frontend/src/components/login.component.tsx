import React, {Component, FormEvent, SyntheticEvent} from "react";
import {Redirect} from "react-router-dom";
import {container, injectable} from "tsyringe";
import {UserService} from "../services/UserService";

type loginData = {
    email: string;
    password: string;
    loggedIn: boolean;
}
injectable()
export default class LoginComponent extends Component<{},loginData>{
    state = {
        email: '',
        password: '',
        loggedIn: false,
    }

    async componentDidMount() {
        const isUserLoggedIn = await container.resolve(UserService).isUserLoggedIn();
        this.setState({loggedIn: isUserLoggedIn});
    }


    handleInputChange(event:FormEvent<HTMLInputElement>) {
        if(event.currentTarget.name === 'email') {
            this.setState({email:event.currentTarget.value});
        }
        if(event.currentTarget.name === 'password') {
            this.setState({password:event.currentTarget.value});
        }

        return;
    }

    async login() {
        await container.resolve(UserService).logInUser(this.state.email, this.state.password);
        this.setState({loggedIn: true});
    }

    async handleSubmit(event:SyntheticEvent) {
        event.preventDefault();
        await this.login();
    }

    render() {
        if(this.state.loggedIn) {
            console.log('redirected to home');
            return <Redirect to={{pathname:'/home'}}/>
        }
        return <p>
            <form method='POST' onSubmit={this.handleSubmit.bind(this)}>
                <input name='email' placeholder='email' type="text" onChange={this.handleInputChange.bind(this)}/>
                <p></p>
                <input name='password' placeholder='password' type="text" onChange={this.handleInputChange.bind(this)}/>
                <p></p>
                <input type='submit' title='Log in'/>
            </form>
            <p>{this.state.email}</p>
            <p>{this.state.password}</p>
            <p>{this.state.loggedIn}</p>
        </p>
    }

}