'use client'

import * as Style from "./match_player.style";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

import TopIcon from "../icons/TopIcon";
import JugIcon from "../icons/JugIcon";
import MidIcon from "../icons/MidIcon";
import AdcIcon from "../icons/AdcIcon";
import SupIcon from "../icons/SupIcon";
import MvpIcon from "../icons/MvpIcon";
import MultikillIcon from "../icons/MultikillIcon";

const MatchPlayer = (props:{directPlayer:string|null}) => {
    const matchListRef:any = useRef<any>([]);
    const matchHistoryRef:any = useRef<any>([]);
    const selectRef:any = useRef<any>([]);

    let imageMainUrl:string = "";
    let imageSubUrl:string = "";
    let imageExtension:string = "";
    let lastUpdate:string = "";

    return (
        <Style.MatchPlayer>
            <Style.MatchPlayerHeader>
                <div className="player_list">
                    <Style.MatchPlayerBox>

                    </Style.MatchPlayerBox>
                </div>
                <div className="player_info">
                    <div>
                        
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
                        
                    </Style.MatchPlayerRelative>
                    <Style.MatchPlayerChampion>
                        
                    </Style.MatchPlayerChampion>
                </div>
            </Style.MatchPlayerBody>
        </Style.MatchPlayer>
    )
}

export default MatchPlayer;
