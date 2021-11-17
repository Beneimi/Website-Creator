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
                const pageDTO = response.data as PageDTO
                if(!pageDTO) {
                    this.setState({fetched: true, pageId: pageId, page: undefined });
                }
                const page = PageMapper.toDomain(response.data as PageDTO)
                this.setState({fetched: true, pageId: pageId, page: page });
            }).catch(e => {
            throw new Error(e);
        });
    }

    fetchPageByOwnerNameAndUrl(userName: string, url: string){
        axios.get(`http://localhost:8080/api/${userName}/${url}`, {headers:{'auth-token':'token'}, withCredentials: true})
            .then(response => {
                const pageDTO = response.data as PageDTO
                if(!pageDTO) {
                    this.setState({fetched: true, pageId: '', page: undefined });
                }
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
        const leftModuleComponents: any = []
        const rightModuleComponents: any = []
        const middleModuleComponents: any = []

        this.state.page.modules.forEach( module => {
            switch (module.getType()) {
                case "text": {
                    switch (module.getPlace()) {
                        case 0: {
                            leftModuleComponents.push(<TextModuleComponent key={module.getId()} module={module as unknown as TextModule} editable={false} pageId={this.state.pageId}/>)
                            break
                        }
                        case 1: {
                            middleModuleComponents.push(<TextModuleComponent key={module.getId()} module={module as unknown as TextModule} editable={false} pageId={this.state.pageId}/>)
                            break
                        }
                        case 2: {
                            rightModuleComponents.push(<TextModuleComponent key={module.getId()} module={module as unknown as TextModule} editable={false} pageId={this.state.pageId}/>)
                            break
                        }
                        default: {
                            break
                        }
                    }
                    break
                }

                case "poll": {
                    switch (module.getPlace()) {
                        case 0: {
                                leftModuleComponents.push(<PollModuleComponent key={module.getId()} module={module as unknown as PollModule} editable={false}  pageId={this.state.pageId} />)
                                break
                        }
                        case 1: {
                                middleModuleComponents.push(<PollModuleComponent key={module.getId()} module={module as unknown as PollModule} editable={false}  pageId={this.state.pageId} />)
                                break
                        }
                        case 2: {
                                rightModuleComponents.push(<PollModuleComponent key={module.getId()} module={module as unknown as PollModule} editable={false}  pageId={this.state.pageId} />)
                                break
                        }
                    }
                }
        }})

        return <div  className='moduleContainer'>
            <div className='leftColumn'>
                {leftModuleComponents}
            </div>
            <div className='middleColumn'>
                {middleModuleComponents}
            </div>
            <div className='rightColumn'>
                {rightModuleComponents}
            </div>
        </div>
    }

    render() {
        if(this.state.fetched) {


            return <div>
                <Link className='home-button' to={{pathname: `/home`}}>
                    Vissza a kezdőlapra
                </Link>
                <div className='page'>
                    <h1>{this.state.page.title}</h1>
                    {this.getModuleComponents()}
                </div>
            </div>

        }

        return ''
    }
}
