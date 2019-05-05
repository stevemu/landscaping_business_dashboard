import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import withResizeAware from '../../../core/withResizeAware';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";

import NameCards from '../core/NameCards';
import Customer from "./Customer";
import NewCustomer from "./NewCustomer";

import {
    get,
    getAuthed,
    logout,
    filterUsersByWorkers,
    getEntityById,
    getIdFromEntity,
    filterByFields,
    filterUsersByRole
} from "../../../core/utils";
import withPeopleContext from "../../../core/withPeopleContext";
import MasterDetail from "../core/MasterDetail";

const styles = {
    textField: {
        width: "100%"
    }
};

class Customers extends React.Component {

    state = {
        search: ""
    }

    render() {

        const {classes, people, ...rest} = this.props;

        if (people.length === 0) {
            return <div>Loading...</div>
        }

        // console.log(people);
        let customers = filterUsersByRole(people, "ROLE_CUSTOMER");
        customers = filterByFields(customers, this.state.search);
        let firstId = getIdFromEntity(customers[0]);

        return (
            <MasterDetail
                {...rest}
                master={() => (
                    <div>
                        <Button onClick={() => {
                            this.props.history.push(`${this.props.match.path}/new`)
                        }}>Create Customer</Button>

                        <TextField
                            id="search"
                            label="Search"
                            className={classes.textField}
                            value={this.state.search}
                            onChange={(e) => {
                                this.setState({search: e.target.value});
                            }}
                            margin="normal"
                        />
                        <nav>
                            <NameCards {...this.props} people={customers} />
                        </nav>
                    </div>
                )}

                detail={() => (
                    <div>
                        <Route
                            path={`${this.props.match.path}/:id([0-9]+)`}
                            exact
                            component={(props) => (
                                <Customer {...props} />
                            )}
                        />
                        <Route
                            path={`${this.props.match.path}/new`}
                            exact
                            component={(props) => (
                                <NewCustomer {...props} />
                            )}
                        />

                        {firstId && <Route exact path={`${this.props.match.path}`} render={() => {
                            return <Redirect to={`${this.props.match.path}/${firstId}`} />
                        }}/>}
                    </div>
                )}
            />
        )


    }

}


export default withPeopleContext(withResizeAware(withStyles(styles)(Customers)));

