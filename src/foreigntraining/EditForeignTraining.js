import React, { Component } from 'react';
import moment from 'moment';
import {getRecordById, updateRecord, getRecords} from '../util/APIUtils';
import { Form, Input, Button, notification, Select, DatePicker } from 'antd';

const FormItem = Form.Item;


class EditForeignTraining extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            foreignTrainingId: this.props.match.params.id,
            govId:'',
            foreignTrainingTitleName: '',
            instituteName:'',
            countryId:'',
            fromDate:'',
            endDate:'',
            duration:'',
            grade:'',
            position:'',
            remark:'',
            dropdownCountryNameItems: [],
            
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.isFormInvalid = this.isFormInvalid.bind(this);

    //     this.changeGovIdHandler = this.changeGovIdHandler.bind(this);
    //     this.changeForeignTrainingTitleNameHandler = this.changeForeignTrainingTitleNameHandler.bind(this);
    //     this.changeInstituteNameHandler = this.changeInstituteNameHandler.bind(this);
    //     this.changeCountryIdHandler = this.changeCountryIdHandler.bind(this);
    //     this.changeFromDateHandler = this.changeFromDateHandler.bind(this);
    //    this.changeEndDateHandler = this.changeEndDateHandler.bind(this);
    //    this.changeDurationHandler = this.changeDurationHandler.bind(this);
    //    this.changeGradeHandler = this.changeGradeHandler.bind(this);
    //    this.changePositionHandler = this.changePositionHandler.bind(this);
    //    this.changeRemarkHandler = this.changeRemarkHandler.bind(this);
    //    this.handleChange = this.handleChange.bind(this);
    }

    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName] : 
                inputValue,
                  //...validationFun(inputValue)
            
        });
    }


    //Displaying Data in Form
    componentDidMount(){

        let promise = getRecordById("/foreigntrainings/", this.state.foreignTrainingId);
        
        promise.then((res) => {
            
            this.setState({
                    govId : res.govId,
                    foreignTrainingTitleName : res.foreignTrainingTitleName,
                    instituteName : res.instituteName,
                    //countryId : res.countryId,
                    countryId : res.location.id,
                    fromDate : res.fromDate,
                    //fromDate: res.fromDate.format('YYYY-MM-DD'),
                    endDate : res.endDate,
                    duration : res.duration,
                    grade : res.grade,
                    position : res.position,
                    remark : res.remark
            });
        });
        //console.log(promise)
        Promise.all([promise]);
        
        getRecords("location")
            .then(dropdownLocationTypeData => {
                this.setState({
                    dropdownCountryNameItems: dropdownLocationTypeData
                       })
        })
         
    }


    handleChange = (event, stateName) => {
        this.setState({ [stateName]: event })
     }

    
    handleSubmit(event) {
        event.preventDefault();

        const ForeignTrainingInfoRequest = {

          govId: this.state.govId,
          foreignTrainingTitleName: this.state.foreignTrainingTitleName,
          instituteName: this.state.instituteName,
          countryId: this.state.countryId,
          //fromDate: this.state['fromDate'].format('YYYY-MM-DD'),
          fromDate: this.state.fromDate.format('YYYY-MM-DD'),
          //endDate: this.state['endDate'].format('YYYY-MM-DD'),
          endDate: this.state.endDate.format('YYYY-MM-DD'),
          duration: this.state.duration,
          grade: this.state.grade,
          position: this.state.position,
          remark: this.state.remark
        };

        updateRecord(ForeignTrainingInfoRequest, "/foreigntrainings/", this.state.foreignTrainingId)
            .then(response => {
                notification.success({
                    message: 'PMIS',
                    description: "Record updated.",
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
          return !(
          this.state.govId.validateGovId === 'success',
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

        const { dropdownCountryNameItems } = this.state;
        console.log("hm", this.state.fromDate);
        console.log("hm", this.state.endDate);
        return (
            <div className="signup-container">
                <h2 className="page-title">Edit Foreign Training</h2>
                <div className="signup-content">

                    <Form onSubmit={this.handleSubmit} className="signup-form">

                        <FormItem
                            label="Govt ID"
                            //validateStatus={this.state.govId.validateGovId}
                            //help={this.state.govId.errorMsg}
                            >
                            <Input
                                size="large"
                                name="govId"
                                autoComplete="off"
                                placeholder="Please Input Training Title Name"
                                value={this.state.govId}
                                onChange={(event) => this.handleInputChange(event, this.validateGovId)} />
                        </FormItem> 

                        <FormItem
                            label="Training Title Name"
                            //validateStatus={this.state.foreignTrainingTitleName.validateForeignTrainingTitleName}
                            //help={this.state.foreignTrainingTitleName.errorMsg}
                            >
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
                            //validateStatus={this.state.instituteName.validateInstituteName}
                            //help={this.state.instituteName.errorMsg}
                            >
                            <Input
                                size="large"
                                name="instituteName"
                                value={this.state.instituteName}
                                autoComplete="off"
                                placeholder="Please Input Institute Name"
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
                                placeholder="Please Input Country ID"
                                value={this.state.countryId}
                                onChange={this.changeCountryIdHandler} /> */}

                            <Select  placeholder="Select Location Type Name" 
                                value={this.state.countryId}
                                onChange={(event) => this.handleChange(event,"countryId")} >
                                {dropdownCountryNameItems.map((item, index) => <Select.Option value={item.id} key={index}>{item.locationNameEn}</Select.Option>)}
                            </Select>
                        </FormItem>

                        <FormItem
                            label="Start Date of Training"
                            
                            //validateStatus={this.state.fromDate.validateStatus}
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

                             {/* <DatePicker
                                format = 'YYYY-MM-DD'
                                style={{width: '100%'}}
                                placeholder="Please Click Calender Icom & Select Date"
                                onChange={(event) => this.handleChange(event, "fromDate")}
                             />  */}

                             <DatePicker
                             format='YYYY-MM-DD'
                             placeholder='Please Click Calender Icom & Select Date'
                             style={{width: '100%'}}
                             value={moment(this.state.fromDate, 'YYYY-MM-DD')}
                             onChange={(event) => this.handleChange(event, "fromDate")}
                             
                             />
                        </FormItem>

                        <FormItem
                            label="End Date of Training"
                            
                            //validateStatus={this.state.endDate.validateStatus}
                            help={this.state.endDate.errorMsg}
                            >

                            {/* <Input
                                size="large"
                                name="endDate"
                                autoComplete="off"
                                placeholder="Please Input End Date (yyyy-mm-dd)"
                                value={this.state.endDate}
                                onChange={(event) => this.handleInputChange(event, this.validateEndDate)} 
                            /> */}

                            {/* <DatePicker
                                format = 'YYYY-MM-DD'
                                style={{width: '100%'}}
                                placeholder="Please Click Calender Icom & Select Date"
                                onChange={(event) => this.handleChange(event, "endDate")}
                            />  */}

                                <DatePicker
                                format='YYYY-MM-DD'
                                placeholder='Please Click Calender Icom & Select Date'
                                style={{width: '100%'}}
                                value={moment(this.state.endDate, 'YYYY-MM-DD')}
                                onChange={(event) => this.handleChange(event, "endDate")}
                             
                                />
                        </FormItem>

                        <FormItem
                            label="Duration of Training"
                            //validateStatus={this.state.duration.validateDuration}
                            //help={this.state.duration.errorMsg}
                            >
                            <Input
                                size="large"
                                name="duration"
                                autoComplete="off"
                                placeholder="Please input Duration of Training"
                                value={this.state.duration}
                                onChange={(event) => this.handleInputChange(event, this.validateDuration)} />
                        </FormItem>

                        <FormItem
                            label="Grade Point"
                            //validateStatus={this.state.grade.validateGrade}
                            //help={this.state.grade.errorMsg}
                            >
                            <Input
                                size="large"
                                name="grade"
                                autoComplete="off"
                                placeholder="Please input Grade Point"
                                value={this.state.grade}
                                onChange={(event) => this.handleInputChange(event, this.validateGrade)} />
                        </FormItem>

                        <FormItem
                            label="Position"
                            //validateStatus={this.state.position.validatePosition}
                            //help={this.state.position.errorMsg}
                            >
                            <Input
                                size="large"
                                name="position"
                                autoComplete="off"
                                placeholder="Please input Position"
                                value={this.state.position}
                                onChange={(event) => this.handleInputChange(event, this.validatePosition)} />
                        </FormItem>

                        <FormItem
                            label="Remark"
                            //validateStatus={this.state.remark.validateRemark}
                            //help={this.state.remark.errorMsg}
                            >
                            <Input
                                size="large"
                                name="remark"
                                autoComplete="off"
                                placeholder="Please input Remark"
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
}

export default EditForeignTraining;