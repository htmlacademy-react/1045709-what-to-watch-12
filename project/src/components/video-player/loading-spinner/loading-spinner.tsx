import React from 'react';
import { motion } from 'framer-motion';

const circleStyle = {
  display: 'block',
  width: '10rem',
  height: '10rem',
  border: '0.5rem solid #e9e9e9',
  borderTop: '0.5rem solid blue',
  borderRadius: '50%',
  position: 'absolute',
  boxSizing: 'border-box',
  top: '33%',
  left: '46%',
} as React.CSSProperties;

const spinTransition = {
  loop: Infinity,
  ease: 'linear',
  duration: 2
};

function LoadingSpinner(): JSX.Element {
  return (
    <div>
      <motion.span
        style={circleStyle}
        animate={{ rotate: 360 }}
        transition={spinTransition}
      />
    </div>
  );
}

export default LoadingSpinner;
