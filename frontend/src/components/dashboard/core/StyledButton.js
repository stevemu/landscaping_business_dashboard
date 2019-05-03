import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = {
    button: {
        marginTop: 10,
        marginRight: 10
    }
};

class MyButton extends React.Component {
    render() {
        let {classes} = this.props;

        return (
            <Button onClick={this.props.onClick} className={classes.button} >{this.props.children}</Button>
        )
    }


}

export default withStyles(styles)(MyButton);
