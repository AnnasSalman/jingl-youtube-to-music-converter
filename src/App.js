import React from 'react';
import {Route, Switch} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import {Navbar, Nav, Dropdown, Icon} from "rsuite";
import theme from "./constants/theme";
import Header from './components/Header/Header'
import Home from "./Containers/Home/Home";
import axios from 'axios'

import 'rsuite/lib/styles/index.less';
import './Themes/dark.less'

function App() {

    axios.defaults.baseURL = 'http://localhost:4000'

  return (
    <div style={styles.root}>
        <Header/>
        <div style={styles.content}>
            <Switch>
                <Route path='/' component={Home}/>
            </Switch>
        </div>
    </div>
  );
}

const styles = {
    root:{
        position: 'absolute',
        top: '10vh',
        width: '100%',
        paddingLeft: '10vw',
        paddingRight: '10vw',
        paddingTop: '2vh'
    },
    content:{

    }
}

export default App;
