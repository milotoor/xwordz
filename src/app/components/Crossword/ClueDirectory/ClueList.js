
import React, { Component, PropTypes } from 'react';
import {
    List,
    ListItem
} from 'react-mdl';

import Colors from '../../../../util/colors';


export class Clue extends Component {
    static propTypes = {
        number    : PropTypes.number.isRequired,
        content   : PropTypes.string.isRequired,
        onClick   : PropTypes.func.isRequired,
        classNames: PropTypes.string
    };

    render () {
        const { number, content, classNames } = this.props;

        return (
            <ListItem className={classNames} onClick={this.handleClick}>
                <div className="clue-content">
                    <span className="clue-list-number">{number}.</span>
                    <span className="clue-list-text">{content}</span>
                </div>
            </ListItem>
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
                    <Clue
                        key={clueNumber}
                        classNames={clueClasses(clueNumber)}
                        number={clueNumber}
                        content={clue}
                        onClick={this.handleClueClick} />
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
