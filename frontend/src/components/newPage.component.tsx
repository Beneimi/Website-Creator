import React, {Component} from "react";
import axios from "axios";
import {Link, Redirect} from "react-router-dom";
import {Page} from "../domain/model/Page";
import {PageDTO} from "../domain/DTO/PageDTO";
import {PageMapper} from "../domain/mappers/PageMapper";
import {Editor} from "@tinymce/tinymce-react";

interface NewPageState {
    title: string,
    content: string,
    createdPage: Page | undefined
}

export default class NewPageComponent extends Component<{},NewPageState> {
    state = {
        title: 'newPage',
        content: '',
        createdPage: undefined as Page | undefined
    }

    savePage(){
        axios.post(`http://localhost:8080/api/pages/create`, {title: this.state.title, content: this.state.content})
            .then((response) => {
                const page = PageMapper.toDomain(response.data as PageDTO)
                this.setState({createdPage: page});
            }).catch(e => {
            throw new Error(e);
        });
    }

    handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        this.savePage();
    }

    render() {
        if(this.state.createdPage) {
            return <Redirect to={{pathname: `/edit/page/${this.state.createdPage.url}`, state: {pageId: this.state.createdPage._id}}}/>
        }
        return <div>
            <Link to={{pathname: `/home`}}>
                Vissza a kezdőlapra
            </Link>
            <div className='center-form'>
                <form method='POST' onSubmit={this.handleSubmit.bind(this)}>
                    <p>Cím</p>
                    <input name='title' placeholder='Cím' type="text" required={true} onChange={(e) => this.setState( {title: e.currentTarget.value})}/>
                    <p>Bevezető</p>
                    <Editor
                        onChange={(evt, editor) => this.setState({content: editor.getContent() })}
                    />
                    <input type='submit' title='Létrehozás'/>
                </form>
            </div>
        </div>
    }
}
