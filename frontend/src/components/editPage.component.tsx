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
            console.log(e)
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
        const moduleComponents: any = []

        this.state.page.modules.forEach( module => {
            switch (module.getType()) {
                case "text": {
                    moduleComponents.push(<TextModuleComponent key={module.getId()} module={module as unknown as TextModule} editable={true} pageId={this.state.pageId} reRenderParentCallback={this.reRenderForModuleUpdate.bind(this)}/>)
                    break
                }

                case "poll": {
                    moduleComponents.push(<PollModuleComponent key={module.getId()} pageId={this.state.pageId} module={module as unknown as PollModule}/>)
                }
            }
        })
        moduleComponents.push(<NewModuleComponent pageId={this.state.pageId} reRenderParentCallback={this.reRenderForModuleUpdate.bind(this)}/>)


        return moduleComponents
    }

    render() {
        if(this.state.failedToLoad) {
            return <h1>Failed to load Page =(</h1>
        }
        if(this.state.fetched) {
            return <div>
                <Link className='home-button' to={{pathname: `/home`}}>
                    Vissza a kezdőlapra
                </Link>
                <div className='page'>
                    <h1>{this.state.page.title}</h1>
                    <div className='moduleContainer'>
                        {this.getModuleComponents()}
                    </div>
                </div>
            </div>
        }

        return 'Waiting for fetch'
    }
}
