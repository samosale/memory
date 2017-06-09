'use strict';

/**
 * This notation was generated by templates.
 * // -------------------------------------------------
 * GLOBAL FILE NOTATIONS
 * Project of: memory
 * Filename: common-api.js by jimmie
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
import fetch from 'isomorphic-fetch';
import {
    BAD_REQUEST,
    BAD_ARGS
} from '../constants/language/english';
import {
    API_FETCH_URL
} from '../constants/common-application';
import {
    isDefined,
    isObject,
    isArray
} from '../lib/common-type';


/**
 * DOING: Should wrap fetch request
 * function and return json object.
 * @param url
 * @returns object
 */
export const fetchFromUrl = (url = API_FETCH_URL) =>
    fetch(url)
        .then((response) => (response.status < 200 || response.status > 400) ? () => { throw new Error(BAD_REQUEST); } : response.json())
        .then((data)=> data)
        .catch((error) => error);


/**
 * DOING: Should return the default set
 * of object properties used in the return data
 * from the http object.
 * @returns array
 */
export const getHttpObjectProperties = () => ['name', 'imagePortraitUrl', 'index', 'filename'];


/**
 * DOING: Should validate if the object
 * has properties matching those in the
 * params.
 * @param object
 * @param properties
 * @param propertyMatch
 * @returns boolean
 */
export const hasObjectProperties = (object, properties = [], propertyMatch=false) => {
    if(isDefined(object) && isDefined(properties) && isObject(object) && isArray(properties)){
        Object.keys(object).forEach((item) => properties.forEach((property) => propertyMatch = object[item].hasOwnProperty(property)));
        return propertyMatch;
    }
    else { throw new Error(BAD_ARGS); }
};


/**
 * DOING: Should take passed data object
 * and shuffle the contents using Math.
 * Returns object.
 * @param dataObject
 * @returns  object
 */
export const getShuffleData = (dataObject = {}) => {
    if(isDefined(dataObject) && isObject(dataObject)){
        let moveData = Object.values(dataObject);
        for(let j, x, i = moveData.length; i; j = Math.floor(Math.random() * i), x = moveData[--i], moveData[i] = moveData[j], moveData[j] = x){}
        return moveData;
    }
    else { throw new Error(BAD_ARGS); }
};


/**
 * DOING: Should return the total
 * amount of n in an object.
 * @param dataObject
 * @returns number
 */
export const getTotalCountFromObject = (dataObject = {}) => Object.keys(dataObject).length;


/**
 * DOING: Should build dynamic child object
 * and return to requested state.
 * @param object
 * @param dataObject
 * @returns object
 */
export const buildDynamicObject = (object = {}, dataObject = {}) => {

    let shuffled = [];

    Object.keys(object).forEach((item, index) => {

        shuffled = Object.keys(object[item]);

        for(let i=shuffled.length;i--;) shuffled.push(shuffled.splice(Math.floor(Math.random() * (i + 1)),1)[0]);

        Object.keys(object[item]).forEach((child, idx) => {

            let tileIndex = object[item][shuffled[idx]].index;
            let tileIndexCursor = tileIndex + getTotalCountFromObject(dataObject);

            object[item][`tile${tileIndexCursor}`] = {
                name: object[item][shuffled[idx]].name,
                imagePortraitUrl: object[item][shuffled[idx]].imagePortraitUrl,
                index: tileIndexCursor,
                filename: object[item][shuffled[idx]].filename,
                flipped: false,
                matched: false,
            };
        });
        return object;
    });
};


/**
 * DOING: Should find and rebuild the index
 * of an object to an array and execute.
 * @param dataObject
 * @returns {Object}
 */
export const flattenObjectToShuffle = (dataObject = {}) => {

    let makeCopy = [];

    Object.keys(dataObject).forEach((item) => {
        Object.keys(dataObject[item]).forEach((child, index) => {
            makeCopy[index] = dataObject[item][child];
            dataObject[item][child] = getShuffleData(makeCopy)[index];
        });
    });
    return dataObject;
};


/**
 * DOING: Should assemble a new object
 * structure based on computations from
 * the fetched data and the params.
 * @param dataObject
 * @param groupByNumber
 * @returns object
 */
export const buildCopyObject = (dataObject={}, groupByNumber=0) => {

    let iterator = 0, sessions = 0, tiles = {}, original = {}, copy = {}, shuffled = [];

    dataObject = getShuffleData(dataObject);

    Object.keys(dataObject).forEach((item, index) => {

        ++iterator;

        if (iterator === groupByNumber) { iterator = 0; ++sessions; }

        for (let x = 0; x <= groupByNumber; ++x) {
            tiles[`tile${dataObject[item].index}`] = dataObject[item];
        }

        if (Object.keys(tiles).length === groupByNumber) {
            original[`session${sessions}`] = copy[`session${sessions}`] = {...tiles};
            tiles = {};
        }
    });
    return Object.assign(original, buildDynamicObject(copy, dataObject));
};


/**
 * DOING: Should iterate and validate
 * the returned data from the url fetch.
 * Data should match the normalized structure
 * of the state object and return.
 * @returns object
 */
export const buildDataFromUrl = () => {

    return new Promise((resolve) => {
        fetchFromUrl(API_FETCH_URL)
            .then((dataFromUrl) => {
                if (hasObjectProperties(dataFromUrl, getHttpObjectProperties())) {
                    resolve(resolve(buildCopyObject(dataFromUrl, 6)));
                }
            });

        // try, catch... NO_RETURN_DATA
    });
};





