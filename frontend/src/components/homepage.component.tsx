import React, {Component} from "react";
import axios from "axios";
import {container, injectable} from "tsyringe";
import {UserService} from "../services/UserService";
import {Redirect, Link} from "react-router-dom";
import {inspect} from "util";
import {FiEdit, FiTrash2} from "react-icons/all";


interface Page {
    id: string,
    title: string
    url: string
}

interface UserPageData {
    user: {
        email: string,
        name: string,
        role: string
    },
    pages: Page[];
}

injectable()
export default class HomepageComponent extends Component<{},{}>{
    state = {
        loggedIn: true,
        userFetched: false,
        userData: {user: {email:'', name:'', role: ''},pages: new Array<Page>()},
    }

    componentDidMount() {
        const isUserLoggedIn = container.resolve(UserService).isUserLoggedIn();
        isUserLoggedIn
            .then((loggedIn) =>  {
                this.setState({loggedIn: loggedIn});

                return loggedIn;
            }).then(loggedIn => {
                if(loggedIn) {
                    this.fetchUserPage();
                }
        });
    }

    fetchUserPage(){
        axios.get('http://localhost:8080/api/userpage', {headers:{'auth-token':'token'}, withCredentials: true})
            .then(response => {
                console.log(inspect(response.data))
                this.setState({userData:(response.data as UserPageData), userFetched: true});
            }).catch(e => {
                throw new Error(e);
            });
    }

    deletePage(pageId: string) {
        axios.delete(`http://localhost:8080/api/pages/delete/${pageId}`, {headers:{'auth-token':'token'}, withCredentials: true})
            .then(response => {
                this.fetchUserPage()
            }).catch(e => {
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
        const pageElements = this.state.userData.pages.map( (page) =>
            <li className='home-page-list-element'>
                <Link className='home-page-list-element-title' to={{pathname: `/page/${page.url}`, state: {pageId: page.id}}}>
                    {page.title}
                </Link>
                <span> - </span>
                <Link className='edit-page-button' to={{pathname: `/edit/page/${page.url}`, state: {pageId: page.id}}}>
                    <FiEdit/>
                </Link>
                <span> </span>
                <a className='delete-page-button' onClick={(() => this.deletePage(page.id)).bind(this)}>
                    <FiTrash2/>
                </a>
            </li>)

        const newPageElement = <li className='home-page-list-element'>
            <Link className='home-page-list-element-title' to={`/create`}>
                Create new Page
            </Link>
        </li>

        return <ul>{pageElements}{newPageElement}</ul>;
    }

    render() {
        if(this.state.loggedIn) {
            return <div className='home-page-container'>
                <h1>Hello {this.state.userData.user.name}</h1>
                <p>You are logged in as <b>{this.state.userData.user.role}</b></p>
                <p>Your pages:</p>
                {this.getTitleList()}
                <button onClick={this.logOut.bind(this)}>Log out</button>
            </div>
        }

        return <Redirect to={{pathname:'/login'}}/>
    }

}