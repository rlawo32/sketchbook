import styled from "styled-components";

export const FadeUp1 = styled('div')<{$timing:number}>`
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

export const FadeUp2 = styled('div')<{$timing:number}>`
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

export const InputStyle = styled('input')`
    min-heigth: 100px;
    width: 250px;
    margin: 5px;
    padding: 10px 20px;
    border: none;
    border-radius: 15px;
    background: rgba(42,50,73, .68);
    color: #6cacc5;
    font-size: 24px;
    outline: 0;
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
    width: 1.5rem;
    height: 1.5rem;
    border: 2px solid #999;
    border-radius: 10px;
    outline: 0;
    cursor: pointer;
    appearance: none;

    transition-property: transform;

    &:hover {
        transform: scale(1.2);

        + .tooltip {
            top: -35px;
            opacity: 1;
            visibility: visible;
            pointer-events: auto;
            text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.1);
            background: #231f50;
            color: #6cacc5;
        }
    }

    &:checked {
        background-color: gray;
    }
`;

export const ToolTipStyle = styled('div')`
    position: absolute;
    top: 0;
    height: 25px;
    width: 65px;
    font-size: 11px;
    font-weight: bold;
    background: #231f50;
    color: #6cacc5;
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
        background: #231f50;
        bottom: -3px;
        left: 20%;
        transform: translate(-50%) rotate(45deg);
        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
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
`;