import React, { Component } from 'react';
import {saveActivity} from '../util/APIUtils';
import './AddGeneralInfo.css';
import { Link } from 'react-router-dom';
import {
    ACTIVITY_NAME_MIN_LENGTH, ACTIVITY_NAME_MAX_LENGTH,
    USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH, DESCRIPTION_MAX_LENGTH
} from '../constants';

import { Form, Input, Button, notification } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input

class AddActivity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activityName: {
                value: ''
            },
            descriptions: {
                value: ''
            },
            prerequisites: {
                value: ''
            },
            notes: {
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

        const saveActivityRequest = {
            activityName: this.state.activityName.value,
            descriptions: this.state.descriptions.value,
            prerequisites: this.state.prerequisites.value,
            notes: this.state.notes.value
        };
        saveActivity(saveActivityRequest)
            .then(response => {
                notification.success({
                    message: 'PMIS',
                    description: "Activity created successfully",
                });
                this.props.history.push("/activityList");
            }).catch(error => {
            notification.error({
                    message: 'PMIS',
                    
                description: error.message || 'Sorry! Something went wrong. Please try again!'
            });
        });
    }

    isFormInvalid() {
        return !(this.state.activityName.validateStatus === 'success' &&
            this.state.notes.validateStatus === 'success'
        );
    }

    render() {
        return (
            <div className="signup-container">
                <h1 className="page-title">Create Activity</h1>
                <div className="signup-content">
                    <Form onSubmit={this.handleSubmit} className="signup-form">
                        <FormItem
                            label="Activity Name"
                            validateStatus={this.state.activityName.validateStatus}
                            help={this.state.activityName.errorMsg}>
                            <Input
                                size="large"
                                name="activityName"
                                autoComplete="off"
                                placeholder="Enter activity name"
                                value={this.state.activityName.value}
                                onChange={(event) => this.handleInputChange(event, this.validateActivityName)} />
                        </FormItem>
                        <FormItem label="Descriptions"
                                  validateStatus={this.state.descriptions.validateStatus}
                                  help={this.state.descriptions.errorMsg}>
                            <TextArea
                                size="large"
                                name="descriptions"
                                autoComplete="off"
                                placeholder="Enter descriptions"
                                value={this.state.descriptions.value}
                                onChange={(event) => this.handleInputChange(event, this.validateDescriptions)} />
                        </FormItem>
                        <FormItem
                            label="Prerequisites"
                            validateStatus={this.state.prerequisites.validateStatus}
                            help={this.state.prerequisites.errorMsg}>
                            <Input
                                size="large"
                                name="prerequisites"
                                autoComplete="off"
                                placeholder="Enter prerequisites"
                                value={this.state.prerequisites.value}
                                onChange={(event) => this.handleInputChange(event, this.validatePrerequisites)} />
                        </FormItem>
                        <FormItem
                            label="Notes"
                            validateStatus={this.state.notes.validateStatus}
                            help={this.state.notes.errorMsg}>
                            <Input
                                size="large"
                                name="notes"
                                autoComplete="off"
                                placeholder="Enter notes"
                                value={this.state.notes.value}
                                onChange={(event) => this.handleInputChange(event, this.validateNotes)} />
                        </FormItem>
                        <FormItem>
                            <Button type="primary"
                                    htmlType="submit"
                                    size="large"
                                    className="signup-form-button"
                                    disabled={this.isFormInvalid()}>Create Activity</Button>
                            Already registed? <Link to="/login">Login now!</Link>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }

    // Validation Functions

    validateActivityName = (activityName) => {
        if(activityName.length < ACTIVITY_NAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Activity Name is too short (Minimum ${ACTIVITY_NAME_MIN_LENGTH} characters needed.)`
            }
        } else if (activityName.length > ACTIVITY_NAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Activity Name is too long (Maximum ${ACTIVITY_NAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
    }

    validateDescriptions = (descriptions) => {
        if(!descriptions) {
            return {
                validateStatus: 'error',
                errorMsg: 'Descriptions may not be empty'
            }
        }


        if(descriptions.length > DESCRIPTION_MAX_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Descriptions is too long (Maximum ${DESCRIPTION_MAX_LENGTH} characters allowed)`
            }
        }

        return {
            validateStatus: null,
            errorMsg: null
        }
    }

    validatePrerequisites = (prerequisites) => {
        if(prerequisites.length < USERNAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `prerequisites is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed.)`
            }
        } else if (prerequisites.length > USERNAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `prerequisites is too long (Maximum ${USERNAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: null,
                errorMsg: null
            }
        }
    }



    validateNotes = (notes) => {
        if(notes.length < USERNAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Notes is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed.)`
            }
        } else if (notes.length > USERNAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Notes is too long (Maximum ${USERNAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
    }

}

export default AddActivity;