
import React, { PropTypes } from 'react';
import { Card } from 'react-mdl';

import Colors from '../../../../util/colors';
import './ClueBar.styl';


/**
 * Given the board data and a clue, returns the text of the clue
 */
const getClueText = (board, clue) => {
    return board.clues[clue.direction][clue.number];
};

const ClueBar = props => {
    const { currentClue, board } = props;
    const dirLetter = currentClue.direction[0].toUpperCase();

    return (
        <Card id="clue-bar" shadow={3} className={Colors.primary700}>
            <span id="clue-bar-number">{currentClue.number}{dirLetter}</span>
            <span id="clue-bar-clue">{getClueText(board, currentClue)}</span>
        </Card>
    );
};


ClueBar.prototype.propTypes = {
    currentClue: PropTypes.object.isRequired,
    board      : PropTypes.object.isRequired
};


export default ClueBar;
