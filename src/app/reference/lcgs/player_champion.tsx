'use client'

import * as Style from "./player_champion.style";

import { InfoMessage, championInfoMessage } from "./player_info_message"

const PlayerChampion = () => {

    const testArr = [{"champion_name":"LeeSin","kill":199,"death":96,"assist":277,"win":17,"fail":7},{"champion_name":"Sylas","kill":104,"death":71,"assist":121,"win":8,"fail":5},{"champion_name":"Olaf","kill":115,"death":90,"assist":90,"win":7,"fail":5}];

    return (
        <Style.PlayerChampion>
            <div className="champion_list">
                {testArr.map((item, idx) => {
                    const play:number = item.win + item.fail;
                    return (
                        <Style.PlayerChampionListItem key={item.champion_name}>
                            <div className="item_left">
                                <Style.LcgRowNumCalc $idx={idx+1}>
                                    {idx+1}
                                </Style.LcgRowNumCalc>
                                <img src={"https://img.rabbitgang-img.shop/champion/" + item.champion_name + ".webp"} 
                                alt={"champion"} className="champion_img" loading="lazy"/>
                                <div>
                                    {item.champion_name}
                                </div>
                            </div>
                            <div className="item_center">
                                <div className="kda_detail">
                                    <span>{(item.kill / play).toFixed(1)}</span>/
                                    <span>{(item.death / play).toFixed(1)}</span>/
                                    <span>{(item.assist / play).toFixed(1)}</span>
                                </div>
                                <div className="kda_calc">
                                    <Style.LcgKdaCalc $k={item.kill} $d={item.death} $a={item.assist}>
                                        {item.death !== 0 ? 
                                            <span>
                                                KDA
                                                <span className="kda">
                                                    {((item.kill + item.death) / item.assist).toFixed(2)}
                                                </span>
                                            </span>: <span className="kda">Perfect</span>}
                                    </Style.LcgKdaCalc>
                                </div>
                                {championInfoMessage(
                                    item.kill,
                                    item.death,
                                    item.assist,
                                    item.win,
                                    item.fail
                                ).map((info, index) => (
                                    <Style.InfoMessageBox key={index} $flag={info.flag}>
                                        {info.message}
                                    </Style.InfoMessageBox>
                                ))}
                            </div>
                            <div className="item_right">
                                <div className="match_detail">
                                    <span>{play}전</span>
                                    <span>{item.win}승</span>
                                    <span>{item.fail}패</span>
                                </div>
                                <div className="match_calc">
                                    {((item.win * 100) /play).toFixed(1)}%
                                </div>
                            </div>
                        </Style.PlayerChampionListItem>
                    )
                })}
            </div>
        </Style.PlayerChampion>
    )
}

export default PlayerChampion;
