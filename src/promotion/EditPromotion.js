import React, { Component } from 'react';
import moment from 'moment';  
import {getRecordById, getRecords, updateRecord} from '../util/APIUtils';
import './EditPromotion.css';
import { Form, Input, Button, notification, Select, DatePicker } from 'antd';
const FormItem = Form.Item;

class EditPromotion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            promotionStatusId: this.props.match.params.id,
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
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName] : 
                inputValue,
               // ...validationFun(inputValue)
        });
    }

    componentDidMount(){
        let promise = getRecordById("/promotion/", this.state.promotionStatusId);
        promise.then((res) => {
            console.log("ABCD",res);
            this.setState({
                govId : res.govId,
                promotionDate : res.promotionDate,
                //promotionDate: res.promotionDate!== null ? res.promotionDate: '2022-10-14',
                rankCode : res.rank.id,
                payCode : res.payScale.id,
                //natureOfPromotion : res.natureOfPromotion,
                natureOfPromotion: res.natureOfPromotion!== null ? res.natureOfPromotion: '',
                //actualPromotionDate : res.actualPromotionDate,
                actualPromotionDate: res.actualPromotionDate!== null ? res.actualPromotionDate: '2022-10-14',
                remarks:res.remarks !== null ? res.remarks:'',
            });
        });
       // console.log(promise)
        Promise.all([promise]);
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

    handleChange = (event,stateName) => {
        this.setState({ [stateName]: event })
    }

    handleSubmit(event) {
        event.preventDefault();

        const promotionRequest = {
            govId : this.state.govId,
            promotionDate : this.state.promotionDate,
            rankCode : this.state.rankCode,
            payCode : this.state.payCode,
            natureOfPromotion : this.state.natureOfPromotion,
            actualPromotionDate : this.state.actualPromotionDate,
            remarks : this.state.remarks
        };
        console.log("promotion date fail",this.state.promotionDate);
        console.log("Actual promotion date fail",this.state.actualPromotionDate);

        updateRecord(promotionRequest, "/promotion/", this.state.promotionStatusId)
            .then(response => {
                notification.success({
                    message: 'PMIS',
                    description: "Record updated.",
                });
                this.props.history.push("/promotion/list");
            }).catch(error => {
            notification.error({
                message: 'PMIS',

                description: error.message || 'Oops! (update) Please try again!'
            });
        });
    }

    isFormInvalid() {
        return !(this.state.govId.validategovId === 'success'
                //this.state.promotionDate.validatePromotionDate=='success',
                //this.state.natureOfPromotion.validateNatureOfPromotion === 'success',
                //this.state.rankCode.validateStatus === 'success',
               // this.state.payCode.validateStatus === 'success',
                //this.state.actualPromotionDate.validateStatus === 'success',
                //this.state.remarks.validateRemark === 'succcess'
        );
    }

    render() {
        const { dropdownItems, dropdownPayScaleItems } = this.state;
        console.log("hm",this.state.dob);

        return (
            <div className="signup-container">
                <h1 className="page-title">Update Promotion</h1>
                <div className="signup-content">
                    <Form onSubmit={this.handleSubmit} className="signup-form">   
                        {/* <FormItem
                            label="Govt Id"
                            //validateStatus={this.state.govId.validategovId}
                            help={this.state.govId.errorMsg}
                        >
                            <Input
                                size="large"
                                name="govId"
                                value={this.state.govId}
                                autoComplete="off"
                                placeholder="Enter Govt Id"
                                onChange={(event) => this.handleInputChange(event, this.validategovId)} />
                        </FormItem> */} 
                     
                        <FormItem
                            label="Promotion Date"
                            help={this.state.promotionDate.errorMsg}>
                            <DatePicker 
                                format='YYYY-MM-DD'
                                placeholder='YYYY-MM-DD'
                                style={{ width: '100%' }}
                                value = {moment(this.state.promotionDate,'YYYY-MM-DD')}
                                        //this.state['dob'].format('YYYY-MM-DD')
                                onChange={(event) => this.handleChange(event,"promotionDate")}
                            />
                        </FormItem>

                        <FormItem
                            label="Rank Name"
                        >
                            <Select placeholder="Enter Rank Name"  value ={this.state.rankCode} onChange={(event) => this.handleChange(event,"rankCode")} >
                                {dropdownItems.map((item, index) => <Select.Option value={item.id} key={index}>{item.rankName}</Select.Option>)}
                            </Select>
                        </FormItem>
                       
                        <FormItem
                            label="Pay Scale"
                           >
                            <Select placeholder="Enter Pay Scale" value ={this.state.payCode} onChange={(event) => this.handleChange(event,"payCode")} >
                                {dropdownPayScaleItems.map((item, index) => <Select.Option value={item.id} key={index}>{item.payScaleName}</Select.Option>)}
                            </Select>
                        </FormItem>

                       <FormItem
                            label="Nature of Promotion"
                            validateStatus={this.state.natureOfPromotion.validateNatureOfPromotion}
                            help={this.state.natureOfPromotion.errorMsg}>
                            <Input
                                size="large"
                                name="natureOfPromotion"
                                autoComplete="off"
                                value={this.state.natureOfPromotion}
                               // autoComplete="off"
                                placeholder="Please input Nature of Promotion"
                                //onChange={this.changeNatureOfPromotionHandler} 
                                onChange={(event) => this.handleInputChange(event, this.validateNatureOfPromotion)}
                                />
                        </FormItem>

                        <FormItem
                            label="Actural Promotion Date"
                            help={this.state.actualPromotionDate.errorMsg}>
                            <DatePicker 
                                format='YYYY-MM-DD'
                                placeholder='YYYY-MM-DD'
                                style={{ width: '100%' }}
                                value = {moment(this.state.actualPromotionDate,'YYYY-MM-DD')}
                                        //this.state['dob'].format('YYYY-MM-DD')
                                onChange={(event) => this.handleChange(event,"actualPromotionDate")}
                            />
                        </FormItem>

                        <FormItem
                            label="Remark"
                            validateStatus={this.state.remarks.validateRemarks}
                            help={this.state.remarks.errorMsg}>
                            <Input
                                size="large"
                                name="remarks"
                                autoComplete="off"
                                value={this.state.remarks}
                                placeholder="Please input Remark"
                                onChange={(event) => this.handleInputChange(event,this.validateRemarks)}
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
     // Validation Functions
     validategovId = (govId) => {
        if (!govId) {
            return {
                validateStatus: 'error',
                errorMsg: 'Govt Id Not Entry'
            }
        }
    }

    validateNatureOfPromotion = (natureOfPromotion) => {
        if (!natureOfPromotion) {
            return {
                validateStatus: 'error',
                errorMsg: 'Nature of Promotion Not Entry'
            }
        }
    }

    validateRemarks = (remarks) => {
        if (!remarks) {
            return {
                validateStatus: 'error',
                errorMsg: 'Remarks Not Entry'
            }
        }
    }
}

export default EditPromotion;