'use client'

import * as Style from "./match_player.style";

import TopIcon from "../icons/TopIcon";
import JugIcon from "../icons/JugIcon";
import MidIcon from "../icons/MidIcon";
import AdcIcon from "../icons/AdcIcon";
import SupIcon from "../icons/SupIcon";
import SelectBoxRelativeV2 from "./select_box_relative_v2";
import { useState } from "react";
import PlayerRelative from "./player_relative";

const MatchPlayer = () => {

    const [selectOpponent, setSelectOpponent] = useState<string>("");

    const laneArr:{lane:string; rate:number; win:number; fail:number;}[] = [
        {lane:"TOP", rate:48.8, win:21, fail:22},
        {lane:"JUG", rate:71.4, win:35, fail:14},
        {lane:"MID", rate:38.5, win:5, fail:8},
        {lane:"ADC", rate:50, win:5, fail:5},
        {lane:"SUP", rate:62.9, win:22, fail:13}
    ];
    const resultArr:string[] = ["TEST1", "TEST2", "TEST3"];
    const tempArr1:{
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
    const tempArr2:{
            lcg_summoner_puuid: string 
            lcg_player: string 
            lcg_summoner_name: string 
            lcg_summoner_nickname: string
            lcg_player_hide: string}[] = [
        ];
    const selectOption:string = "A"; // 기본(All) - A, 상대(Opponent) - O, 라인(Lane) - L, 상대&라인(Merge) - M

    const LaneIcon = (lane:string, best:boolean) => {
        if(lane === 'TOP') {return <TopIcon type={best ? "L" : ""} />} 
        else if(lane === 'JUG') {return <JugIcon type={best ? "L" : ""} />} 
        else if(lane === 'MID') {return <MidIcon type={best ? "L" : ""} />} 
        else if(lane === 'ADC') {return <AdcIcon type={best ? "L" : ""} />} 
        else if(lane === 'SUP') {return <SupIcon type={best ? "L" : ""} />} 
    }

    const LaneBest = () => {
        return [...laneArr].sort((a, b) => {
            const aGames = a.win + a.fail;
            const bGames = b.win + b.fail;

            // 1순위: 판수 많은 순
            if (aGames !== bGames) {
                return bGames - aGames;
            }

            // 2순위: 승률 높은 순
            return b.rate - a.rate;
        })[0].lane;
    }

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
                    {laneArr.map((item) => {
                        const bestLane:boolean = item.lane === LaneBest();
                        return (
                            <Style.MatchPlayerPosition $rate={item.rate} $best={bestLane}>
                                <div className="position_lane">
                                    {LaneIcon(item.lane, bestLane)} {item.lane}
                                </div>
                                <div className="position_rate">
                                    <div className="position_rate_total">
                                        <div className="position_rate_win" />
                                    </div>
                                    <div className="position_rate_info">
                                        {item.rate}%
                                    </div>
                                </div>
                                <div className="position_info">
                                    {item.win}승 {item.fail}패
                                </div>
                            </Style.MatchPlayerPosition>
                        )
                    })}
                </div>
                <div className="player_category">

                </div>
                <div className="player_detail">
                    {/* <PlayerRelative tempArr1={tempArr1} selectOpponent={selectOpponent} setSelectOpponent={setSelectOpponent} /> */}
                    <div className="detail_item detail_history">
                        <div className="detail_title">
                            <div className="title">최근 전적</div>
                            <div className="more">더보기</div>
                        </div>
                        <div className="history_item"></div>
                        <div className="history_item"></div>
                        <div className="history_item"></div>
                        <div className="history_item"></div>
                        <div className="history_item"></div>
                    </div>
                    <div className="detail_item detail_champion">
                        <div className="detail_title">
                            <div className="title">모스트 챔피언</div>
                            <div className="more">더보기</div>
                        </div>
                        <div className="champion_most">
                            <div className="champion_item"></div>
                            <div className="champion_item"></div>
                            <div className="champion_item"></div>
                        </div>
                    </div>
                    <div className="detail_item detail_relative">
                        <div className="detail_title">
                            <div className="title">상대 전적</div>
                            <div className="more">더보기</div>
                        </div>
                        <div className="relative_item"></div>
                        <div className="relative_item"></div>
                        <div className="relative_item"></div>
                    </div>
                </div>
            </Style.MatchPlayerBody>
        </Style.MatchPlayer>
    )
}

export default MatchPlayer;
