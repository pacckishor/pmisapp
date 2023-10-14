import React, { Component } from 'react';
import {getRecords, saveRecord} from '../util/APIUtils';
import './AddPromotion.css';

//import { Link } from 'react-router-dom';
import {
    NATUREOFPROMOTION_MAX_LENGTH, NATUREOFPROMOTION_MIN_LENGTH,
    REMARK_MAX_LENGTH, REMARK_MIN_LENGTH,
} from '../constants';

import { Form, Input, Button, notification, Select, DatePicker } from 'antd';

const FormItem = Form.Item;
//const { TextArea } = Input

class AddPromotion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            govId:'',
            promotionDate:'',
            rankCode:'',
            payCode:'',
            natureOfPromotion:'',
            actualPromotionDate:'',
            remarks:'',
            dropdownItems:[],
            dropdownPayScaleItems:[]
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }

    componentDidMount(){
        getRecords("rank")
        .then(dropdownData=>{
            this.setState({
                dropdownItems:dropdownData
            })
        })

        getRecords("payscale")
        .then(dropdownData=>{
            this.setState({
                dropdownPayScaleItems:dropdownData
            })
        })
        
    }
    handleInputChange(event, validationFun) {
        this.setState({
            [event.target.name] : 
                event.target.value,
                ...validationFun(event.target.value)
        });
    }

    handleChange = (event,stateName) => {
        this.setState({ [stateName]: event })
    }

    handleSubmit(event) {
        event.preventDefault();

        const promotionRequest = {
            govId: this.state.govId,
            promotionDate: this.state['promotionDate'].format('YYYY-MM-DD'),
            //promotionDate:"2022-02-20",
            rankCode: this.state.rankCode,
            payCode: this.state.payCode,
            natureOfPromotion: this.state.natureOfPromotion,
            actualPromotionDate: this.state['actualPromotionDate'].format('YYYY-MM-DD'),
            //actualPromotionDate: this.state.actualPromotionDate,
            remarks: this.state.remarks
        };

        saveRecord(promotionRequest,"/promotion")
            .then(response => {
                notification.success({
                    message: 'PMIS',
                    description: "Record saved.",
                });
                this.props.history.push("/promotion/list");
            }).catch(error => {
            notification.error({
                    message: 'PMIS',
                    
                description: error.message || 'Oops! Please try again!'
            });
        });
    }

    isFormInvalid() {
        return !(this.state.govId.validateStatus === 'success',
            this.state.promotionDate.validatePromotionDate=='success',
            this.state.natureOfPromotion.validateNatureOfPromotion === 'success',
            this.state.rankCode.validateStatus === 'success',
            this.state.payCode.validateStatus === 'success',
            this.state.actualPromotionDate.validateStatus === 'success',
            this.state.remarks.validateRemark === 'succcess'
        );
    }

    render() {
        const { dropdownItems, dropdownPayScaleItems } = this.state;
        //const dateFormat = "YYYY-MM-DD";

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
                                value={this.state.govId}
                                onChange={(event) => this.handleInputChange(event, this.validateGovId)} />
                        </FormItem>
    
                        <FormItem
                            label="Promotion Date"
                            name="promotionDate"
                            validateStatus={this.state.promotionDate.validateStatus}
                            help={this.state.promotionDate.errorMsg}
                            >
                            <DatePicker 
                                format='YYYY-MM-DD'
                                //format='DD-MM-YYYY'
                                placeholder='YYYY-MM-DD'
                                style={{ width: '100%' }}
                                //value={promotionDate}
                                onChange={(event) => this.handleChange(event,"promotionDate")}
                            /> 
                        </FormItem>

                        <FormItem
                            label="Rank Name"
                            validateStatus={this.state.rankCode.validateRankCode}
                            help={this.state.rankCode.errorMsg}
                        >
                            <Select placeholder="Enter Rank Name"  onChange={(event) => this.handleChange(event,"rankCode")} >
                                {dropdownItems.map((item, index) => <Select.Option value={item.id} key={index}>{item.rankName}</Select.Option>)}
                            </Select>
                        </FormItem>

                        <FormItem
                            label="Pay Scale"
                            validateStatus={this.state.payCode.validatePayCode}
                            help={this.state.payCode.errorMsg}>
                            <Select placeholder="Enter Pay Scale"  onChange={(event) => this.handleChange(event,"payCode")} >
                                {dropdownPayScaleItems.map((item, index) => <Select.Option value={item.id} key={index}>{item.payScaleName}</Select.Option>)}
                            </Select>
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
                                value={this.state.natureOfPromotion}
                                onChange={(event) => this.handleInputChange(event, this.validateNatureOfPromotion)} />
                        </FormItem>

                        <FormItem
                            label="Actural Promotion Date"
                            validateStatus={this.state.actualPromotionDate.validateStatus}
                            help={this.state.actualPromotionDate.errorMsg}>
                            <DatePicker 
                                format='YYYY-MM-DD'
                                //format='DD-MM-YYYY'
                                placeholder='YYYY-MM-DD'
                                style={{ width: '100%' }}
                                //value={actualPromotionDate}
                                onChange={(event) => this.handleChange(event,"actualPromotionDate")}
                            />
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
                                value={this.state.remarks}
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
    validateRankCode = (rankCode) => {
        if (!rankCode) {
            return {
                validateStatus: 'error',
                errorMsg: 'Rank Name not found'
            }
        }
    }
}

export default AddPromotion;