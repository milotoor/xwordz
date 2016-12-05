
import React, { Component, PropTypes } from 'react';
import { Card, Grid as GridMDL, Cell } from 'react-mdl';

import GridCell from './Cell';
import Helpers from '../helpers';
import './Grid.styl';


export default class Grid extends Component {
    static propTypes = {
        puzzle    : PropTypes.object.isRequired,
        position  : PropTypes.object.isRequired,
        updateClue: PropTypes.func.isRequired
    }

    render () {
        const { puzzle, position } = this.props;
        const
            grid        = puzzle.get('grid'),
            currentClue = Helpers.currentClue(puzzle, position),
            currentCell = Helpers.currentCell(grid, position);

        return (
            <Card id="board" shadow={3}>
                {grid.map((row, i) =>
                    <GridMDL key={i} className="board-row">
                        {row.map((cell, j) =>
                            <Cell col={1} key={j} className="board-cell">
                                <GridCell
                                    data={cell}
                                    onCellClick={this.handleCellClicked}
                                    isCurrentCell={currentCell === cell}
                                    currentClue={currentClue} />
                            </Cell>
                        )}
                    </GridMDL>
                )}
            </Card>
        );
    }

    handleCellClicked = cell => {
        if (cell.isBlockCell) {
            return;
        }

        const { puzzle, position } = this.props,
            currentCell = Helpers.currentCell(puzzle, position);

        if (currentCell === cell) {
            // Dispatch action to toggle direction
        } else {
            // Dispatch action to move current cell
        }
    }
}
