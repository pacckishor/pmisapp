import React, {Component} from 'react';
import { saveLocationType } from '../util/APIUtils';
import {Form, Input, Button, Icon, notification} from 'antd';
import './AddLocationType.css';
const FormItem = Form.Item;

class AddLocationType extends Component{

    constructor(props){
        super(props);
        this.state = {
            locationTypeNameEn: {
                value: ''
            }

        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    handleInputChange(event){
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]:{
                value: inputValue
            }
        });
    }

    handleSubmit(event){
        event.preventDefault();

        const locationTypeRequest = {
            locationTypeNameEn: this.state.locationTypeNameEn.value
          

        };

        saveLocationType(locationTypeRequest)
            .then(response =>{
                notification.success({
                    message:'PMIS',
                    description: "Record save."
                });
                this.props.history.push("/locationtype/list");
            }).catch(error =>{
                notification.error({
                    message:'PMIS',
                    description:error.message||'Oops! Please try again!'
                });
            });

        
    }

    

    render(){
        
        return(
            <div className="location-type-container">
                <h2 className='location-type-page-title'>Create Location Type</h2>
                <div>
                    <Form onSubmit={this.handleSubmit} className="signup-form">
                        
                    
                        
                        <FormItem

                            label = "Location Type Name" 
                            //validateStatus = {this.state.locationTypeNameEn.validateLocationTypeNameEn}
                            help = {this.state.locationTypeNameEn.errorMsg}>
                            <Input
                                size = "large"
                                name = "locationTypeNameEn"
                                autoComplete = "off"
                                placeholder = "Please Input Location Type Name"
                                value = {this.state.locationTypeNameEn.value}
                                //onChange = {(event) =>this.handleInputChange(event,this.validateLocationTypeNameEn)}
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

    

}

export default AddLocationType;


