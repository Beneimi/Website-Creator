import {singleton} from "tsyringe";
import axios, {AxiosError} from "axios";
import {Redirect} from "react-router-dom";
import React from "react";

interface StatusResponse {
    loggedIn: boolean
}

@singleton()
export class UserService {
    loggedIn: boolean = false;

    email?: string;

    async logInUser(email: string, password: string) {
        console.log('logging in user');
        axios.defaults.withCredentials = true;
        const result = await axios.post('http://localhost:8080/api/login/',{email:email, password: password})
            .then(() => {
                this.loggedIn = true;
                this.email = email;
                return 'asd';
            }).catch((e: AxiosError) => {
                throw new Error(e.response?.data || e.message);
            });
        console.log(result);
    }

    async logOutUser() {
        axios.defaults.withCredentials = true;
        await axios.post('http://localhost:8080/api/logout/',{})
            .catch(e => {
                throw new Error(e);
            });
    }

   async isUserLoggedIn(): Promise<boolean> {
        axios.defaults.withCredentials = true;
        const status = await axios.get('http://localhost:8080/api/status')
            .then((response) => {
                return (response.data as StatusResponse).loggedIn
            }).catch(e => {
                throw new Error(e);
            });
        console.log('loggedin')
        return status;
    }

    async registerUser(email: string, userName: string, password: string){
        axios.defaults.withCredentials = true;
        const result = await axios.post('http://localhost:8080/api/register/',{email:email, password: password, name: userName})
            .then((response: any) => {
                return response.user_id;
            }).catch((e: AxiosError) => {
                throw new Error(e.response?.data || e.message);
            });
        console.log(result);
    }
}