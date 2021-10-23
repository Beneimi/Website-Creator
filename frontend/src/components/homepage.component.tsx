import React, {Component} from "react";
import axios from "axios";
import {container, injectable} from "tsyringe";
import {UserService} from "../services/UserService";
import {Redirect} from "react-router-dom";

interface UserPageData {
    user: {
        email: string,
        name: string,
        role: string
    },
    pages: [string];
}

injectable()
export default class HomepageComponent extends Component<{},{}>{
    state = {
        loggedIn: true,
        userFetched: false,
        userData: {user: {email:'', name:'', role: ''},pages: []},
    }
    componentDidMount() {
        const isUserLoggedIn = container.resolve(UserService).isUserLoggedIn();
        isUserLoggedIn
            .then((loggedIn) =>  {
                console.log('thenből homepagen');
                console.log(loggedIn);
                this.setState({loggedIn: loggedIn});

                return loggedIn;
            }).then(loggedIn => {

                console.log('this.state a kövi thenből')
                console.log(this.state)
                if(loggedIn) {
                    this.fetchUserPage();
                }
        });
    }

    fetchUserPage(){
        axios.get('http://localhost:8080/api/userpage', {headers:{'auth-token':'token'}, withCredentials: true})
            .then(response => {
                console.log('response');
                console.log(response)
                this.setState({userData:(response.data as UserPageData), userFetched: true});
            }).catch(e => {
                console.log('sad')
                throw new Error(e);
            });
    }

    logOut() {
        container.resolve(UserService).logOutUser()
            .then( () => this.setState({loggedIn: false}));
    }

    getTitleList() {
        if(!this.state.userFetched) {
            return [];
        }

        return <ul>{this.state.userData.pages.map((title) => <li>{title}</li>)}</ul>;
    }

    render() {
        if(this.state.loggedIn) {
            return <p>
                <p>you are logged in {this.state.loggedIn ? 'YES' : 'NO'}</p>
                <h1>Logged in</h1>
                <p>This is the page of: {this.state.userData.user.name} ({this.state.userData.user.email})</p>
                <p>Your role is <b>{this.state.userData.user.role}</b></p>
                <p>Your pages are:</p>
                {this.getTitleList()}
                <button onClick={this.logOut.bind(this)}>Log out</button>
            </p>
        }
        console.log('redirect to login');
        return <Redirect to={{pathname:'/login'}}/>
    }

}