import React from 'react';

function PopupModal(props) {
  return (
    <div style={{ display: props.show ? 'block' : 'none' }}>
      <div>{props.children}</div>
    </div>
  );
}

export default PopupModal;
