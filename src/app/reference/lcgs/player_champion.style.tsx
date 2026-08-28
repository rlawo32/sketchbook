import styled from "styled-components";

export const PlayerChampion = styled('div')`
    position: relative;
    width: 100%;
    max-width: 928px;
    height: 100vh;
    margin: 0 auto;
    padding: 7px 30px;
    border: 1px solid #887d7d;
    border-radius: 10px;    
    background-color: #070F1B;

    .champion_list {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        width: 100%;
        height: 100%;
    }
`;

export const PlayerChampionListItem = styled('div')`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 70px;
    padding: 8px 24px;
    border: none;
    border-radius: 16px;
    background-color: #17152B;
    color: azure;


    .item_left {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 1.2rem;
        
        .item_rownum {
            
        }

        img {
            height: 45px;
            width: 45px;
            border-radius: 15px;
            object-fit: cover;
        }
    }

    .item_center {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;

        .kda_detail {
            font-size: 1.2rem;

            span:nth-child(1) {
                margin: 0 4px 0 0;
            }

            span:nth-child(1n+2) {
                margin: 0 4px;
            }
        }

        .kda_calc {
            padding-top: 3px;
            font-size: 1rem;
            font-weight: 700;
            color: rgb(123 122 152 / 1);
        }
    }

    .item_right {
        
        .match_detail {
        }

        span {
            margin: 0 1px;
            letter-spacing: .1rem;
        }
    }
`;

export const LcgKdaCalc = styled('div')<{$k:number, $d:number, $a:number}>`
    display: flex;
    align-items: center;

    .kda {
        margin: 0 0 0 4px;
        color: ${({$k, $d, $a}) => 
            ($k > 0 || $a > 0) && $d == 0 ? "#FF8200"
            :
            Math.floor(($k + $a) / $d) > 4 ? "#FF8200" 
            :
            Math.floor(($k + $a) / $d) > 3 ? "#0093FF"
            :
            Math.floor(($k + $a) / $d) > 2 ? "#00BBA3"
            :
            "#9E9EB1"
        }
    }
`;

export const LcgRowNumCalc = styled('div')<{$idx:number}>`
    font-size: ${({$idx}) =>  $idx <= 3 ? 1.2 : 1}rem;
    font-weight: ${({$idx}) =>  $idx <= 3 ? 600 : 400};
    color: ${({$idx}) =>  $idx === 1 ? "#FFD75C" : $idx === 2 ? "#C0CCDA" : $idx === 3 ? "#CD8F5B" : "#9194A5"};
`;

export const InfoMessageBox = styled('div')<{$flag:string}>`
    width: fit-content;
    height: 100%;
    padding: 4px 16px;
    border: 1px solid;
    border-radius: 8px;
    border-color: ${({$flag}) => $flag === 'S' ? "#CB70FF" : 
                                 $flag === 'P' ? "#6E9AFF" : 
                                 $flag === 'N' ? "#FFA13A" : 
                                 $flag === 'W' ? "#FF6378" : "#A94A5A"};
    background-color: ${({$flag}) => $flag === 'S' ? "#1D0D35" : 
                                     $flag === 'P' ? "#101D45" : 
                                     $flag === 'N' ? "#3A210C" : 
                                     $flag === 'W' ? "#3A1118" : "#2A171C"};
    font-size: .6rem;
    font-weight: 600;
    color: ${({$flag}) => $flag === 'S' ? "#B14EFF" : 
                          $flag === 'P' ? "#4C7DFF" : 
                          $flag === 'N' ? "#FF8A1F" : 
                          $flag === 'W' ? "#FF526A" : "#B85A6A"};
`;
