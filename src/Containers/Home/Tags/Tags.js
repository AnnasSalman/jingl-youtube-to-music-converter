import React, {useState, useEffect} from 'react'
import {Button, FlexboxGrid, Col} from "rsuite";
import TagCarousel from "../../../components/TagCarousel/TagCarousle";
import ConversionSteps from "../../../components/ConversionSteps/ConversionSteps";
import {useHistory, useLocation} from "react-router-dom";

const arr = [1,2,3,6,4,3,4,4,3]

const arrayToString = () => {

}

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

    useEffect(()=>{
        const tags = filterTags(location.state.tagData)
        console.log(tags)
        setTags(tags)
    },[location.state.tagData])

    return(
        <div>
            <ConversionSteps currentStep={2}/>
            <FlexboxGrid justify={"start"} style={styles.container}>
                {tags.title.length>0?
                    <FlexboxGrid.Item colspan={24} componentClass={Col} md={8} sm={12} style={styles.element}>
                        <TagCarousel
                            data={tags.title}
                            name='Song Title'
                        />
                    </FlexboxGrid.Item>:null
                }
                {tags.artist.length>0?
                    <FlexboxGrid.Item colspan={24} componentClass={Col} md={8} sm={12} style={styles.element}>
                        <TagCarousel
                            data={tags.artist}
                            name='Artist(s)'
                        />
                    </FlexboxGrid.Item>:null
                }
                {tags.album.length>0?
                    <FlexboxGrid.Item colspan={24} componentClass={Col} md={8} sm={12} style={styles.element}>
                        <TagCarousel
                            data={tags.album}
                            name='Album'
                        />
                    </FlexboxGrid.Item> :null
                }
                {tags.albumReleaseDate.length>0?
                    <FlexboxGrid.Item colspan={24} componentClass={Col} md={8} sm={12} style={styles.element}>
                        <TagCarousel
                            data={tags.albumReleaseDate}
                            //data={[{id:"XHAKSA", title: 22, source:'Deezer'}]}
                            name='Album Release Date'
                        />
                    </FlexboxGrid.Item>:null
                }
                {tags.tracks.length>0?
                    <FlexboxGrid.Item colspan={24} componentClass={Col} md={8} sm={12} xs={24} style={styles.element}>
                        <TagCarousel
                            data={tags.tracks}
                            name='Tracks'
                        />
                    </FlexboxGrid.Item>:null
                }
                {tags.label.length>0?
                    <FlexboxGrid.Item colspan={24} componentClass={Col} md={8} sm={12} style={styles.element}>
                        <TagCarousel
                            data={tags.label}
                            name='Label(s)'
                        />
                    </FlexboxGrid.Item>:null
                }
                {tags.genre.length>0?
                    <FlexboxGrid.Item colspan={24} componentClass={Col} md={8} sm={12} style={styles.element}>
                        <TagCarousel
                            data={tags.genre}
                            name='Genre'
                        />
                    </FlexboxGrid.Item>:null
                }
                {tags.artistPicture.length>0?
                    <FlexboxGrid.Item colspan={24} componentClass={Col} md={8} sm={12} style={styles.element}>
                        <TagCarousel
                            image
                            data={tags.artistPicture}
                            name='Artist Image'
                        />
                    </FlexboxGrid.Item>:null
                }
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
