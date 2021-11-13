import React, {Component} from "react";
import axios from "axios";
import {ModuleMapper} from "../domain/mappers/ModuleMapper";
import {BaseModule} from "../domain/model/modules/BaseModule";
import {inspect} from "util";

interface BaseModuleComponentProps {
    pageId: string,
    module: BaseModule,
    editable: boolean,
    reRenderParentCallback?: (module:BaseModule, remove?:boolean)  => void
}

export default abstract class BaseModuleComponent extends Component<BaseModuleComponentProps,{}> {
    state = {
        reRenderParentCallback: this.props.reRenderParentCallback,
        module: this.props.module,
        editable: this.props.editable,
        editing: false,
    }

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
            throw new Error(e);
        });

        if(this.state.reRenderParentCallback) {
            this.state.reRenderParentCallback(this.state.module)
        }
    }

    deleteModule(e:React.FormEvent){
        e.preventDefault()
        axios.post(`http://localhost:8080/api/pages/deleteModule`, {pageId: this.props.pageId, moduleId: this.state.module.getId()})
            .then(() => {
                this.setState({editing: false});
            }).catch(e => {
            console.log(e)
            throw new Error(e);
        });

        if(this.state.reRenderParentCallback) {
            this.state.reRenderParentCallback(this.state.module, true)
        }
    }

    abstract renderModule(): JSX.Element
    abstract renderEditing(): JSX.Element
    abstract renderEditable(): JSX.Element

    render() {
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
