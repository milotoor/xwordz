
import React, { Component, PropTypes } from 'react';
import { Card, Grid, Cell } from 'react-mdl';
import map from 'lodash/map';

import BoardCell from './Cell';
import './Board.styl';


export default class Board extends Component {
    static propTypes = {
        board      : PropTypes.object.isRequired,
        currentClue: PropTypes.object.isRequired,
        updateClue : PropTypes.func.isRequired
    }

    constructor (props) {
        super(props);
        this.state = {
            currentCell: props.board.grid[0][0]
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
                                    onCellClick={this.cellClicked}
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
