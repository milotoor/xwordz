
import React, { Component, PropTypes } from 'react';
import {
    List,
    ListItem
} from 'react-mdl';


export default class ClueList extends Component {
    static propTypes = {
        clues      : PropTypes.object.isRequired,
        currentClue: PropTypes.object.isRequired
    };

    render () {
        return (
            <List>
                {Object.keys(this.props.clues).map(clueNumber =>
                    <ListItem key={clueNumber}>{clueNumber}</ListItem>
                )}
            </List>
        );
    }
}
