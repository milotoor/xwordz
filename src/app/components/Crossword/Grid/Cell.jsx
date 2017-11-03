
// Libs
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

// App resources
import { currentClue } from '../accessors';
import { getCellState, isCurrentCell } from './accessors';
import { clickCell } from './actions';


class Cell extends Component {
    static propTypes = {
        row          : PropTypes.number.isRequired,
        col          : PropTypes.number.isRequired,
        clickCell    : PropTypes.func.isRequired,
        isBlockCell  : PropTypes.bool.isRequired,
        isCurrentCell: PropTypes.bool.isRequired,
        inCurrentClue: PropTypes.bool.isRequired,
        clueNumber   : PropTypes.number,
        entry        : PropTypes.string
    };

    render () {
        const {
            entry,
            isBlockCell,
            isCurrentCell,
            inCurrentClue,
            clueNumber
        } = this.props;

        const
            nbsp        = '\u00a0',
            cellContent = isBlockCell ? nbsp : (entry || nbsp);

        const cellClasses = classNames('cell-content', {
            'block'                      : isBlockCell,
            'mdc-theme--primary-bg'      : isCurrentCell,
            'mdc-theme--primary-light-bg': !isCurrentCell && inCurrentClue
        });

        return (
            <div className={cellClasses} onClick={this.handleCellClick}>
                {clueNumber && <span className="clue-number">{clueNumber}</span>}
                <span>{cellContent.toUpperCase()}</span>
            </div>
        );
    }

    /**
     * Callback triggered when the cell is clicked
     */
    handleCellClick = () => {
        const { row, col, clickCell } = this.props;
        clickCell(row, col);
    };
}


const mapStateToProps = (state, { row, col }) => {
    const entry = state.getIn(['progress', row, col]);
    const { clueNumber, isBlockCell, containingClues } = getCellState(row, col);
    const curClueInfo = currentClue(state);
    const inCurrentClue = containingClues
        ? containingClues[curClueInfo.direction] === curClueInfo.number
        : false;

    return {
        clueNumber,
        inCurrentClue,
        entry,
        isBlockCell  : isBlockCell || false,
        isCurrentCell: isCurrentCell(row, col)
    };
};

export default connect(mapStateToProps, { clickCell })(Cell);
