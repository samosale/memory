'use strict';

/**
 * This notation was generated by templates.
 * // -------------------------------------------------
 * GLOBAL FILE NOTATIONS
 * Project of: memory
 * Filename: common-state.js by jimmie
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
 * Created by jimmie on (2017-06-31).
 *
 * Repository link: https://github.com/jimmiehansson/memory.git
 */

/**
 * Import universal/associated libraries
 * here to separate from other code.
 */
import {
    isObject,
    isString
} from './common-type';

/**
 * DOING: Props that are passed to components
 * should return one or more in value of
 * the current state.
 * @param props
 * @returns {boolean}
 */
export const propsAreSet = (props) => isObject(props) && Object.keys(props).length > 0;


/**
 * DOING: Should return the state of the key existence
 * inside the object.
 * Should be state specific.
 * @param props
 * @param property
 * @returns {boolean}
 */
export const propsHasKey = (props, property) => isObject(props) && isString(property) && props.hasOwnProperty(property);


/**
 * DOING: Enumerator returns true or false
 * depending on value.
 * @param enumerator
 * @param raceCondition
 * @returns {*}
 */
export const isLoading = (enumerator, ...raceCondition) => (enumerator) ? raceCondition[0] : raceCondition[1];


/**
 * DOING: Merge returns new state
 * object from the current state.
 * @param currentStateObject
 * @param newStateObject
 * @returns {object}
 */
export const addToState = (currentStateObject, newStateObject) => isObject(currentStateObject) && isObject(newStateObject) && Object.assign(currentStateObject, newStateObject);