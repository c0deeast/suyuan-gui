import React from 'react';
import PropTypes from 'prop-types';
import Box from '../box/box.jsx';
import Button from '../button/button.jsx';
import classNames from 'classnames';
import { defineMessages, FormattedMessage, intlShape } from 'react-intl';

import { STAGE_SIZE_MODES } from '../../lib/layout-constants';

import styles from './hardware-header.css';

import largeStageIcon from './icon--large-stage.svg';
import smallStageIcon from './icon--small-stage.svg';
import hideStageIcon from './icon--hide-stage.svg';
import uploadIcon from './icon--upload.svg';

const messages = defineMessages({
    uploadMessage: {
        defaultMessage: 'Upload',
        description: 'Button to upload program',
        id: 'gui.hardwareHeader.upload'
    },
    largeStageSizeMessage: {
        defaultMessage: 'Switch to large stage',
        description: 'Button to upload code to device alt',
        id: 'gui.stageHeader.codeStageSizeLarge'
    },
    smallStageSizeMessage: {
        defaultMessage: 'Switch to small stage',
        description: 'Button to change stage size to small',
        id: 'gui.stageHeader.codeStageSizeSmall'
    },
    hideStageSizeMessage: {
        defaultMessage: 'Hide stage',
        description: 'Button to hide stage',
        id: 'gui.stageHeader.hideStage'
    }
});

const HardwareHeaderComponent = props => {
    const {
        onSetStageLarge,
        onSetStageSmall,
        onSetStageHide,
        onUpload,
        stageSizeMode,
        codeEditorOrToolContainer,
        onSetContainerStatus,
        onSend
    } = props;

    const handleChangeContainerStatus = () => {
        if (codeEditorOrToolContainer === "codeEditor") {
            onSetContainerStatus("toolContainer")
        } else if (codeEditorOrToolContainer === "toolContainer") {
            onSetContainerStatus("codeEditor")
        }
    }



    return (
        <Box
            className={classNames(
                styles.hardwareHeaderWrapper,
                stageSizeMode === STAGE_SIZE_MODES.large ? styles.hardwareHeaderWrapperStageLarge : null,
                stageSizeMode === STAGE_SIZE_MODES.small ? styles.hardwareHeaderWrapperStageSmall : null,
                stageSizeMode === STAGE_SIZE_MODES.hide ? styles.hardwareHeaderWrapperStageHide : null
            )}
        >
            <Button onClick={() => handleChangeContainerStatus()}>
                {
                    codeEditorOrToolContainer === "codeEditor" ? <span>工具</span> : <span>代码编辑器</span>
                }
            </Button>
            {
                codeEditorOrToolContainer === "codeEditor" &&
                <div className={styles.uploadGroup}>
                    <div
                        className={classNames(
                            styles.uploadButton,
                        )}
                        onClick={onUpload}
                    >
                        <img
                            alt={props.intl.formatMessage(messages.uploadMessage)}
                            className={styles.uploadIcon}
                            draggable={false}
                            src={uploadIcon}
                        />
                        <FormattedMessage
                            defaultMessage="Upload"
                            description="Button to upload program"
                            id="gui.hardwareHeader.upload"
                        />
                    </div>
                </div>
            }
            {
                codeEditorOrToolContainer === "toolContainer" &&
                <div className={styles.sendGroup}>

                    <div
                        className={classNames(
                            styles.sendButton,
                        )}
                        onClick={onSend}
                    >
                        <FormattedMessage
                            defaultMessage="Send"
                            description="Button in bottom to send data to serialport"
                            id="gui.hardwareConsole.send"
                        />
                    </div>
                </div>
            }

            <div className={styles.stageSizeToggleGroup}>
                <div>
                    <Button
                        className={classNames(
                            styles.stageButton,
                            styles.stageButtonFirst,
                            (stageSizeMode === STAGE_SIZE_MODES.small) ? null : styles.stageButtonToggledOff
                        )}
                        onClick={onSetStageSmall}
                    >
                        <img
                            alt={props.intl.formatMessage(messages.smallStageSizeMessage)}
                            className={styles.stageButtonIcon}
                            draggable={false}
                            src={smallStageIcon}
                        />
                    </Button>
                </div>
                <div>
                    <Button
                        className={classNames(
                            styles.stageButton,
                            styles.stageButtonLast,
                            (stageSizeMode === STAGE_SIZE_MODES.large) ? null : styles.stageButtonToggledOff
                        )}
                        onClick={onSetStageLarge}
                    >
                        <img
                            alt={props.intl.formatMessage(messages.largeStageSizeMessage)}
                            className={styles.stageButtonIcon}
                            draggable={false}
                            src={largeStageIcon}
                        />
                    </Button>
                </div>
            </div>
            <div className={styles.stageHideGroup}>
                <div>
                    <Button
                        className={classNames(
                            styles.stageButton,
                            (stageSizeMode === STAGE_SIZE_MODES.hide) ? null : styles.stageButtonToggledOff
                        )}
                        onClick={onSetStageHide}
                    >
                        <img
                            alt={props.intl.formatMessage(messages.hideStageSizeMessage)}
                            className={styles.stageButtonIcon}
                            draggable={false}
                            src={hideStageIcon}
                        />
                    </Button>
                </div>
            </div>
        </Box>
    );
};

HardwareHeaderComponent.propTypes = {
    intl: intlShape,
    codeEditorOrToolContainer: PropTypes.string,
    onUpload: PropTypes.func.isRequired,
    onSend: PropTypes.func.isRequired,
    onSetStageLarge: PropTypes.func.isRequired,
    onSetStageSmall: PropTypes.func.isRequired,
    onSetStageHide: PropTypes.func.isRequired,
    onSetContainerStatus: PropTypes.func.isRequired,
    stageSizeMode: PropTypes.oneOf(Object.keys(STAGE_SIZE_MODES)),
};

HardwareHeaderComponent.defaultProps = {
    stageSizeMode: STAGE_SIZE_MODES.large
};

export default HardwareHeaderComponent;
