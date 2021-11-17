import React, {Component} from "react";
import {Link, Redirect, RouteComponentProps} from 'react-router-dom'
import axios from "axios";
import TextModuleComponent from "./textModule.component";
import PollModuleComponent from "./pollModule.component";
import {PageMapper} from "../domain/mappers/PageMapper";
import {PageDTO} from "../domain/DTO/PageDTO";
import {TextModule} from "../domain/model/modules/TextModule";
import {PollModule} from "../domain/model/modules/PollModule";
import {Page} from "../domain/model/Page";
import NewModuleComponent from "./newModule.component";
import {BaseModule} from "../domain/model/modules/BaseModule";
import {inspect} from "util";

interface LocationState {
    pageId: string
}

const initialState = {
    failedToLoad: false,
    fetched: false,
    pageId: '',
    page: { } as Page
}

export default class EditPageComponent extends Component<RouteComponentProps<LocationState>,{}> {
    state = initialState

    componentDidMount() {
        const pageId = (this.props.location.state as LocationState).pageId;
        this.fetchPage(pageId);
    }

    fetchPage(pageId: string){
        axios.get(`http://localhost:8080/api/${pageId}/`, {headers:{'auth-token':'token'}, withCredentials: true})
            .then(response => {
                const pageDTO = response.data as PageDTO
                if(!pageDTO) {
                    this.setState({fetched: true, pageId: pageId, page: undefined });
                }
                try {
                    const page = PageMapper.toDomain(response.data as PageDTO)
                    this.setState({fetched: true, pageId: pageId, page: page });
                } catch (e) {
                    console.log(e)
                    this.setState({failedToLoad: true});
                }
            }).catch(e => {
            if(e.response.status === 401) {
                this.setState({failedToLoad: true});
                return
            }
            throw new Error(e);
        });
    }

    reRenderForModuleUpdate(module: BaseModule, remove=false) {
        if(remove) {
            this.setState({page: this.state.page.deleteModule(module.getId())})
            this.forceUpdate()

            return
        }
        this.setState({page: this.state.page.updateModule(module)})
        this.forceUpdate()
    }

    getModuleComponents(){
        if(!this.state.fetched) {
            this.fetchPage(this.state.pageId)
        }

        const leftModuleComponents: any = []
        const rightModuleComponents: any = []
        const middleModuleComponents: any = []

        middleModuleComponents.push(<NewModuleComponent pageId={this.state.pageId} reRenderParentCallback={this.reRenderForModuleUpdate.bind(this)}/>)

        this.state.page.modules.forEach( module => {
            switch (module.getType()) {
                case "text": {
                    switch (module.getPlace()) {
                        case 0: {
                            leftModuleComponents.push(<TextModuleComponent key={module.getId()} module={module as unknown as TextModule} editable={true} pageId={this.state.pageId} reRenderParentCallback={this.reRenderForModuleUpdate.bind(this)}/>)
                            break
                        }
                        case 1: {
                            middleModuleComponents.push(<TextModuleComponent key={module.getId()} module={module as unknown as TextModule} editable={true} pageId={this.state.pageId} reRenderParentCallback={this.reRenderForModuleUpdate.bind(this)}/>)
                            break
                        }
                        case 2: {
                            rightModuleComponents.push(<TextModuleComponent key={module.getId()} module={module as unknown as TextModule} editable={true} pageId={this.state.pageId} reRenderParentCallback={this.reRenderForModuleUpdate.bind(this)}/>)
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
                            leftModuleComponents.push(<PollModuleComponent editable={true} key={module.getId()} pageId={this.state.pageId} module={module as unknown as PollModule} reRenderParentCallback={this.reRenderForModuleUpdate.bind(this)}/>)
                            break
                        }
                        case 1: {
                            middleModuleComponents.push(<PollModuleComponent editable={true} key={module.getId()} pageId={this.state.pageId} module={module as unknown as PollModule} reRenderParentCallback={this.reRenderForModuleUpdate.bind(this)}/>)
                            break
                        }
                        case 2: {
                            rightModuleComponents.push(<PollModuleComponent editable={true} key={module.getId()} pageId={this.state.pageId} module={module as unknown as PollModule} reRenderParentCallback={this.reRenderForModuleUpdate.bind(this)}/>)
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
        </div>    }

    render() {
        if(this.state.failedToLoad) {
            return <Redirect to={{pathname:'/login'}}/>
        }
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

        return 'Waiting for fetch'
    }
}
