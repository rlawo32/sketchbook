'use client'

import * as Style from "./match_player.style";

const MatchPlayer = () => {

    const laneArr:string[] = ["ALL", "TOP", "JUG", "MID", "ADC", "SUP"];
    const resultArr:string[] = ["TEST1", "TEST2", "TEST3"];
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
                                <select>
                                    <option>성재</option>
                                    <option>지훈</option>
                                    <option>광호</option>
                                </select>
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
