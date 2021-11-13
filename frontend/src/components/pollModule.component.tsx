import React, {Component, SyntheticEvent} from "react";
import {PollModule} from "../domain/model/modules/PollModule";
import axios from "axios";

interface PollModuleComponentState {
    pageId: string
    pollModule: PollModule,
    voted: boolean,
    selectedId?: string
}

export default class PollModuleComponent extends Component<{pageId: string, module: PollModule }, PollModuleComponentState> {
    constructor(props: { pageId: string, module: PollModule }) {
        super(props);

        this.state = {
            pageId: this.props.pageId,
            pollModule: this.props.module,
            voted: false,
            selectedId: ''
        };
    }

    async sendVote(){
        const result = await axios.post('http://localhost:8080/api/pages/vote',
            {pageId:this.state.pageId, votedId: this.state.selectedId, moduleId: this.state.pollModule.getId()})
            .then(() => {
                return 'voted';
            }).catch(e => {
                throw new Error(e);
            });
        console.log(result);
    }

    async handleVote(e: SyntheticEvent) {
        e.preventDefault()
        if(!this.state.selectedId) {
            return
        }

        const votedModule = this.state.pollModule.voteForOption(this.state.selectedId);
        this.setState({voted: true, pollModule: votedModule}, () => this.sendVote())
    }

    getResultsRendered(){
        return this.state.pollModule.getOptions().map((option) => (
            <p>
                <label>{option.getText()}: {option.getNumberOfVotes()}</label>
            </p>
        ))
    }

    getOptionsRendered(){
        return this.state.pollModule.getOptions().map((option) => (
            <p>
                <input type="radio" name='pollOption' key={option.getId()} onChange={ () => {
                    this.setState({selectedId: option.getId()})
                    console.log(`selected: ${this.state.selectedId}`)
                }}/>
                <label>{option.getText()}</label>
            </p>
        ))
    }

    render() {
        if(!this.state.voted) {
            const renderedOptions = this.getOptionsRendered()

            return <div className='module'>
                <p>{this.state.pollModule.getQuestion()}</p>
                <form onSubmit={this.handleVote.bind(this)}>
                    {renderedOptions}
                    <input type='submit' title='Vote'/></form>
            </div>
        }

        const renderedResults = this.getResultsRendered()

        return <div className='module'>
            <p>{this.state.pollModule.getQuestion()}</p>
                {renderedResults}
        </div>
    }
}
