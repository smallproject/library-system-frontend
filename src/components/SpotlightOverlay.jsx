import React, { useEffect } from 'react';
import '../pages/Homepage/Homepage.css';

const SpotlightOverlay = () => {
    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = e.clientX;
            const y = e.clientY;

            // Update the custom properties (CSS variables) directly in the root
            document.documentElement.style.setProperty('--mouse-x', `${x}px`);
            document.documentElement.style.setProperty('--mouse-y', `${y}px`);
        };

        // Listen to mousemove event
        window.addEventListener('mousemove', handleMouseMove);

        // Cleanup the event listener when the component unmounts
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return <div className="dark-overlay container"></div>;
};

export default SpotlightOverlay;
