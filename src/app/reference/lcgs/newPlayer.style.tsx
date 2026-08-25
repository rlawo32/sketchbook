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
    width: 100%;
    height: 100%;
    
    .player_detail {
        width: 100%;
        height: 100%;
    }
`;

export const MatchPlayerPosition = styled('div')`
    
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

export const RelativeSelectLaneBox = styled('div')`
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 15px 40px;
    border: 1px solid #312246;
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
