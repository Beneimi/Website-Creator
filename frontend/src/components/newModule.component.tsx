import React, {Component, FormEvent} from "react";
import axios from "axios";
import {BaseModule} from "../domain/model/modules/BaseModule";
import {ModuleMapper} from "../domain/mappers/ModuleMapper";
import {TextModule} from "../domain/model/modules/TextModule";
import {ModuleTypeEnum} from "../domain/interfaces";
import {inspect} from "util";
import {Editor} from "@tinymce/tinymce-react";
import {PollModule} from "../domain/model/modules/PollModule";
import {PollOption} from "../domain/model/PollOption";

const initialState = {
    typeSelected: false,
    editing: false,
    moduleType:  ModuleTypeEnum.TextModule as ModuleTypeEnum,
    module: undefined as (BaseModule | undefined),
    optionsCache: ''
}


export default class NewModuleComponent extends Component<{pageId: string , reRenderParentCallback?: (module:BaseModule)  => void},{}> {
    state = {reRenderParentCallback: this.props.reRenderParentCallback, ...initialState}

    handleOnEdit(){
        this.setState({editing: true})
    }

    handleTypeSelection(e:React.ChangeEvent<HTMLSelectElement>){
        console.log('select type' + inspect(e.currentTarget.value))
        this.setState({moduleType: e.currentTarget.value as ModuleTypeEnum})
    }

    handleTypeSelected(e:React.FormEvent){
        e.preventDefault()
        console.log('Type selected' + this.state.moduleType)
        switch (this.state.moduleType) {
            case ModuleTypeEnum.TextModule: {
                this.setState({typeSelected: true, module: new TextModule('')})
                break
            }case ModuleTypeEnum.PollModule: {
                this.setState({typeSelected: true, module: new PollModule('','')})
            }
        }
    }

    saveModule(e:React.FormEvent){
        e.preventDefault()
        if(!this.state.module) {
            throw new Error('There is no module to save')
        }
        axios.post(`http://localhost:8080/api/pages/addModule`, {pageId: this.props.pageId, module: ModuleMapper.toDTO(this.state.module)})
            .then((response) => {
                this.setState({editing: false});
            }).catch(e => {
            console.log(e)
            throw new Error(e);
        });

        if(this.state.reRenderParentCallback) {
            this.state.reRenderParentCallback(this.state.module)
        }
        this.setState(initialState)
    }

    handlePollModuleSave(e: React.FormEvent) {
        const rawOptions = this.parseOptions(this.state.optionsCache)
        rawOptions.forEach( (rawOption) => {
            this.setState({module: (this.state.module as PollModule).addOption(rawOption)})
        })

        this.saveModule(e)
    }

    renderTextModuleEditor() {
        return <div className='module'>
            <form method='POST' onSubmit={this.saveModule.bind(this)}>
                <Editor
                    onChange={(evt, editor) => this.setState({module: (this.state.module as TextModule).setContent(editor.getContent()) })}
                />
                <input value='Létrehozás' type="submit"/>
            </form>
        </div>
    }

    parseOptions(options: string) {
        return options.split(',').map(option => option.trim())
    }

    renderPollModuleEditor() {
        return <div className='module'>
            <form method='POST' onSubmit={this.handlePollModuleSave.bind(this)}>
                <input name='question' placeholder='Szavazás címe' type="text" onChange={((e:FormEvent<HTMLInputElement>) => {
                    this.setState({module: (this.state.module as PollModule).setQuestion(e.currentTarget.value)})
                    }).bind(this)
                }/>
                <input name='options' placeholder='Lehetőségek (vesszővel elválasztva)' type="text" onChange={((e:FormEvent<HTMLInputElement>) => {
                    this.setState({optionsCache: e.currentTarget.value})
                }).bind(this)}/>
                <input value='Létrehozás' type="submit"/>
            </form>
        </div>
    }

    render() {
        if(this.state.editing) {
            if(this.state.typeSelected) {
                switch(this.state.moduleType){
                    case ModuleTypeEnum.TextModule: {
                        return this.renderTextModuleEditor()
                    }
                    case ModuleTypeEnum.PollModule: {
                        return this.renderPollModuleEditor()
                    }
                }
            }
            return <div className='module'>
                <form method='POST' onSubmit={this.handleTypeSelected.bind(this)}>
                    <label >Válassz modul típust!</label>
                    <select value={this.state.moduleType} onChange={this.handleTypeSelection.bind(this)}>
                        <option value="text">Szöveges</option>
                        <option value="poll">Szavazás</option>
                    </select>
                    <input value='Létrehozás' type="submit"/>
                </form>
            </div>
        }

        return <div className='module'><button className='edit-module-button' onClick={this.handleOnEdit.bind(this)}>Új modul</button></div>

    }
}
