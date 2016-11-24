
import React, { Component } from 'react';
import { Card, Grid, Cell } from 'react-mdl';
import map from 'lodash/map';

import BoardCell from './cell';
import './board.styl';


export default class Board extends Component {
    static propTypes = {
        board     : React.PropTypes.object.isRequired,
        updateClue: react.PropTypes.func.isRequired
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
                                    clicked={this.cellClicked}
                                    isCurrentCell={this.state.currentCell === cell}
                                    clueDirection={this.state.clueDirection}
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

        if (this.state.currentCell === cell) {
            this._switchClueDirection();
        } else {
            this.setState({ currentCell: cell });

            // Update the current clue
            const clueDirection = this.props.currentClue.direction;
            this.props.updateClue({
                number   : cell.containingClues[clueDirection]
                direction: clueDirection
            });
        }
    }

    _switchClueDirection () {
        const { currentCell, updateClue } = this.props;
        const oppositeDirection = currentCell.direction === 'across'
            ? 'down'
            : 'across';

        // Get clue number for the current cell in the new direction
        const newClueNumber = currentCell.containingClues[oppositeDirection];
        updateClue({
            number   : newClueNumber
            direction: oppositeDirection
        });
    }

    _currentClue () {
        if (
               !this.state.currentCell
            || !this.state.currentCell.containingClues
            || !this.state.clueDirection
        ) {
            return null;
        }

        return this.state.currentCell.containingClues[this.state.clueDirection];
    }
}
