import React from "react";
import axios from "axios";
import {ModuleMapper} from "../domain/mappers/ModuleMapper";
import {inspect} from "util";
import {FiEdit, FiTrash2} from "react-icons/all";
import {Editor} from "@tinymce/tinymce-react";
import ReactHtmlParser from 'react-html-parser'
import BaseModuleComponent from "./BaseModule.component";
import {TextModule} from "../domain/model/modules/TextModule";

export default class TextModuleComponent extends BaseModuleComponent{
    handleOnEdit(){
        this.setState({editing: true})
    }

    getModule(): TextModule{
        return this.state.module as TextModule
    }

    renderEditable(): JSX.Element {
        return <div className='module'>
            <button className='edit-module-button' onClick={this.handleOnEdit.bind(this)}>
                <FiEdit/>
            </button>
            <button className='delete-module-button' onClick={this.deleteModule.bind(this)}>
                <FiTrash2/>
            </button>
            {ReactHtmlParser(this.getModule().getContent())}
        </div>
    }

    renderEditing(): JSX.Element {
        return <div className='module'>
            <form id='editForm' method='POST' onSubmit={this.saveModule.bind(this)}>
                <Editor
                    onChange={(evt, editor) => this.setState({module: this.getModule().setContent(editor.getContent()) })}
                />
                <input type='submit' title='Log in'/>
            </form>
        </div>
    }

    renderModule(): JSX.Element {
        return <div className='module text-module'>{ReactHtmlParser(this.getModule().getContent())}</div>
    }
}
