import React, { Component } from 'react';
import {savePromotion} from '../util/APIUtils';
import './AddPromotion.css';
//import { Link } from 'react-router-dom';
import {
    NATUREOFPROMOTION_MAX_LENGTH, NATUREOFPROMOTION_MIN_LENGTH,
    REMARK_MAX_LENGTH, REMARK_MIN_LENGTH,
} from '../constants';

import { Form, Input, Button, notification } from 'antd';
const FormItem = Form.Item;
//const { TextArea } = Input

class AddPromotion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            govId: {
                value: ''
            },

            promotionDate: {
                value: ''
            },

            rankCode: {
                value: ''
            },

            payCode: {
                value: ''
            },

            natureOfPromotion: {
                value: ''
            },

            actualPromotionDate: {
                value: ''
            },

            remarks: {
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

        const promotionRequest = {
            govId: this.state.govId.value,
            promotionDate: this.state.promotionDate.value,
            rankCode: this.state.rankCode.value,
            payCode: this.state.payCode.value,
            natureOfPromotion: this.state.natureOfPromotion.value,
            actualPromotionDate: this.state.actualPromotionDate.value,
            remarks: this.state.remarks.value
        };

        savePromotion(promotionRequest)
            .then(response => {
                notification.success({
                    message: 'PMIS',
                    description: "Record saved.",
                });
                this.props.history.push("/promotionlist");
            }).catch(error => {
            notification.error({
                    message: 'PMIS',
                    
                description: error.message || 'Oops! Please try again!'
            });
        });
    }

    isFormInvalid() {
        return !(this.state.govId.validateStatus === 'success',
            !this.state.promotionDate.validatePromotionDate=='success',
            !this.state.natureOfPromotion.validateNatureOfPromotion === 'success',
            !this.state.rankCode.validateStatus === 'success',
            !this.state.payCode.validateStatus === 'success',
            !this.state.actualPromotionDate.validateStatus === 'success',
            !this.state.remarks.validateRemark === 'succcess'
        );
    }

    render() {
        return (
            <div className="signup-container">
                <h1 className="page-title">Create Promotion</h1>
                <div className="signup-content">
                    <Form onSubmit={this.handleSubmit} className="signup-form">
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
                            label="Promotion Date"
                            validateStatus={this.state.promotionDate.validateStatus}
                            help={this.state.promotionDate.errorMsg}>
                            <Input
                                size="large"
                                name="promotionDate"
                                autoComplete="off"
                                placeholder="Please input Promotion Date (yyyy-mm-dd)"
                                value={this.state.promotionDate.value}
                                onChange={(event) => this.handleInputChange(event, this.validatePromotionDate)} />
                        </FormItem>

                        <FormItem
                            label="Rank Code"
                            validateStatus={this.state.rankCode.validateStatus}
                            help={this.state.rankCode.errorMsg}>
                            <Input
                                size="large"
                                name="rankCode"
                                autoComplete="off"
                                placeholder="Please input rank code"
                                value={this.state.rankCode.value}
                                onChange={(event) => this.handleInputChange(event, this.validateRankCode)} />
                        </FormItem>

                        <FormItem
                            label="Pay Code"
                            validateStatus={this.state.payCode.validateStatus}
                            help={this.state.payCode.errorMsg}>
                            <Input
                                size="large"
                                name="payCode"
                                autoComplete="off"
                                placeholder="Please input pay code"
                                value={this.state.payCode.value}
                                onChange={(event) => this.handleInputChange(event, this.validatePayCode)} />
                        </FormItem>

                        <FormItem
                            label="Nature of Promotion"
                            validateStatus={this.state.natureOfPromotion.validateStatus}
                            help={this.state.natureOfPromotion.errorMsg}>
                            <Input
                                size="large"
                                name="natureOfPromotion"
                                autoComplete="off"
                                placeholder="Please input Nature of Promotion"
                                value={this.state.natureOfPromotion.value}
                                onChange={(event) => this.handleInputChange(event, this.validateNatureOfPromotion)} />
                        </FormItem>

                        <FormItem
                            label="Actural Promotion Date"
                            validateStatus={this.state.actualPromotionDate.validateStatus}
                            help={this.state.actualPromotionDate.errorMsg}>
                            <Input
                                size="large"
                                name="actualPromotionDate"
                                autoComplete="off"
                                placeholder="Please input Actural Promotion Date (yyyy-mm-dd)"
                                value={this.state.actualPromotionDate.value}
                                onChange={(event) => this.handleInputChange(event, this.validateActualPromotionDate)} />
                        </FormItem>

                        <FormItem
                            label="Remark"
                            validateStatus={this.state.remarks.validateStatus}
                            help={this.state.remarks.errorMsg}>
                            <Input
                                size="large"
                                name="remarks"
                                autoComplete="off"
                                placeholder="Please input Remark"
                                value={this.state.remarks.value}
                                onChange={(event) => this.handleInputChange(event, this.validateRemark)} />
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
                errorMsg: 'ID Field is Required'
            }
        }
    }
    
    validatePromotionDate = (promotionDate) => {
        if(!promotionDate) {
            return {
                validateStatus: 'error',
                errorMsg: 'Field is Required'
            }
        }
    }

    validateRankCode = (rankCode) => {
        if(!rankCode) {
            return {
                validateStatus: 'error',
                errorMsg: 'Field is Required'
            }
        }
    }
    
    validatePayCode = (payCode) => {
        if(!payCode) {
            return {
                validateStatus: 'error',
                errorMsg: 'Field is Required'
            }
        }
    }

    validateNatureOfPromotion = (natureOfPromotion) => {
        if(natureOfPromotion.length < NATUREOFPROMOTION_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Status Name is too short (Minimum ${NATUREOFPROMOTION_MIN_LENGTH} characters needed.)`
            }
        } else if (natureOfPromotion.length > NATUREOFPROMOTION_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Status Name is too long (Maximum ${NATUREOFPROMOTION_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
    }

    validateActualPromotionDate = (actualPromotionDate) => {
        if(!actualPromotionDate) {
            return {
                validateStatus: 'error',
                errorMsg: 'Field is Required'
            }
        }
    }

    validateRemark = (remarks) => {
        if(remarks.length < REMARK_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `Status Remark is too short (Minimum ${REMARK_MIN_LENGTH} characters needed.)`
            }
        } else if (remarks.length > REMARK_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `Status Remark is too long (Maximum ${NATUREOFPROMOTION_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            };
        }
    }
}

export default AddPromotion;