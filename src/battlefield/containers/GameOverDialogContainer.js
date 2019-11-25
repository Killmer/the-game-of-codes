import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import Modal from '../../common/components/modal/Modal';
import selectors from '../selectors';
import actions from '../actions';

class GameOverDialogContainer extends Component {
  render() {
    const {isOpen, dialogProps, hideDialog} = this.props
    return (
      <Fragment>
        <Modal
          title={dialogProps && dialogProps.title}
          isOpen={isOpen}
          onCancel={hideDialog}
          onSubmit={hideDialog}
        >
        {<p>Test</p>}
        </Modal>

      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    isOpen: selectors.getDialogStatus(state),
    dialogProps: selectors.getDialogProps(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showDialog: dialogProps => dispatch(actions.showDialog(dialogProps)),
    hideDialog: () => dispatch(actions.hideDialog()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameOverDialogContainer);
