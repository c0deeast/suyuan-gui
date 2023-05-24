import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '../box/box.jsx';
import classNames from 'classnames';

import styles from './tool-container.css';

const serailOptions = ['com3', 'com13']

const ToolContainerComponent = props => {
    const {
        containerRef,
        width,
        height,
        serialValue,
        setSerialValue
    } = props;

    const serailChange = (e) => {
        console.log("val", e.target.value);
        setSerialValue(e.target.value)
    }
    return (
        <Box
            className={styles.toolContainer}
            componentRef={containerRef}
        >
            <div style={{ width: `${width}px`, height: `${height}px`, backgroundColor: '#f9f9f9' }} className={styles.toolContent}>
                <select defaultValue="" placeholder='选择串口' onChange={serailChange} value={serialValue}>

                    {
                        serailOptions.map(val => {
                            return <option key={val} value={val}>{val}</option>
                        })
                    }
                </select>
            </div>
        </Box>
    )
}

ToolContainerComponent.propTypes = {
    serialValue:PropTypes.string
}


export default ToolContainerComponent;