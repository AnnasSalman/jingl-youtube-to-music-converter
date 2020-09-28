import React, {useState, useRef} from 'react'
import {FlexboxGrid, Col, Icon, IconButton, Button, Modal, Placeholder} from 'rsuite'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import deezer from '../ArtCarousel/logos/removed-bg-logo.png'
import theme from "../../constants/theme";
import {Colorize} from "@material-ui/icons";
import musicbrainz from "../ArtCarousel/logos/musicbrainz-logo-removebg-preview.png";
import lastfm from "../ArtCarousel/logos/lastfm-logo-removebg-preview.png";
import discogs from "../ArtCarousel/logos/discogs-logo.png";

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

const TagCarousel = props => {

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



    return(
        <FlexboxGrid justify={'center'} style={styles.container}>
            <div style={styles.title}>
                <h6 style={styles.titleText}>{props.name}</h6>
                <div style={styles.smallText}>{props.data.length} Results Found</div>
                <IconButton
                    icon={<Icon icon="arrows-alt" />}
                    size='sm'
                    appearance='subtle'
                    color={theme.secondaryDark}
                    onClick={_openModal}
                />
            </div>
            <Slider
                {...settings}
                style={styles.slide}
                afterChange={(index)=>_changeHandler(index)}
                ref={slide}>
                {
                    props.data.map((element, index)=>(
                        <div key={element.id}>
                            {props.image?
                                <img src={element.title} alt={'artist'} style={styles.image}/>:
                                <div style={styles.info}>
                                    <h4>{element.title.toString()}</h4>
                                </div>
                            }
                            <div style={styles.bottom}>
                                <p style={styles.smallText}>Result {index+1}/{props.data.length}</p>
                                <img src={logoSelect(element.source)} alt={'LOGO'} style={styles.logo}/>
                            </div>
                        </div>
                    ))
                }
            </Slider>
            <Modal overflow={true} show={openModal} onHide={_closeModal}>
                <Modal.Header>
                    <Modal.Title>{props.name}</Modal.Title>
                    <div style={styles.subtitle}>{props.data.length} Results Found</div>
                </Modal.Header>
                <Modal.Body>
                    <FlexboxGrid justify={'center'} align={'middle'}>
                        {
                            props.data.map((el,index)=>(
                                <FlexboxGrid.Item componentClass={Col} colspan={24} sm={24} md={8} key={el.id}>
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
                                        {props.image?
                                            <img src={el.title} alt={'Artist Image'} style={styles.image}/>:
                                            <h5>{el.title.toString()}</h5>
                                        }
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
        </FlexboxGrid>
    )
}

const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
};

const styles = {
    container: {
        width: 280,
        padding: 15,
        paddingTop: 0,
        paddingBottom: 4,
        border: '2px solid green',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: theme.secondary,
        boxShadow: '0 0 5px #1A6866',
    },
    slide: {
        width: 200,
    },
    logo: {
        width: 50
    },
    info: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    slideElement: {
        height: 90
    },
    bottom: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 8
    },
    titleText: {
        color: theme.primaryDark,
        fontFamily: 'Arial'
    },
    title: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 5
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
    },
    selection: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%'
    },
    smallText: {
        fontSize: 11
    },
    image: {
        height: 80
    }
}

export default TagCarousel
