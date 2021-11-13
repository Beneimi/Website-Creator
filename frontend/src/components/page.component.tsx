import React, {Component} from "react";
import {Link, RouteComponentProps} from 'react-router-dom'
import axios from "axios";
import TextModuleComponent from "./textModule.component";
import PollModuleComponent from "./pollModule.component";
import {PageMapper} from "../domain/mappers/PageMapper";
import {PageDTO} from "../domain/DTO/PageDTO";
import {TextModule} from "../domain/model/modules/TextModule";
import {PollModule} from "../domain/model/modules/PollModule";
import {Page} from "../domain/model/Page";
import {inspect} from "util";

interface LocationState {
    pageId: string,
    userName: string,
    url: string
}

export default class PageComponent extends Component<RouteComponentProps<LocationState>,{}> {
    state = {
        fetched: false,
        pageId: '',
        page: { } as Page
    }

    componentDidMount() {
       const pageId = (this.props.location.state as LocationState)?.pageId;
       console.log(pageId)
       if(pageId){
           this.fetchPageById(pageId);
       } else {
           this.fetchPageByOwnerNameAndUrl(this.props.match.params.userName, this.props.match.params.url)
       }
    }

    fetchPageById(pageId: string){
        axios.get(`http://localhost:8080/api/${pageId}/`, {headers:{'auth-token':'token'}, withCredentials: true})
            .then(response => {
                console.log(response.data)
                const pageDTO = response.data as PageDTO
                if(!pageDTO) {
                    this.setState({fetched: true, pageId: pageId, page: undefined });
                }
                console.log(response.data)
                const page = PageMapper.toDomain(response.data as PageDTO)
                this.setState({fetched: true, pageId: pageId, page: page });
            }).catch(e => {
            throw new Error(e);
        });
    }

    fetchPageByOwnerNameAndUrl(userName: string, url: string){
        axios.get(`http://localhost:8080/api/${userName}/${url}`, {headers:{'auth-token':'token'}, withCredentials: true})
            .then(response => {
                console.log(response.data)
                const pageDTO = response.data as PageDTO
                if(!pageDTO) {
                    this.setState({fetched: true, pageId: '', page: undefined });
                }
                console.log(response.data)
                const page = PageMapper.toDomain(response.data as PageDTO)
                this.setState({fetched: true, pageId: page._id, page: page });
            }).catch(e => {
            throw new Error(e);
        });
    }

    getModuleComponents(){
        if(!this.state.fetched) {
            this.fetchPageById(this.state.pageId)
        }
        const moduleComponents: any = []

        this.state.page.modules.forEach( module => {
            switch (module.getType()) {
                case "text": {
                    moduleComponents.push(<TextModuleComponent key={module.getId()} module={module as unknown as TextModule} editable={false} pageId={this.state.pageId}/>)
                    break
                }

                case "poll": {
                    moduleComponents.push(<PollModuleComponent key={module.getId()} pageId={this.state.pageId} module={module as unknown as PollModule}/>)
                }
            }
        })

        return moduleComponents
    }

    render() {
        if(this.state.fetched) {
            return <div className='page'>
                <Link className='home-button' to={{pathname: `/home`}}>
                Vissza a kezdőlapra
                </Link>
                <h1>{this.state.page.title}</h1>
                <div className='moduleContainer'>
                {this.getModuleComponents()}
                </div>
            </div>

        }

        return 'Waiting for fetch'
    }
}
