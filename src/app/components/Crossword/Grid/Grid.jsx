
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Card, Grid as GridMDL, Cell } from 'react-mdl';

import GridCell from './Cell.jsx';
import './Grid.styl';


export class Grid extends Component {
    static propTypes = {
        grid: PropTypes.object.isRequired
    };

    render () {
        const { grid } = this.props;

        return (
            <Card id="board" shadow={3}>
                {grid.map((row, i) =>
                    <GridMDL key={i} className="board-row">
                        {row.map((cell, j) =>
                            <Cell col={1} key={j} className="board-cell">
                                <GridCell row={i} col={j} />
                            </Cell>
                        )}
                    </GridMDL>
                )}
            </Card>
        );
    }
}


const mapStateToProps = state => ({
    grid: state.getIn(['puzzle', 'grid'])
});

export default connect(mapStateToProps)(Grid);
