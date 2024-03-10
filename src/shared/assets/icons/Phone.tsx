import {forwardRef, memo, Ref, SVGProps} from 'react';
import * as React from "react";


export const PhoneIcon = ({size = 30, color = '#fff', ...rest}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             x="0px"
             y="0px"
             width="30"
             height="30"
             viewBox="0 0 172 172"
        >
            <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
               stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
               font-family="none" font-weight="none" font-size="none" text-anchor="none" >
                <path d="M0,172v-172h172v172z" fill="none"></path>
                <g fill="#1fb141">
                    <path
                        d="M21.5,21.5v129h64.5v-32.25v-64.5v-32.25zM86,53.75c0,17.7805 14.4695,32.25 32.25,32.25c17.7805,0 32.25,-14.4695 32.25,-32.25c0,-17.7805 -14.4695,-32.25 -32.25,-32.25c-17.7805,0 -32.25,14.4695 -32.25,32.25zM118.25,86c-17.7805,0 -32.25,14.4695 -32.25,32.25c0,17.7805 14.4695,32.25 32.25,32.25c17.7805,0 32.25,-14.4695 32.25,-32.25c0,-17.7805 -14.4695,-32.25 -32.25,-32.25z"></path>
                </g>
            </g>
        </svg>
    )
}


