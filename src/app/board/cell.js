
import React, { Component, PropTypes } from 'react';


export default class Cell extends Component {
    static propTypes = {
        data         : PropTypes.object.isRequired,
        clicked      : PropTypes.func.isRequired,
        isCurrentCell: PropTypes.bool.isRequired,
        currentClue  : PropTypes.number,
        clueDirection: PropTypes.string
    }

    render () {
        const { data } = this.props;
        const
            cellContent = data.isBlockCell ? '\u00a0' : data.solution,
            clueNumber = data.clueNumber;

        return (
            <div className={this._cellClasses()} onClick={this.handleClick}>
                {clueNumber && <span className="clue-number">{clueNumber}</span>}
                <span>{cellContent.toUpperCase()}</span>
            </div>
        );
    }

    _cellClasses () {
        const {
            data,
            isCurrentCell,
            currentClue,
            clueDirection
        } = this.props;

        const cellClassNames = ['cell-content'];

        // Add "block" class if the cell is a block
        data.isBlockCell && cellClassNames.push('block');
        isCurrentCell    && cellClassNames.push('mdl-color--green-700');

        // If the cell is a part of the current clue, color it
        if (
               !isCurrentCell
            && data.containingClues
            && data.containingClues[clueDirection] === currentClue
        ) {
            cellClassNames.push('mdl-color--green-A200');
        }


        return cellClassNames.join(' ');
    }

    handleClick = () => {
        this.props.clicked(this.props.data);
    }
}
