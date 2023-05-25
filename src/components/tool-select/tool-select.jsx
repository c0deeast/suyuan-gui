import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '../box/box.jsx';
import styles from './tool-select.css';

const ToolSelectComponent = props => {
    const { placeholder, onChange, value, options } = props
    const [visible, setVisible] = useState(false)

    const handleSelect = (val) => {
        onChange(val)
        setVisible(false)
    }
    return (
        <Box>
            {/* <select placeholder={placeholder} onChange={onChange} value={value} name="" id="">
                {
                    options.map((val) => (<option value={val} key={val}>{val}</option>))
                }
            </select> */}
            <ul className={styles.actionEntries}>
                <li className={styles.actionEntry}>
                    <button className={styles.switchBtn} onClick={() => setVisible(!visible)}>{value ? <span>{value}</span> : <span className={styles.placeholderText}>{placeholder}</span>}</button>
                    {
                        visible && <ul className={styles.listContent}>
                            {
                                options.map((val) => (
                                    <li className={styles.optionItem} key={val}>
                                        <button className={styles.optionBtn} onClick={() => handleSelect(val)}>
                                            <span>{val}</span>
                                        </button>
                                    </li>
                                ))
                            }
                        </ul>
                    }
                </li>
            </ul>
        </Box>
    )
}

ToolSelectComponent.propTypes = {
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    options: PropTypes.array
}

export default ToolSelectComponent