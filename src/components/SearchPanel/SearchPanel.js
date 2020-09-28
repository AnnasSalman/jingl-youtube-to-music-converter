import React from 'react'
import logoShort from './logo_Short.png'
import SearchInput from "../SearchInput/SearchInput";

const SearchPanel = props => {
    return(
        <div style={{...styles.container, ...props.style}}>

        </div>
    )
}

const styles = {
    container:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '20vh',
        marginRight: '20vh',
    },
    search:{
        margin:15,
    }
}

export default SearchPanel
