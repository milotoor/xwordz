
import React from 'react';
import { Card } from 'react-mdl';

import Colors from '../../util/colors';
import './clueBar.styl';

const ClueBar = props => {
    debugger;
    return (
        <Card id="clue-bar" className={Colors.primary500}>
            {props.currentClue.number}
        </Card>
    );
};


ClueBar.prototype.propTypes = {
    currentClue: React.PropTypes.object.isRequired
};


export default ClueBar;
