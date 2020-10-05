import React, {useState} from 'react'
import ConversionSteps from "../../../components/ConversionSteps/ConversionSteps";
import {useLocation, useHistory} from 'react-router-dom'
import {FlexboxGrid, Col, Button, Icon, Alert} from "rsuite";
import axios from 'axios'
import Keys from "../../../constants/Keys";

const downloadFile = (filename) => {
    window.location.href = Keys.serverDownloadBaseUrl+'?filename='+encodeURIComponent(filename)
}

const Confirm = props => {

    const location= useLocation()
    const history = useHistory()

    const [musicState, setmusicState] = useState(location.state)
    const [loading, setloading] = useState(false)

    const confirmHandler = async() => {
        try{
            setloading(true)
            const filename = await axios.request({
                onDownloadProgress: progressEvent => {
                    let percentCompleted = Math.floor(progressEvent.loaded / progressEvent.total * 100)
                    console.log(percentCompleted)
                },
                url: '/download',
                method: 'get',
                params: {
                    ...musicState.selected.tags,
                    coverArt: musicState.selected.coverArt,
                    videourl: musicState.state.searchText
                }
            })
            setloading(false)
            downloadFile(filename.data.fileName)
        }
        catch(e){
            setloading(false)
            Alert.error('Sorry, Could not convert your music. Check your internet connection or try later')
        }
    }

    console.log(musicState)

    return(
        <div style={styles.container}>
            <ConversionSteps currentStep={3}/>
            <FlexboxGrid justify={"center"} align={"middle"} style={styles.songContainer}>
                <FlexboxGrid.Item componentClass={Col} colspan={24} md={10} sm={24} xs={24} style={styles.arts}>
                    <img src={musicState.selected.coverArt} alt={'Cover art'} style={styles.image}/>

                </FlexboxGrid.Item>
                <FlexboxGrid.Item componentClass={Col} colspan={24} md= {6} sm={12} xs={12} style={styles.details}>
                    <p>Song Title:</p>
                    <h5 style={styles.name}>{musicState.selected.tags.title}</h5>
                    <p>Artist(s):</p>
                    <h5 style={styles.name}>{musicState.selected.tags.artist?musicState.selected.tags.artist.toString():'-'}</h5>
                    <p>Album:</p>
                    <h5 style={styles.name}>{musicState.selected.tags.album}</h5>
                    <p>Album Release Date:</p>
                    <h5 style={styles.name}>{musicState.selected.tags.albumReleaseDate}</h5>
                    <p>Genre:</p>
                    <h5 style={styles.name}>{musicState.selected.tags.genre?musicState.selected.tags.genre.toString():'-'}</h5>
                    <p>Tracks:</p>
                    <h5 style={styles.name}>{musicState.selected.tags.tracks}</h5>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item componentClass={Col} colspan={24} md= {8} sm={12} xs={12}>
                    <div>
                        <p>Label(s)</p>
                        <h5 style={styles.name}>{musicState.selected.tags.label?musicState.selected.tags.label.toString():'-'}</h5>
                        <p>Artist Image:</p>
                        <img src={musicState.selected.tags.artistPicture} alt={'Artist'} style={styles.imageSmall}/>
                    </div>
                </FlexboxGrid.Item>
            </FlexboxGrid>
            <FlexboxGrid justify='end' align='middle' style={styles.buttonBar}>
                <FlexboxGrid.Item>
                    <Button color="blue" onClick={confirmHandler} loading={loading}>
                        <Icon icon="music"/> Download MP3
                    </Button>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </div>
    )

}

const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column'
    },
    songContainer: {
        height: '50vh',
        marginTop: 25
    },
    image: {
        height: 300,
        margin: 10
    },
    imageSmall: {
        height: 100,
        width: 100,
        margin: 10
    },
    details: {

    },
    name: {
        marginBottom: 7,
        color: 'white'
    },
    arts: {
        display: 'flex',
        flexDirection: 'row',
    }
}

export default Confirm
