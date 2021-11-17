import React from "react";
import {FiEdit, FiTrash2} from "react-icons/all";
import {Editor} from "@tinymce/tinymce-react";
import ReactHtmlParser from 'react-html-parser'
import BaseModuleComponent, {BaseModuleComponentState} from "./BaseModule.component";
import {TextModule} from "../domain/model/modules/TextModule";

export default class TextModuleComponent extends BaseModuleComponent<BaseModuleComponentState>{
    state: BaseModuleComponentState = this.state

    handleOnEdit(){
        this.setState({editing: true})
    }

    getModule(): TextModule{
        return this.state.module as TextModule
    }

    renderEditable(): JSX.Element {
        return <div className={`module ${this.getPlaceClassName()}`}>
            <button className='edit-module-button' onClick={this.handleOnEdit.bind(this)}>
                <FiEdit/>
            </button>
            <button className='delete-module-button' onClick={this.deleteModule.bind(this)}>
                <FiTrash2/>
            </button>
            {this.renderModule()}
        </div>
    }

    renderEditing(): JSX.Element {
        return <div className='module'>
            <form id='editForm' method='POST' onSubmit={this.saveModule.bind(this)}>
                <Editor
                  initialValue={'dfsfd'}
                    onChange={(evt, editor) => this.setState({module: this.getModule().setContent(editor.getContent()) })}
                />
                <input type='submit' title='Log in'/>
            </form>
        </div>
    }

    renderModule(): JSX.Element {
        return <div className={`module ${this.getPlaceClassName()} text-module`}>{ReactHtmlParser(this.getModule().getContent())}</div>
    }
}
