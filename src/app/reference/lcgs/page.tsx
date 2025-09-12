'use client';

import React, { useEffect, useRef, useState } from "react";

const TestView2 = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [aTeamTop, setATeamTop] = useState<string>("");
    const [aTeamJug, setATeamJug] = useState<string>("");
    const [aTeamMid, setATeamMid] = useState<string>("");
    const [aTeamAdc, setATeamAdc] = useState<string>("");
    const [aTeamSup, setATeamSup] = useState<string>("");
    const [bTeamTop, setBTeamTop] = useState<string>("");
    const [bTeamJug, setBTeamJug] = useState<string>("");
    const [bTeamMid, setBTeamMid] = useState<string>("");
    const [bTeamAdc, setBTeamAdc] = useState<string>("");
    const [bTeamSup, setBTeamSup] = useState<string>("");
    const [jsonText, setJsonText] = useState<string>("");

    const jsonData:object = {
        gameId: '1234567890',
        blueTeamTop: aTeamTop,
        blueTeamJug: aTeamJug,
        blueTeamMid: aTeamMid,
        blueTeamAdc: aTeamAdc,
        blueTeamSup: aTeamSup,
        redTeamTop: bTeamTop,
        redTeamJug: bTeamJug,
        redTeamMid: bTeamMid,
        redTeamAdc: bTeamAdc,
        redTeamSup: bTeamSup,
    }

    const test:{}[] = [
        {gameId:'1234567890', blueTeamTop:'a', blueTeamJug:'b', blueTeamMid:'c', blueTeamAdc:'d', blueTeamSup:'e', redTeamTop:'f', redTeamJug:'g', redTeamMid:'h', redTeamAdc:'i', redTeamSup:'j'}
    ]

    useEffect(() => {
        const jsonText:string = insertDataHandler();
        setJsonText(jsonText);
    }, [bTeamSup])
    
    const insertDataHandler = ():string => {
        const jsonFormatted:string = "{" +  Object.entries(jsonData).map(([key, value]) => `${key}:'${value}'`).join(', ') + "},";
        console.log("{" + jsonFormatted + "},");
        return jsonFormatted;
    }

    const inputDataCopyHandler = async ():Promise<void> => {
        const input = inputRef.current;
        if (!input) return;

        try {
            await navigator.clipboard.writeText(input.value);
        } catch (err) {
            console.error('복사 실패:', err);
        }
    }

    return (
        <div className="view_main">
            <h1>TEST</h1>
            <div className="setting_section">
                <input type="text" value={1234567890} readOnly />
            </div>
            <div className="insert_section">
                <div className="insert_team team_a">
                    <h3>팀 A (블루팀)</h3>
                    <h4>TOP</h4>
                    <input type="text" value={aTeamTop} onChange={(e) => setATeamTop(e.target.value)} placeholder="name" maxLength={3} />
                    <h4>JUG</h4>
                    <input type="text" value={aTeamJug} onChange={(e) => setATeamJug(e.target.value)} placeholder="name" maxLength={3} />
                    <h4>MID</h4>
                    <input type="text" value={aTeamMid} onChange={(e) => setATeamMid(e.target.value)} placeholder="name" maxLength={3} />
                    <h4>ADC</h4>
                    <input type="text" value={aTeamAdc} onChange={(e) => setATeamAdc(e.target.value)} placeholder="name" maxLength={3} />
                    <h4>SUP</h4>
                    <input type="text" value={aTeamSup} onChange={(e) => setATeamSup(e.target.value)} placeholder="name" maxLength={3} />
                </div>
                <div className="insert_team team_b">
                    <h3>팀 B (레드팀)</h3>
                    <h4>TOP</h4>
                    <input type="text" value={bTeamTop} onChange={(e) => setBTeamTop(e.target.value)} placeholder="name" maxLength={3} />
                    <h4>JUG</h4>
                    <input type="text" value={bTeamJug} onChange={(e) => setBTeamJug(e.target.value)} placeholder="name" maxLength={3} />
                    <h4>MID</h4>
                    <input type="text" value={bTeamMid} onChange={(e) => setBTeamMid(e.target.value)} placeholder="name" maxLength={3} />
                    <h4>ADC</h4>
                    <input type="text" value={bTeamAdc} onChange={(e) => setBTeamAdc(e.target.value)} placeholder="name" maxLength={3} />
                    <h4>SUP</h4>
                    <input type="text" value={bTeamSup} onChange={(e) => setBTeamSup(e.target.value)} placeholder="name" maxLength={3} />
                </div>
            </div>
            <div className="jsonText_section">
                <input type="text" value={jsonText} ref={inputRef} readOnly={true} />
                <button onClick={() => inputDataCopyHandler()}>복사</button>
            </div>
            <div className="button_section">
                <button onClick={() => insertDataHandler()}>저장</button>
            </div>
        </div>
    )
}

export default TestView2;
