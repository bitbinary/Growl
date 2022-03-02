import React from "react";

import "./growl.css";

export const Growl = ({ active, message, onDismissed }) => (
  <div className={`growl${active ? " active" : ""}`}>
    {message}
    <div onClick={onDismissed} className="growl-close" />
  </div>
);

export function useGrowl() {
  // state of the growl
  const [growlActive, setGrowlActive] = React.useState(false);

  // default timeout for the growl
  let growlTimeout = React.useRef(3000);

  // effect that follows the change in growl state
  React.useEffect(() => {
    if (growlActive) {
      // timer function to dismiss the growl in the given timeout
      var timer = setTimeout(() => {
        setGrowlActive(false);
      }, growlTimeout.current);
    }

    return () => {
      // clears the timer to avoid memory leak
      clearTimeout(timer);
    };
  }, [growlActive]);

  return [
    // the first arg is the state
    growlActive,

    // the second arg is a fn that allows you to safely set its state
    (active, timeout) => {
      growlTimeout.current = timeout ? timeout : growlTimeout.current;
      setGrowlActive(active);
    },
  ];
}
