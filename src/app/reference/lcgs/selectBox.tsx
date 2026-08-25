'use client'

import styled from "styled-components";

import { useEffect, useRef, useState } from "react";

const SelectBoxRelativeV2Style = styled('div')`
    position: relative;
    width: 100%;

    button {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 40px;
        padding: 6px 16px;
        margin: 0;
        border: 1px solid #312246;
        border-radius: 8px;
        background: #161320;
        color: #e5e7eb;
        font-size: 1rem;
        font-weight: 700;
        cursor: pointer;

        &::after {
            content: "";
            position: absolute;
            right: 14px;
            top: 50%;
            width: 7px;
            height: 7px;
            border-right: 2px solid #8b8fa8;
            border-bottom: 2px solid #8b8fa8;
            transform: translateY(-65%) rotate(45deg);
            pointer-events: none;
        }

        &:hover {
            border-color: #6265f5;
        }

        &::focus {
            border-color: #7477ff;
            box-shadow: 0 0 0 3px rgba(116, 119, 255, 0.12);
        }
    }

    .select_box {
        position: absolute;
        top: 105%;
        left: 0;
        display: flex;
        justify-content: center;
        height: 0;
        width: 100%;
        padding: 0 5px;
        border: none;
        border-radius: 5px;
        background: #191b2a;
        z-index: 2;
    }

    ul.select_list {
        height: 0;
        width: 99%;
        padding: 0;
        border: none;
        overflow: auto;
        background: #191b2a;
        cursor: pointer;
        z-index: 3;
        user-select: none;
        list-style:none;
        word-break: keep-all;
        
        &::-webkit-scrollbar {
            width: 4px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: rgb(255 255 255 / 1);
            border-radius: 5px;
        }

        &::-webkit-scrollbar-track {
            background: rgba(200, 200, 200, .1);
            border-radius: 5px;
        }
    }

    ul.select_list li {
        padding: 6px 12px;
        margin: 3px 0;
        border-radius: 8px;
        font-size: 1rem;
        text-align: left;
        line-height: 1.4em;
        opacity: 0.7;

        &:hover {
            background: #2c1e42;
            color: #c0a3ee;
        }
    }

    .select_box.show_select {
        display: flex;
        align-items: center;
        padding: 5px;
        height: 210px;
        border: 1px solid #6265f5;
    }

    .select_list.show_select {
        padding: 5px 0;
        height: 192px;
    }

    ul.select_list li.rs_active {
        background: #2f1f49;
        color: #ae90df;
        font-weight: 700;
        opacity: 1;
    }
`

const SelectBoxRelativeV2 = (props : {playerList:{
            lcg_summoner_puuid: string
            lcg_player: string 
            lcg_summoner_name: string 
            lcg_summoner_nickname: string
            lcg_player_hide: String
        }[], selectOpponent:string, setSelectOpponent:any}) => {
    const selectBox:any = useRef<any>(null);
    const selectList:any = useRef<any>(null);
    const selectItem:any = useRef<any>([]);

    const [isSelectBoxShow, setIsSelectBoxShow] = useState<boolean>(false);
    const [selectIdx, setSelectIdx] = useState<number>(0);
        
    const customSelectBox = () => {
        const result:any[] = [];

        for(let i:number=0; i<props.playerList.length; i++) {
            if(i === 0) {
                result.push(<li key={"player_all"} value={""}
                                onClick={() => onClickSelectItem(i, "")}
                                ref={(li:any) => (selectItem.current[i] = li)}>
                    전체</li>)
            } else {
                result.push(<li key={"player_" + i} value={props.playerList[i-1].lcg_summoner_puuid}
                                onClick={() => onClickSelectItem(i, props.playerList[i-1].lcg_summoner_puuid)}
                                ref={(li:any) => (selectItem.current[i] = li)}>
                    {props.playerList[i-1].lcg_summoner_name}</li>)
            }
        }
        return result;
    }

    const onClickSelectItem = (idx:number, oppid:string) => {
        setIsSelectBoxShow(false);
        setSelectIdx(idx);
        props.setSelectOpponent(oppid);

        selectItem.current[idx].className = selectItem.current[idx].className.replace('rs_active', '');
        selectItem.current[idx].className += 'rs_active';

        for(let i:number=0; i<selectItem.current.length; i++) {
            if(i !== idx) {
                selectItem.current[i].className = selectItem.current[i].className.replace('rs_active', '');
            }
        }
    }

    useEffect(() => {
        if(isSelectBoxShow) {
            selectBox.current.className += " show_select";
            selectList.current.className += " show_select";
            
            const handleOutsideClose = (e: {target: any}) => {
                // useRef current에 담긴 엘리먼트 바깥을 클릭 시 드롭메뉴 닫힘
                if(isSelectBoxShow && (!selectBox.current.contains(e.target))) setIsSelectBoxShow(false);
            };
            document.addEventListener('click', handleOutsideClose);
            
            return () => document.removeEventListener('click', handleOutsideClose);
        } else {
            selectBox.current.className = selectBox.current.className.replace(' show_select', '');
            selectList.current.className = selectList.current.className.replace(' show_select', '');
        }
    }, [isSelectBoxShow])

    useEffect(() => {
        if(props.selectOpponent === "") {
            setSelectIdx(0);
        }
    }, [props.selectOpponent])

    return (
        <SelectBoxRelativeV2Style>
            <button onClick={() => setIsSelectBoxShow(!isSelectBoxShow)}>
                {
                    selectIdx === 0 ? "전체" : props.playerList[selectIdx-1].lcg_summoner_name
                }
                <div className="select_arrow" />
            </button>
            <div className="select_box" ref={selectBox}>
                <ul className="select_list" ref={selectList}>
                    {customSelectBox()}
                </ul>
            </div>
        </SelectBoxRelativeV2Style>
    )
}

export default SelectBoxRelativeV2;
