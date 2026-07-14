import type { Person, TierInfo } from "@/types";

// 초기 플레이어 데이터. 실제 사용 시 API/DB에서 불러오도록 교체하세요.
export const initialData: Person[] = [
  { name: "김민준", level: 5 },
  { name: "이서연", level: 5 },
  { name: "박도윤", level: 4 },
  { name: "최지우", level: 4 },
  { name: "정하은", level: 3 },
  { name: "강서준", level: 3 },
  { name: "조유나", level: 2 },
  { name: "윤시우", level: 2 },
  { name: "임채원", level: 1 },
  { name: "한지호", level: 1 },
];

// 티어 정의 (레벨 5 = 최상위 ~ 레벨 1 = 최하위)
export const tiers: TierInfo[] = [
  { level: 4, name: "다이아몬드", color: "#576bce" },
  { level: 5, name: "에메랄드", color: "#248858" },
  { level: 3, name: "플래티넘", color: "#4e9996" },
  { level: 2, name: "골드", color: "#cd8837" },
  { level: 1, name: "실버", color: "#80989d" },
];
