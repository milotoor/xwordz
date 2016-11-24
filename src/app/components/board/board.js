
import React, { Component } from 'react';
import { Card, Grid, Cell } from 'react-mdl';
import map from 'lodash/map';

import BoardCell from './cell';
import './board.styl';


export default class Board extends Component {
    static propTypes = {
        board      : React.PropTypes.object.isRequired,
        currentClue: React.PropTypes.object.isRequired,
        updateClue : React.PropTypes.func.isRequired
    }

    constructor () {
        super();
        this.state = {
            currentCell: null
        };
    }

    render () {
        const { board, currentClue } = this.props;

        return (
            <Card id="board" shadow={3}>
                {map(board.grid, (rowCells, i) =>
                    <Grid key={i} className="board-row">
                        {map(rowCells, (cell, j) =>
                            <Cell col={1} key={j} className="board-cell">
                                <BoardCell
                                    data={cell}
                                    neighbors={this._getCellNeighbors(cell, rowCells)}
                                    clicked={this.cellClicked}
                                    isCurrentCell={this.state.currentCell === cell}
                                    currentClue={currentClue}
                                />
                            </Cell>
                        )}
                    </Grid>
                )}
            </Card>
        );
    }

    cellClicked = cell => {
        if (cell.isBlockCell) {
            return;
        }

        const
            { currentClue, updateClue } = this.props,
            { currentCell }             = this.state,
            currentDirection            = currentClue.direction;

        if (this.state.currentCell === cell) {
            // If the active cell is clicked, toggle the clue direction
            const oppositeDirection = currentDirection === 'across'
                ? 'down'
                : 'across';

            updateClue({
                number   : currentCell.containingClues[oppositeDirection],
                direction: oppositeDirection
            });
        } else {
            // Otherwise if a different cell is clicked, change the current cell and the
            // clue, but keep the direction.
            this.setState({ currentCell: cell });
            updateClue({
                number   : cell.containingClues[currentDirection],
                direction: currentDirection
            });
        }
    }

    _getCellNeighbors (cell, rowCells) {
        const
            cellRowIndex = rowCells.indexOf(cell),
            left  = rowCells[cellRowIndex - 1] || null,
            right = rowCells[cellRowIndex + 1] || null;

        const
            { board } = this.props,
            grid = board.grid;

        const
            rowAbove = grid[grid.indexOf(rowCells) - 1] || null,
            rowBelow = grid[grid.indexOf(rowCells) + 1] || null,
            above = rowAbove ? rowAbove[cellRowIndex] : null,
            below = rowBelow ? rowBelow[cellRowIndex] : null;

        return {
            left,
            right,
            above,
            below
        };
    }
}
