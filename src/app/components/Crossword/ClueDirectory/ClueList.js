
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
        const { clues } = this.props;
        return (
            <List className="clue-list">
                {clues.valueSeq().map((clue, clueNumber) =>
                    <ListItem key={clueNumber} className="clue">
                        <div className="clue-content">
                            <span>{clueNumber + 1}.</span>
                            <span className="clue-text">{clue}</span>
                        </div>
                    </ListItem>
                )}
            </List>
        );
    }
}
