import React, {Component, FormEvent, SyntheticEvent} from "react";
import {Redirect} from "react-router-dom";
import {container, injectable} from "tsyringe";
import {UserService} from "../services/UserService";

interface signInData {
    userName: string
    email: string,
    password: string,
    passwordAgain: string,
    errorMessage: string,
    signedUp: boolean
}
injectable()
export default class SignUpComponent extends Component<{},signInData>{
    state = {
        email: '',
        userName: '',
        password: '',
        passwordAgain: '',
        errorMessage: '',
        signedUp: false
    }

    async componentDidMount() {
        const isUserLoggedIn = await container.resolve(UserService).isUserLoggedIn();
        this.setState({signedUp: isUserLoggedIn});
    }

    handleInputChange(event:FormEvent<HTMLInputElement>) {
        if(event.currentTarget.name === 'userName') {
            this.setState({userName:event.currentTarget.value});
        }
        if(event.currentTarget.name === 'email') {
            this.setState({email:event.currentTarget.value});
        }
        if(event.currentTarget.name === 'password') {
            this.setState({password:event.currentTarget.value});
        }
        if(event.currentTarget.name === 'passwordAgain') {
            this.setState({passwordAgain:event.currentTarget.value});
        }

        return;
    }

    async login() {
        try {
            await container.resolve(UserService).registerUser(this.state.email, this.state.userName, this.state.password);
            await container.resolve(UserService).logInUser(this.state.email, this.state.password);
            this.setState({signedUp: true})
        } catch (e:any) {
            this.setState({errorMessage: e.message})
        }
    }

    async handleSubmit(event:SyntheticEvent) {
        event.preventDefault();
        await this.login();
    }

    render() {
        if(this.state.signedUp) {
            return <Redirect to={{pathname:'/home'}}/>
        }
        return <div className='center-form'>
            <form method='POST' onSubmit={this.handleSubmit.bind(this)}>
                <label className='login-label'>Email</label> <br/>
                <input name='email' placeholder='email' type="text" onChange={this.handleInputChange.bind(this)}/> <br/>
                <label className='login-label'>Felhasználónév</label> <br/>
                <input name='userName' placeholder='név' type="text" onChange={this.handleInputChange.bind(this)}/><br/>
                <label className='login-label'>Jelszó</label> <br/>
                <input name='password' placeholder='jelszó' type="text" onChange={this.handleInputChange.bind(this)}/><br/>
                <label className='login-label'>Jelszó újra</label> <br/>
                <input name='passwordAgain' placeholder='jelszó újra' type="text" onChange={this.handleInputChange.bind(this)}/> <br/>
                <input type='submit' title='Regisztrálok'/>
            </form>
            {this.state.errorMessage ? this.state.errorMessage : ''}
        </div>
    }

}