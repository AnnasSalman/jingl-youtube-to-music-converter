import React, {useEffect, useRef, useState} from 'react'
import {IconButton, Icon, FlexboxGrid, Button, Col, Modal} from 'rsuite'
import Slider from 'react-slick'
import theme from "../../constants/theme";
import {MagicSpinner, PulseSpinner} from "react-spinners-kit";
import deezer from './logos/removed-bg-logo.png'
import lastfm from './logos/lastfm-logo-removebg-preview.png'
import discogs from './logos/discogs-logo.png'
import musicbrainz from './logos/musicbrainz-logo-removebg-preview.png'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const logoSelect = (logo) => {
    if(logo === 'MusicBrainz'){
        return musicbrainz
    }
    else if(logo === 'LastFM'){
        return lastfm
    }
    else if(logo === 'Deezer'){
        return deezer
    }
    else if(logo === 'Discogs'){
        return discogs
    }
    else{
        return null
    }
}

const ArtCarousel= props => {

    const [sideCovers, setsideCovers] = useState([])
    const slide = useRef(null)

    const [openModal, setOpenModal] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)

    const _openModal = () => setOpenModal(true)
    const _closeModal = () => setOpenModal(false)
    const _changeHandler = (index) => {
        //props.onChange(index)
        setCurrentIndex(index)
    }
    const _selectHandler = (index) => {
        setCurrentIndex(index)
        slide.current.slickGoTo(index, false)
    }

    const objectToArray = (obj) => {
        return Object.entries(obj)
    }

    useEffect(()=>{
        const otherQualities = props.data.map((dataElement)=>{
            const thumbnails = objectToArray(dataElement.thumbnails).map((thumbnail)=>{
                return (
                    {
                        quality: thumbnail[0],
                        image: thumbnail[1],
                        source: dataElement.source
                    }
                )
            })
            return thumbnails
        })
        let sortedArray = []
        otherQualities.forEach((thumbnails, index)=>{
            if(thumbnails.length-1>=0){
                sortedArray.push(thumbnails[thumbnails.length-1])
            }
            if(thumbnails.length-2>=0){
                sortedArray.push(thumbnails[thumbnails.length-2])
            }
            if(thumbnails.length-3>=0){
                sortedArray.push(thumbnails[thumbnails.length-3])
            }
        })
        setsideCovers(sortedArray)

    },[props.data])

    return (
        <div>
            <IconButton
                icon={<Icon icon="arrows-alt" />}
                size='sm'
                appearance='subtle'
                color={theme.secondaryDark}
                onClick={_openModal}
            />
            <Slider ref={slide} {...settings} style={styles.slide} afterChange={(index)=>props.onChange(index, [...props.data,...sideCovers][index].image)}>
                {
                    [...props.data,...sideCovers].map((dataElement, index)=>(
                        <FlexboxGrid justify='center' align='middle'>
                            <FlexboxGrid.Item colspan={24} componentClass={Col} md={16} sm={24} style={styles.art}>
                                <img src={dataElement.image} alt={'Cover'} style={styles.image}/>
                            </FlexboxGrid.Item>
                            <FlexboxGrid.Item colspan={24} componentClass={Col} md={8} sm={24} style={styles.details}>
                                <img src={logoSelect(dataElement.source)} alt={'Source'} style={styles.source}/>
                                <h5>{dataElement.source.toUpperCase()} Image Quality: <span style={styles.quality}>{dataElement.quality}</span></h5>
                            </FlexboxGrid.Item>
                        </FlexboxGrid>
                    ))
                }
            </Slider>
            <Modal overflow={true} show={openModal} onHide={_closeModal}>
                <Modal.Header>
                    <Modal.Title>Cover Arts</Modal.Title>
                    <div style={styles.subtitle}>{[...props.data,...sideCovers].length} Results Found</div>
                </Modal.Header>
                <Modal.Body>
                    <FlexboxGrid justify={'center'} align={'middle'}>
                        {
                            [...props.data,...sideCovers].map((el,index)=>(
                                <FlexboxGrid.Item componentClass={Col} colspan={24} xs={12} sm={12} md={8} key={el.id}>
                                    <div
                                        style={currentIndex===index?styles.modalElementsSelected:styles.modalElements}
                                        onClick={()=>_selectHandler(index)}
                                    >
                                        {
                                            currentIndex===index?
                                                <div style={styles.selection}>
                                                    <Icon icon={'check-circle'}></Icon>
                                                </div>:null
                                        }
                                        <img src={el.image} alt={'Artist Image'} style={styles.imageSmall}/>
                                        <img src={logoSelect(el.source)} alt={'Logo'} style={styles.logo}></img>
                                    </div>
                                </FlexboxGrid.Item>
                            ))
                        }
                    </FlexboxGrid>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={_closeModal} appearance="primary">
                        Ok
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
};

const styles = {
    image: {
        height: 300,
        //width: 300
    },
    slide: {
        height: 300,
        width: '100%',
    },
    art: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    source: {
        width: 140,
    },
    quality: {
        fontSize: 28,
        fontFamily: 'Arial'
    },
    logo: {
        width: 80
    },
    imageSmall: {
        width: '100%'
    },
    modalElementsSelected: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: 8,
        border: '2px solid green',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: theme.secondary,
        boxShadow: '0 0 10px #1A6866',
        marginBottom: 8,
        backgroundColor: theme.secondaryDark
    },
    modalElements: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: 8,
        border: '2px solid green',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: theme.secondaryDark,
        marginBottom: 8,
    }
}

export default ArtCarousel
