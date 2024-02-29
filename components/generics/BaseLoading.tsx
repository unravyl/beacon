import React from 'react';

const BaseLoading = ({ width = 100, height = 100 }) => {
  return (
    <div
      className="base-loading"
      style={{ width: width, height: height }}
    ></div>
  );
};

export default BaseLoading;
