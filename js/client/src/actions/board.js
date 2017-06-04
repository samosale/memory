'use strict';

/**
 * This notation was generated by templates.
 * // -------------------------------------------------
 * GLOBAL FILE NOTATIONS
 * Project of: memory
 * Filename: tile.js by jimmie
 * Created: 2017-05-31 @ 14:54
 * Product of: memory
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
 * DOING: Import app associated and universal libraries
 * here to separate from the rest of the code.
 */
import {
    GET_BOARD_STATE,
    RESET_BOARD_STATE,
    INCREMENT_FLIPCOUNT_STATE,
    DECREMENT_FLIPCOUNT_STATE
} from '../constants/action-types/board.js';


/**
 * DOING: Card tiles state should be
 * stored to render the proper tiles.
 * @param payload
 * @returns {{type, payload: *}}
 */
export const getBoardState = (payload) => {
    return {
        type: GET_BOARD_STATE,
        payload
    };
};


/**
 * DOING: Fetches the state and content
 * for the tiles.
 * @param payload
 * @returns {function(*)}
 */
export const boardState = (payload) => {

    return (dispatch) => {
        dispatch(getBoardState(payload));
    };
};

/**
 * DOING: Resets the state of the board
 * to the initial.
 * @param payload
 * @returns {{type, payload: *}}
 */
export const resetBoardState = (payload) => {
    return {
        type: RESET_BOARD_STATE,
        payload: payload
    };
};

/**
 * DOING: Flip count should increment
 * by one if the action has been triggered.
 * @param payload
 * @returns {{type: *, payload: *}}
 */
export const incrementFlipCount = (payload) => {
    return {
        type: INCREMENT_FLIPCOUNT_STATE,
        payload: payload,
    };
};


/**
 * DOING: Flip count should decrement
 * by one if the action has been triggered.
 * @param payload
 * @returns {{type: *, payload: *}}
 */
export const decrementFlipCount = (payload) => {
   return {
       type: DECREMENT_FLIPCOUNT_STATE,
       payload: payload,
   };
};


