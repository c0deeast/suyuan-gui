import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';

import VM from 'suyuan-vm';

import { setStageSize } from '../reducers/stage-size';
import { STAGE_SIZE_MODES } from '../lib/layout-constants';
import { openUploadProgress } from '../reducers/modals';
import { showAlertWithTimeout } from '../reducers/alerts';
import { setContainerStatus } from '../reducers/code';

import HardwareHeaderComponent from '../components/hardware-header/hardware-header.jsx';

class HardwareHeader extends React.Component {
    constructor(props) {
        super(props);
        bindAll(this, [
            'handleUpload',
            'handleSend'
        ]);
    }

    handleUpload() {
        if (this.props.peripheralName) {
            const blocks = document.querySelector('.blocklyWorkspace .blocklyBlockCanvas');
            if (blocks.getBBox().height === 0) {
                this.props.onWorkspaceIsEmpty();
            } else {
                this.props.vm.uploadToPeripheral(this.props.deviceId, this.props.codeEditorValue);
                this.props.onOpenUploadProgress();
            }
        } else {
            this.props.onNoPeripheralIsConnected();
        }
    }

    handleSend() {
        console.log("stringify formdata:",JSON.stringify(this.props.formData),"deviceId:",this.props.deviceId)
        if (this.props.peripheralName) {
            this.props.vm.writeToPeripheral(this.props.deviceId,JSON.stringify(this.props.formData));
        } else {
            this.props.onNoPeripheralIsConnected();
        }
    }
    render() {
        const {
            ...props
        } = this.props;
        return (
            <HardwareHeaderComponent
                onUpload={this.handleUpload}
                onSend={this.handleSend}
                {...props}
            />
        );
    }
}

HardwareHeader.propTypes = {
    codeEditorValue: PropTypes.string,
    deviceId: PropTypes.string,
    onNoPeripheralIsConnected: PropTypes.func.isRequired,
    onOpenUploadProgress: PropTypes.func,
    onWorkspaceIsEmpty: PropTypes.func.isRequired,
    peripheralName: PropTypes.string,
    codeEditorOrToolContainer: PropTypes.string,
    stageSizeMode: PropTypes.oneOf(Object.keys(STAGE_SIZE_MODES)),
    vm: PropTypes.instanceOf(VM).isRequired
};

const mapStateToProps = state => ({
    codeEditorValue: state.scratchGui.code.codeEditorValue,
    deviceId: state.scratchGui.device.deviceId,
    peripheralName: state.scratchGui.connectionModal.peripheralName,
    stageSizeMode: state.scratchGui.stageSize.stageSize,
    codeEditorOrToolContainer: state.scratchGui.code.codeEditorOrToolContainer,
    formData: state.scratchGui.toolForm.formData
});

const mapDispatchToProps = dispatch => ({
    onNoPeripheralIsConnected: () => showAlertWithTimeout(dispatch, 'connectAPeripheralFirst'),
    onSetStageLarge: () => dispatch(setStageSize(STAGE_SIZE_MODES.large)),
    onSetStageSmall: () => dispatch(setStageSize(STAGE_SIZE_MODES.small)),
    onSetStageHide: () => dispatch(setStageSize(STAGE_SIZE_MODES.hide)),
    onOpenUploadProgress: () => dispatch(openUploadProgress()),
    onWorkspaceIsEmpty: () => showAlertWithTimeout(dispatch, 'workspaceIsEmpty'),
    onSetContainerStatus: (value) => dispatch(setContainerStatus(value))
});

export default compose(
    injectIntl,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(HardwareHeader);
