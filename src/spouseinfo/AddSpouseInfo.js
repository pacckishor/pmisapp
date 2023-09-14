
import React, { Component } from 'react';
import {saveSpouseInfo} from '../util/APIUtils';
import './AddSpouseInfo.css';
import { Link } from 'react-router-dom';
import {
    SPOUSEINFO_MAX_LENGTH, SPOUSEINFO_MIN_LENGTH
} from '../constants';

import { Form, Input, Button, notification } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input

class AddSpouseInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            govId: { value: '' },

            spouseName: { value: '' },

            occupationName: { value: '' },

            designationName: { value: '' },

            organizationName: { value: '' },

            homeDistrictId: { value: '' },

            remarks: { value: '' },


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

        const spouseInfoRequest = {
            govId: this.state.govId.value,
            spouseName: this.state.spouseName.value,
            occupationName: this.state.occupationName.value,
            designationName: this.state.designationName.value,
            organizationName: this.state.organizationName.value,
            homeDistrictId: this.state.homeDistrictId.value,
            remarks: this.state.remarks.value
        };
        saveSpouseInfo(spouseInfoRequest)
            .then(response => {
                notification.success({
                    message: 'PMIS',
                    description: "Record saved.",
                });
                this.props.history.push("/spouseinfo/list");
            }).catch(error => {
            notification.error({
                    message: 'PMIS',
                    
                description: error.message || 'Oops! Please try again!'
            });
        });
    }

    isFormInvalid() {
        return !(this.state.govId.validateGovId === 'success',
        this.state.spouseName.validateSpouseName === 'success',
        this.state.occupationName.validateOccupationName === 'success',
        this.state.designationName.validateDesignationName === 'success',
        this.state.organizationName.validateOrganizationName === 'success',
        this.state.homeDistrictId.validateHomeDistricId === 'success',
        this.state.remarks.validateremarks === 'success'
        );
    }

    render() {
        return (
            <div className="signup-container">
                <h1 className="page-title">Create SpouseInfo</h1>
                <div className="signup-content">
                    <Form onSubmit={this.handleSubmit} className="signup-form">
                        
                        <FormItem
                            label="govId"
                            validateStatus={this.state.govId.validateStatus}
                            help={this.state.govId.errorMsg}>
                            <Input
                                size="large"
                                name="govId"
                                autoComplete="off"
                                placeholder="Please input Govt ID"
                                value={this.state.govId.value}
                                onChange={(event) => this.handleInputChange(event, this.validateGovId)} />
                        </FormItem>

                        <FormItem
                            label="Spouse Name"
                            validateStatus={this.state.spouseName.validateStatus}
                            help={this.state.spouseName.errorMsg}>
                            <Input
                                size="large"
                                name="spouseName"
                                autoComplete="off"
                                placeholder="Please input spouse name"
                                value={this.state.spouseName.value}
                                onChange={(event) => this.handleInputChange(event, this.validateSpouseName)} />
                        </FormItem>

                        <FormItem
                            label="Occupation Name"
                            validateStatus={this.state.occupationName.validateStatus}
                            help={this.state.occupationName.errorMsg}>
                            <Input
                                size="large"
                                name="occupationName"
                                autoComplete="off"
                                placeholder="Please input occupation name"
                                value={this.state.occupationName.value}
                                onChange={(event) => this.handleInputChange(event, this.validateoccupationName)} />
                        </FormItem>

                        <FormItem
                            label="Designation Name"
                            validateStatus={this.state.designationName.validateStatus}
                            help={this.state.designationName.errorMsg}>
                            <Input
                                size="large"
                                name="designationName"
                                autoComplete="off"
                                placeholder="Please input designation name"
                                value={this.state.designationName.value}
                                onChange={(event) => this.handleInputChange(event, this.validateDesignationName)} />
                        </FormItem>

                        <FormItem
                            label="Organization Name"
                            validateStatus={this.state.organizationName.validateStatus}
                            help={this.state.organizationName.errorMsg}>
                            <Input
                                size="large"
                                name="organizationName"
                                autoComplete="off"
                                placeholder="Please input organization name"
                                value={this.state.organizationName.value}
                                onChange={(event) => this.handleInputChange(event, this.validateOrganizationName)} />
                        </FormItem>

                        <FormItem
                            label="Home District ID"
                            validateStatus={this.state.homeDistrictId.validateStatus}
                            help={this.state.homeDistrictId.errorMsg}>
                            <Input
                                size="large"
                                name="homeDistrictId"
                                autoComplete="off"
                                placeholder="Please input homedistrict id"
                                value={this.state.homeDistrictId.value}
                                onChange={(event) => this.handleInputChange(event, this.validateHomeDistricId)} />
                        </FormItem>
                        
                        <FormItem
                            label="Remarks"
                            validateStatus={this.state.remarks.validateStatus}
                            help={this.state.remarks.errorMsg}>
                            <Input
                                size="large"
                                name="remarks"
                                autoComplete="off"
                                placeholder="Please input remarks"
                                value={this.state.remarks.value}
                                onChange={(event) => this.handleInputChange(event, this.validateremarks)} />
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

    validateGovId = (govId) => {
        if(!govId) {
            return {
                validateStatus: 'error',
                errorMsg: 'Govt Id may not be empty'
            }
        }     
    }

    validateSpouseName = (spouseName) => {
        if(spouseName.length < SPOUSEINFO_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Status Name is too short (Minimum ${SPOUSEINFO_MIN_LENGTH} characters needed.)`
            }
        } else if (spouseName.length > SPOUSEINFO_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Status Name is too long (Maximum ${SPOUSEINFO_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
    }

    validateoccupationName = (occupationName) => {
        if(!occupationName) {
            return {
                validateStatus: 'error',
                errorMsg: 'occupation name may not be empty'
            }
        }     
    }

    validateDesignationName = (designationName) => {
        if(!designationName) {
            return {
                validateStatus: 'error',
                errorMsg: 'designation name may not be empty'
            }
        }     
    }

    validateOrganizationName = (organizationName) => {
        if(!organizationName) {
            return {
                validateStatus: 'error',
                errorMsg: 'organization name may not be empty'
            }
        }     
    }

    validateHomeDistricId = (homeDistricId) => {
        if(!homeDistricId) {
            return {
                validateStatus: 'error',
                errorMsg: 'homedistrict name may not be empty'
            }
        }     
    }
    validateremarks = (remarks) => {
        if(!remarks) {
            return {
                validateStatus: 'error',
                errorMsg: 'remarks may not be empty'
            }
        }     
    }

}
export default AddSpouseInfo;