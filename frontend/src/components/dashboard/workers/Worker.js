import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import StyledButton from '../core/StyledButton';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {getAuthed, deleteAuthed, putAuthed, getEntityById} from "../../../core/utils";
import {workersPath} from "../Dashboard";
import PeopleContext from '../../../core/PeopleContext';
import FirstNameTextField from '../core/FirstNameTextField';
import LastNameTextField from '../core/LastNameTextField';
import withPeopleContext from "../../../core/withPeopleContext";

const styles = {
    button: {
        marginTop: 10,
        marginRight: 10
    }
};


class Worker extends React.Component {

    render() {
        let {classes} = this.props;

        let {
            handleDeletePerson,
            handleUpdatePerson,
            getPersonById,
            people
        } = this.props;

        if (people.length === 0) {
            return <div>Loading...</div>
        }

        let id = this.props.match.params.id;
        let person = getPersonById(id);
        if (!person) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <FirstNameTextField
                    defaultValue={person.firstName || ""}
                    inputRef={input => {
                        this.firstNameField = input
                    }}
                />
                <LastNameTextField
                    defaultValue={person.lastName || ""}
                    inputRef={input => {
                        this.lastNameField = input
                    }}
                />
                <StyledButton variant="contained" className={classes.button} onClick={async () => {
                    let personData = {
                        firstName: this.firstNameField.value,
                        lastName: this.lastNameField.value
                    };

                    handleUpdatePerson(id, personData)
                }}>
                    Update
                </StyledButton>
                <StyledButton variant="contained" className={classes.button} onClick={async () => {
                    await handleDeletePerson(id);
                    this.props.history.push(workersPath);
                }}>Delete</StyledButton>
            </div>
        )

    }


}

export default withPeopleContext(withStyles(styles)(Worker));
