import type { Person } from "@/types";

/**
 * 특정 플레이어(name)의 티어(level)를 변경한 새 배열을 반환한다.
 * 대상이 없으면 변경 없이 원본과 동일한 내용의 새 배열을 반환한다.
 */
export function movePersonToLevel(
  people: Person[],
  name: string,
  level: number
): Person[] {
  if (!name) {
    throw new Error("name은 필수값입니다.");
  }
  if (!Number.isInteger(level)) {
    throw new Error("level은 정수여야 합니다.");
  }
  return people.map((p) => (p.name === name ? { ...p, level } : p));
}

/** 초기 데이터로 되돌린 깊은 복사본을 반환한다. */
export function resetPeople(initial: Person[]): Person[] {
  return initial.map((p) => ({ ...p }));
}

/** 특정 level에 속한 사람만 필터링한다. */
export function groupByLevel(people: Person[], level: number): Person[] {
  return people.filter((p) => p.level === level);
}
