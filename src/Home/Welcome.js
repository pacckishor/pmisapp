import React, { Component } from 'react';

import LoadingIndicator  from '../common/LoadingIndicator';
//import { Button, Icon, notification } from 'antd';
import { withRouter } from 'react-router-dom';

class Welcome extends Component {


    render() {
        return (
            <div className="polls-container">

                        <div className="no-polls-found">
                            <h2>Welcome to PMIS.</h2>
                        </div>

                        <LoadingIndicator />

            </div>
        );
    }
}

export default withRouter(Welcome);