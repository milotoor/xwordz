
// Libs
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// App resources
import { Card } from 'mdc';

// Clue bar resources
import { currentClue } from '../accessors';
import './ClueBar.styl';


const ClueBar = ({ currentClue }) => {
    const dirLetter = currentClue.direction[0].toUpperCase();

    return (
        <Card id="clue-bar" className="mdc-theme--primary-dark-bg" raised>
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
