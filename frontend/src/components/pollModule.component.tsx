import React, {SyntheticEvent} from "react";
import {PollModule} from "../domain/model/modules/PollModule";
import axios from "axios";
import BaseModuleComponent, {BaseModuleComponentProps, BaseModuleComponentState} from "./BaseModule.component";
import {FiEdit, FiTrash2} from "react-icons/all";
import {PollOption} from "../domain/model/PollOption";
import {inspect} from "util";

interface PollModuleComponentState extends BaseModuleComponentState{
    voted: boolean,
    selectedId?: string
}

export default class PollModuleComponent extends BaseModuleComponent<PollModuleComponentState> {
    constructor(props: BaseModuleComponentProps) {
        super(props);

        this.state = {
            ...this.state,
            pageId: this.props.pageId,
            voted: false,
            selectedId: ''
        } as PollModuleComponentState;
    }

    async sendVote(){
        const result = await axios.post('http://localhost:8080/api/pages/vote',
            {pageId:this.state.pageId, votedId: this.state.selectedId, moduleId: this.state.module.getId()})
            .then(() => {
                return 'voted';
            }).catch(e => {
                console.log(e)
                throw new Error(e);
            });
    }

    async handleVote(e: SyntheticEvent) {
        e.preventDefault()
        if(!this.state.selectedId) {
            return
        }

        const votedModule = (this.state.module as PollModule).voteForOption(this.state.selectedId);
        this.setState({voted: true, module: votedModule}, () => this.sendVote())
    }

    getResultsRendered(){
        return (this.state.module as PollModule).getOptions().map((option: PollOption) => (
            <p>
                <label>{option.getText()}: {option.getNumberOfVotes()}</label>
            </p>
        ))
    }

    getOptionsRendered(){
        return (this.state.module as PollModule).getOptions().map((option: PollOption) => (
            <p>
                <input type="radio" name='pollOption' key={option.getId()} onChange={ () => {
                    this.setState({selectedId: option.getId()})
                    console.log(`selected: ${this.state.selectedId}`)
                }}/>
                <label>{option.getText()}</label>
            </p>
        ))
    }

    renderModule(): JSX.Element {
        if(!this.state.voted) {
            const renderedOptions = this.getOptionsRendered()

            return <div className='module'>
                <p>{this.state.module.getQuestion()}</p>
                <form onSubmit={this.handleVote.bind(this)}>
                    {renderedOptions}
                    <input type='submit' value='Szavazás'/></form>
            </div>
        }

        const renderedResults = this.getResultsRendered()

        return <div className='module'>
            <p>{this.state.module.getQuestion()}</p>
            {renderedResults}
        </div>
    }

    renderEditing(): JSX.Element {
        if(!this.state.voted) {
            const renderedOptions = this.getOptionsRendered()

            return <div className='module'>
                <p>{(this.state.module as PollModule).getQuestion()}</p>
                <form onSubmit={this.handleVote.bind(this)}>
                    {renderedOptions}
                    <input type='submit' value='Szavazás'/></form>
            </div>
        }

        const renderedResults = this.getResultsRendered()

        return <div className='module'>
            <p>{(this.state.module as PollModule).getQuestion()}</p>
            {renderedResults}
        </div>
    }

    renderEditable(): JSX.Element {
        const renderedOptions = this.getOptionsRendered()

        return <div className={`module ${this.getPlaceClassName()}`}>
            <button className='edit-module-button' onClick={this.handleOnEdit.bind(this)}>
                <FiEdit/>
            </button>
            <button className='delete-module-button' onClick={((e: React.MouseEvent) => this.deleteModule(e)).bind(this)}>
                <FiTrash2/>
            </button>
            <p>{this.state.module.getQuestion()}</p>
            <form onSubmit={ (e) => e.preventDefault()}>
                {renderedOptions}
            <input type='submit' value='Szavazás'/></form>
        </div>
    }
}
