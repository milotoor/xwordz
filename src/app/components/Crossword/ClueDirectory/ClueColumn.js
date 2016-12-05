
import React, { Component, PropTypes } from 'react';

import Colors from '../../../../util/colors';
import ClueList from './ClueList';


export default class ClueColumn extends Component {
    static propTypes = {
        clues      : PropTypes.object.isRequired,
        currentClue: PropTypes.object.isRequired,
        direction  : PropTypes.string.isRequired
    };

    render () {
        const { clues, currentClue, direction } = this.props;
        const columnStyle = {
            borderRight: `1px solid ${Colors.background.grey400}`
        };

        return (
            <div className="clue-column" style={columnStyle}>
                <div className={`clue-column-header ${Colors.primary500}`}>
                    {direction.toUpperCase()}
                </div>

                <div className="clue-list-wrapper">
                    <ClueList
                        clues={clues.get(direction)}
                        currentClue={currentClue} />
                </div>
            </div>
        );
    }
}
