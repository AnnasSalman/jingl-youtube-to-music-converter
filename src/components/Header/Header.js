import React from 'react'
import theme from "../../constants/theme";
import {Dropdown, Icon, Nav, Navbar} from "rsuite";
import logo from './logo.PNG'
import './Header.css'

const Header = () => {
    return(
        <Navbar style={styles.header}>
            <Navbar.Header style={styles.logo}>
                <a href="/" className="navbar-brand logo"><img src={logo} alt={"LOGO"} height={35}></img></a>
            </Navbar.Header>
            <Navbar.Body>
                <Nav pullRight>
                    <Nav.Item icon={<Icon icon="cog" style={{color: 'white'}} className={'navItem'}/>}><span style={{color: 'white'}}>Settings</span></Nav.Item>
                </Nav>
            </Navbar.Body>
        </Navbar>
    )
}

const styles = {
    navItem:{
        backgroundColor: 'red',
        display: 'flex',
        flexDirection: 'row',
        height: '10vh',
        "&:hover": {
            background: "purple"
        },
    },
    header:{
        flexDirection: 'row',
        backgroundColor: theme.background,
        height : '10vh',
        width: '100%',
        position: 'fixed',
        top: 0
    },
    logo:{
        height: '100%',
        marginLeft: '3vw',
        marginRight: '3vw',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
    text: {
        color: 'yellow',
        backgroundColor: 'red'
    }
}

export default Header
