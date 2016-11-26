
import React, { Component, PropTypes } from 'react';

import Colors from '../../../../util/colors';
import ClueList from './ClueList';


export default class ClueColumn extends Component {
    static propTypes = {
        board      : PropTypes.object.isRequired,
        currentClue: PropTypes.object.isRequired,
        direction  : PropTypes.string.isRequired
    };

    render () {
        const { board, currentClue, direction } = this.props;
        const columnStyle = {
            borderRight: `1px solid ${Colors.background.grey400}`
        };

        return (
            <div className="clue-column" style={columnStyle}>
                <div className={`clue-column-header ${Colors.primary500}`}>
                    {direction.toUpperCase()}
                </div>

                <ClueList
                    clues={board.clues[direction]}
                    currentClue={currentClue}
                />
            </div>
        );
    }
}
