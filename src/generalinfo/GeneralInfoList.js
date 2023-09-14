import React, { Component} from 'react';
//import {getAllGeneralInfo} from '../util/APIUtils';
//import LoadingIndicator  from '../common/LoadingIndicator';
//import { Icon, notification } from 'antd';
import {API_BASE_URL} from '../constants';
import './GeneralInfoList.css';
import 'bootstrap/dist/css/bootstrap.css';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
//import DetailIcon from '@mui/icons-material/Details';
//import { red } from '@mui/material/colors';
import { blue } from '@mui/material/colors';
//import { cyan } from '@mui/material/colors';

class GeneralInfoList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            generalinfos: []
        }
        this.addGeneralInfo = this.addGeneralInfo.bind(this);
        this.editGeneralInfo = this.editGeneralInfo.bind(this);
    }

    componentDidMount() {
        fetch(API_BASE_URL + "/generalinf")
            .then(res => res.json())
            .then(
                (generalinfos) => {
                    this.setState({ generalinfos: generalinfos });
                },
                (error) => {
                    alert(error);
                }
            )
    }


    addGeneralInfo(){
        this.props.history.push('/generalinfo/new');
    }

    editGeneralInfo(id){
        this.props.history.push(`/generalinfo/edit/${id}`);
    }

    viewGeneralInfo(id){
        this.props.history.push(`/generalinfo/update/${id}`);
    }


    render() {
        return (
            <div>
                <h2 className="text-center">General Info</h2>
                <div className = "">
                    <Button onClick={this.addGeneralInfo}
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
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.generalinfos.map(generalinfo =>
                                <tr key = {generalinfo.id}>
                                    <td>{generalinfo.govId}</td>
                                    <td>{generalinfo.firstName}</td>
                                    <td>{generalinfo.lastName}</td>
                                    <td>{generalinfo.createdAt}</td>
                                    <td>
                                        <IconButton onClick={ () => this.editGeneralInfo(generalinfo.id)}
                                                    color="success"
                                                    aria-label="edit">
                                            <EditIcon sx={{ color: blue[800] }} />
                                        </IconButton>

                                       
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>

                </div>

            </div>
        );
    }

}


export default GeneralInfoList;