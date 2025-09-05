'use client'

import * as Style from "./page.style";

import { useEffect, useState } from "react";
import { DndContext, MeasuringStrategy, MouseSensor, TouchSensor, UniqueIdentifier, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Item from "./item";

const Dnd = () => {

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor)
    );

    const [playerCount, setPlayerCount] = useState<number>(10);
    const [teamCount, setTeamCount] = useState<number>(2);

    const [teams, setTeams] = useState<{id:number, idx:number, lv:number, nm:string}[][]>([[]]);
    const [copyTeams, setCopyTeams] = useState<{id:number, idx:number, lv:number, nm:string}[][]>([[]]);

    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

    const createTeam = () => {
        setTeams([
            [
                {id:0, idx:0, lv:5, nm:'A'}, 
                {id:1, idx:1, lv:5, nm:'B'}, 
                {id:2, idx:2, lv:4, nm:'C'}, 
                {id:3, idx:3, lv:3, nm:'D'}, 
                {id:4, idx:4, lv:2, nm:'E'}
            ],
            [
                {id:5, idx:5, lv:5, nm:'F'}, 
                {id:6, idx:6, lv:4, nm:'G'}, 
                {id:7, idx:7, lv:4, nm:'H'}, 
                {id:8, idx:8, lv:3, nm:'I'}, 
                {id:9, idx:9, lv:3, nm:'J'}
            ]
        ]);
    }

    useEffect(() => {
        createTeam();
    }, [])

    return (
        <Style.DndStyle>
            <DndContext
                sensors={sensors}
                measuring={{
                    droppable: {
                        strategy: MeasuringStrategy.Always,
                    },
                }}
                onDragStart={({active}) => {
                    setActiveId(active.id);
                    setCopyTeams(teams);
                }}
                onDragOver={({active, over}) => {
                    const overId = over?.id;

                    if (overId == null || overId === 'void' || teams.some(team => team.some(player => player.id === active.id))) {
                        return;
                    }

                    // 아래 수정 필요 (깃허브 참고 https://github.com/clauderic/dnd-kit/blob/e9215e820798459ae036896fce7fd9a6fe855772/stories/2%20-%20Presets/Sortable/MultipleContainers.tsx#L266)
                    const overContainer = teams.some(team => team.some(player => player.id === overId));
                    const activeContainer = teams.some(team => team.some(player => player.id === active.id));

                    if (!overContainer || !activeContainer) {
                        return;
                    }

                    let overArrNo:number = 0;
                    let activeArrNo:number = 0;
                    
                    if (activeContainer !== overContainer) {
                        for(let i:number=0; i<teams.length; i++) {
                            for(let j:number=0; j<teams[i].length; j++) {
                                if(teams[i][j].id === active.id) {
                                    overArrNo = i;
                                }
                                if(teams[i][j].id === overId) {
                                    activeArrNo = i;
                                }
                            }
                        }
                        
                        if(active.id !== overId) {
                            if(overArrNo !== activeArrNo) {
                                const oldIndex = copyTeams[overArrNo].findIndex((item) => item.id === active.id);
                                const newIndex = copyTeams[activeArrNo].findIndex((item) => item.id === overId);
                                const [movedItem1] = copyTeams[overArrNo].splice(oldIndex, 1);
                                const [movedItem2] = copyTeams[activeArrNo].splice(newIndex, 1);
                                copyTeams[activeArrNo].splice(newIndex, 0, movedItem1);
                                copyTeams[overArrNo].splice(oldIndex, 0, movedItem2);
                                setTimeout(() => {
                                    return setTeams(copyTeams);
                                }, 50);
                            } else {
                                const oldIndex = copyTeams[overArrNo].findIndex((item) => item.id === active.id);
                                const newIndex = copyTeams[overArrNo].findIndex((item) => item.id === overId);

                                const [movedItem] = copyTeams[overArrNo].splice(oldIndex, 1);
                                copyTeams[overArrNo].splice(newIndex, 0, movedItem);
                                setTimeout(() => {
                                    return setTeams(copyTeams);
                                }, 50);
                            }
                        }
                    }
                    
                }}
            >
                <SortableContext
                    items={teams.flat().map(item => item.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="list_section">
                        {teams.map((parent, idx1) => (
                            <div key={idx1 + "_h"} className="list_wrap" id={parent.length + "_t"}>
                                <div className="list_parent">
                                    {idx1 === 0 ? 
                                        <div className="team_camp team_blue">
                                            &nbsp;&nbsp;TeamBlue
                                        </div> 
                                        : 
                                        <div className="team_camp team_red">
                                            &nbsp;&nbsp;TeamRed
                                        </div>
                                    }
                                    {parent.map((child, idx2) => (
                                        <Item key={child.id} id={child.id} idx={child.idx} lv={child.lv} nm={child.nm} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </Style.DndStyle>
    )
}

export default Dnd;
