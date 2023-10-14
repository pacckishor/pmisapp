import React, { Component } from 'react';
import moment from 'moment';  
import {getRecordById, getRecords, updateRecord} from '../util/APIUtils';
import './GeneralInfoList.css';
import { Form, Input, Button, notification, Select, DatePicker } from 'antd';
const FormItem = Form.Item;

class EditGeniralInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading : false,
            generalId : this.props.match.params.id,
            govId  : '',
            firstName : '',
            lastName : '',
            fatherName : '',
            motherName : '',
            dob : '',
            homeDistrictId : '',
            maritalStatusId : '', 
            dropdownItems: [],
            dropdownlocationItems: []
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.isFormInvalid = this.isFormInvalid.bind(this);
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
        let promise = getRecordById("/generalinfo/", this.state.generalId);
        promise.then((res) => {
            //console.log("ABCD",res);
            this.setState({
                govId : res.govId,
                firstName : res.firstName,
                lastName : res.lastName,
                //fatherName : res.fatherName,

                fatherName : res.fatherName !== null ? res.fatherName : '',
                motherName : res.motherName !== null ? res.motherName : '',
                dob : res.dob !== null ? res.dob : '2023-10-14',

                //motherName : res.motherName,
                //dob : res.dob,
                homeDistrictId : res.location.id ,
                maritalStatusId : res.maritalStatus.id,
            });
        });
       // console.log(promise)
        Promise.all([promise]);
        getRecords("maritalstatus")
            .then(dropdownData => {
                this.setState({
                    dropdownItems: dropdownData
                })
            })
        getRecords("location")
            .then(dropdownlocationData => {
                this.setState({
                    dropdownlocationItems: dropdownlocationData
                })
            })
    }

    handleChange = (event,stateName) => {
        this.setState({ [stateName]: event })
    }

    handleSubmit(event) {
        event.preventDefault();

        const generalInfoRequst = {
            govId : this.state.govId,
            firstName : this.state.firstName,
            lastName : this.state.lastName,
            fatherName : this.state.fatherName,
            motherName : this.state.motherName,
            dob : this.state.dob,
            //dob: this.state.dob.format('YYYY-MM-DD'),
            
            homeDistrictId : this.state.homeDistrictId,
            maritalStatusId : this.state.maritalStatusId
        };
        console.log ("dob" , this.state.dob);
        //console.log ("hDid", generalInfoRequst);
        updateRecord(generalInfoRequst,"/generalinfo/", this.state.generalId)
            .then(response => {
                notification.success({
                    message: 'PMIS',
                    description: "Record Updated..",
                });
                this.props.history.push("/generalinfo/list");
            }).catch(error => {
            notification.error({ 
                message: 'PMIS',
                description: error.message || 'Oops! Please try again!'
            });
        });
    }

    isFormInvalid() {
        return !(this.state.govId.validategovId === 'success',
                this.state.firstName.validatefirstName === 'success',
                this.state.lastName.validatelastName === 'success',
                this.state.fatherName.validatefatherName === 'success',
                this.state.motherName.validatemotherName === 'success',
                this.state.dob.validatedob === 'success'
             //   this.homeDistrictId.validateStatus === 'success' &&
             //   this.maritalStatusId.validateStatus === 'success'
        );
    }
    
    render() {
        const { dropdownItems, dropdownlocationItems } = this.state;
        console.log("hm",this.state.dob);
        return (
            <div className="signup-container">
                <h1 className="page-title">Update General Info</h1>
                <div className="signup-content">
                    <Form onSubmit={this.handleSubmit} className="signup-form">   
                        <FormItem
                            label="Govt Id"
                            validateStatus={this.state.govId.validategovId}
                            help={this.state.govId.errorMsg}
                        >
                            <Input
                                size="large"
                                name="govId"
                                value={this.state.govId}
                                autoComplete="off"
                                placeholder="Enter Govt Id"
                                onChange={(event) => this.handleInputChange(event, this.validategovId)} />
                        </FormItem>
                        <FormItem 
                            label="First Name"
                            validateStatus={this.state.firstName.validatefirstName}
                            help={this.state.firstName.errorMsg}
                            >
                            <Input
                                size="large"
                                name="firstName"
                                autoComplete="off"
                                placeholder="Enter First Name"
                                value={this.state.firstName}
                                onChange={(event) => this.handleInputChange(event, this.validatefirstName)}
                            />
                        </FormItem>
                        <FormItem 
                            label="Last Name"
                            validateStatus={this.state.lastName.validatelastName}
                            help={this.state.lastName.errorMsg}
                            >
                            <Input
                                size="large"
                                name="lastName"
                                autoComplete="off"
                                placeholder="Enter Last Name"
                                value={this.state.lastName}
                                onChange={(event) => this.handleInputChange(event, this.validatelastName)}
                            />
                        </FormItem>
                        <FormItem 
                            label="Father Name"
                           // validateStatus={this.state.fatherName.validatefatherName}
                            help={this.state.fatherName.errorMsg}
                            >
                            <Input
                                size="large"
                                name="fatherName"
                                autoComplete="off"
                                placeholder="Enter Father Name"
                                defaultValue={this.state.fatherName}
                                onChange={(event) => this.handleInputChange(event, this.validatefatherName)}
                            />
                        </FormItem>
                        <FormItem 
                            label="Mother Name"
                            // validateStatus={this.state.motherName.validatemotherName}
                            help={this.state.motherName.errorMsg}
                            >
                            <Input
                                size="large"
                                name="motherName"
                                autoComplete="off"
                                placeholder="Enter Mother Name"
                                value={this.state.motherName}
                                onChange={(event) => this.handleInputChange(event, this.validatemotherName)}
                            />
                        </FormItem>
                        <FormItem 
                            label="Date of Birth"
                            // validateStatus={this.state.dob.validatedob}
                            help={this.state.dob.errorMsg}
                            >
                            {/* <Input
                                size="large"
                                name="dob"
                                autoComplete="off"
                                placeholder="Enter Date of Birth"
                                value={this.state.dob}
                                onChange={(event) => this.handleInputChange(event, this.validatedob)}
                            /> */}
                            <DatePicker 
                                format='YYYY-MM-DD'
                                placeholder='YYYY-MM-DD'
                                style={{ width: '100%' }}
                                value = {moment(this.state.dob,'YYYY-MM-DD')}
                                        //this.state['dob'].format('YYYY-MM-DD')
                                onChange={(event) => this.handleChange(event,"dob")}
                            />
                        </FormItem>
                        <FormItem 
                            label="Home District"
                            //validateStatus={this.state.dob.homeDistrictId}
                            //help={this.state.dob.errorMsg}
                            >
                            <Select placeholder="Enter Home District" value ={this.state.homeDistrictId} onChange={(event) => this.handleChange(event,"homeDistrictId")} >
                                {dropdownlocationItems.map((item, index) => <Select.Option value={item.id} key={index}>{item.locationNameEn}</Select.Option>)}
                            </Select>
                        </FormItem>
                        <FormItem 
                            label="Marital Status"
                            //validateStatus={this.state.dob.homeDistrictId}
                            //help={this.state.dob.errorMsg}
                            >
                            <Select placeholder="Enter Marital Status" value={this.state.maritalStatusId}  onChange={(event) => this.handleChange(event,"maritalStatusId")} >
                                {dropdownItems.map((item, index) => <Select.Option value={item.id} key={index}>{item.maritalStatus}</Select.Option>)}
                            </Select>
                        </FormItem> 
                        <FormItem>
                            <Button type="primary"
                                    htmlType="submit"
                                    size="large"
                                    className="signup-form-button"
                                    //disabled={this.isFormInvalid()}
                                    >Update General Info</Button>
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
    validatefirstName = (firstName) => {
        if (!firstName) {
            return {
                validateStatus: 'error',
                errorMsg: 'Govt Id Not Entry'
            }
        }
    }
    validatelastName = (lastName) => {
        if (!lastName) {
            return {
                validateStatus: 'error',
                errorMsg: 'Govt Id Not Entry'
            }
        }
    }
    validatefatherName = (fatherName) => {
        if (!fatherName) {
            return {
                validateStatus: 'error',
                errorMsg: 'Govt Id Not Entry'
            }
        }
    }
    validatemotherName = (motherName) => {
        if (!motherName) {
            return {
                validateStatus: 'error',
                errorMsg: 'Govt Id Not Entry'
            }
        }
    }
    validatedob = (dob) => {
        if (!dob) {
            return {
                validateStatus: 'error',
                errorMsg: 'Govt Id Not Entry'
            }
        }
    }
    validatehomeDistrictId = (homeDistrictId) => {
        if (!homeDistrictId) {
            return {
                validateStatus: 'error',
                errorMsg: 'Govt Id Not Entry'
            }
        }
    }
    validatemaritalStatusId = (maritalStatusId) => {
        if (!maritalStatusId) {
            return {
                validateStatus: 'error',
                errorMsg: 'Govt Id Not Entry'
            }
        }
    }
}
export default EditGeniralInfo;