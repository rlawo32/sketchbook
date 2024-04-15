'use client'

import { Provider } from "jotai";
import React from "react";

export default function JotaiProviderWrapper({children}: Readonly<{children: React.ReactNode;}>) {
    return (
        <Provider>
            {children}
        </Provider> 
    )
}
