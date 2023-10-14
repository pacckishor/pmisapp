import React, { Component} from 'react';
import './GeneralInfoList.css';
import { getRecords,deleteRecord } from '../util/APIUtils';
import 'bootstrap/dist/css/bootstrap.css';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { blue } from '@mui/material/colors';

import { notification, Modal } from 'antd';
import {Table} from 'antd';
class GeneralInfoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            recordSet: [],
            isLoading: false,
            response: {}
        }
        this.loadRecords = this.loadRecords.bind(this);
        this.add = this.add.bind(this);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
    }

    loadRecords() {
        let promise;
        promise = getRecords("generalinfo");

        if (!promise) {
            return;
        }

        this.setState({
            isLoading: true
        });

        promise
            .then(response => {
                const recordSet = this.state.recordSet.slice();
                this.setState({
                    recordSet: recordSet.concat(response),
                    isLoading: false
                })
            }).catch(error => {
            this.setState({
                isLoading: false
            })
        });
        console.log("Component mounted.")
       // console.log(this.state.recordSet);
    }

    componentDidMount() {
        this.loadRecords();
    }

    add() {
        this.props.history.push('/generalinfo/new');
    }

    edit(id) {
        this.props.history.push(`/generalinfo/edit/${id}`);
    }

    delete(id){
        const {confirm} = Modal
        return new Promise((resolve, reject) => {
            confirm({
                title: 'Are you sure you want to Delete ?',
                onOk: () => {
                    resolve(true)
                    //onRemoveFunctionality here
                    deleteRecord("/generalinfo/",id).then( res => {
                        this.setState({recordSet: this.state.recordSet.filter(record => record.id !== id)});
                        notification.success({
                            message: 'PMIS',
                            description: "Record deleted successfully.",
                        });
                    });
                },
                onCancel: () =>{
                    reject(true)
                }
            })
        })
    }

    view(id) {
        this.props.history.push(`/generalinfo/update/${id}`);
    }

    render() {
        const { error, recordSet, isLoading } = this.state;
        
        if (error) {
            return (
                <div>Error: {error.message}</div>
            )
        } else {

            if (isLoading) {
                return <p>Loading...</p>;
            }
            const data = [];
            recordSet.forEach((record, recordIndex) => {
                data.push({
                    Id: record.id,
                    govId: record.govId,
                    firstName: record.firstName,
                    lastName: record.lastName,
                    fatherName: record.fatherName,
                    motherName: record.motherName,
                    dob: record.dob,
                    homeDistrictName: record.homeDistrictName,
                    maritalStatus: record.maritalStatus
                })
            });
            const columns = [
                {
                    title: 'ID',
                    dataIndex: 'Id',
                    key: 'Id',
                },
                {
                    title: 'Govt ID',
                    dataIndex: 'govId',
                    key: 'govId;',
                },
                {
                    title: 'First Name',
                    dataIndex: 'firstName',
                    key: 'firstName;',
                },
                {
                    title: 'Last Name',
                    dataIndex: 'lastName',
                    key: 'lastName;',
                },
                {
                    title: 'Father Name',
                    dataIndex: 'fatherName',
                    key: 'fatherName;',
                },
                {
                    title: 'Mother Name',
                    dataIndex: 'motherName',
                    key: 'motherName;',
                },
                {
                    title: 'Date of Birth',
                    dataIndex: 'dob',
                    key: 'dob;',
                },
                {
                    title: 'Home District',
                    dataIndex: 'homeDistrictName',
                    key: 'homeDistrictName;',
                },
                {
                    title: 'Marital Status',
                    dataIndex: 'maritalStatus',
                    key: 'maritalStatus;',
                },
                
                {
                    title: 'Action',
                    key: 'action',
                    render: (_, record) => (
                        <div>
                            <IconButton onClick={() => this.edit(record.Id)}
                                color="success"
                                aria-label="edit">
                                <EditIcon sx={{ color: blue[800] }} />
                            </IconButton>

                            <IconButton onClick={() => this.delete(record.Id)}
                                        color="warning"
                                        aria-label="delete">
                                <DeleteIcon sx={{ color: blue[800] }} />
                            </IconButton>
                        </div>
                    ),
                },
            ];
        return (
            <div>
                <h2 className="text-center">General Info</h2>
                <div className="">
                    <Button onClick={this.add}
                        variant="contained"
                        startIcon={<AddIcon />}>
                        ADD
                    </Button>
                </div>
                <br></br>
                <div className="row">
                    <div className='tbl-container'>
                        <Table columns={columns} dataSource={data}
                               bordered
                               rowClassName={(record, index) => index % 2 === 0 ? 'table-row-odd' :  'table-row-even'}
                        />
                    </div>
                </div>
            </div>
            );
        }
    }
}
export default GeneralInfoList;