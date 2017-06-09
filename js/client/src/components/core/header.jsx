/**
 * This notation was generated by templates.
 * // -------------------------------------------------
 * GLOBAL FILE NOTATIONS
 * Project of: memory
 * Filename: header.jsx by jimmie
 * Created: 2017-05-31 @ 14:04
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
 * Repository link: project/repository
 */


/**
 * TODO:
 * Could include this in separate file perhaps
 * called inclusion file.
 */
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import {
    List,
    ListItem
} from 'material-ui/List';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();


class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            drawerNavOpen:false
        };

        // make stateful, implement
        // redux connection to store
        // return score-keeping
    }

    handleToggle = () => this.setState({drawerNavOpen: !this.state.drawerNavOpen});

    render() {
        return(
            <div>
            <AppBar
                title=""
                onLeftIconButtonTouchTap={this.handleToggle}
                titleStyle={{fontSize:'26px'}}
                iconElementRight={<img className="header-logo" src="https://github.com/jimmiehansson/memory/raw/master/public/images/memoryinja.jpg?raw=true" /> }
            />
                <Drawer open={this.state.drawerNavOpen} width={200} openSecondary={true}>

                    <List>
                        <Subheader>Level 1</Subheader>
                        <Divider/>
                        <Subheader>My current score</Subheader>
                        <ListItem disabled={true} style={{fontFamily:'Bangers', fontSize:'43px', color:'#222'}}>
                            45 points
                        </ListItem>
                        <Divider/>
                        <Subheader>My previous scores</Subheader>
                        <ListItem disabled={true} style={{fontFamily:'Bangers', fontSize:'28px', color:'#8bc53e'}}>
                            30 points
                        </ListItem>
                        <ListItem disabled={true} style={{fontFamily:'Bangers', fontSize:'28px', color:'#8bc53e'}}>
                            12 points
                        </ListItem>
                        <Divider/>

                    </List>
                </Drawer>
            </div>
        )
    }

}


export default Header