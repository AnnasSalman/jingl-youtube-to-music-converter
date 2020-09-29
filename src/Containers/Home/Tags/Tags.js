import React, {useState, useEffect} from 'react'
import {Button, FlexboxGrid, Col, Icon} from "rsuite";
import TagCarousel from "../../../components/TagCarousel/TagCarousle";
import ConversionSteps from "../../../components/ConversionSteps/ConversionSteps";
import {useHistory, useLocation} from "react-router-dom";

const arr = [1,2,3,6,4,3,4,4,3]

const dataTypes = [
    {key: 'title', name: 'Song Title'},
    {key: 'artist', name: 'Artist(s)'},
    {key: 'album', name: 'Album'},
    {key: 'albumReleaseDate', name: 'Album Release Date'},
    {key: 'tracks', name: 'Number of Tracks'},
    {key: 'label', name: 'Label(s)'},
    {key: 'genre', name: 'Genre'},
    {key: 'artistPicture', name: 'Artist Image', image: true},
]

const Tags = () => {

    const history = useHistory()
    const location = useLocation()
    const [tags, setTags] = useState({
        title:[],
        artist:[],
        album:[],
        albumReleaseDate:[],
        tracks:[],
        label: [],
        genre: [],
        artistPicture: []
    })
    const [selected, setSelected] = useState({
        title:null,
        artist:null,
        album:null,
        albumReleaseDate:null,
        tracks:null,
        label: null,
        genre: null,
        artistPicture: null
    })

    const filterTags = (tagData) => {
        const title=[]
        const artist=[]
        const album=[]
        const albumReleaseDate=[]
        const tracks=[]
        const label= []
        const genre= []
        const artistPicture= []
        tagData.forEach((tag)=>{
            if(tag.title){
                title.push({id:tag.id, title: tag.title, source: tag.source})

            }
            if(tag.artist){
                artist.push({id:tag.id, title: tag.artist, source: tag.source})
            }
            if(tag.album){
                album.push({id:tag.id, title: tag.album, source: tag.source})
            }
            if(tag.albumReleaseDate){
                albumReleaseDate.push({id:tag.id, title: tag.albumReleaseDate, source: tag.source})
            }
            if(tag.tracks){
                tracks.push({id:tag.id, title: tag.tracks, source: tag.source})
            }
            if(tag.label){
                label.push({id:tag.id, title: tag.label, source: tag.source})
            }
            if(tag.genre){
                genre.push({id:tag.id, title: tag.genre, source: tag.source})
            }
            if(tag.artistPicture1){
                artistPicture.push({id:tag.id, title: tag.artistPicture1, source: tag.source})
            }
        })
        return ({
            title, artist, album, albumReleaseDate, tracks, label, genre, artistPicture
        })
    }

    const _changeHandler = (title, type) =>{
        console.log(selected)
        setSelected({...selected, [type]: title})
    }
    const confirmHandler = () => {
        history.push("/confirm", {...location.state, selected: {...location.state.selected, tags: selected}});
    }

    useEffect(()=>{
        console.log('Effect 1 called')
        const tags = filterTags(location.state.tagData)
        console.log(tags)
        setTags(tags)
    },[location.state.tagData])

    useEffect(()=>{
        let selectedTemp = {}
        dataTypes.forEach((type)=>{
            if(tags[type.key].length>0){
                console.log(type.key+":"+ tags[type.key][0].title)
                selectedTemp = {...selectedTemp, [type.key]: tags[type.key][0].title}
            }
            else{
                selectedTemp = {...selectedTemp, [type.key]: null}
            }
        })
        setSelected(selectedTemp)
    },[tags])

    return(
        <div>
            <ConversionSteps currentStep={2}/>
            <FlexboxGrid justify={"start"} style={styles.container}>
                {
                    dataTypes.map((type)=>{
                        if(tags[type.key].length>0){
                            return(
                                <FlexboxGrid.Item colspan={24} componentClass={Col} md={8} sm={12} style={styles.element}>
                                    <TagCarousel
                                        image={type.image?true:false}
                                        data={tags[type.key]}
                                        name={type.name}
                                        onChange={(index, title, name)=>_changeHandler(title, type.key)}
                                    />
                                </FlexboxGrid.Item>
                            )
                        }
                        else{
                            return null
                        }
                    })
                }
                <FlexboxGrid justify='end' align='middle' style={styles.buttonBar}>
                    <FlexboxGrid.Item>
                        <Button color="blue" onClick={confirmHandler}>
                            <Icon icon="check"/> Confirm & Continue
                        </Button>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </FlexboxGrid>
        </div>
    )

}

const styles = {
    container: {
        marginTop: 35,
    },
    element: {
        marginBottom: 10
    }
}

export default Tags
