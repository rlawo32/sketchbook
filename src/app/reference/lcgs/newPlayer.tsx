'use client'

import * as Style from "./match_player.style";

import TopIcon from "../icons/TopIcon";
import JugIcon from "../icons/JugIcon";
import MidIcon from "../icons/MidIcon";
import AdcIcon from "../icons/AdcIcon";
import SupIcon from "../icons/SupIcon";
import SelectBoxRelativeV2 from "./select_box_relative_v2";
import { useState } from "react";

const MatchPlayer = () => {

    const [selectOpponent, setSelectOpponent] = useState<string>("");

    const laneArr:string[] = ["ALL", "TOP", "JUG", "MID", "ADC", "SUP"];
    const resultArr:string[] = ["TEST1", "TEST2", "TEST3"];
    const tempArr:{
            lcg_summoner_puuid: string 
            lcg_player: string 
            lcg_summoner_name: string 
            lcg_summoner_nickname: string
            lcg_player_hide: string}[] = [
        {lcg_summoner_puuid:'1e062cfe-c62e-53ef-9145-ab0d6c76d40d', lcg_player:'성재', lcg_summoner_name:'버들보들', lcg_summoner_nickname:'버들보들', lcg_player_hide:'N'},
        {lcg_summoner_puuid:'fd234707-5d0b-5db9-92e1-9b8fae3b1b84', lcg_player:'지훈', lcg_summoner_name:'까까라돈나', lcg_summoner_nickname:'까까라돈나', lcg_player_hide:'N'},
        {lcg_summoner_puuid:'60e3571d-2b64-5e2b-b9ba-c73789b86639', lcg_player:'광호', lcg_summoner_name:'윤슬l', lcg_summoner_nickname:'윤슬l', lcg_player_hide:'N'},
        {lcg_summoner_puuid:'fd234707-5d0b-5db9-92e1-9b8fae3b1b84', lcg_player:'지훈', lcg_summoner_name:'까까라돈나', lcg_summoner_nickname:'까까라돈나', lcg_player_hide:'N'},
        {lcg_summoner_puuid:'60e3571d-2b64-5e2b-b9ba-c73789b86639', lcg_player:'광호', lcg_summoner_name:'윤슬l', lcg_summoner_nickname:'윤슬l', lcg_player_hide:'N'},
        {lcg_summoner_puuid:'fd234707-5d0b-5db9-92e1-9b8fae3b1b84', lcg_player:'지훈', lcg_summoner_name:'까까라돈나', lcg_summoner_nickname:'까까라돈나', lcg_player_hide:'N'},
        {lcg_summoner_puuid:'60e3571d-2b64-5e2b-b9ba-c73789b86639', lcg_player:'광호', lcg_summoner_name:'윤슬l', lcg_summoner_nickname:'윤슬l', lcg_player_hide:'N'},
        {lcg_summoner_puuid:'fd234707-5d0b-5db9-92e1-9b8fae3b1b84', lcg_player:'지훈', lcg_summoner_name:'까까라돈나', lcg_summoner_nickname:'까까라돈나', lcg_player_hide:'N'},
        {lcg_summoner_puuid:'60e3571d-2b64-5e2b-b9ba-c73789b86639', lcg_player:'광호', lcg_summoner_name:'윤슬l', lcg_summoner_nickname:'윤슬l', lcg_player_hide:'N'},
        {lcg_summoner_puuid:'fd234707-5d0b-5db9-92e1-9b8fae3b1b84', lcg_player:'지훈', lcg_summoner_name:'까까라돈나', lcg_summoner_nickname:'까까라돈나', lcg_player_hide:'N'},
        {lcg_summoner_puuid:'60e3571d-2b64-5e2b-b9ba-c73789b86639', lcg_player:'광호', lcg_summoner_name:'윤슬l', lcg_summoner_nickname:'윤슬l', lcg_player_hide:'N'},
        {lcg_summoner_puuid:'fd234707-5d0b-5db9-92e1-9b8fae3b1b84', lcg_player:'지훈', lcg_summoner_name:'까까라돈나', lcg_summoner_nickname:'까까라돈나', lcg_player_hide:'N'},
        {lcg_summoner_puuid:'60e3571d-2b64-5e2b-b9ba-c73789b86639', lcg_player:'광호', lcg_summoner_name:'윤슬l', lcg_summoner_nickname:'윤슬l', lcg_player_hide:'N'},
        {lcg_summoner_puuid:'fd234707-5d0b-5db9-92e1-9b8fae3b1b84', lcg_player:'지훈', lcg_summoner_name:'까까라돈나', lcg_summoner_nickname:'까까라돈나', lcg_player_hide:'N'},
        {lcg_summoner_puuid:'60e3571d-2b64-5e2b-b9ba-c73789b86639', lcg_player:'광호', lcg_summoner_name:'윤슬l', lcg_summoner_nickname:'윤슬l', lcg_player_hide:'N'},
        {lcg_summoner_puuid:'fd234707-5d0b-5db9-92e1-9b8fae3b1b84', lcg_player:'지훈', lcg_summoner_name:'까까라돈나', lcg_summoner_nickname:'까까라돈나', lcg_player_hide:'N'},
        {lcg_summoner_puuid:'60e3571d-2b64-5e2b-b9ba-c73789b86639', lcg_player:'광호', lcg_summoner_name:'윤슬l', lcg_summoner_nickname:'윤슬l', lcg_player_hide:'N'},
        {lcg_summoner_puuid:'fd234707-5d0b-5db9-92e1-9b8fae3b1b84', lcg_player:'지훈', lcg_summoner_name:'까까라돈나', lcg_summoner_nickname:'까까라돈나', lcg_player_hide:'N'},
        {lcg_summoner_puuid:'60e3571d-2b64-5e2b-b9ba-c73789b86639', lcg_player:'광호', lcg_summoner_name:'윤슬l', lcg_summoner_nickname:'윤슬l', lcg_player_hide:'N'},
        {lcg_summoner_puuid:'fd234707-5d0b-5db9-92e1-9b8fae3b1b84', lcg_player:'지훈', lcg_summoner_name:'까까라돈나', lcg_summoner_nickname:'까까라돈나', lcg_player_hide:'N'},
        {lcg_summoner_puuid:'60e3571d-2b64-5e2b-b9ba-c73789b86639', lcg_player:'광호', lcg_summoner_name:'윤슬l', lcg_summoner_nickname:'윤슬l', lcg_player_hide:'N'},
    ];
    const selectOption:string = "A"; // 기본(All) - A, 상대(Opponent) - O, 라인(Lane) - L, 상대&라인(Merge) - M

    return (
        <Style.MatchPlayer>
            <Style.MatchPlayerHeader>
                <div className="player_list">
                    <Style.MatchPlayerBox>

                    </Style.MatchPlayerBox>
                </div>
                <div className="player_info">
                    <div className="info_left">
                        
                    </div>
                    <div className="info_right">

                    </div>
                </div>
            </Style.MatchPlayerHeader>
            <Style.MatchPlayerBody>
                <div className="player_position">
                    <Style.MatchPlayerPosition>

                    </Style.MatchPlayerPosition>
                </div>
                <div className="player_detail">
                    <Style.MatchPlayerHistory>

                    </Style.MatchPlayerHistory>
                    <Style.MatchPlayerRelative>
                        <div className="relative_head">
                            <div className="relative_select_lane">
                                {laneArr.map((item) => {
                                    return (
                                        <Style.RelativeSelectLaneBox>
                                            {item}
                                        </Style.RelativeSelectLaneBox>
                                    )
                                })}
                            </div>
                            <div className="relative_select_player">
                                <SelectBoxRelativeV2 playerList={tempArr} selectOpponent={selectOpponent} setSelectOpponent={setSelectOpponent}/>
                            </div>
                        </div>
                        <div className="relative_body">
                            {     // 상대 선택
                                selectOption === 'O' ?  
                                    resultArr.map((item) => {
                                        return (
                                            <Style.RelativeListBox $type={"O"}>

                                            </Style.RelativeListBox>
                                        )
                                    })
                                : // 라인 선택
                                selectOption === 'L' ?  
                                    resultArr.map((item) => {
                                        return (
                                            <Style.RelativeListBox $type={"L"}>

                                            </Style.RelativeListBox>
                                        )
                                    }) 
                                : // 상대&라인 선택
                                selectOption === 'M' ?  
                                    <div>
                                        <Style.RelativeListCard $type={"M"}>

                                        </Style.RelativeListCard>
                                        <div>VS</div>
                                        <Style.RelativeListCard $type={"M"}>

                                        </Style.RelativeListCard>
                                    </div> 
                                : // 기본                  
                                    resultArr.map((item) => {
                                        return (
                                            <Style.RelativeListBox $type={"A"}>

                                            </Style.RelativeListBox>
                                        )
                                    })
                            }
                        </div>
                    </Style.MatchPlayerRelative>
                    <Style.MatchPlayerChampion>
                        
                    </Style.MatchPlayerChampion>
                </div>
            </Style.MatchPlayerBody>
        </Style.MatchPlayer>
    )
}

export default MatchPlayer;
