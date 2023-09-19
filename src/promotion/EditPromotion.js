import React, { Component } from 'react';
import {getRecordById, updateRecord} from '../util/APIUtils';
import './EditPromotion.css';

import { Form, Input, Button, notification } from 'antd';
const FormItem = Form.Item;

class EditPromotion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            promotionStatusId: this.props.match.params.id,
            govId: '',
            promotionDate: '',
            rankCode:'',
            payCode:'',
            natureOfPromotion:'',
            actualPromotionDate:'',
            remarks:'',
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
        this.changePromotionDateHandler = this.changePromotionDateHandler.bind(this);
        this.changeRankCodeHandler = this.changeRankCodeHandler.bind(this);
        this.changePayCodeHandler = this.changePayCodeHandler.bind(this);
        this.changeNatureOfPromotionHandler = this.changeNatureOfPromotionHandler.bind(this);
        this.changeActualPromotionDateHandler = this.changeActualPromotionDateHandler.bind(this);
        this.changeRemarksHandler = this.changeRemarksHandler.bind(this);
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

        let promise = getRecordById("/promotion/", this.state.promotionStatusId);
        promise.then((res) => {
            this.setState({
                govId: res.govId,
                promotionDate : res.promotionDate,
                rankCode: res.rankCode,
                payCode: res.payCode,
                natureOfPromotion: res.natureOfPromotion,
                actualPromotionDate: res.actualPromotionDate,
                remarks: res.remarks,
            });
        });
        console.log(promise)
        Promise.all([promise]);
    }

    handleSubmit(event) {
        event.preventDefault();

        const promotionRequest = {
            govId: this.state.govId,
            promotionDate: this.state.promotionDate,
            rankCode: this.state.rankCode,
            payCode: this.state.payCode,
            natureOfPromotion: this.state.natureOfPromotion,
            actualPromotionDate: this.state.actualPromotionDate,
            remarks: this.state.remarks
        };

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

    changePromotionDateHandler(event) {
        this.setState({promotionDate: event.target.value});
    }
    changeRankCodeHandler(event) {
        this.setState({rankCode: event.target.value});
    }
    changePayCodeHandler(event) {
        this.setState({payCode: event.target.value});
    }
    changeNatureOfPromotionHandler(event) {
        this.setState({natureOfPromotion: event.target.value});
    }
    changeActualPromotionDateHandler(event) {
        this.setState({actualPromotionDate: event.target.value});
    }
    changeRemarksHandler(event) {
        this.setState({remarks: event.target.value});
    }

    render() {
        return (
            <div className="signup-container">
                <h1 className="page-title">Edit Promotion</h1>
                <div className="signup-content">
                    <Form onSubmit={this.handleSubmit} className="signup-form">
                        {/* <FormItem
                            label="Employee Govt ID"
                            validateStatus={this.state.govId.validateStatus}
                            help={this.state.govId.errorMsg}>
                            <Input
                                size="large"
                                name="govId"
                                value={this.state.govId}
                                autoComplete="off"
                                placeholder="Please input Employee Govt ID"
                                onChange={this.changePromotionHandler} />
                        </FormItem>   */}
                        
                        <FormItem
                            label="Promotion Date"
                            validateStatus={this.state.promotionDate.validateStatus}
                            help={this.state.promotionDate.errorMsg}>
                            <Input
                                size="large"
                                name="promotionDate"
                                value={this.state.promotionDate}
                                autoComplete="off"
                                placeholder="Please input Promotion Date (yyyy-mm-dd)"
                                onChange={this.changePromotionDateHandler}
                            />
                        </FormItem>

                        <FormItem
                            label="Rank Code"
                            validateStatus={this.state.rankCode.validateStatus}
                            help={this.state.rankCode.errorMsg}>
                            <Input
                                size="large"
                                name="rankCode"
                                value={this.state.rankCode}
                                autoComplete="off"
                                placeholder="Please input rank code"
                                onChange={this.changeRankCodeHandler}
                            />
                        </FormItem>

                        <FormItem
                            label="Pay Code"
                            validateStatus={this.state.payCode.validateStatus}
                            help={this.state.payCode.errorMsg}>
                            <Input
                                size="large"
                                name="payCode"
                                value={this.state.payCode}
                                autoComplete="off"
                                placeholder="Please input pay code"
                                onChange={this.changePayCodeHandler}
                            />
                        </FormItem>

                       <FormItem
                            label="Nature of Promotion"
                            validateStatus={this.state.natureOfPromotion.validateStatus}
                            help={this.state.natureOfPromotion.errorMsg}>
                            <Input
                                size="large"
                                name="natureOfPromotion"
                                value={this.state.natureOfPromotion}
                                autoComplete="off"
                                placeholder="Please input Nature of Promotion"
                                onChange={this.changeNatureOfPromotionHandler} />
                        </FormItem>

                        <FormItem
                            label="Actural Promotion Date">
                            <Input
                                size="large"
                                name="actualPromotionDate"
                                value={this.state.actualPromotionDate}
                                autoComplete="off"
                                placeholder="Please input Actural Promotion Date (yyyy-mm-dd)"
                                onChange={this.changeActualPromotionDateHandler} />
                        </FormItem>

                        <FormItem
                            label="Remark">
                            <Input
                                size="large"
                                name="remarks"
                                value={this.state.remarks}
                                autoComplete="off"
                                placeholder="Please input Remark"
                                onChange={this.changeRemarksHandler} />
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

export default EditPromotion;