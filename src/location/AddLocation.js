import React, {Component} from 'react';
import { saveLocation } from '../util/APIUtils';
import {Form, Input, Button, Icon, notification} from 'antd';
import './AddLocation.css';
const FormItem = Form.Item;

class AddLocation extends Component{

    constructor(props){
        super(props);
        this.state = {
          locationNameEn: {
                value: ''
            },

          locationTypeId: {
                    value: ''
                },

          parentLocationId: {
                    value: ''
                }


        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
        
    }

    handleInputChange(event, validationFun){
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]:{
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }

    handleSubmit(event){
        event.preventDefault();

        

        const locationRequest = {
          locationNameEn: this.state.locationNameEn.value,
          locationTypeId: this.state.locationTypeId.value,
          parentLocationId: this.state.parentLocationId.value


        };

        saveLocation(locationRequest)
            .then(response =>{
                notification.success({
                    message:'PMIS',
                    description: "Record save."
                });
                this.props.history.push("/location/list");
            }).catch(error =>{
                notification.error({
                    message:'PMIS',
                    description:error.message||'Oops! Please try again!'
                });
            });

        
    }

    isFormInvalid(){
        return!(this.state.locationNameEn.validateStatus === 'success',
        this.state.locationTypeId.validateStatus === 'success',
        this.state.parentLocationId.validateStatus === 'success'
        
        );
    }

    

    render(){
        
       
        return(
            <div className="location-type-container">
                <h2 className='location-type-page-title'>Create Location</h2>
                <div>
                    <Form onSubmit={this.handleSubmit} className="signup-form">
                        
                        <FormItem
                            label = "Location Name" 
                            validateStatus = {this.state.locationNameEn.validateLocationNameEn}
                            help = {this.state.locationNameEn.errorMsg}>
                            <Input
                                size = "large"
                                name = "locationNameEn"
                                autoComplete = "off"
                                placeholder = "Please Input Location Type Name"
                                value = {this.state.locationNameEn.value}
                                onChange = {(event) =>this.handleInputChange(event,this.validateLocationNameEn)}
                            />
                        </FormItem>

                        <FormItem
                            label = "Location Type ID" 
                            validateStatus = {this.state.locationTypeId.validateLocationTypeId}
                            help = {this.state.locationTypeId.errorMsg}>
                            <Input
                                size = "large"
                                name = "locationTypeId"
                                autoComplete = "off"
                                placeholder = "Please Input Location Type Name"
                                value = {this.state.locationTypeId.value}
                                onChange = {(event) =>this.handleInputChange(event,this.validateLocationTypeId)}
                            />
                        </FormItem>

                        <FormItem
                            label = "Location Type ID" 
                            validateStatus = {this.state.parentLocationId.validateParentLocationId}
                            help = {this.state.parentLocationId.errorMsg}>
                            <Input
                                size = "large"
                                name = "parentLocationId"
                                autoComplete = "off"
                                placeholder = "Please Input Location Type Name"
                                value = {this.state.parentLocationId.value}
                                onChange = {(event) =>this.handleInputChange(event,this.validateParentLocationId)}
                            />
                        </FormItem>


                        
                        <FormItem>
                            <Button 
                                type="primary"
                                htmlType="submit"
                                size="large"
                                className="location-type-form-button">
                                Save
                            </Button>
                        </FormItem>

                    </Form>
                </div>

            </div>
        );
    }

    validateLocationNameEn =(locationNameEn) => {
        if(!locationNameEn.length){
            return{
                validateStatus: 'error',
                errorMsg: 'Field is Required'
            }
        }
        
    }

    validateLocationTypeId =(locationTypeId) => {
          if(!locationTypeId.length){
              return{
                  validateStatus: 'error',
                  errorMsg: 'Field is Required'
              }
          }
          
      }

      validateParentLocationId =(parentLocationId) => {
          if(!parentLocationId.length){
              return{
                  validateStatus: 'error',
                  errorMsg: 'Field is Required'
              }
          }
          
      }
    

}

export default AddLocation;


