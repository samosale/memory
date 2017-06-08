'use strict';

/**
 * This notation was generated by templates.
 * // -------------------------------------------------
 * GLOBAL FILE NOTATIONS
 * Project of: memory
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
import React from 'react';


/**
 * DOING: Import app associated and universal libraries
 * here to separate from the rest of the c
 */


/**
 * DOING: Import material ui and interface
 * here to separate from the rest of the code.
 */
import Paper from 'material-ui/Paper';


const Tile = props => {


    // Set default tile style
    const style = {
        height: 200,
        width: 150,
        margin: 20,
        textAlign: 'center',
        display: 'inline-block',
    };

    const image = `http:${props.imagePortraitUrl}`;


    return (
        <div>
            <Paper className={`tile-front tile-front-${props.index} ${(props.matched) ? 'matched' : ''}`} style={style} >
                    <img src={image} id={props.index} style={{}} />
                    {props.name}
            </Paper>
            <Paper className={`tile-back tile-back-${props.index}`} style={style}>
                {props.index}
            </Paper>
        </div>
    )
};


export default Tile;