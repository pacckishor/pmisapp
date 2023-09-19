import React, { Component } from 'react';
import {getRecordById, updateRecord} from '../util/APIUtils';
import './AddGeneralInfo.css';
//import { Link } from 'react-router-dom';
//import { ACTIVITY_NAME_MIN_LENGTH, ACTIVITY_NAME_MAX_LENGTH,USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH, DESCRIPTION_MAX_LENGTH, API_BASE_URL }//from '../constants';

import { Form, Input, Button, notification } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input

class UpdateActivity extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activityId: this.props.match.params.id,
            activityName: '',
            descriptions: '',
            prerequisites: '',
            notes: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
        this.changeActivityNameHandler = this.changeActivityNameHandler.bind(this)
        this.changeDescriptionsHandler = this.changeDescriptionsHandler.bind(this)
        this.changePrerequisitesHandler = this.changePrerequisitesHandler.bind(this)
        this.changeNotesHandler = this.changeNotesHandler.bind(this)
    }

    componentDidMount(){
        getRecordById(this.state.activityId).then((res) =>{
            let data = res;
            this.setState({
                activityName : data.activityName,
                descriptions : data.descriptions,
                prerequisites : data.prerequisites,
                notes : data.notes
            });
        });
    }


    handleSubmit(event) {
        event.preventDefault();

        const updateActivityRequest = {
            activityName: this.state.activityName,
            descriptions: this.state.descriptions,
            prerequisites: this.state.prerequisites,
            notes: this.state.notes
        };
        console.log('updateActivityRequest => ' + JSON.stringify(updateActivityRequest));
        console.log('id => ' + JSON.stringify(this.state.activityId));

        updateRecord(this.state.activityId, updateActivityRequest)
            .then(response => {
                notification.success({
                    message: 'PMIS',
                    
                    description: "Activity updated successfully",
                });
                this.props.history.push("/activityList");
            }).catch(error => {
            notification.error({
                    message: 'PMIS',
                    
                description: error.message || 'Sorry! Something went wrong. Please try again!'
            });
        });
    }

    isFormInvalid() {
        return (this.state.activityName.validateStatus === 'success' &&
            this.state.notes.validateStatus === 'success'
        );
    }

    changeActivityNameHandler= (event) => {
        this.setState({activityName: event.target.value});
    }

    changeDescriptionsHandler= (event) => {
        this.setState({descriptions: event.target.value});
    }

    changePrerequisitesHandler= (event) => {
        this.setState({prerequisites: event.target.value});
    }
    changeNotesHandler= (event) => {
        this.setState({notes: event.target.value});
    }

    render() {
        return (
            <div className="signup-container">
                <h1 className="page-title">Update Activity</h1>
                <div className="update-content">
                    <Form onSubmit={this.handleSubmit} className="update-form">
                        <FormItem
                            label="Activity Name"
                            validateStatus={this.state.activityName.validateStatus}
                            help={this.state.activityName.errorMsg}>
                            <Input
                                size="large"
                                name="activityName"
                                autoComplete="off"
                                placeholder="Enter activity name"
                                value={this.state.activityName}
                                onChange={this.changeActivityNameHandler} />
                        </FormItem>
                        <FormItem label="Descriptions"
                                  validateStatus={this.state.descriptions.validateStatus}
                                  help={this.state.descriptions.errorMsg}>
                            <TextArea
                                size="large"
                                name="descriptions"
                                autoComplete="off"
                                placeholder="Enter descriptions"
                                value={this.state.descriptions}
                                onChange={this.changeDescriptionsHandler} />
                        </FormItem>
                        <FormItem
                            label="Prerequisites"
                            validateStatus={this.state.prerequisites.validateStatus}
                            help={this.state.prerequisites.errorMsg}>
                            <Input
                                size="large"
                                name="prerequisites"
                                autoComplete="off"
                                placeholder="Enter prerequisites"
                                value={this.state.prerequisites}
                                onChange={this.changePrerequisitesHandler} />
                        </FormItem>
                        <FormItem
                            label="Notes"
                            validateStatus={this.state.notes.validateStatus}
                            help={this.state.notes.errorMsg}>
                            <Input
                                size="large"
                                name="notes"
                                autoComplete="off"
                                placeholder="Enter notes"
                                value={this.state.notes}
                                onChange={this.changeNotesHandler} />
                        </FormItem>
                        <FormItem>
                            <Button type="primary"
                                    htmlType="submit"
                                    size="large"
                                    className="signup-form-button"
                                    disabled={this.isFormInvalid()}>Update Activity</Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        );
    }


}


export default UpdateActivity;