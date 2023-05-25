import React from 'react';
import PropTypes from 'prop-types';
import Box from '../box/box.jsx';
import styles from './tool-input.css'
import InputNumber from 'rc-input-number';

const ToolInputComponent = props => {
    let { value, setInputValue, prefix } = props

    const onChange = (val) => {
        console.warn('onChange:', val, typeof val);
        setInputValue(val);
    }

    const handleDecrease = () => {
        setInputValue(--value)
    }

    const handleAdd = () => {
        setInputValue(++value)
    }
    return (
        <Box className={styles.numInpContainer}>
            <span style={{marginRight:"5px"}}>{prefix}</span>
            <button style={{ borderRadius: "4px 0px 0px 4px" }} className={styles.numInpBtn} onClick={handleDecrease}>-</button>
            <InputNumber className={styles.numInp} readOnly={false} value={value} onChange={onChange} defaultValue={10} />
            <button style={{ borderRadius: "0px 4px 4px 0px" }} className={styles.numInpBtn} onClick={handleAdd}>+</button>
        </Box>
    )
}

ToolInputComponent.propTypes = {
    value: PropTypes.number,
    setInputValue: PropTypes.func
}

export default ToolInputComponent