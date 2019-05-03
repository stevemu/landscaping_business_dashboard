import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import StyledButton from '../core/StyledButton';
import FirstNameTextField from '../core/FirstNameTextField';
import LastNameTextField from '../core/LastNameTextField';
import withPeopleContext from "../../../core/withPeopleContext";
import Typography from '@material-ui/core/Typography';

const styles = {
    button: {
        marginTop: 10,
        marginRight: 10
    }
};

class NewCustomer extends React.Component {

    render() {
        let {classes, handleCreatePerson} = this.props;

        return (
            <div>
                <Typography variant="h4" gutterBottom>
                    New Customer
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
                <StyledButton onClick={async () => {
                    let person = {
                        firstName: this.firstNameField.value,
                        lastName: this.firstNameField.value,
                        roles: ["ROLE_CUSTOMER"]
                    };
                    this.props.handleCreatePerson(person);
                }}>Create</StyledButton>

            </div>
        )
    }


}

export default withPeopleContext(withStyles(styles)(NewCustomer));
