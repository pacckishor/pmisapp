import React, { Component } from 'react';
// import {API_BASE_URL} from '../constants';
import './PostingStatusList.css';
import { getRecords } from '../util/APIUtils';
import 'bootstrap/dist/css/bootstrap.css';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { blue } from '@mui/material/colors';
import { API_BASE_URL } from '../constants';
//import { cyan } from '@mui/material/colors';

class PostingStatusList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postingstatuses: [],
            recordSet: [],
            response: {}
        }
        this.addPostingStatusInfo = this.addPostingStatusInfo.bind(this);
        this.edit = this.edit.bind(this);
    }


    loadRecords(){
        let promise;
        promise = getRecords("postingstatus");

        if (!promise) {
            return;
        }

        console.log(promise);
        
        promise
            .then(response => {
                const recordSet = this.state.recordSet.slice();

                this.setState({
                    recordSet: recordSet.concat(response.content),
                })
                this.state.response = response; 
                console.info(this.state.response);


            }).catch(error => {
                this.setState({
                    isLoading: false
                })
            });

    }
    componentDidMount() {

        this.loadRecords();


        
    }


    addPostingStatusInfo() {
        this.props.history.push('/postingstatus/new');
    }

    edit(id) {
        this.props.history.push(`/postingstatus/edit/${id}`);
    }

    viewPostingStatusInfo(id) {
        this.props.history.push(`/postingstatus/update/${id}`);
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

            // const data = [];
            // response.forEach((record, recordIndex) => {
            //     data.push({
            //         statusId: record.id

            //     })
            // });

            const columns = [
                {
                    title: 'ID',
                    dataIndex: 'statusId',
                    key: 'statusId',
                },
                {
                    title: 'Posting Status Name',
                    dataIndex: 'statusName',
                    key: 'statusName;',
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
                        
                        </div>
                        
                    ),
                },

            ];
        return (
            <div>
                <h2 className="text-center">Posting Status Info</h2>
                <div className="">
                    <Button onClick={this.addPostingStatusInfo}
                        variant="contained"
                        startIcon={<AddIcon />}>
                        ADD
                    </Button>
                </div>
                <br></br>
                <div className="row">
                    
                </div>

            </div>
        );
    }

    }

}

export default PostingStatusList;