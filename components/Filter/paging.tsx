'use client';
import React from 'react'
import { useUpdateSearchParam } from '@/utils/ClientSideUtil';

function Paging() {

    const updateParam = useUpdateSearchParam();

    return (
        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <button onClick={() => updateParam("page", 1)}>1</button>
            <button onClick={() => updateParam("page", 2)}>2</button>
            <button onClick={() => updateParam("page", 3)}>3</button>
        </div>
    )
}

export default Paging