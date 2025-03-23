'use client'

import { useEffect, useState } from "react";
import styled from "styled-components";

const PageStyle = styled('div')`
    position: relative;

    .main_container {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        width: 410px;
        height: 410px;
        color: #ffffff;

        .item_tile {
            width: calc(100% / 2);
            height: calc(100% / 2);
            border: 1px solid red;
        }

        .item_tile.on {
            background-color: green;
        }
    }
`


const Page = () => {

    const [testArr, setTestArr] = useState<number[]>([]);
    const [memoryArr, setMemoryArr] = useState<{key:number, value:number}[]>([]);

    const randomTile = () => {
        const container:HTMLElement|null = document.getElementById('main_container');
        const itemBoxList:HTMLCollection|undefined = container?.children;
        let random:number = Math.floor(Math.random() * (10 - 6));

        setMemoryArr(prev => [...prev, {key:memoryArr.length+1, value:random}]);

        if(!!itemBoxList) {
            for(let i=0; i<itemBoxList.length; i++) {
                const itemBox:Element = itemBoxList[i];
                itemBox.classList.remove('on');
            }
            setTimeout(() => {
                for(let i=0; i<itemBoxList.length; i++) {
                    const itemBox:Element = itemBoxList[i];
                    if(itemBox.classList.contains(`item_tile_${random}`) === true) {
                        itemBox.classList.add('on');
                    } else {
                        itemBox.classList.remove('on');
                    }
                }
            }, 500);
        }
        console.log(random);
    }

    const createTile = ():any => {
        const result:any[] = [];

        for(let i=0; i<4; i++) {
            result.push(<div className={`item_tile item_tile_${i}`} key={i}></div>);
        }

        return result;
    }

    useEffect(() => {
        let interval = setInterval(() => {
            randomTile();
        }, 1000);
        setTimeout(() => {
            clearInterval(interval);
        }, 10000);
    }, [])

    useEffect(() => {
        console.log(memoryArr);
        console.log(memoryArr.length);
    }, [memoryArr])

    return (
        <PageStyle>
            <div id="main_container" className="main_container">
                {createTile()}
            </div>
        </PageStyle>
    )
}

export default Page;