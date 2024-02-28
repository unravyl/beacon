'use client';

import React from 'react'
import { useState, useEffect } from 'react'
import Graph from '@/components/home/Graph'
import JobTitleModal from '@/components/home/JobTitleModal';

function page() {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        console.log(windowSize.width, windowSize.height);
    })

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="canvas-container">
            <div className="absolute top-0 left-0 p-5 flex items-center">
                <img src="/logo.png" alt="logo" className="w-[80px] h-[80px]" />
                <p className="text-white text-5xl font-semibold">Beacon</p>
            </div>
            <button className="absolute right-0 top-0 p-5">
                <i className="bx bx-face text-white text-5xl"></i>
            </button>
            <Graph width={windowSize.width} height={windowSize.height} />
        </div>
    )
}

export default page