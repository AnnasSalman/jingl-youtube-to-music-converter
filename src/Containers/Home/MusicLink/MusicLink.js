import React, {useEffect, useState} from 'react'
import {FlexboxGrid, Row, Col, Icon, InputGroup, Input, IconButton, Checkbox} from 'rsuite'
import logoShort from './logo_Short.png'
import theme from "../../../constants/theme";
import {useHistory} from 'react-router-dom'
import ConversionSteps from "../../../components/ConversionSteps/ConversionSteps";
import axios from 'axios'
import {MagicSpinner} from 'react-spinners-kit'

const MusicLink = props => {

    const history = useHistory();

    const [searchDetails, setSearchDetails] = useState({
        searchText: '',
        artSources: {
            musicbrainz: true,
            discogs: false,
            lastfm: true,
            deezer: true
        },
        tagSources: {
            musicbrainz: true,
            discogs: true,
            lastfm: true,
            deezer: true
        }
    })

    const [loading, setloading] = useState(false)

    const textChangeHandler = (text) => {
        setSearchDetails({...searchDetails, searchText: text})
    }

    const submitHandler = async() => {
        try{
            setloading(true)
            const response = await axios.request({
                url: '/getcoverarts',
                method: 'get',
                params: {
                    ...searchDetails.artSources,
                    videourl: searchDetails.searchText
                }
            })
            console.log(response)
            setloading(false)
            history.push("/coverart", {state: searchDetails, artData: response.data});
        }
        catch(e){
            console.log(e)
            setloading(false)
        }
    }

    return(
        <div className="show-grid">
            <ConversionSteps currentStep={0}/>
            <FlexboxGrid justify="center" style={styles.searchBar}>
                <FlexboxGrid.Item componentClass={Row} colspan={24} md={24} style={styles.search}>
                    {
                        loading?
                            <MagicSpinner size={110} backColor={theme.primaryDark} color={theme.primaryDark} loading={loading} />:
                            <img src={logoShort} alt={'LOGO'} height={110}/>

                    }
                    <InputGroup style={styles.searchBar}>
                        <Input
                            placeholder='Enter a Youtube video url'
                            size="lg"
                            onChange={(val)=>textChangeHandler(val)}/>
                        <InputGroup.Addon>
                            <IconButton icon={<Icon icon="search" size='lg'/>} onClick={submitHandler} size="md" />
                        </InputGroup.Addon>
                    </InputGroup>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item componentClass={Row} colspan={24} md={24}>
                    <FlexboxGrid.Item componentClass={Col} colspan={24} md={12} sm={12} xs={24} style={styles.checkGroup}>
                        <h4 style={styles.heading}>Cover Art Sources</h4>
                        <Checkbox
                            defaultChecked={searchDetails.artSources.musicbrainz}
                            onCheckboxClick={()=>setSearchDetails({...searchDetails, artSources: {...searchDetails.artSources, musicbrainz: !searchDetails.artSources.musicbrainz}})}>MusicBrainz</Checkbox>
                        <Checkbox
                            defaultChecked={searchDetails.artSources.discogs}
                            onCheckboxClick={()=>setSearchDetails({...searchDetails, artSources: {...searchDetails.artSources, discogs: !searchDetails.artSources.discogs}})}>Discogs</Checkbox>
                        <Checkbox
                            defaultChecked={searchDetails.artSources.lastfm}
                            onCheckboxClick={()=>setSearchDetails({...searchDetails, artSources: {...searchDetails.artSources, lastfm: !searchDetails.artSources.lastfm}})}>LastFM</Checkbox>
                        <Checkbox
                            defaultChecked={searchDetails.artSources.deezer}
                            onCheckboxClick={()=>setSearchDetails({...searchDetails, artSources: {...searchDetails.artSources, deezer: !searchDetails.artSources.deezer}})}>Deezer</Checkbox>
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item componentClass={Col} colspan={24} md={12} sm={12} xs={24} style={styles.checkGroup}>
                        <h4 style={styles.heading}>Tag Sources</h4>
                        <Checkbox
                            defaultChecked={searchDetails.tagSources.musicbrainz}
                            onCheckboxClick={()=>setSearchDetails({...searchDetails, tagSources: {...searchDetails.tagSources, musicbrainz: !searchDetails.tagSources.musicbrainz}})}>MusicBrainz
                        >MusicBrainz</Checkbox>
                        <Checkbox
                            defaultChecked={searchDetails.tagSources.discogs}
                            onCheckboxClick={()=>setSearchDetails({...searchDetails, tagSources: {...searchDetails.tagSources, discogs: !searchDetails.tagSources.discogs}})}
                        >Discogs</Checkbox>
                        <Checkbox
                            defaultChecked={searchDetails.tagSources.lastfm}
                            onCheckboxClick={()=>setSearchDetails({...searchDetails, tagSources: {...searchDetails.tagSources, lastfm: !searchDetails.tagSources.lastfm}})}
                        >LastFM</Checkbox>
                        <Checkbox
                            defaultChecked={searchDetails.tagSources.deezer}
                            onCheckboxClick={()=>setSearchDetails({...searchDetails, tagSources: {...searchDetails.tagSources, deezer: !searchDetails.tagSources.deezer}})}
                        >Deezer</Checkbox>
                    </FlexboxGrid.Item>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </div>
    )
}

const styles = {
    search: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '6vh'
    },
    searchBar: {
        margin: '2vh',
        marginLeft: '10vw',
        marginRight: '10vw'
    },
    checkGroup: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'start',
        marginTop: '3vh'
    },
    heading: {
        color: theme.primaryDark,
        margin: 5
    },
    spinner: {
        position: 'absolute',
        top: '50%',
        left: '50%'
    }
}

export default MusicLink
