import React, { useState, useEffect, useRef } from 'react';
import './Toggle.scss';

export default function Toggle({
    options,
    active,
    change
}) {
    return (
        <div className="toggle">
            {
                options && options.map(option => {
                    return (
                        <div key={option}
                            style={{width: `${100 / options.length}%`}}
                            className={option == active ? "option active" : "option"}
                            onClick={() => change(option)}
                        >
                            {option}
                        </div>
                    )
                })
            }
        </div>
    )
}