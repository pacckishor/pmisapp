import React, { Component } from 'react';
import { getRecords, saveRecord } from '../util/APIUtils';
import './GeneralInfoList.css';
import { Form, Input, Button, notification, Select, DatePicker } from 'antd';
const FormItem = Form.Item;

class AddGeneralInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }

    componentDidMount() {
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

    handleInputChange(event, validationFun) {
        this.setState({
            [event.target.name]: 
            event.target.value,
                ...validationFun(event.target.value)
            
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const generalInfoRequst = {
            govId: this.state.govId,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            fatherName: this.state.fatherName,
            motherName: this.state.motherName,
            dob: this.state['dob'].format('YYYY-MM-DD'),
            homeDistrictId: this.state.homeDistrictId,
            maritalStatusId: this.state.maritalStatusId
        };

        saveRecord(generalInfoRequst, "/generalinfo")
            .then(response => {
                notification.success({
                    message: 'PMIS',
                    description: "Record saved.",
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
            this.state.dob.validatedob === 'success',
            this.homeDistrictId.validateStatus === 'success',
            this.maritalStatusId.validateStatus === 'success'
        );
    }

    render() {
        const { dropdownItems, dropdownlocationItems } = this.state;
        //console.log("drop", dropdownItems);
        return (
            <div className="signup-container">
                <h1 className="page-title">Add General Information</h1>
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
                                onChange={(event) => this.handleInputChange(event, this.validategovId)}
                            />
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
                            validateStatus={this.state.fatherName.validatefatherName}
                            help={this.state.fatherName.errorMsg}
                        >
                            <Input
                                size="large"
                                name="fatherName"
                                autoComplete="off"
                                placeholder="Enter Father Name"
                                value={this.state.fatherName}
                                onChange={(event) => this.handleInputChange(event, this.validatefatherName)}
                            />
                        </FormItem>
                        <FormItem
                            label="Mother Name"
                            validateStatus={this.state.motherName.validatemotherName}
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
                            validateStatus={this.state.dob.validatedob}
                            help={this.state.dob.errorMsg}
                        >
                            <DatePicker 
                                format='YYYY-MM-DD'
                                //format='DD-MM-YYYY'
                                placeholder='YYYY-MM-DD'
                                style={{ width: '100%' }}
                                //value={promotionDate}
                                onChange={(event) => this.handleChange(event,"dob")}
                            />
                        </FormItem>
                        <FormItem
                            label="Home District"
                            validateStatus={this.state.dob.homeDistrictId}
                            help={this.state.dob.errorMsg}
                        >
                            <Select placeholder="Enter Home District" onChange={(event) => this.handleChange(event,"homeDistrictId")} >
                                {dropdownlocationItems.map((item, index) => <Select.Option value={item.id} key={index}>{item.locationNameEn}</Select.Option>)}
                            </Select>
                        </FormItem>

                        <FormItem
                            label="Marital Status"
                            validateStatus={this.state.dob.validatemaritalStatusId}
                            help={this.state.dob.errorMsg}
                        >
                            <Select placeholder="Enter Marital Status"  onChange={(event) => this.handleChange(event,"maritalStatusId")} >
                                {dropdownItems.map((item, index) => <Select.Option value={item.id} key={index}>{item.maritalStatus}</Select.Option>)}
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Button type="primary"
                                htmlType="submit"
                                size="large"
                                className="signup-form-button"
                            //disabled={this.isFormInvalid()}
                            >Create General Information</Button>
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

    // validateActivityName = (activityName) => {
    //     if(activityName.length < ACTIVITY_NAME_MIN_LENGTH) {
    //         return {
    //             validateStatus: 'error',
    //             errorMsg: `Activity Name is too short (Minimum ${ACTIVITY_NAME_MIN_LENGTH} characters needed.)`
    //         }
    //     } else if (activityName.length > ACTIVITY_NAME_MAX_LENGTH) {
    //         return {
    //             validationStatus: 'error',
    //             errorMsg: `Activity Name is too long (Maximum ${ACTIVITY_NAME_MAX_LENGTH} characters allowed.)`
    //         }
    //     } else {
    //         return {
    //             validateStatus: 'success',
    //             errorMsg: null,
    //         };
    //     }
    // }

    // validateDescriptions = (descriptions) => {
    //     if(!descriptions) {
    //         return {
    //             validateStatus: 'error',
    //             errorMsg: 'Descriptions may not be empty'
    //         }
    //     }
    //     if(descriptions.length > DESCRIPTION_MAX_LENGTH) {
    //         return {
    //             validateStatus: 'error',
    //             errorMsg: `Descriptions is too long (Maximum ${DESCRIPTION_MAX_LENGTH} characters allowed)`
    //         }
    //     }

    //     return {
    //         validateStatus: null,
    //         errorMsg: null
    //     }
    // }

    // validatePrerequisites = (prerequisites) => {
    //     if(prerequisites.length < USERNAME_MIN_LENGTH) {
    //         return {
    //             validateStatus: 'error',
    //             errorMsg: `prerequisites is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed.)`
    //         }
    //     } else if (prerequisites.length > USERNAME_MAX_LENGTH) {
    //         return {
    //             validationStatus: 'error',
    //             errorMsg: `prerequisites is too long (Maximum ${USERNAME_MAX_LENGTH} characters allowed.)`
    //         }
    //     } else {
    //         return {
    //             validateStatus: null,
    //             errorMsg: null
    //         }
    //     }
    // }

    // validateNotes = (notes) => {
    //     if(notes.length < USERNAME_MIN_LENGTH) {
    //         return {
    //             validateStatus: 'error',
    //             errorMsg: `Notes is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed.)`
    //         }
    //     } else if (notes.length > USERNAME_MAX_LENGTH) {
    //         return {
    //             validationStatus: 'error',
    //             errorMsg: `Notes is too long (Maximum ${USERNAME_MAX_LENGTH} characters allowed.)`
    //         }
    //     } else {
    //         return {
    //             validateStatus: 'success',
    //             errorMsg: null,
    //         };
    //     }
    // }

}

export default AddGeneralInfo;