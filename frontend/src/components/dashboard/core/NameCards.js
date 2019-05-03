import React from 'react';

import NameCard from '../core/NameCard';
import {getLastSegmentFromUrl} from "../../../core/utils";

function NameCards(props) {
    return (
        <div>
            {props.people.map((person) => {
                let id = getLastSegmentFromUrl(person._links.self.href);
                return <NameCard key={person._links.self.href} person={person} onClick={() => {
                    props.history.push(`${props.match.path}/${id}`);
                }}/>
            })}
        </div>
    );
}

export default NameCards;

