import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '../box/box.jsx';
import classNames from 'classnames';

import ToolInputComponent from '../tool-input/tool-input.jsx';
import ToolSelectComponent from '../tool-select/tool-select.jsx';
import styles from './tool-container.css';

const serailOptions = ['com3', 'com13']
const baudrateOptions = ['115200', '1000000']
const ToolContainerComponent = props => {
    const {
        containerRef,
        width,
        height,
        serialValue,
        baudrate,
        baudrateValue,
        angle1Value,
        angle2Value,
        angle3Value,
        angle4Value,
        angle5Value,
        angle6Value,
        coordsXValue,
        coordsYValue,
        coordsZValue,
        coordsRXValue,
        coordsRYValue,
        coordsRZValue,
        setSerialValue,
        setBaudrateValue,
        setAngle1Value,
        setAngle2Value,
        setAngle3Value,
        setAngle4Value,
        setAngle5Value,
        setAngle6Value,
        setCoordsXValue,
        setCoordsYValue,
        setCoordsZValue,
        setCoordsRXValue,
        setCoordsRYValue,
        setCoordsRZValue,
        handleReadAngle,
        handleReadCoords,
        handleSendCoords,
        handleSendAngle
    } = props;
    return (
        <Box
            className={styles.toolContainer}
            componentRef={containerRef}
        >
            <div style={{ width: `${width}px`, height: `${height}px`, backgroundColor: '#f9f9f9' }} className={styles.toolContent}>
                <Box className={styles.leftContainer}>
                    <h2 className={styles.title}>工具</h2>
                    <ToolSelectComponent onChange={setSerialValue} value={serialValue} options={serailOptions} placeholder="选择串口" />
                    <ToolSelectComponent onChange={setBaudrateValue} value={baudrate} options={baudrateOptions} placeholder="选择波特率" />
                </Box>
                <Box className={styles.rightContainer}>
                    <h2 className={styles.title}>快速移动</h2>
                    <div className={styles.angleContainer}>
                        <div className={styles.angleText}>
                            <span className={styles.controlText}>关节控制：</span>
                            <button onClick={handleReadAngle} className={styles.readAngle}>读取角度</button>
                            <button onClick={handleSendAngle} className={styles.sendAngle}>发送角度</button>
                        </div>
                        <div className={styles.control}>
                            <div style={{ marginRight: "8px" }}>
                                <ToolInputComponent prefix="J1" value={angle1Value} setInputValue={setAngle1Value} />
                                <ToolInputComponent prefix="J2" value={angle2Value} setInputValue={setAngle2Value} />
                                <ToolInputComponent prefix="J3" value={angle3Value} setInputValue={setAngle3Value} />

                            </div>
                            <div>
                                <ToolInputComponent prefix="J4" value={angle4Value} setInputValue={setAngle4Value} />
                                <ToolInputComponent prefix="J5" value={angle5Value} setInputValue={setAngle5Value} />
                                <ToolInputComponent prefix="J6" value={angle6Value} setInputValue={setAngle6Value} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.coordsText}>
                            <span className={styles.controlText}>坐标控制：</span>
                            <button onClick={handleReadCoords} className={styles.readCoords}>读取坐标</button>
                            <button onClick={handleSendCoords} className={styles.sendCoords}>发送坐标</button>
                        </div>
                        <div className={styles.control}>
                            <div style={{ marginRight: "8px" }}>
                                <ToolInputComponent prefix="x" value={coordsXValue} setInputValue={setCoordsXValue} />
                                <ToolInputComponent prefix="y" value={coordsYValue} setInputValue={setCoordsYValue} />
                                <ToolInputComponent prefix="z" value={coordsZValue} setInputValue={setCoordsZValue} />
                            </div>
                            <div>
                                <ToolInputComponent prefix="rx" value={coordsRXValue} setInputValue={setCoordsRXValue} />
                                <ToolInputComponent prefix="ry" value={coordsRYValue} setInputValue={setCoordsRYValue} />
                                <ToolInputComponent prefix="rz" value={coordsRZValue} setInputValue={setCoordsRZValue} />
                            </div>
                        </div>
                    </div>
                </Box>
            </div>
        </Box>
    )
}

ToolContainerComponent.propTypes = {
    baudrate: PropTypes.string,
    serialValue: PropTypes.string,
    baudrateValue: PropTypes.string,
    angle1Value: PropTypes.number,
    angle2Value: PropTypes.number,
    angle3Value: PropTypes.number,
    angle4Value: PropTypes.number,
    angle5Value: PropTypes.number,
    angle6Value: PropTypes.number,
    coordsXValue: PropTypes.number,
    coordsYValue: PropTypes.number,
    coordsZValue: PropTypes.number,
    coordsRXValue: PropTypes.number,
    coordsRYValue: PropTypes.number,
    coordsRZValue: PropTypes.number,
    setSerialValue: PropTypes.func,
    setBaudrateValue: PropTypes.func,
    setAngle1Value: PropTypes.func,
    setAngle2Value: PropTypes.func,
    setAngle3Value: PropTypes.func,
    setAngle4Value: PropTypes.func,
    setAngle5Value: PropTypes.func,
    setAngle6Value: PropTypes.func,
    setCoordsXValue: PropTypes.func,
    setCoordsYValue: PropTypes.func,
    setCoordsZValue: PropTypes.func,
    setCoordsRXValue: PropTypes.func,
    setCoordsRYValue: PropTypes.func,
    setCoordsRZValue: PropTypes.func,
}


export default ToolContainerComponent;