import React, {Component, useState} from 'react';
import { saveLocationType } from '../util/APIUtils';

import {Form, Input, Button, Icon, notification} from 'antd';
import './AddLocationType.css';
const FormItem = Form.Item;


function AddLocationType(){
    
    const [locationTypeNameEn, setLocationTypeNameEn] = useState('')
    const [error, setErron] = useState(false)


    const handleSubmit = (e)=> {
        e.preventDefault();

        if(locationTypeNameEn.length === 0){
            setErron(true)
        }

        const locationTypeRequest = {
            locationTypeNameEn: locationTypeNameEn
          

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

    

    
        return(
            <div className="location-type-container">
                <h2 className='location-type-page-title'>Create Location Type</h2>
                <div>
                    <Form onSubmit={handleSubmit} className="signup-form">
                        
                    
                    <label>Location Type Name:</label>
                    <Input 
                    
                        onChange={e => setLocationTypeNameEn(e.target.value)}
                    
                         />    
                        {error && locationTypeNameEn.length<=0?<label>Field is Required</label>:""}
                    
                        
                       

                        
                            <Button 
                                type="primary"
                                htmlType="submit"
                                size="large"
                                className="location-type-form-button">
                                Save
                            </Button>
                        

                    </Form>
                </div>

            </div>
        );
    

    

}

export default AddLocationType;


