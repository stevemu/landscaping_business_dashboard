import React from 'react';
import PeopleContext from './PeopleContext'

function withPeopleContext(WrappedComponent) {
    return class extends React.Component {
        render() {

            return (
                <PeopleContext.Consumer>
                    {(value) => {
                        return (
                            <WrappedComponent {...value} {...this.props} />
                        )
                    }}
                </PeopleContext.Consumer>
            );
        }


    }
}

export default withPeopleContext;

