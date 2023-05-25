import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '../box/box.jsx';
import classNames from 'classnames';

import ToolInputComponent from '../tool-input/tool-input.jsx';
import ToolSelectComponent from '../tool-select/tool-select.jsx';
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

    const [value, setInputValue] = useState(0)

    return (
        <Box
            className={styles.toolContainer}
            componentRef={containerRef}
        >
            <div style={{ width: `${width}px`, height: `${height}px`, backgroundColor: '#f9f9f9' }} className={styles.toolContent}>
                <Box className={styles.leftContainer}>
                    <h2 className={styles.title}>工具</h2>
                    <ToolSelectComponent onChange={setSerialValue} value={serialValue} options={serailOptions} placeholder="选择串口" />
                    <ToolSelectComponent onChange={setSerialValue} value={serialValue} options={serailOptions} placeholder="选择波特率" />
                </Box>
                <Box className={styles.rightContainer}>
                    <h2 className={styles.title}>快速移动</h2>
                    <div>
                        <p>关节控制</p>
                        <div className={styles.control}>
                            <div style={{marginRight:"8px"}}>
                                <ToolInputComponent prefix="J1" value={value} setInputValue={setInputValue} />
                                <ToolInputComponent prefix="J2" value={value} setInputValue={setInputValue} />
                                <ToolInputComponent prefix="J3" value={value} setInputValue={setInputValue} />

                            </div>
                            <div>
                                <ToolInputComponent prefix="J4" value={value} setInputValue={setInputValue} />
                                <ToolInputComponent prefix="J5" value={value} setInputValue={setInputValue} />
                                <ToolInputComponent prefix="J6" value={value} setInputValue={setInputValue} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <p>坐标控制</p>
                        <div className={styles.control}>
                            <div style={{marginRight:"8px"}}>
                                <ToolInputComponent prefix="x" value={value} setInputValue={setInputValue} />
                                <ToolInputComponent prefix="y" value={value} setInputValue={setInputValue} />
                                <ToolInputComponent prefix="z" value={value} setInputValue={setInputValue} />
                            </div>
                            <div>
                                <ToolInputComponent prefix="rx" value={value} setInputValue={setInputValue} />
                                <ToolInputComponent prefix="ry" value={value} setInputValue={setInputValue} />
                                <ToolInputComponent prefix="rz" value={value} setInputValue={setInputValue} />
                            </div>
                        </div>
                    </div>
                </Box>
            </div>
        </Box>
    )
}

ToolContainerComponent.propTypes = {
    serialValue: PropTypes.string
}


export default ToolContainerComponent;