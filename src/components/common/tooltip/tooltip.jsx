import React from 'react';
import './Tooltip.css';

function Tooltip({ text, children }) {
  const [showTooltip, setShowTooltip] = React.useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div
      className='tooltip-container'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <div className={`tooltip ${showTooltip ? 'show' : ''}`}>{text}</div>
    </div>
  );
}

export default Tooltip;
