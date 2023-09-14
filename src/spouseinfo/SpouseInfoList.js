import React, { Component} from 'react';
import {API_BASE_URL} from '../constants';
import './SpouseInfoList.css';
import 'bootstrap/dist/css/bootstrap.css';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { blue } from '@mui/material/colors';
//import { cyan } from '@mui/material/colors';

class SpouseInfoList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            spouseinfo: []
        }
        this.addSpouseInfo = this.addSpouseInfo.bind(this);
        //this.editSpouseInfo = this.editSpouseInfo.bind(this);
    }

    componentDidMount() {
        fetch(API_BASE_URL + "/spouseinfo")
            .then(res => res.json())
            .then(
                (spouseinfo) => {
                    this.setState({ spouseinfo: spouseinfo });
                },
                (error) => {
                    alert(error);
                }
            )
    }


    addSpouseInfo(){
        this.props.history.push('/spouseinfo/new');
    }

    


    render() {
        return (
            <div>
                <h2 className="text-center">Spouse Info</h2>
                <div className = "">
                    <Button onClick={this.addSpouseInfo}
                            variant="contained"
                            startIcon={<AddIcon />}>
                            ADD
                    </Button>
                </div>
                <br></br>
                <div className = "row">
                    <table className = "table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>GovId</th>
                                <th>Spouse Name</th>
                                <th>Occupation Name</th>
                                <th>Organization Name</th>
                                <th>Home District</th>
                                <th>Remarks</th>
                                <th>Actions</th>
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


export default SpouseInfoList;