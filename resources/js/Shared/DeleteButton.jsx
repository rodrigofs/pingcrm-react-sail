import React from 'react';

export default React.forwardRef(({ children, ...props }, ref) => (
  <button
      ref={ref}
      {...props}
    className="text-red-600 focus:outline-none hover:underline"
    tabIndex="-1"
    type="button"
  >
    {children}
  </button>
));
