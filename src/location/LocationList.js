import React, { Component } from "react";
import { API_BASE_URL } from "../constants";

import AddIcon from '@mui/icons-material/Add'
import 'bootstrap/dist/css/bootstrap.css';
import Button from '@mui/material/Button';

class LocationList extends Component{

    constructor(props){
        super(props);
        this.state = {
            locations: []
        }

        this.addLocation = this.addLocation.bind(this);

    }

    componentDidMount(){
        fetch(API_BASE_URL+"location")
            .then(res => res.json())
            .then(
                (locations) => {
                    this.setState({locations:locations});
                },
                (error) => {
                    alert(error);
                }
            )
    }

    addLocation(){
        this.props.history.push('/location/new');
    }


    render(){

        return(
            <div>
                <h2 className="text-center">Create Location</h2>

                <div>
                    <Button onClick={this.addLocation}
                        variant = "contained"
                        startIcon = {<AddIcon/>}>
                        ADD
                    </Button>
                </div>
                <br></br>

                <div className="row">
                    <table className="table table-striped table-bordered">

                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Location Name</th>
                                <th>Location Type Id</th>
                                <th>Location Parent Id</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>

                        </tbody>

                    </table>
                </div>

            </div>
        );
    }


}

export default LocationList;