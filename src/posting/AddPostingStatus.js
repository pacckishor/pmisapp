import React, { Component } from 'react';
import {savePostingStatus} from '../util/APIUtils';
import './PostingStatus.css';
//import { Link } from 'react-router-dom';
import {
    POSTING_STATUS_NAME_MAX_LENGTH, POSTING_STATUS_NAME_MIN_LENGTH
} from '../constants';

import { Form, Input, Button, notification } from 'antd';
const FormItem = Form.Item;
//const { TextArea } = Input

class AddPostingStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusname: {
                value: ''
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
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

    handleSubmit(event) {
        event.preventDefault();

        const postingStatusRequest = {
            statusname: this.state.statusname.value
        };
        savePostingStatus(postingStatusRequest)
            .then(response => {
                notification.success({
                    message: 'PMIS',
                    description: "Record saved.",
                });
                this.props.history.push("/postingstatuslist");
            }).catch(error => {
            notification.error({
                    message: 'PMIS',
                    
                description: error.message || 'Oops! Please try again!'
            });
        });
    }

    isFormInvalid() {
        return !(this.state.statusname.validateStatusname === 'success' 
        );
    }

    render() {
        return (
            <div className="signup-container">
                <h1 className="page-title">Create Posting Status</h1>
                <div className="signup-content">
                    <Form onSubmit={this.handleSubmit} className="signup-form">
                        <FormItem
                            label="Posting Status Name"
                            validateStatus={this.state.statusname.validateStatusname}
                            help={this.state.statusname.errorMsg}>
                            <Input
                                size="large"
                                name="statusname"
                                autoComplete="off"
                                placeholder="Please input posting status name"
                                value={this.state.statusname.value}
                                onChange={(event) => this.handleInputChange(event, this.validateStatusname)} />
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

    // Validation Functions

    validateStatusname = (statusname) => {
        if(statusname.length < POSTING_STATUS_NAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Status Name is too short (Minimum ${POSTING_STATUS_NAME_MIN_LENGTH} characters needed.)`
            }
        } else if (statusname.length > POSTING_STATUS_NAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Status Name is too long (Maximum ${POSTING_STATUS_NAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
    }
}

export default AddPostingStatus;