import React, { Component } from 'react';
import {saveRecord, getRecords } from '../util/APIUtils';
import './AddForeignTraining.css';
import {
    POSTING_STATUS_NAME_MAX_LENGTH, POSTING_STATUS_NAME_MIN_LENGTH
} from '../constants';

import { Form, Input, Button, notification, Select, DatePicker} from 'antd';
const FormItem = Form.Item;


class AddForeignTraining extends Component {
    constructor(props) {
        super(props);
        this.state = {
            govId: '',
            foreignTrainingTitleName: '',
            instituteName: '',
            countryId: '',
            fromDate: '',
            endDate: '',
            duration: '',
            grade: '',
            position: '',
            remark: '',
            dropdownLocationItems: []


        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }

    //DropDown List
    componentDidMount() {
        getRecords("location")
           .then(dropdownLocationData => {
              this.setState({
                dropdownLocationItems: dropdownLocationData
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


    handleChange = (event, stateName) =>{
        this.setState({[stateName]: event})
     }

    

    handleSubmit(event) {
        event.preventDefault();

        const foreignTrainingInfoRequest = {
            govId: this.state.govId,
            foreignTrainingTitleName: this.state.foreignTrainingTitleName,
            instituteName: this.state.instituteName,
            countryId: this.state.countryId,
            fromDate: this.state['fromDate'].format('YYYY-MM-DD'),
            //fromDate: this.state.fromDate.value,
            endDate: this.state['endDate'].format('YYYY-MM-DD'),
            //endDate: this.state.endDate,
            duration: this.state.duration,
            grade: this.state.grade,
            position: this.state.position,
            remark: this.state.remark

        };

        saveRecord(foreignTrainingInfoRequest, "/foreigntrainings")
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
        return !(this.state.govId.validateGovId === 'success',
         this.state.foreignTrainingTitleName.validateForeignTrainingTitleName === 'success',
         this.state.instituteName.validateInstituteName === 'success',
         this.state.countryId.validateCountryId === 'success',
         this.state.fromDate.validateFromDate === 'success',
         this.state.endDate.validateEndDate === 'success',
         this.state.duration.validateDuration === 'success',
         this.state.grade.validateGrade === 'success',
         this.state.position.validatePosition === 'success',
         this.state.remark.validateRemark === 'succcess'
        );
    }

    render() {

        const { dropdownLocationItems } = this.state;
        
        return (
            <div className="foreign-training-container">
                <h2 className="page-title">Create Foreign Training</h2>
                <div className="">

                    <Form onSubmit={this.handleSubmit} className="">
                       
                       <FormItem
                            label="Employee Govt ID"
                            validateStatus={this.state.govId.validateGovId}
                            help={this.state.govId.errorMsg}>
                            <Input
                                size="large"
                                name="govId"
                                autoComplete="off"
                                placeholder="Please Input Employee Govt ID"
                                value={this.state.govId}
                                onChange={(event) => this.handleInputChange(event, this.validateGovId)} />
                        </FormItem>

                        <FormItem
                            label="Training Title Name"
                            validateStatus={this.state.foreignTrainingTitleName.validateForeignTrainingTitleName}
                            help={this.state.foreignTrainingTitleName.errorMsg}>
                            <Input
                                size="large"
                                name="foreignTrainingTitleName"
                                autoComplete="off"
                                placeholder="Please Input Training Title Name"
                                value={this.state.foreignTrainingTitleName}
                                onChange={(event) => this.handleInputChange(event, this.validateForeignTrainingTitleName)} />
                        </FormItem>

                        <FormItem
                            label="Institute Name"
                            validateStatus={this.state.instituteName.validateInstituteName}
                            help={this.state.instituteName.errorMsg}>
                            <Input
                                size="large"
                                name="instituteName"
                                autoComplete="off"
                                placeholder="Please Input Institute Name"
                                value={this.state.instituteName}
                                onChange={(event) => this.handleInputChange(event, this.validateInstituteName)} />
                        </FormItem>

                        <FormItem
                            label="Country Id"
                            //validateStatus={this.state.countryId.validateCountryId}
                            //help={this.state.countryId.errorMsg}
                            >
                            {/* <Input
                                size="large"
                                name="countryId"
                                autoComplete="off"
                                placeholder="Please Input Country Id)"
                                value={this.state.countryId.value}
                                onChange={(event) => this.handleInputChange(event, this.validateCountryId)} 
                                /> */}

                            <Select placeholder="Select Location Type Name" onChange={(event) => this.handleChange(event,"countryId")} >
                                {dropdownLocationItems.map((item, index) => <Select.Option value={item.id} key={index}>{item.locationNameEn}</Select.Option>)}
                            </Select>
                        </FormItem>
                       
                        <FormItem
                            label="Start Date of Training"
                            name="fromDate"
                            //validateStatus={this.state.fromDate.validateFromDate}
                            //help={this.state.fromDate.errorMsg}
                            >
                            {/* <Input
                                size="large"
                                name="fromDate"
                                autoComplete="off"
                                placeholder="Please Input From Date (yyyy-mm-dd)"
                                value={this.state.fromDate.value}
                                onChange={(event) => this.handleInputChange(event, this.validateFromDate)} 
                                />  */}

                             <DatePicker
                                format = 'YYYY-MM-DD'
                                style={{width: '100%'}}
                                placeholder="Please Click Calender Icom & Select Date"
                                onChange={(event) => this.handleChange(event, "fromDate")}
                             /> 

                        </FormItem>

                        <FormItem
                            label="End Date of Training"
                            name = "endDate"
                            //validateStatus={this.state.endDate.validateEndDate}
                            //help={this.state.endDate.errorMsg}
                            >

                            {/* <Input
                                size="large"
                                name="endDate"
                                autoComplete="off"
                                placeholder="Please Input End Date (yyyy-mm-dd)"
                                value={this.state.endDate}
                                onChange={(event) => this.handleInputChange(event, this.validateEndDate)} 
                            /> */}

                            <DatePicker
                                format = 'YYYY-MM-DD'
                                style={{width: '100%'}}
                                placeholder="Please Click Calender Icom & Select Date"
                                onChange={(event) => this.handleChange(event, "endDate")}
                            /> 

                        </FormItem>

                        <FormItem
                            label="Duration of Training"
                            validateStatus={this.state.duration.validateDuration}
                            help={this.state.duration.errorMsg}>
                            <Input
                                size="large"
                                name="duration"
                                autoComplete="off"
                                placeholder="Please Input Duration of Training"
                                value={this.state.duration}
                                onChange={(event) => this.handleInputChange(event, this.validateDuration)} />
                        </FormItem>

                        <FormItem
                            label="Grade Point"
                            validateStatus={this.state.grade.validateGrade}
                            help={this.state.grade.errorMsg}>
                            <Input
                                size="large"
                                name="grade"
                                autoComplete="off"
                                placeholder="Please Input Grade Point"
                                value={this.state.grade}
                                onChange={(event) => this.handleInputChange(event, this.validateGrade)} />
                        </FormItem>

                        <FormItem
                            label="Position"
                            validateStatus={this.state.position.validatePosition}
                            help={this.state.position.errorMsg}>
                            <Input
                                size="large"
                                name="position"
                                autoComplete="off"
                                placeholder="Please Input Position"
                                value={this.state.position}
                                onChange={(event) => this.handleInputChange(event, this.validatePosition)} />
                        </FormItem>

                        <FormItem
                            label="Remark"
                            validateStatus={this.state.remark.validateRemark}
                            help={this.state.remark.errorMsg}>
                            <Input
                                size="large"
                                name="remark"
                                autoComplete="off"
                                placeholder="Please Input Remark"
                                value={this.state.remark}
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

    validateCountryId = (countryId) => {
        if(!countryId) {
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