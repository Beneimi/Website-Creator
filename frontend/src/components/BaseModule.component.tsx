import React, {Component} from "react";
import axios from "axios";
import {ModuleMapper} from "../domain/mappers/ModuleMapper";
import {BaseModule} from "../domain/model/modules/BaseModule";
import {inspect} from "util";
import {Redirect} from "react-router-dom";

export interface BaseModuleComponentProps {
    pageId: string,
    module: BaseModule,
    editable: boolean,
    reRenderParentCallback?: (module:BaseModule, remove?:boolean)  => void
}

export interface BaseModuleComponentState {
    reRenderParentCallback?: (module:BaseModule, remove?:boolean)  => void
    module: BaseModule,
    editable: boolean,
    editing: boolean,
    failedToLoad: boolean
}

export default abstract class BaseModuleComponent<T extends BaseModuleComponentState> extends Component<BaseModuleComponentProps,any> {
    state = {
        pageId: this.props.pageId,
        reRenderParentCallback: this.props.reRenderParentCallback,
        module: this.props.module,
        editable: this.props.editable,
        editing: false,
        failedToLoad: false
    } as any

    handleOnEdit(){
        this.setState({editing: true})
    }

    saveModule(e:React.FormEvent){
        e.preventDefault()
        console.log(inspect({pageId: this.props.pageId, module: ModuleMapper.toDTO(this.state.module)}))
        axios.post(`http://localhost:8080/api/pages/edit`, {pageId: this.props.pageId, module: ModuleMapper.toDTO(this.state.module)})
            .then(() => {
                this.setState({editing: false});
            }).catch(e => {
            console.log(e)
            if (e.response.status === 401) {
                this.setState({failedToLoad: true})
                return
            }
            throw new Error(e);
        });

        if(this.state.reRenderParentCallback) {
            this.state.reRenderParentCallback(this.state.module)
        }
    }

    deleteModule(e:React.FormEvent){
        e.preventDefault()
        console.log('deleting module ' + this.state.module.getId())
        axios.post(`http://localhost:8080/api/pages/deleteModule`, {pageId: this.props.pageId, moduleId: this.state.module.getId()})
            .then(() => {
                this.setState({editing: false});
            }).catch(e => {
            if (e.response.status === 401) {
                this.setState({failedToLoad: true})
            }
            console.log(e)
            throw new Error(e);
        });

        if(this.state.reRenderParentCallback) {
            this.state.reRenderParentCallback(this.state.module, true)
        }
    }

    getPlaceClassName() {
        switch (this.state.module.getPlace()) {
            case 0:
                return 'leftModule'
            case 1:
                return 'middleModule'
            case 2:
                return 'rightModule'
            default:
                throw new Error(`Place ${this.state.module.getPlace()} not known`)
        }
    }

    abstract renderModule(): JSX.Element
    abstract renderEditing(): JSX.Element
    abstract renderEditable(): JSX.Element

    render() {
        if(this.state.failedToLoad) {
            return <Redirect to={{pathname:'/login'}}/>
        }
        if(!this.state.module) {
            return null
        }

        if(this.state.editable) {
            if(this.state.editing) {
                return this.renderEditing()
            }
            return this.renderEditable()
        }
        return this.renderModule()
    }
}
