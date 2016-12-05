
import React, { PropTypes } from 'react';
import { Card } from 'react-mdl';

import Colors from '../../../../util/colors';
import './ClueBar.styl';


const ClueBar = ({ currentClue }) => {
    const dirLetter = currentClue.direction[0].toUpperCase();

    return (
        <Card id="clue-bar" shadow={3} className={Colors.primary700}>
            <span id="clue-bar-number">{currentClue.number}{dirLetter}</span>
            <span id="clue-bar-clue">{currentClue.text}</span>
        </Card>
    );
};


ClueBar.prototype.propTypes = {
    currentClue: PropTypes.object.isRequired
};


export default ClueBar;
