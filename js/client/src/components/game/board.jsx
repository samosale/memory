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
import GameDialog from './game-dialog.jsx';


/**
 * DOING: Import universal and associated libraries
 * here to separate from the rest of the code.
 */
import {
    BAD_ARGS
} from '../../constants/language/english';
import {
    AUDIO_MAIN_LOOP,
    AUDIO_EVENT_CLICK,
    AUDIO_EVENT_MATCH,
    AUDIO_EVENT_GAME,
    AUDIO_EVENT_WRONG,
} from '../../constants/common-application';
import {
    isNumber,
    isString,
    isBoolean,
    isObject,
} from '../../lib/common-type';
import {
    sessionsSelector,
    activeGameSelector,
    totalGamesSelector,
    scoreSelector
} from '../../selectors/board';


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
        super(props);

        // Audio
        this.audio = new Audio();
        this.audioMain = new Audio();


        // Logic
        this.counter = 0;
        this.matchingTiles = [];
        this.locked = false;

        // UI
        this.dialog = false;

    }


    /**
     * DOING: Return initial context
     * for component state.
     */
    componentDidMount() {
        this.setAudio('main');
    }


    /**
     * DOING: Should return audio
     * context for event and play.
     * @param event
     */
    setAudio(event) {

        if(!isString(event)){
            throw new Error(BAD_ARGS);
        }

        switch(event) {
            case 'main':
                this.audioMain.src = AUDIO_MAIN_LOOP;
                this.audioMain.loop = true;
                this.audioMain.volume = 0.3;
                this.audioMain.play();
                break;
            case 'click':
                this.audio.pause();
                this.audio.src = AUDIO_EVENT_CLICK;
                this.audio.volume = 0.5;
                this.audio.play();
                break;
            case 'match':
                this.audio.pause();
                this.audio.src = AUDIO_EVENT_MATCH;
                this.audio.volume = 0.5;
                this.audio.play();
                break;
            case 'game':
                this.audio.pause();
                this.audio.src = AUDIO_EVENT_GAME;
                this.audio.volume = 0.2;
                this.audio.play();
                break;
            case 'wrong':
                this.audio.pause();
                this.audio.src = AUDIO_EVENT_WRONG;
                this.audio.volume = 0.5;
                this.audio.play();
                break;
            default:
                this.audio.pause();
                this.audio.loop = true;
                this.audio.volume = 0.3;
                this.audio.play();
        }

    }


    /**
     * DOING: Should reset the board triggered
     * by the function. Resets the state by dispatch.
     *
     */
    triggerResetBoard() {


        /**
         * Should return timer to sync animations
         * from the animation interface.
         */
        setTimeout(() => {
            Object.keys(this.props.games[`session${this.props.activeGame}`]).forEach((item) => {

                // Set flip state to tile
                this.props.games[`session${this.props.activeGame}`][item].flipped = !!(this.props.games[`session${this.props.activeGame}`][item].matched);
                // Audio feedback when  matched
                if(this.countMatchingTiles(this.props.games[`session${this.props.activeGame}`][item].name)===2) {
                    this.setAudio('match');
                    // Register n total of game sessions
                    this.props.board.totalGames=Object.keys(this.props.games).length;
                }

            });

            // Audio feedback on session complete
            if(this.countMatchingSession(this.props.games[`session${this.props.activeGame}`])===Object.keys(this.props.games[`session${this.props.activeGame}`]).length) {

                /**
                 * Make sure dialog is returned to closed
                 * state on dispatch.
                 */
                setTimeout(() => {
                    this.setDialog(false);
                }, 2000);

                this.setAudio('game');
            }

            this.resetHelpers();
            if(this.getCounter() <= 2) {
                this.props.boardState(this.props.games);
            }

            this.triggerUnlockBoard();
        },1000);
    }


    /**
     * DOING: Should reset common
     * functions to their initial
     * values.
     */
    resetHelpers(){
        this.resetMatchingTiles();
        this.resetCounter();
    }


    /**
     * DOING: Should lock the board triggered
     * by the function.
     */
    triggerLockBoard() {
        this.locked = true;
    }


    /**
     * DOING: Should unlock the board triggered
     * by the function.
     */
    triggerUnlockBoard() {
        this.locked = false;
    }


    /**
     * DOING: Should return status of
     * the state in the locked member.
     * @returns {boolean}
     */
    getLocked() {
        return this.locked;
    }


    /**
     * DOING: Should increment the counter
     * by one numeral literal.
     */
    doIncrementCounter() {
        if(this.counter < 2) {
            ++this.counter;
        }
    }


    /**
     * DOING: Should reset the counter
     * to zero (its initial state).
     */
    resetCounter() {
        this.counter = 0;
    }


    /**
     * DOING: Should get the current counter
     * value and return it.
     */
    getCounter() {
        return this.counter;
    }


    /**
     * DOING: Should update tiles of match
     * to proper state and return.
     */
    triggerMatchUpdate(){
        this.triggerResetBoard();
    }


    /**
     * DOING: Should reset the array containing
     * matches of the tiles to an empty state.
     */
    resetMatchingTiles() {
        this.matchingTiles = [];
    }


    /**
     * DOING: Should add the current tile
     * to the matches array.
     * @param data
     */
    setMatchingTiles(data) {
        if(!isObject(data)){
            throw new Error(BAD_ARGS);
        }
        this.matchingTiles.push(data);
    }


    /**
     * DOING: Should set matched property
     * to true in the state object.
     * @param payloadId
     */
    setMatched(payloadId) {
        if(!isNumber(payloadId)){
            throw new Error(BAD_ARGS);
        }
        this.props.games[`session${this.props.activeGame}`][`tile${payloadId}`].matched = true;

        // Dispatch for score keeping
        this.props.incrementScoreCount();
        this.props.decrementFlipCount();
    }


    /**
     * DOING: Should return the matchingTiles
     * array in complete.
     */
    getMatchingTiles() {
        return this.matchingTiles;
    }


    /**
     * DOING: Should return n of the
     * tiles matching.
     * @param data
     * @returns {*}
     */
    countMatchingTiles(data) {
        if(!isString(data)){
            throw new Error(BAD_ARGS);
        }
        return this.getMatchingTiles().reduce((acm, val) => acm + (val.name === data), 0);
    }


    /**
     * DOING: Should return n of the
     * tiles matching per session.
     * @param data
     * @returns {*}
     */
    countMatchingSession(data){
        if(!isObject(data)){
            throw new Error(BAD_ARGS);
        }
        return Object.values(data).reduce((total, val) => total + (val.matched===true), 0);
    }


    /**
     * DOING: Should return a dialog
     * in the main interface.
     * @param active
     */
    setDialog(active) {
        if(!isBoolean(active)){
            throw new Error(BAD_ARGS);
        }
        this.dialog = active;
    }


    /**
     * DOING: Should return state
     * of the dialog component.
     * @returns {*}
     */
    getDialog(){
        return this.dialog;
    }


    /**
     * DOING: Returns new state after
     * dispatching new payload to the
     * store.
     * @param payload
     */
    dispatchState(payload) {
        if(!isObject(payload)){
            throw new Error(BAD_ARGS);
        }
        this.props.boardState(payload);
    }


    /**
     * DOING: Dispatches a new payload when the tile
     * triggers onClick. Should return a new state
     * for the child component while stateless render
     * an update for the store.
     * @param payloadId
     */
    triggerDispatch(payloadId) {

        if(!isNumber(payloadId)){
            throw new Error(BAD_ARGS);
        }

        this.doIncrementCounter();

        // Increment per click for score keeping
        this.props.incrementFlipCount();

        // Dispatch initial flipped state
        this.props.games[`session${this.props.activeGame}`][`tile${payloadId}`].flipped = !(this.props.games[`session${this.props.activeGame}`][`tile${payloadId}`].matched);
        this.dispatchState(this.props.games[`session${this.props.activeGame}`]);

        /**
         * Should add the current tile to the
         * array for matching.
         */
        this.setMatchingTiles(this.props.games[`session${this.props.activeGame}`][`tile${payloadId}`]);

        /**
         * Should if 2 tiles are flipped, check them
         * if they match. Return the proper state
         * if match or not.
         */
        if(this.getCounter()===2 || this.getMatchingTiles().length===2) {

            this.triggerLockBoard();

            /**
             * Return the n of matched tiles
             */
            let getMatch = this.countMatchingTiles(this.props.games[`session${this.props.activeGame}`][`tile${payloadId}`].name);

            if (getMatch === 2) {
                this.getMatchingTiles().forEach((item) => this.setMatched(item.index));
                this.triggerMatchUpdate();
            }
            else {
                this.triggerUnlockBoard();
            }
            this.triggerResetBoard();
        }

        /**
         * Should return the n of tiles
         * that have matched true in total.
         */
        let setGameSession = this.countMatchingSession(this.props.games[`session${this.props.activeGame}`]);


        /**
         * Return next n of game where
         * n still is less than total
         */
        if(
            setGameSession===Object.keys(this.props.games[`session${this.props.activeGame}`]).length &&
            this.props.activeGame <= Object.keys(this.props.games).length
        ){
            this.setDialog(true);
            this.setAudio('game');

            setTimeout(() => {
                this.props.incrementActiveGame(this.props);
            }, 4000);
        }
    }

    render() {

        return (

            <div>
                {
                    (this.props.activeGame < this.props.totalGames)
                        ?
                    <div>
                        <GameDialog key={`gameDialog${this.props.activeGame}`} final={false} open={this.getDialog()} {...this.props} />
                    </div>
                        :
                    <div>
                        <GameDialog key={`gameDialog${this.props.activeGame}`} final={true} open={this.getDialog()} {...this.props} />
                    </div>
                }

                <Card>
                    <CardText style={{fontSize: '13px'}}>
                        <div className="flexWrapper" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
                            {
                                (this.props.games)
                                ?
                                    Object.keys(this.props.games[`session${this.props.activeGame}`]).map((tile) => {

                                        return <div
                                            key={`triggerWrapper${this.props.games[`session${this.props.activeGame}`][tile].index}`}
                                            className="tileWrapper"
                                            onClick={
                                                (!this.getLocked() && this.getCounter() < 2 && !this.props.games[`session${this.props.activeGame}`][tile].matched && !this.props.games[`session${this.props.activeGame}`][tile].flipped)
                                                    ?
                                                    () => {
                                                        this.triggerDispatch(this.props.games[`session${this.props.activeGame}`][tile].index);
                                                        this.setAudio('click');
                                                    }
                                                    : () => {
                                                    if(this.getLocked()){
                                                        this.setAudio('wrong');
                                                        alert('too fast, calm down');
                                                    }
                                                    this.triggerResetBoard();
                                                }
                                            }
                                        >
                                            <TileWrapper
                                                key={`tileWrapper${this.props.games[`session${this.props.activeGame}`][tile].index}`}
                                                index={this.props.games[`session${this.props.activeGame}`][tile].index}
                                                {...this.props.games[`session${this.props.activeGame}`][tile]}
                                            />
                                        </div>
                                    })

                                    : <div>
                                    Loading....
                                </div>
                            }
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
 * @returns {{board: (Array|*)}}
 */
const mapStateToProps = (state, props) => {
    return {
        board : state.board,
        games : sessionsSelector(state),
        activeGame : activeGameSelector(state),
        totalGames : totalGamesSelector(state),
        score : scoreSelector(state),
    }
};


/**
 * CLARIFY: Returning dispatched action state for
 * boardState.
 * @param dispatch
 * @returns {{boardState: (function(*=): *)}}
 */
const mapDispatchToProps = (dispatch) => {
    return {
        boardState : payload => dispatch(boardActions.boardState(payload)),
        dataToBoard : payload => dispatch(boardActions.dataToBoard(payload)),
        incrementFlipCount : payload => dispatch(boardActions.incrementFlipCount(payload)),
        decrementFlipCount : payload => dispatch(boardActions.decrementFlipCount(payload)),
        incrementActiveGame : payload => dispatch(boardActions.incrementActiveGame(payload)),
        incrementScoreCount : payload => dispatch(boardActions.incrementScoreCount(payload))
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(Board);