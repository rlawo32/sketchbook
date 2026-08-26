'use client'

import { useEffect, useState } from "react";
import * as Style from "./match_player.style";

import SelectBoxRelativeV2 from "./select_box_relative_v2";

interface PlayerRelativeProps {
    selectOpponent: string,
    setSelectOpponent: React.Dispatch<React.SetStateAction<string>>,
    tempArr1:{
        lcg_summoner_puuid: string 
        lcg_player: string 
        lcg_summoner_name: string 
        lcg_summoner_nickname: string
        lcg_player_hide: string}[],
}

const PlayerRelative = (props : PlayerRelativeProps) => {

    const [selectLane, setSelectLane] = useState<string>("ALL");
    const [selectOption, setSelectOption] = useState<string>("A");

    const laneArr:string[] = ["ALL", "TOP", "JUG", "MID", "ADC", "SUP"];

    useEffect(() => {
        if(selectLane === 'ALL' && props.selectOpponent.length === 0) { 
            // 라인 X & 상대 X
            setSelectOption("A")
        } else if(selectLane !== 'ALL' && props.selectOpponent.length === 0) {
            // 라인 O & 상대 X 
            setSelectOption("L")
        } else if(selectLane === 'ALL' && props.selectOpponent.length > 0) { 
            // 라인 X & 상대 O
            setSelectOption("O")
        } else if(selectLane !== 'ALL' && props.selectOpponent.length > 0) { 
            // 라인 O & 상대 O
            setSelectOption("M")
        } 
    }, [selectLane, props.selectOpponent])

    return (
        <Style.MatchPlayerRelative>
            <div className="relative_head">
                <div className="relative_select_lane">
                    {laneArr.map((item) => {
                        return (
                            <Style.RelativeSelectLaneBox key={item} $selected={selectLane === item} onClick={() => {setSelectLane(item)}}>
                                {item}
                            </Style.RelativeSelectLaneBox>
                        )
                    })}
                </div>
                <div className="relative_select_player">
                    <SelectBoxRelativeV2 playerList={props.tempArr1} selectOpponent={props.selectOpponent} setSelectOpponent={props.setSelectOpponent}/>
                </div>
            </div>
            <div className="relative_body">
                {     // 상대 선택
                    selectOption === 'O' ?  
                        // props.resultArr.map((item) => {
                        //     return (
                        //         <Style.RelativeListBox $type={"O"}>

                        //         </Style.RelativeListBox>
                        //     )
                        // })
                        <div>상대 선택</div>
                    : // 라인 선택
                    selectOption === 'L' ?  
                        // props.resultArr.map((item) => {
                        //     return (
                        //         <Style.RelativeListBox $type={"L"}>

                        //         </Style.RelativeListBox>
                        //     )
                        // }) 
                        <div>라인 선택</div>
                    : // 상대&라인 선택
                    selectOption === 'M' ?  
                        // <div>
                        //     <Style.RelativeListCard $type={"M"}>

                        //     </Style.RelativeListCard>
                        //     <div>VS</div>
                        //     <Style.RelativeListCard $type={"M"}>

                        //     </Style.RelativeListCard>
                        // </div> 
                        <div>상대&라인 선택</div>
                    : // 기본                  
                        // props.resultArr.map((item) => {
                        //     return (
                        //         <Style.RelativeListBox $type={"A"}>

                        //         </Style.RelativeListBox>
                        //     )
                        // })
                        <div>기본 선택</div>
                }
            </div>
        </Style.MatchPlayerRelative>
    )
}

export default PlayerRelative;
