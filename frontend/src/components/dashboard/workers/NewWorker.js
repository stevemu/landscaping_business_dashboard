import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import StyledButton from '../core/StyledButton';
import Typography from '@material-ui/core/Typography';
import FirstNameTextField from '../core/FirstNameTextField';
import LastNameTextField from '../core/LastNameTextField';
import withPeopleContext from "../../../core/withPeopleContext";

const styles = {
    button: {
        marginTop: 10,
        marginRight: 10
    }
};


class NewWorker extends React.Component {

    render() {
        let {classes} = this.props;

        return (
            <div>
                <Typography variant="h4" gutterBottom>
                    New Worker
                </Typography>
                <FirstNameTextField
                    defaultValue={""}
                    inputRef={input => {
                        this.firstNameField = input
                    }}
                />
                <LastNameTextField
                    defaultValue={""}
                    inputRef={input => {
                        this.lastNameField = input
                    }}
                />
                <StyledButton className={classes.button} onClick={async () => {
                    let person = {
                        firstName: this.firstNameField.value,
                        lastName: this.lastNameField.value,
                        roles: ["ROLE_WORKER"]
                    }
                    this.props.handleCreatePerson(person);
                    if (this.props.handleClose)
                        this.props.handleClose();
                }}>Create</StyledButton>

            </div>
        )
    }


}

export default withPeopleContext(withStyles(styles)(NewWorker));
