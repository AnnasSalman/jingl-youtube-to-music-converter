import React from 'react'
import {Route, Switch} from "react-router-dom";
import MusicLink from "./MusicLink/MusicLink";
import CoverArt from "./CoverArt/CoverArt";
import Tags from "./Tags/Tags";
import Confirm from "./Confirm/Confirm";

const Home = () => {

    return(
        <div style={styles.home}>
            <Switch>
                <Route
                    path='/'
                    render={(props)=>
                        <MusicLink/>
                    }
                    exact/>
                <Route
                    path='/coverart'
                    render={(props)=>
                        <CoverArt/>}
                    exact/>
                <Route
                    path='/tags'
                    render={(props)=>
                        <Tags/>}
                    exact/>
                <Route
                    path='/confirm'
                    render={(props)=>
                        <Confirm/>}
                    exact/>
            </Switch>
        </div>
    )
}

const styles = {
    home:{
    }
}

export default Home
