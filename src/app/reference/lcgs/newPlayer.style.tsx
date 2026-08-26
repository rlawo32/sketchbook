import styled from "styled-components";

export const MatchPlayer = styled('div')`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    max-width: 928px;
    height: 100vh;
    margin: 0 auto;
    padding: 7px 30px;
    border: 1px solid #887d7d;
    border-radius: 10px;    
    background-color: rgb(49 49 60 / .7);
`;

export const MatchPlayerHeader = styled('div')`
    
`;

export const MatchPlayerBox = styled('div')`
    
`;

export const MatchPlayerBody = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    width: 100%;
    height: 100%;

    .player_position {
        position: relative;
        width: 100%;
        min-height: 110px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-around;
        gap: 4px;
        padding: 6px 12px;
        border: 1px solid #312C3F;
        border-radius: 4px;
        background-color: #030814;
    }

    .player_category {
        width: 100%;
        height: 40px;
        border: 1px solid #312C3F;
        border-radius: 4px;
        background-color: #030814;
    }
    
    .player_detail {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        gap: 4px;
        width: 100%;
        height: 55%;

        .detail_item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
            width: 100%;
            height: 100%;
            padding: 12px 16px;
            border: 1px solid #312C3F;
            border-radius: 4px;
            background-color: #030814;
            color: #F0F2F7;
            font-size: .8rem;
        }

        .detail_title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            margin-bottom: 12px;
        }

        .detail_history {
            grid-row: 1 / 3;
            
            .history_item {
                flex: 1;
                width: 100%;
                min-height: 70px;
                background-color: #F0F2F7;
            }
        }

        .detail_champion {
            
            .champion_most {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 4px;
                width: 100%;
                margin-top: 15px;

                .champion_item {
                    width: 100%;
                    min-height: 140px;
                    background-color: #F0F2F7;

                    &:nth-child(1),
                    &:nth-child(3) {
                        transform: translateY(15px);
                    }

                    &:nth-child(2) {
                        transform: translateY(-15px);
                    }
                }
            }
        }

        .detail_relative {
            
            .relative_item {
                flex: 1;
                width: 100%;
                min-height: 40px;
                background-color: #F0F2F7;
            }
        }
    }
`;

export const MatchPlayerPosition = styled('div')<{$rate:number; $best:boolean;}>`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    min-width: 130px;
    padding: 8px 16px;
    border: 1px solid ${({$best}) => $best ? "#9D4EFF" : "#312246"};
    border-radius: 8px;
    background-color: #070F1B;

    .position_lane {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        width: 50%;
        font-size: .9rem;
        color: ${({$best}) => $best ? "#B17CF0" : "#F0F2F7"};
        font-weight: ${({$best}) => $best ? 600 : 400};

        svg {
            flex-shrink: 0;
            width: 18px;
            height: 18px;
        }
    }

    .position_rate {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
            
        .position_rate_total {
            display: flex;
            align-items: center;
            width: 100%;
            height: 6px;
            border: none;
            border-radius: 12px;
            background-color: #101D45;
            overflow: hidden;

            .position_rate_win {
                width: ${({$rate}) => $rate}%;
                height: 100%;
                background-color: #4C7DFF;
            }
        }

        .position_rate_info {
            font-size: .8rem;
            color: #918C97;
        }
    }
    
    .position_info {
        font-size: .8rem;
        color: #918C97;
    }
`;

export const MatchPlayerDetail = styled('div')`
    
`;

export const MatchPlayerHistory = styled('div')`
    
`;

export const MatchPlayerRelative = styled('div')`
    position: relative;
    width: 100%;
    height: 100%;
    padding: 12px 24px;
    border: 2px solid #702ABE;
    border-radius: 16px;
    background-color: #0A0A1D;
    color: #ffffff;

    .relative_head {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        padding: 10px;

        .relative_select_lane {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: flex-start;
            gap: 5px;
            width: 100%;
        }

        .relative_select_player {
            position: relative;
            width: 100%;
        }
    }

    .relative_body {

    }
`;

export const RelativeSelectLaneBox = styled('div')<{$selected:boolean}>`
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 15px 40px;
    border: 1px solid ${({$selected}) => $selected ? "#8b5cf6" : "#312246"};
    border-radius: 14px;
    background: #161320;
    cursor: pointer;

    &:hover {
        border-color: #6265f5;
    }
`;

export const RelativeSelectOpponentBox = styled('div')`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 40px;
    border: 1px solid #362052;
    border-radius: 14px;
    cursor: pointer;

    &:hover {
        border-color: #6265f5;
    }
`;

export const RelativeListBox = styled('div')<{$type:string}>`
`;

export const RelativeListCard = styled('div')<{$type:string}>`
`;

export const MatchPlayerChampion = styled('div')`
    
`;
