import styled from "styled-components";

export const FadeUp = styled('div')<{$timing:number}>`
    display: inline-block;
    margin: auto;
    opacity: 0;
    animation: fade-up .8s forwards cubic-bezier(.6, 1.5, .8, 1.2);
    animation-delay: .${({$timing}) => $timing+1}s;

    @keyframes fade-up {
        from {
            transform: translateY(100px);
            opacity: 0;
        }
        to {
            transform: none;
            opacity: 1;
        }
    }
`;

export const InputValueStyle = styled('input')`
    min-heigth: 100px;
    width: 100px;
    margin: 5px;
    padding: 10px 20px;
    border: none;
    border-radius: 15px;
    background: rgba(42,50,73, .68);
    color: #6cacc5;
    font-size: 24px;
`;

export const InputPlayerStyle = styled('input')`
    min-heigth: 100px;
    width: 250px;
    margin: 5px;
    padding: 10px 20px;
    border: none;
    border-radius: 15px;
    background: rgba(42,50,73, .68);
    color: #6cacc5;
    font-size: 24px;
`;

export const BtnStyle= styled('button')`
    display: block;
    margin: 10px auto;
    padding: 5px 25px;
    border: none;
    border-radius: 10px;
    background: rgba(42,50,113, .68);
    color: #6cacc5;
    font-size: 18px;
    cursor: pointer;
    transition-duration: .3s;

    &:hover {
        transform: scale(1.1);
    }
`;

export const CheckStyle = styled('input')`
    width: 1.8rem;
    height: 1.8rem;
    border: 2px solid #999;
    border-radius: 10px;
    cursor: pointer;
    appearance: none;

    transition-property: transform;

    &:hover {
        transform: scale(1.2);

        + .tooltip {
            width: 32px;
            top: -38px;
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
            text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.1);
            background: rgba(42,50,113, .9);
            color: #c97874;

            &::before {
                left: 35%;
            }
        }
    }

    &:checked {
        border-color:#34b93d;
    
        &::after{
            height: 25px;
            -moz-animation: dothabottomcheck .2s ease 0s forwards;
            -o-animation: dothabottomcheck .2s ease 0s forwards;
            -webkit-animation: dothabottomcheck .2s ease 0s forwards;
            animation: dothabottomcheck .2s ease 0s forwards;
        }
        
        &::before{
            height: 60px;
            -moz-animation: dothatopcheck .4s ease 0s forwards;
            -o-animation: dothatopcheck .4s ease 0s forwards;
            -webkit-animation: dothatopcheck .4s ease 0s forwards;
            animation: dothatopcheck .4s ease 0s forwards;
        }

        + .check-box {
            border-color:#34b93d;
    
            &::after{
                height: 25px;
                -moz-animation: dothabottomcheck .2s ease 0s forwards;
                -o-animation: dothabottomcheck .2s ease 0s forwards;
                -webkit-animation: dothabottomcheck .2s ease 0s forwards;
                animation: dothabottomcheck .2s ease 0s forwards;
            }
            
            &::before{
                height: 60px;
                -moz-animation: dothatopcheck .4s ease 0s forwards;
                -o-animation: dothatopcheck .4s ease 0s forwards;
                -webkit-animation: dothatopcheck .4s ease 0s forwards;
                animation: dothatopcheck .4s ease 0s forwards;
            }
        }
    }

    @-moz-keyframes dothabottomcheck{
      0% { height: 0; }
      100% { height: 24px; }
    } 
    @-webkit-keyframes dothabottomcheck{
      0% { height: 0; }
      100% { height: 24px; }
    }
    @keyframes dothabottomcheck{
      0% { height: 0; }
      100% { height: 24px;  }
    }
    @keyframes dothatopcheck{
      0% { height: 0; }
      50% { height: 0; }
      100% { height: 50px; }
    }
    @-webkit-keyframes dothatopcheck{
      0% { height: 0; }
      50% { height: 0; }
      100% { height: 50px; }
    }
    @-moz-keyframes dothatopcheck{
      0% { height: 0; }
      50% { height: 0; }
      100% { height: 50px; }
    }
`;

