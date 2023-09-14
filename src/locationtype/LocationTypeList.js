import React, { Component } from "react";
import { API_BASE_URL } from "../constants";

import AddIcon from '@mui/icons-material/Add'
import 'bootstrap/dist/css/bootstrap.css';
import Button from '@mui/material/Button';

class LocationTypeList extends Component{
    constructor(props){
        super(props);
        this.state = {
            locationtypes:[]
        }

        this.addLocationType = this.addLocationType.bind(this);
    }

    componentDidMount(){
        fetch(API_BASE_URL+"/locationtype")
        .then(res => res.json())
        .then(
            (locationtypes) => {
                this.setState({locationtypes:locationtypes});
            },
            (error) =>{
                alert(error);
            }
        )
    }

    addLocationType(){
        this.props.history.push('/locationtype/new');
    }

    render(){
        return(
            <div>
                <h2 className="text-center">Location Type</h2>

                <div>
                <Button onClick={this.addLocationType}
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
                                <th>Location Type Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                    </table>
                </div>

            </div>
        );

    }

}

export default LocationTypeList;