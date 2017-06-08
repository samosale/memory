'use strict';

/**
 * This notation was generated by templates.
 * // -------------------------------------------------
 * GLOBAL FILE NOTATIONS
 * Project of: memory
 * Filename: board.js by jimmie
 * Created: 2017-05-31 @ 15:26
 * Product of: Webstorm
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
 * Import universal/associated libraries
 * here to separate from other code.
 */
import {
    GET_BOARD_STATE,
    GET_DATA_TO_BOARD,
    INCREMENT_FLIPCOUNT_STATE,
    DECREMENT_FLIPCOUNT_STATE,
} from '../constants/action-types/board.js';


export default (state = {}, {type, payload} ) => {

    switch (type) {

        case GET_BOARD_STATE:
            return {...state, payload};
        case GET_DATA_TO_BOARD:
            return {...state, ...payload};
        case INCREMENT_FLIPCOUNT_STATE:
            return {...state, flipCount: state.flipCount+1};
        case  DECREMENT_FLIPCOUNT_STATE:
            return {...state, flipCount: state.flipCount-1};
        default:
            return state;

    }
};