export const LabelStyle = styled('label')`
    height: 50px;
    width: 50px;
    background-color: transparent;
    border: 10px solid #000;
    border-radius: 5px;
    position: relative;
    display: inline-block;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -moz-transition: border-color ease .2s;
    -o-transition: border-color ease .2s;
    -webkit-transition: border-color ease .2s;
    transition: border-color ease .2s;
    cursor:pointer;

    &::before, &::after {
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        position: absolute;
        height: 0;
        width: 10px;
        background-color: #34b93d;
        display: inline-block;
        -moz-transform-origin: left top;
        -ms-transform-origin: left top;
        -o-transform-origin: left top;
        -webkit-transform-origin: left top;
        transform-origin: left top;
        border-radius: 5px;
        content: ' ';
        -webkit-transition: opacity ease .5;
        -moz-transition: opacity ease .5;
        transition: opacity ease .5;
    }

    &::before {
        top: 57px;
        left: 28px;
        /* box-shadow: 0 0 0 5px #667788; */
        -moz-transform: rotate(-135deg);
        -ms-transform: rotate(-135deg);
        -o-transform: rotate(-135deg);
        -webkit-transform: rotate(-135deg);
        transform: rotate(-135deg);
    }

    &::after {
        top: 38px;
        left: 8px;
        -moz-transform: rotate(-45deg);
        -ms-transform: rotate(-45deg);
        -o-transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
    }

    .checked {
        border-color:#34b93d;
    
        &::after{
            height: 25px;
            -moz-animation: dothabottomcheck .2s ease 0s forwards;
            -o-animation: dothabottomcheck .2s ease 0s forwards;
            -webkit-animation: dothabottomcheck .2s ease 0s forwards;
            animation: dothabottomcheck .2s ease 0s forwards;
        }
        
        &::before{
            height: 60px;
            -moz-animation: dothatopcheck .4s ease 0s forwards;
            -o-animation: dothatopcheck .4s ease 0s forwards;
            -webkit-animation: dothatopcheck .4s ease 0s forwards;
            animation: dothatopcheck .4s ease 0s forwards;
        }
    }

    @-moz-keyframes dothabottomcheck{
      0% { height: 0; }
      100% { height: 24px; }
    } 
    @-webkit-keyframes dothabottomcheck{
      0% { height: 0; }
      100% { height: 24px; }
    }
    @keyframes dothabottomcheck{
      0% { height: 0; }
      100% { height: 24px;  }
    }
    @keyframes dothatopcheck{
      0% { height: 0; }
      50% { height: 0; }
      100% { height: 50px; }
    }
    @-webkit-keyframes dothatopcheck{
      0% { height: 0; }
      50% { height: 0; }
      100% { height: 50px; }
    }
    @-moz-keyframes dothatopcheck{
      0% { height: 0; }
      50% { height: 0; }
      100% { height: 50px; }
    }
`;

export const SelectStyle = styled('select')`    
    padding: 10px 5px;
    border: none;
    border-radius: 10px;
    background: #231f50;
    color: #6cacc5;
    font-size: 18px;
    cursor: pointer;

    &:hover {
        + .tooltip {
            width: 45px;
            top: -35px;
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
            text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.1);
            background: rgba(42,50,113, .9);
            color: #c97874;

            &::before {
                left: 30%;
            }
        }
    }
`;

export const ToolTipStyle = styled('div')`
    position: absolute;
    top: 0;
    height: 25px;
    font-size: 11px;
    font-weight: bold;
    background: rgba(42,50,113, .9);
    color: #c97874;
    padding: 5px 8px;
    border-radius: 10px;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    z-index: -1;

    &::before {
        position: absolute;
        content: "";
        height: 8px;
        width: 8px;
        background: rgba(42,50,113, .9);
        bottom: -3px;
        left: 32%;
        transform: translate(-50%) rotate(45deg);
        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
`;
