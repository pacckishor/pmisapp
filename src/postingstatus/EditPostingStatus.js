import React, { Component } from 'react';
import {getRecordById, updateRecord} from '../util/APIUtils';
import './PostingStatus.css';
//import { Link } from 'react-router-dom';
import {
    POSTING_STATUS_NAME_MAX_LENGTH, POSTING_STATUS_NAME_MIN_LENGTH
} from '../constants';

import { Form, Input, Button, notification } from 'antd';
const FormItem = Form.Item;
//const { TextArea } = Input

class EditPostingStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            postingStatusId: this.props.match.params.id,
            postingStatusName: '',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
        this.changePostingStatusNameHandler = this.changePostingStatusNameHandler.bind(this);
    }

    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName] : {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }


    componentDidMount(){

        let promise = getRecordById("/postingstatus/", this.state.postingStatusId);
        promise.then((res) => {
            this.setState({
                postingStatusName : res.postingStatusName,
            });
        });
        console.log(promise)
        Promise.all([promise]);
    }


    handleSubmit(event) {
        event.preventDefault();

        const postingStatusRequest = {
            postingStatusName: this.state.postingStatusName
        };

        updateRecord(postingStatusRequest, "/postingstatus/", this.state.postingStatusId)
            .then(response => {
                notification.success({
                    message: 'PMIS',
                    description: "Record updated.",
                });
                this.props.history.push("/postingstatus/list");
            }).catch(error => {
            notification.error({
                message: 'PMIS',

                description: error.message || 'Oops! Please try again!'
            });
        });
    }

    isFormInvalid() {
        return !(this.state.postingStatusName.validatePostingStatusName === 'success'
        );
    }

    changePostingStatusNameHandler= (event) => {
        this.setState({postingStatusName: event.target.value});
    }
    render() {
        return (
            <div className="signup-container">
                <h1 className="page-title">Edit Posting Status</h1>
                <div className="signup-content">
                    <Form onSubmit={this.handleSubmit} className="signup-form">
                        <FormItem
                            label="Posting Status Name"
                            //validateStatus={this.state.postingStatusName.validatePostingStatusName}
                            //help={this.state.postingStatusName.errorMsg}
                            >
                            <Input
                                size="large"
                                name="postingStatusName"
                                value={this.state.postingStatusName}
                                autoComplete="off"
                                placeholder="Please input posting status name"
                                onChange={this.changePostingStatusNameHandler}
                            />
                        </FormItem>
                        <FormItem>
                            <Button type="primary"
                                    htmlType="submit"
                                    size="large"
                                    className="signup-form-button"
                            >Save</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }
}

export default EditPostingStatus;