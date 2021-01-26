import React from "react";

export const renderChangePercent = (percent) => {
  if (percent > 0) {
    return <span className="percent-raised">{percent}% &uarr;</span>;
  } else if (percent < 0) {
    return <span className="percent-fallen">{percent}% &darr;</span>;
  } else {
    return <span>{percent} %</span>;
  }
};

export const handleResponse = (response) => {
  return response.json().then((data) => {
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};
