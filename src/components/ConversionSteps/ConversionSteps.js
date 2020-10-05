import React from 'react'
import {Steps} from "rsuite";

const ConversionSteps = props => {
    return(
        <Steps current={props.currentStep}>
            <Steps.Item
                title="Search"
                description="Paste a Youtube video link to get started"
            />
            <Steps.Item
                title="Cover Art"
                description="Select the most suitable cover art for your music." />
            <Steps.Item
                title="Tags"
                description="Select the most suitable tags for your music." />
            <Steps.Item
                title="Finalize"
                description="Preview and download your music" />
        </Steps>
    )
}

export default ConversionSteps
