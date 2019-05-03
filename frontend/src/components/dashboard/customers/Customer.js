import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import StyledButton from '../core/StyledButton';
import {customersPath} from "../Dashboard";
import FirstNameTextField from '../core/FirstNameTextField';
import LastNameTextField from '../core/LastNameTextField';
import withPeopleContext from "../../../core/withPeopleContext";

const styles = {

    button: {
        marginTop: 10,
        marginRight: 10
    }
};


class Customer extends React.Component {

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
                    this.props.history.push(customersPath);
                }}>Delete</StyledButton>
            </div>
        )

    }


}

export default withPeopleContext(withStyles(styles)(Customer));
