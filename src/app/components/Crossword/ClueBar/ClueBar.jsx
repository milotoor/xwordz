
// Libs
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Card } from 'react-mdl';

// Clue bar resources
import Colors from '../../../../util/colors';
import { currentClue } from '../accessors';
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


const mapStateToProps = state => ({
    currentClue: currentClue(state)
});

export default connect(mapStateToProps)(ClueBar);
