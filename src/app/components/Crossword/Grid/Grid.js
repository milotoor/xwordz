
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Card, Grid as GridMDL, Cell } from 'react-mdl';

import * as actions from '../../../reducers/actions';
import Helpers from '../../../helpers';
import GridCell from './Cell';
import './Grid.styl';


export class Grid extends Component {
    static propTypes = {
        puzzle        : PropTypes.object.isRequired,
        position      : PropTypes.object.isRequired,
        changePosAttrs: PropTypes.func.isRequired
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
                                    coords={{ row: i, col: j }}
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

    handleCellClicked = (cellData, coords) => {
        if (cellData.get('isBlockCell')) {
            return;
        }

        const
            { puzzle, position, changePosAttr } = this.props,
            currentCell = Helpers.currentCell(puzzle.get('grid'), position);

        if (currentCell === cellData) {
            const
                curDirection = position.get('dir'),
                newDirection = curDirection === 'across' ? 'down' : 'across';
            changePosAttrs({ direction: newDirection });
        } else {
            changePosAttrs(coords);
        }
    }
}


export default connect(null, actions)(Grid);
