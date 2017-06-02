'use strict';

/**
 * This notation was generated by templates.
 * // -------------------------------------------------
 * GLOBAL FILE NOTATIONS
 * Project of: fix
 * Filename: tile.jsx by jimmie
 * Created: 2017-05-31 @ 15:16
 * Product of: WebStorm
 * // -------------------------------------------------
 * Make sure this file is part of its proper namespace
 * and project before moving on.
 * // -------------------------------------------------
 * Code-tags conventionally should be used (See below) :
 * TODO - Something that someone need to do.
 * DOING - Self remind for what you are doing.
 * CONSIDER - Reminder to consider a change or addition.
 * BUG - The below section of a code cause a bug.
 * FIXME - The below section of code need to be fixed.
 * HACK - The below section of code is a workaround.
 * XXX - Any notation important enough to consider implementing.
 * CLARIFY - Very incomprehensible section of code below.
 *
 * Created by jimmie on (2017-05-31).
 *
 * Repository link: https://github.com/jimmiehansson/memory.git
 */

/**
 * DOING: Import react and associated libraries
 * here to separate from the rest of the code.
 */
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as cardActions from '../../actions/tile';
import * as boardActions from '../../actions/board';


/**
 * DOING: Import app associated and universal libraries
 * here to separate from the rest of the c
 */
import {

} from '../../selectors/board';

/**
 * DOING: Import material ui and interface
 * here to separate from the rest of the code.
 */
import Paper from 'material-ui/Paper';


class Tile extends PureComponent {


    constructor(props) {
        super(props);
    }


    /**
     * Should toggle the current state
     * of the tile. Should add/remove class to alter
     * the behavior in the interface of the tile.
     * Should also update the current state and store.
     */
    toggleStateOnTile() {

        // find the current tile using selector


        this.props.board.byId[`tile${this.props.index}`].flipped = true;
        this.props.boardState({...this.props.board});

        // alter the interface to toggle the class
        ReactDOM.findDOMNode(this).classList.toggle('flipped');
    }


    // Set default tile style
    style = {
        height: 200,
        width: 150,
        margin: 20,
        textAlign: 'center',
        display: 'inline-block'
    };


    render() {
        return (
            <div className={`card tile-${this.props.index}`} onClick={() => {this.toggleStateOnTile(this)}}>
                <Paper className={`tile-front tile-front-${this.props.index}`} style={this.style}>
                    Front of card
                </Paper>
                <Paper className={`tile-back tile-back-${this.props.index}`} style={this.style}>
                    Back of card
                </Paper>
            </div>
        )
    };
};


/**
 * CLARIFY: Mapping the current (initial) state to props
 * initial state set by scope reducer.
 * @param state
 * @param props
 * @returns {{cardtile: (Array|*)}}
 */
const mapStateToProps = (state, props) => {
    return {
        tile : state.tile,
        board : state.board,
    }
};


/**
 * CLARIFY: Returning dispatched action state for
 * cardTileState.
 * @param dispatch
 * @returns {{cardTileState: (function(*=): *)}}
 */
const mapDispatchToProps = (dispatch) => {
    return {
        tileState : payload => dispatch(cardActions.tileState(payload)),
        boardState : payload => dispatch(boardActions.boardState(payload)),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Tile);