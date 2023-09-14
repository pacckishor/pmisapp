import React, { Component } from 'react';

import { saveForeignTraining } from '../util/APIUtils';


import './AddForeignTraining.css';

import {
    POSTING_STATUS_NAME_MAX_LENGTH, POSTING_STATUS_NAME_MIN_LENGTH
} from '../constants';

import { Form, Input, Button, notification } from 'antd';
const FormItem = Form.Item;


class AddForeignTraining extends Component {
    constructor(props) {
        super(props);
        this.state = {
            govId: {
                value: ''
            },

            foreignTrainingTitleName: {
                value: ''
            },

            instituteName: {
                value: ''
            },

            cuntryId: {
                value: ''
            },

            fromDate: {
                value: ''
            },

            endDate: {
                value: ''
            },

            duration: {
                value: ''
            },

            grade: {
                value: ''
            },

            position: {
                value: ''
            },

            remark: {
                value: ''
            },


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

        const foreignTrainingInfoRequest = {
            govId: this.state.govId.value,
            foreignTrainingTitleName: this.state.foreignTrainingTitleName.value,
            instituteName: this.state.instituteName.value,
            cuntryId: this.state.cuntryId.value,
            fromDate: this.state.fromDate.value,
            endDate: this.state.endDate.value,
            duration: this.state.duration.value,
            grade: this.state.grade.value,
            position: this.state.position.value,
            remark: this.state.remark.value

        };

        saveForeignTraining(foreignTrainingInfoRequest)
            .then(response => {
                notification.success({
                    message: 'PMIS',
                    description: "Record saved.",
                });
                this.props.history.push("/foreigntraining/list");
            }).catch(error => {
            notification.error({
                    message: 'PMIS',
                    description: error.message || 'Oops! Please try again!'
            });
        });
    }

    isFormInvalid() {
        return !(this.state.govId.validateStatus === 'success',
         !this.state.foreignTrainingTitleName.validateStatus === 'success',
         !this.state.instituteName.validateStatus === 'success',
         !this.state.cuntryId.validateStatus === 'success',
         !this.state.fromDate.validateStatus === 'success',
         !this.state.endDate.validateStatus === 'success',
         !this.state.duration.validateStatus === 'success',
         !this.state.grade.validateStatus === 'success',
         !this.state.position.validateStatus === 'success',
         !this.state.remark.validateStatus === 'succcess'
        );
    }

    render() {
        return (
            <div className="foreign-training-container">
                <h2 className="page-title">Create Foreign Training</h2>
                <div className="">
                    <Form onSubmit={this.handleSubmit} className="">
                       
                       <FormItem
                            label="Employee Govt ID"
                            validateStatus={this.state.govId.validateStatus}
                            help={this.state.govId.errorMsg}>
                            <Input
                                size="large"
                                name="govId"
                                autoComplete="off"
                                placeholder="Please input Employee Govt ID"
                                value={this.state.govId.value}
                                onChange={(event) => this.handleInputChange(event, this.validateGovId)} />
                        </FormItem>

                        <FormItem
                            label="Training Title Name"
                            validateStatus={this.state.foreignTrainingTitleName.validateStatus}
                            help={this.state.foreignTrainingTitleName.errorMsg}>
                            <Input
                                size="large"
                                name="foreignTrainingTitleName"
                                autoComplete="off"
                                placeholder="Please input Training Title Name"
                                value={this.state.foreignTrainingTitleName.value}
                                onChange={(event) => this.handleInputChange(event, this.validateForeignTrainingTitleName)} />
                        </FormItem>


                        <FormItem
                            label="Institute Name"
                            validateStatus={this.state.instituteName.validateStatus}
                            help={this.state.instituteName.errorMsg}>
                            <Input
                                size="large"
                                name="instituteName"
                                autoComplete="off"
                                placeholder="Please input Institute Name"
                                value={this.state.instituteName.value}
                                onChange={(event) => this.handleInputChange(event, this.validateInstituteName)} />
                        </FormItem>
                       
                        <FormItem
                            label="Country Name"
                            validateStatus={this.state.cuntryId.validateStatus}
                            help={this.state.cuntryId.errorMsg}>
                            <Input
                                size="large"
                                name="cuntryId"
                                autoComplete="off"
                                placeholder="Please input Country Name"
                                value={this.state.cuntryId.value}
                                onChange={(event) => this.handleInputChange(event, this.validateCuntryId)} />
                        </FormItem>

                        <FormItem
                            label="Start Date of Training"
                            validateStatus={this.state.fromDate.validateStatus}
                            help={this.state.fromDate.errorMsg}>
                            <Input
                                size="large"
                                name="fromDate"
                                autoComplete="off"
                                placeholder="Please input From Date (yyyy-mm-dd)"
                                value={this.state.fromDate.value}
                                onChange={(event) => this.handleInputChange(event, this.validateFromDate)} />
                        </FormItem>

                        <FormItem
                            label="End Date of Training"
                            validateStatus={this.state.endDate.validateStatus}
                            help={this.state.endDate.errorMsg}>
                            <Input
                                size="large"
                                name="endDate"
                                autoComplete="off"
                                placeholder="Please input End Date (yyyy-mm-dd)"
                                value={this.state.endDate.value}
                                onChange={(event) => this.handleInputChange(event, this.validateEndDate)} />
                        </FormItem>

                        <FormItem
                            label="Duration of Training"
                            validateStatus={this.state.duration.validateStatus}
                            help={this.state.duration.errorMsg}>
                            <Input
                                size="large"
                                name="duration"
                                autoComplete="off"
                                placeholder="Please input Duration of Training"
                                value={this.state.duration.value}
                                onChange={(event) => this.handleInputChange(event, this.validateDuration)} />
                        </FormItem>

                        <FormItem
                            label="Grade Point"
                            validateStatus={this.state.grade.validateStatus}
                            help={this.state.grade.errorMsg}>
                            <Input
                                size="large"
                                name="grade"
                                autoComplete="off"
                                placeholder="Please input Grade Point"
                                value={this.state.grade.value}
                                onChange={(event) => this.handleInputChange(event, this.validateGrade)} />
                        </FormItem>

                        <FormItem
                            label="Position"
                            validateStatus={this.state.position.validateStatus}
                            help={this.state.position.errorMsg}>
                            <Input
                                size="large"
                                name="position"
                                autoComplete="off"
                                placeholder="Please input Position"
                                value={this.state.position.value}
                                onChange={(event) => this.handleInputChange(event, this.validatePosition)} />
                        </FormItem>

                        <FormItem
                            label="Remark"
                            validateStatus={this.state.remark.validateStatus}
                            help={this.state.remark.errorMsg}>
                            <Input
                                size="large"
                                name="remark"
                                autoComplete="off"
                                placeholder="Please input Remark"
                                value={this.state.remark.value}
                                onChange={(event) => this.handleInputChange(event, this.validateRemark)} />
                        </FormItem>


                        <FormItem>
                            <Button type="primary"
                                    htmlType="submit"
                                    size="large"
                                    className="foreign-training-form-button"
                                    >Save</Button>
                        </FormItem>

                    </Form>
                </div>
            </div>
        );
    }

    // Validation Functions

    validateGovId = (govId) => {
        if(!govId) {
            return {
                validateStatus: 'error',
                errorMsg: 'Country ID may not be empty'
            }
        }
    }

    validateForeignTrainingTitleName = (foreignTrainingTitleName) => {
        if(foreignTrainingTitleName.length < POSTING_STATUS_NAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Status Name is too short (Minimum ${POSTING_STATUS_NAME_MIN_LENGTH} characters needed.)`
            }
        } else if (foreignTrainingTitleName.length > POSTING_STATUS_NAME_MAX_LENGTH) {
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

    validateInstituteName = (instituteName) => {
        if(!instituteName) {
            return {
                validateStatus: 'error',
                errorMsg: 'Field is Required'
            }
        }
    }

    validateCuntryId = (cuntryId) => {
        if(!cuntryId) {
            return {
                validateStatus: 'error',
                errorMsg: 'Country ID may not be empty'
            }
        }
    }

    validateFromDate = (fromDate) => {
        if(!fromDate) {
            return {
                validateStatus: 'error',
                errorMsg: 'Field is Required'
            }
        }
    }

    validateEndDate = (endDate) => {
        if(!endDate) {
            return {
                validateStatus: 'error',
                errorMsg: 'Field is Required'
            }
        }
    }

    validateDuration = (duration) => {
        if(!duration) {
            return {
                validateStatus: 'error',
                errorMsg: 'Field is Required'
            }
        }
    }

    validateGrade = (grade) => {
        if(!grade) {
            return {
                validateStatus: 'error',
                errorMsg: 'Field is Required'
            }
        }
    }

    validatePosition = (position) => {
        if(!position) {
            return {
                validateStatus: 'error',
                errorMsg: 'Field is Required'
            }
        }
    }

    validateRemark = (remark) => {
        if(!remark) {
            return {
                validateStatus: 'error',
                errorMsg: 'Field is Required'
            }
        }
    }


}

export default AddForeignTraining;