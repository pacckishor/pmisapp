import React, { Component } from 'react';
import './AwardList.css';
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
class AwardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            recordSet: [],
            isLoading: false,
            response: {},
        }
        this.loadRecords = this.loadRecords.bind(this);
        this.addAward = this.addAward.bind(this);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
    }

    loadRecords() {
        let promise;

        promise = getRecords("awards");

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


    addAward() {
        this.props.history.push('/award/new');
    }

    edit(id) {
        this.props.history.push(`/award/edit/${id}`);
    }


    delete(id){
        const {confirm} = Modal
        return new Promise((resolve, reject) => {
            confirm({
                title: 'Are you sure you want to Delete ?',
                onOk: () => {
                    resolve(true)

                    //onRemoveFunctionality here
                    deleteRecord( "/award/",id).then( res => {
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
        this.props.history.push(`/award/update/${id}`);
    }


    render() {

        const { error,response, recordSet, isLoading } = this.state;

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
                    statusId: record.id,
                    governmentOrderDate: record.governmentOrderDate,
                    awardSerial: record.awardSerial,
                    awardName: record.awardName,
                    awardGround: record.awardGround,
                    
                    remarks: record.remarks,
                    govId: record.govId
                })
            });

            const columns = [
                {
                    title: 'ID',
                    dataIndex: 'statusId',
                    key: 'statusId',
                },
                {
                    title: 'Award Serial',
                    dataIndex: 'awardSerial',
                    key: 'awardSerial;',
                },
                {
                    title: 'Government Order Date',
                    dataIndex: 'governmentOrderDate',
                    key: 'governmentOrderDate;',
                },
                {
                    title: 'Award Name',
                    dataIndex: 'awardName',
                    key: 'awardName;',
                },
                {
                    title: 'Award Ground',
                    dataIndex: 'awardGround',
                    key: 'awardGround;',
                },
                
                {
                    title: 'Remark',
                    dataIndex: 'remarks',
                    key: 'remarks;',
                },
                {
                    title: 'Action',
                    key: 'action',
                    render: (_, record) => (
                        <div>
                            <IconButton onClick={() => this.edit(record.statusId)}
                                color="success"
                                aria-label="edit">
                                <EditIcon sx={{ color: blue[800] }} />
                            </IconButton>

                            <IconButton onClick={() => this.delete(record.statusId)}
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
                    <h2 className="text-center">Award List</h2>
                    <div className="">
                        <Button onClick={this.addAward}
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

export default AwardList;