
import React, { Component, PropTypes } from 'react';
import {
    List,
    ListItem
} from 'react-mdl';

import Colors from '../../../../util/colors';


export class Clue extends Component {
    static propTypes = {
        number : PropTypes.number.isRequired,
        content: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired
    };

    render () {
        const { number, content } = this.props;

        return (
            <div className="clue-content" onClick={this.handleClick}>
                <span className="clue-list-number">{number}.</span>
                <span className="clue-list-text">{content}</span>
            </div>
        );
    }

    handleClick = () => {
        const { number, onClick } = this.props;
        onClick(number);
    }
}


export default class ClueList extends Component {
    static propTypes = {
        clues      : PropTypes.object.isRequired,
        direction  : PropTypes.string.isRequired,
        currentClue: PropTypes.object.isRequired,
        onClueClick: PropTypes.func.isRequired
    };

    render () {
        const { clues, direction, currentClue } = this.props;
        const currentClueNum = direction === currentClue.direction
            ? currentClue.number
            : null;

        const clueClasses = (clueNum) => {
            const classes = ['clue'];

            if (clueNum === currentClueNum) {
                classes.push(Colors.accent200);
            }

            return classes.join(' ');
        };

        return (
            <List className="clue-list">
                {clues.entrySeq().map(([clueNumber, clue]) =>
                    <ListItem key={clueNumber} className={clueClasses(clueNumber)}>
                        <Clue number={clueNumber} content={clue} onClick={this.handleClueClick} />
                    </ListItem>
                )}
            </List>
        );
    }

    handleClueClick = (clueNumber) => {
        const { currentClue, onClueClick } = this.props;

        // Don't bother with the callback if the current clue is clicked.
        if (currentClue.number === clueNumber) {
            return;
        }

        onClueClick(clueNumber);
    }
}
