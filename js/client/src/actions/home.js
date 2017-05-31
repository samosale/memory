'use strict';

/**
 * This notation was generated by templates.
 * // -------------------------------------------------
 * GLOBAL FILE NOTATIONS
 * Project of: fix
 * Filename: home.js by jimmie
 * Created: 2017-05-12 @ 14:54
 * Product of: Diskovery
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
 * Created by jimmie on (2017-05-12).
 *
 * Repository link: http://10.10.10.200/connectiontool/fix.git
 */

/**
 * DOING: Import app associated and universal libraries
 * here to separate from the rest of the code.
 */
import {
    GET_PRELOAD_STATE,
} from '../constants/action-types/home.js';
import {
    isRepondingWithPing
} from '../lib/common-network';


/**
 * DOING: Home should have an initial connection
 * to render the first props.
 * @param payload
 * @returns {{type, payload: *}}
 */
export const getPreloadState = (payload) => {
    return {
        type: GET_PRELOAD_STATE,
        payload: payload
    };
};


/**
 * DOING: Should request each host in the preload
 * state to be reachable. Returns payload object
 * with current connection state.
 * @param payload
 * @returns {function(*)}
 */
export const preloadState = (payload) => {

    return (dispatch) => {
        isRepondingWithPing(payload.network.byName).then(returned => { payload.network.byName = returned; });
        dispatch(getPreloadState(payload));

    };
};