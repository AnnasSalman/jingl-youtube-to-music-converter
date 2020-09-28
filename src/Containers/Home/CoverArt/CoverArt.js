import React, {useState, useEffect} from 'react'
import ConversionSteps from "../../../components/ConversionSteps/ConversionSteps";
import ArtCarousel from "../../../components/ArtCarousel/ArtCarousel";
import {FlexboxGrid, Col, Row, Button, Icon} from 'rsuite'
import {useLocation, useHistory} from 'react-router-dom'
import axios from 'axios'
import TagCarousel from "../../../components/TagCarousel/TagCarousle";

const CoverArt = props => {

    const history = useHistory()
    const location = useLocation()

    const [data, setData] = useState([])
    const [currentIndex, setcurrentIndex] = useState(0)
    const [url, seturl] = useState(location.state.artData[0].image)

    useEffect(()=>{
        setData(location.state.artData)
    },[location.state])

    const onChangeHandler = (index, url) => {
        setcurrentIndex(index)
        seturl(url)
    }

    const confirmHandler = async () => {
        try{
            const tags = await axios.request({
                url: '/gettags',
                method: 'get',
                params: {
                    videourl: location.state.state.searchText,
                        ...location.state.state.tagSources
                }
            })
            history.push("/tags", {...location.state, tagData: tags.data, selected: {coverArt: url}});
        }
        catch(e){
            console.log(e)
        }
    }

    return(
        <div>
            <ConversionSteps currentStep={1}/>
            <FlexboxGrid justify={"center"} align={'middle'} style={styles.container}>
                <FlexboxGrid.Item componentClass={Col} colspan={18}>
                    <ArtCarousel
                        onChange={(index, url)=>onChangeHandler(index, url)}
                        carouselStyles={styles.carouselStyles}
                        data={data}
                    />
                </FlexboxGrid.Item>
            </FlexboxGrid>
            <FlexboxGrid justify='end' align='middle' style={styles.buttonBar}>
                <FlexboxGrid.Item>
                    <Button color="blue" onClick={confirmHandler}>
                        <Icon icon="check"/> Confirm & Continue
                    </Button>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </div>
    )
}

const styles = {
    container: {
        width: '100%',
        marginTop: 50
    },
    carouselStyles: {
        height: '52vh',
        width: '60vw',
    },
    buttonBar: {
        marginTop: 40
    }
}

export default CoverArt
