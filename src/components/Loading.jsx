import React from 'react'
import { Mosaic } from 'react-loading-indicators';
import { useSelector } from 'react-redux';

function Loading() {

    const isLoading = useSelector((state) => state.app.isLoading)

    return (
        isLoading && (
            <div id="loading-overlay">
                <Mosaic color={["#33CCCC", "#33CC36", "#B8CC33", "#FCCA00"]} size="medium" text="" textColor="" />
            </div>
        )
    );
}

export default Loading