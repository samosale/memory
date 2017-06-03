'use strict';

/**
 * This notation was generated by templates.
 * // -------------------------------------------------
 * GLOBAL FILE NOTATIONS
 * Project of: fix
 * Filename: board.jsx by jimmie
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
import React, {PureComponent} from 'react';
import { connect } from 'react-redux';
import * as boardActions from '../../actions/board';

/**
 * DOING: Import react components here
 * to separate from the rest of the code.
 */
import TileWrapper from './tile-wrapper.jsx';


/**
 * DOING: Import universal and associated libraries
 * here to separate from the rest of the code.
 */
import {
    isNumber,
    isDefined
} from '../../lib/common-type';
import { populate } from '../../store/populate-state';

/**
 * DOING: Import ui and interface libraries and components
 * here to separate from the rest of the code.
 */
import {
    Card,
    CardText
} from 'material-ui/Card';


class Board extends PureComponent {


    constructor(props) {
        console.log(props.board);
        super(props);
        this.counter = 0;
        this.matchingTiles = [];
        this.matched = false;
        this.locked = false;
    }


    /**
     * DOING: Should reset the board triggered
     * by the function. Resets the state.
     */
    triggerResetBoard() {
        alert('resetting the board');
        setTimeout(() => {
            Object.keys(this.props.board.byId).map((item)=> this.props.board.byId[item].flipped = false );
            this.props.resetBoardState(this.props.board);
        },2000);
    }


    /**
     * DOING: Should lock the board triggered
     * by the function.
     */
    triggerLockBoard() {
        this.locked = true;
        this.triggerResetBoard();
    }


    /**
     * DOING: Should unlock the board triggered
     * by the function.
     */
    triggerUnlockBoard() {
        this.locked = false;
    }


    /**
     * DOING: Should increment the counter
     * by one numeral literal.
     */
    doIncrementCounter() {
        ++this.counter;
    }


    /**
     * DOING: Should decrement the counter
     * by one numeral literal.
     */
    doDecrementCounter() {
        --this.counter;
    }


    /**
     * DOING: Get the current counter
     * value.
     */
    getCounter() {
        return this.counter;
    }


    /**
     * DOING: Should set the matched
     * flag to proper state.
     */
    setMatched() {
        this.matched = !(this.matched);
    }


    /**
     * DOING: Should get the matched
     * flags current state.
     */
    getMatched() {
        return this.matched;
    }


    /**
     * DOING: Should return that values
     * are of matching context.
     */
    triggerDisplayMatch(){
        this.matched = true;
        this.resetMatchingTiles();
        alert('its a match');
    }


    /**
     * Should reset the array containing
     * matches of the tiles to an empty state.
     */
    resetMatchingTiles() {
        this.matchingTiles = [];
    }


    /**
     * Should add the current tile
     * to the matches array.
     * @param data
     */
    setMatchingTiles(data) {
        this.matchingTiles.push(data);
    }


    /**
     * Should return the matchingTiles
     * array from the parent scope.
     */
    getMatchingTiles() {
        return this.matchingTiles;
    }


    /**
     * Dispatches a new payload when the tile
     * triggers onClick. Should return a new state
     * for the child component while stateless render
     * an update for the className.
     * @param payloadId
     */
    triggerDispatch(payloadId) {

        (isNumber(payloadId) && isDefined(payloadId));

        // Increment the count
        this.doIncrementCounter();

        // Lock the board if 2
        (this.getCounter()===2) ? this.triggerLockBoard() : this.triggerUnlockBoard();

        // Check to see if the tile is a match
        (this.getMatchingTiles().includes(this.props.board.byId[`tile${payloadId}`].name)) ? this.triggerDisplayMatch() : this.triggerUnlockBoard();

        // Add the new tile to our matches array
        this.setMatchingTiles(this.props.board.byId[`tile${payloadId}`].name);

        this.props.board.byId[`tile${payloadId}`].flipped = (!this.props.board.byId[`tile${payloadId}`].flipped);
        this.props.boardState(this.props.board);

        console.log('counter is: ', this.getCounter());

    }

    render() {

        return (
            <div>
                <Card>
                    <CardText style={{fontSize: '13px'}}>
                        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>

                            {Object.keys(this.props.board.byId).map((tile) => {
                                return <div
                                    key={`triggerWrapper${this.props.board.byId[tile].index}`}
                                    onClick={
                                        (!this.locked) ?
                                        () => {
                                            this.triggerDispatch(this.props.board.byId[tile].index)
                                        }
                                        :
                                            ''
                                    }
                                >
                                <TileWrapper
                                        key={`tileWrapper${this.props.board.byId[tile].index}`}
                                        index={this.props.board.byId[tile].index}
                                        {...this.props.board.byId[tile]}
                                    />
                                </div>
                            })}

                        </div>
                    </CardText>
                </Card>
            </div>

        )
    }
}


/**
 * CLARIFY: Mapping the current (initial) state to props
 * initial state set by scope reducer.
 * @param state
 * @param props
 * @returns {{cardboard: (Array|*)}}
 */
const mapStateToProps = (state, props) => {
    return {
        board : state.board,
    }
};


/**
 * CLARIFY: Returning dispatched action state for
 * cardBoardState.
 * @param dispatch
 * @returns {{cardBoardState: (function(*=): *)}}
 */
const mapDispatchToProps = (dispatch) => {
    return {
        boardState : payload => dispatch(boardActions.boardState(payload)),
        resetBoardState  : payload => dispatch(boardActions.resetBoardState ()),
        incrementFlipCount : payload => dispatch(boardActions.incrementFlipCount(payload)),
        decrementFlipCount : payload => dispatch(boardActions.decrementFlipCount(payload))
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(Board);