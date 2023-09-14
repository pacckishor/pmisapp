import React, { Component, useEffect, useState } from 'react';

import './PromotionList.css';
import { getRecords } from '../util/APIUtils';
import 'bootstrap/dist/css/bootstrap.css';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { blue } from '@mui/material/colors';
//import { API_BASE_URL } from '../constants';
//import { cyan } from '@mui/material/colors';


import { Link } from 'react-router-dom';
import axios from 'axios';


class PromotionList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            promotionstatuses: [],
            recordSet: [],
            response: {}
        }
        this.addPromotionInfo = this.addPromotionInfo.bind(this);
        this.edit = this.edit.bind(this);
    }


    loadRecords(){
        let promise;
        promise = getRecords("promotion");

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


    addPromotionInfo() {
        this.props.history.push('/promotion/new');
    }

    edit(id) {
        this.props.history.push(`/promotion/edit/${id}`);
    }

    viewPromotionInfo(id) {
        this.props.history.push(`/promotion/update/${id}`);
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

            const columns = [
                {
                    title: 'ID',
                    dataIndex: 'PROMOTION_ID',
                    key: 'PROMOTION_ID',
                },
                {
                    title: 'Posting Status Name',
                    dataIndex: 'natureOfPromotion',
                    key: 'natureOfPromotion;',
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
                <h2 className="text-center">Promotion Information List</h2>
                <div className = "">
                    <Button onClick={this.addPromotionInfo}
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
                                <th>Govt ID</th>
                                <th>Promotion Date</th>
                                <th>Rank Code</th>
                                <th>Pay Grade</th>
                                <th>Actual Promotion Date</th>
                                <th>Remark</th>
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

}

export default PromotionList;