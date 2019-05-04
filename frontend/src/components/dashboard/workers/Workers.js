import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import {BrowserRouter as Router, Route, Link, Redirect} from "react-router-dom";
import withResizeAware from '../../../core/withResizeAware';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import NameCards from '../core/NameCards';
import Worker from "./Worker";
import NewWorker from "./NewWorker";
import {
    get,
    getAuthed,
    logout,
    filterUsersByWorkers,
    getEntityById,
    getIdFromEntity,
    filterByFields
} from "../../../core/utils";
import withPeopleContext from "../../../core/withPeopleContext";

const styles = {
    root: {
        flex: 1,
        padding: 10
    },
    container: {
        display: "grid",
        gridTemplateColumns: "1fr",
        overflow: "hidden",
    },
    left: {
        overflow: "scroll",
        marginRight: 5,
        paddingBottom: 150
    },
    right: {
        // overflow: "scroll",
    },
    textField: {
        width: "100%"
    }
};

class Workers extends React.Component {

    state = {
        search: ""
    }

    render() {

        const {classes, people} = this.props;

        if (people.length === 0) {
            return <div>Loading...</div>
        }

        // console.log(people);
        let workers = filterUsersByWorkers(people);
        workers = filterByFields(workers, this.state.search);
        let firstId = getIdFromEntity(workers[0]);

        let containerHeight = this.props.height - 120;
        let leftHeight = this.props.height;
        let rightHeight = this.props.height;

        return (
            <div className={classes.root}>
                <div className={classes.container} style={{
                    height: containerHeight,
                    // backgroundColor: "grey",
                    gridTemplateColumns: this.props.width >= 600 ? "200px 1fr" : "1fr",
                }}>
                    <div className={classes.left} style={{
                        // height: leftHeight
                    }}>
                        <Button onClick={() => {
                            this.props.history.push(`${this.props.match.path}/new`)
                        }}>Create Worker</Button>

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
                            <NameCards {...this.props} people={workers} />
                        </nav>
                    </div>
                    {this.props.width >= 600 && <div className={classes.right} style={{
                        // height: rightHeight
                    }}>
                        <Route
                            path={`${this.props.match.path}/:id([0-9]+)`}
                            exact
                            component={(props) => (
                                <Worker {...props} />
                            )}
                        />
                        <Route
                            path={`${this.props.match.path}/new`}
                            exact
                            component={(props) => (
                                <NewWorker {...props} />
                            )}
                        />
                        {firstId && <Route exact path={`${this.props.match.path}`} render={() => {
                            return <Redirect to={`${this.props.match.path}/${firstId}`} />
                        }}/>}

                    </div>}
                </div>
            </div>
        )


    }

}


export default withPeopleContext(withResizeAware(withStyles(styles)(Workers)));

