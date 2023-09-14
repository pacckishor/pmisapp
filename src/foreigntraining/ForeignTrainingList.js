import React, { Component} from 'react';
import {API_BASE_URL} from '../constants';
import'./ForeignTrainingList.css';

import 'bootstrap/dist/css/bootstrap.css';
import Button from '@mui/material/Button';
//import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
//import EditIcon from '@mui/icons-material/Edit';
//import { blue } from '@mui/material/colors';
//import { cyan } from '@mui/material/colors';

class ForeignTrainingList extends Component{
    constructor(props) {
        super(props);
        this.state = {
        
            foreigntrainings:[]
 
        }
        this.addForeignTrainingInfo = this.addForeignTrainingInfo.bind(this);
       

        
    }

    // componentDidMount() {
    //     fetch(API_BASE_URL + "/foreigntrainings")
    //         .then(res => res.json())
    //         .then(
    //             (foreigntrainings) => {
    //                 this.setState({ foreigntrainings: foreigntrainings });
    //             },
    //             (error) => {
    //                 alert(error);
    //             }
    //         )
    // }


    addForeignTrainingInfo(){
        this.props.history.push('/foreigntrainings/new');
    }

    


    render() {
        return (
            <div>
                <h2 className="text-center">Foreign Training</h2>
                <div className = "">
                    <Button onClick={this.addForeignTrainingInfo}
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
                                <th>Training Title Name</th>
                                <th>Institute Name</th>
                                <th>Country ID</th>
                                <th>From Date</th>
                                <th>End Date</th>
                                
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


export default ForeignTrainingList;