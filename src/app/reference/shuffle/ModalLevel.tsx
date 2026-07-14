"use client";

import { useCallback, useState } from "react";
import type { CSSProperties, DragEvent } from "react";
import { initialData, tiers } from "@/lib/tierData";
import { movePersonToLevel, resetPeople } from "@/lib/tierLogic";
import type { Person } from "@/types";
import styled from "styled-components";

const ModalLevelStyle = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  padding: 32px;
  background: #0a0e16;
  color: #e7e9ee;

  .level_title {
    font-size: 19px;
    font-weight: 600;
    margin: 0 0 4px;
    letter-spacing: 0.2px;
  }

  .level_desc {
    margin: 0 0 24px;
    color: #6b7688;
    font-size: 13px;
  }

  .level_board {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 820px;
  }

  .level_section {
    display: flex;
    align-items: center;
    gap: 16px;
    background: #11151f;
    border: 1px solid #1e2430;
    border-left: 3px solid #3b82f6;
    border-radius: 8px;
    min-height: 98px;
    padding: 10px 16px;
    transition: background 0.15s, border-color 0.15s;
  }

  .level_section.dragover {
    background: #161c29;
    border-color: #3b82f6;
  }

  .level_label {
    flex: 0 0 96px;
    font-weight: 600;
    font-size: 13.5px;
    color: #3b82f6;
    letter-spacing: 0.2px;
  }

  .level_drop {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    min-height: 28px;
  }

  .level_box {
    padding: 5px 12px;
    background: #1a2030;
    border: 1px solid #2a3242;
    border-radius: 6px;
    font-size: 12.5px;
    color: #e7e9ee;
    cursor: grab;
    user-select: none;

    &:hover {
      border-color: #3a4356;
    }

    &:active {
      cursor: grabbing;
    }
  }

  .button_section {
    max-width: 620px;
    margin-top: 18px;

    button {
      border: 1px solid #1e2430;
      background: #11151f;
      color: #6b7688;
      padding: 8px 14px;
      border-radius: 7px;
      font-size: 12.5px;
      cursor: pointer;

      &:hover {
        color: #e7e9ee;
        border-color: #3a4356;
      }
    }
  }
`;

const ModalLevel = () => {
  const [people, setPeople] = useState<Person[]>(initialData);
  const [dragOverLevel, setDragOverLevel] = useState<number | null>(null);

  const handleDrop = useCallback((level: number) => (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOverLevel(null);
    try {
      const name = e.dataTransfer.getData("text/plain");
      if (!name) return;
      setPeople((prev) => movePersonToLevel(prev, name, level));
    } catch (err) {
      console.error("드래그 드랍 처리 중 오류:", err);
    }
  }, []);

  const handleDragStart = (name: string) => (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", name);
  };

  const handleReset = () => setPeople(resetPeople(initialData));

  return (
    <ModalLevelStyle>
      <h1 className="level_title">티어 배치</h1>
      <p className="level_desc">
        플레이어 이름을 드래그해서 티어를 지정하세요.
      </p>

      <div className="level_board">
        {tiers.map((data) => (
          <div
            key={data.level}
            className={`level_section ${
              dragOverLevel === data.level ? "dragover" : ""
            }`}
            style={{ borderColor: data.color, borderLeft: `3px solid ${data.color}` } as CSSProperties}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOverLevel(data.level);
            }}
            onDragLeave={() => setDragOverLevel(null)}
            onDrop={handleDrop(data.level)}
          >
            <div className="level_label" style={{ color: data.color } as CSSProperties}>{data.name}</div>
            <div className="level_drop">
              {people
                .filter((p) => p.level === data.level)
                .map((p) => (
                  <div
                    key={p.name}
                    className="level_box"
                    draggable
                    onDragStart={handleDragStart(p.name)}
                  >
                    {p.name}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      <div className="button_section">
        <button type="button" onClick={handleReset}>
          초기 데이터로 리셋
        </button>
      </div>
    </ModalLevelStyle>
  );
}

export default ModalLevel;
