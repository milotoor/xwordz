
import React, { Component, PropTypes } from 'react';
import Colors from '../../../../util/colors';


export default class Cell extends Component {
    static propTypes = {
        data         : PropTypes.object.isRequired,
        onCellClick  : PropTypes.func.isRequired,
        isCurrentCell: PropTypes.bool.isRequired,
        currentClue  : PropTypes.object
    };

    render () {
        const data = this.props.data.toJS();
        const
            nbsp        = '\u00a0',
            cellContent = data.isBlockCell ? nbsp : (data.solution || nbsp),
            clueNumber  = data.clueNumber;

        return (
            <div className={this._cellClasses()} onClick={this.handleCellClick}>
                {clueNumber && <span className="clue-number">{clueNumber}</span>}
                <span>{cellContent.toUpperCase()}</span>
            </div>
        );
    }

    _cellClasses () {
        const { isCurrentCell, currentClue } = this.props;
        const
            data           = this.props.data.toJS(),
            cellClassNames = ['cell-content'];

        // Add "block" class if the cell is a block
        data.isBlockCell && cellClassNames.push('block');
        isCurrentCell    && cellClassNames.push(Colors.primary500);

        // If the cell is a part of the current clue, color it
        if (
               !isCurrentCell
            && data.containingClues
            && data.containingClues[currentClue.direction] === currentClue.number
        ) {
            cellClassNames.push(Colors.primary100);
        }

        return cellClassNames.join(' ');
    }

    /**
     * Callback triggered when the cell is clicked
     */
    handleCellClick = () => {
        const { data, onCellClick } = this.props;
        onCellClick(data);
    };
}
