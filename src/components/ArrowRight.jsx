import React from 'react';

const NEXTArrowRight = ({ width = 26, height = 26, fill = "black", ...props }) => {
    return (
        <svg 
            width={width} 
            height={height} 
            viewBox="0 0 28 31" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M20.3007 18.2219L20.3061 18.2219V18.2165L20.3007 18.2219Z" 
                fill={fill}
            />
            <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M27.3541 13.2344L27.3604 13.2407L27.3604 13.2344H27.3541ZM20.3061 18.2165L20.3007 18.2219L20.3061 18.2219V18.2165ZM27.3541 18.2219L27.3604 18.2219L27.3604 18.2156L27.3541 18.2219Z" 
                fill={fill}
            />
            <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M20.3061 18.2165V18.2219L20.3007 18.2219L20.3061 18.2165ZM20.3007 18.2219L11.3842 27.1384L14.911 30.6651L20.3061 25.2699V18.2219L25.2882 18.2219H27.3541L27.3604 18.2156V13.2407L27.3541 13.2344L15.0299 0.910156L11.5031 4.43688L20.3007 13.2344H0.602051V18.2219L20.3007 18.2219Z" 
                fill={fill}
            />
        </svg>
    );
};

export default NEXTArrowRight;