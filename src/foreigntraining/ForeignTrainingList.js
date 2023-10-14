import React, { Component} from 'react';
import'./ForeignTrainingList.css';
import 'bootstrap/dist/css/bootstrap.css';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import {deleteRecord, getRecords} from "../util/APIUtils";
import {Modal, notification, Table} from "antd";
import {blue} from "@mui/material/colors";



class ForeignTrainingList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            recordSet: [],
            isLoading: false,
            response: {},
 
        }
        this.loadRecords = this.loadRecords.bind(this);

        this.add = this.add.bind(this);
        this.edit = this.edit.bind(this);
        this.delete = this.delete.bind(this);
        
        
    }

    loadRecords() {
        let promise;

        promise = getRecords("foreigntrainings");

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
        //console.log(this.state.recordSet);

    }

    componentDidMount() {
        this.loadRecords();
    }

    add(){
        this.props.history.push('/foreigntraining/new');
    }

    edit(id) {
        this.props.history.push(`/foreigntraining/edit/${id}`);
    }


    delete(id){
        const {confirm} = Modal
        return new Promise((resolve, reject) => {
            confirm({
                title: 'Are you sure you want to Delete ?',
                onOk: () => {
                    resolve(true)

                    //onRemoveFunctionality here
                    deleteRecord("/foreigntrainings/",id).then( res => {
                        this.setState({recordSet: 
                        this.state.recordSet.filter(record => record.id !== id)});
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
        this.props.history.push('/foreigntraining/update/${id}');

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
                    foreignTrainingId: record.id,
                    govId: record.govId,
                    foreignTrainingTitleName: record.foreignTrainingTitleName,
                    instituteName: record.instituteName,
                    fromDate: record.fromDate,
                    endDate: record.endDate,
                    locationNameEn: record.locationNameEn
                })
            });

            const columns = [
                {
                    title: 'ID',
                    dataIndex: 'foreignTrainingId',
                    key: 'foreignTrainingId',
                },
                {
                    title: 'Govt ID',
                    dataIndex: 'govId',
                    key: 'govId',
                },
                {
                    title: 'Training Title Name',
                    dataIndex: 'foreignTrainingTitleName',
                    key: 'foreignTrainingTitleName;',
                },
                {
                    title: 'Institute Name',
                    dataIndex: 'instituteName',
                    key: 'instituteName;',
                },
                
                {
                    title: 'From Date',
                    dataIndex: 'fromDate',
                    key: 'fromDate',
                },
                {
                    title: 'End Date',
                    dataIndex: 'endDate',
                    key: 'endDate;',
                },

                {
                    title: 'Country Name',
                    dataIndex: 'locationNameEn',
                    key: 'locationNameEn;',
                },
                
    
                {
                    title: 'Action',
                    key: 'action',
                    render: (_, record) => (
                        <div>
                            <IconButton onClick={() => this.edit(record.foreignTrainingId)}
                                        color="success"
                                        aria-label="edit">
                                <EditIcon sx={{ color: blue[800] }} />
                            </IconButton>

                            <IconButton onClick={() => this.delete(record.foreignTrainingId)}
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
                    <h2 className="text-center">Foreign Training Info List</h2>
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


export default ForeignTrainingList;