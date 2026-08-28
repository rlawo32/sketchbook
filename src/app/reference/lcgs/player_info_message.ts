export type MessageFlag = "S" | "P" | "N" | "W" | "D";

export interface InfoMessage {
    message: string;
    flag: MessageFlag;
}

export function championInfoMessage(
    kill: number,
    death: number,
    assist: number,
    win: number,
    lose: number
): InfoMessage[] {
    const games = win + lose;
    if (games < 5) { return []; }

    // KDA 계산
    // Death가 0이면 KDA를 무한대로 취급
    const kda = death === 0
        ? kill + assist
        : (kill + assist) / death;

    const winRate = (win / games) * 100;

    const messages: InfoMessage[] = [];

    // ==========================================
    // 매우 긍정적 S
    // ==========================================

    if (games >= 6 && kda >= 5.0 && winRate >= 60) {
        messages.push({
            message: "지배자",
            flag: "S"
        });
    }
    else if (games >= 6 && kda >= 4.0 && winRate >= 65) {
        messages.push({
            message: "장인",
            flag: "S"
        });
    }
    else if (games >= 5 && winRate >= 75) {
        messages.push({
            message: "필승픽",
            flag: "S"
        });
    }

    // ==========================================
    // 긍정적 P
    // ==========================================

    else if (games >= 6 && kda >= 3.5 && winRate >= 55) {
        messages.push({
            message: "강자",
            flag: "P"
        });
    }
    else if (games >= 6 && winRate >= 65 && kda >= 2.0) {
        messages.push({
            message: "승리 제조기",
            flag: "P"
        });
    }
    else if (games >= 6 && kda >= 2.5 && winRate >= 55) {
        messages.push({
            message: "안정픽",
            flag: "P"
        });
    }

    // ==========================================
    // 보통 N
    // ==========================================

    else if (games >= 8 && winRate >= 45 && winRate <= 55) {
        messages.push({
            message: "반반드림",
            flag: "N"
        });
    }
    else if (games >= 6 && kda >= 2.0 && winRate >= 50) {
        messages.push({
            message: "든든픽",
            flag: "N"
        });
    }

    // ==========================================
    // 부정적 W
    // ==========================================

    else if (games >= 6 && kda >= 4.0 && winRate < 50) {
        messages.push({
            message: "팀운나쁨",
            flag: "W"
        });
    }
    else if (games >= 4 && kda < 2.0 && winRate < 40) {
        messages.push({
            message: "불안한 픽",
            flag: "W"
        });
    }
    else if (games >= 4 && kda < 1.5 && winRate < 50) {
        messages.push({
            message: "패배 원인",
            flag: "W"
        });
    }

    // ==========================================
    // 매우 부정적 D
    // ==========================================

    if (games >= 4 && kda < 1.5 && winRate < 35) {
        messages.push({
            message: "봉인 권장",
            flag: "D"
        });
    }

    return messages;
}

export function relativeInfoMessage(
    win: number,
    lose: number,
    total: number
): InfoMessage[] {

    const games = win + lose;

    if (games < 5 || total <= 0) {
        return [];
    }

    const winRate = (win / games) * 100;
    const encounterRate = (games / total) * 100;

    const messages: InfoMessage[] = [];

    // ==========================================
    // 관계 평가
    // ==========================================

    if (games >= 10 && winRate >= 80) {
        messages.push({
            message: "압살",
            flag: "S"
        });
    }
    else if (games >= 8 && winRate >= 70) {
        messages.push({
            message: "우세",
            flag: "S"
        });
    }
    else if (games >= 5 && winRate >= 60) {
        messages.push({
            message: "한.수.위.",
            flag: "P"
        });
    }
    // else if (games >= 15 && winRate >= 40 && winRate <= 60) {
    //     messages.push({
    //         message: "숙적",
    //         flag: "N"
    //     });
    // }
    else if (games >= 15 && winRate >= 40 && winRate <= 60) {
        messages.push({
            message: "라이벌",
            flag: "N"
        });
    }
    else if (games >= 10 && winRate <= 20) {
        messages.push({
            message: "벽",
            flag: "D"
        });
    }
    else if (games >= 8 && winRate <= 30) {
        messages.push({
            message: "압도적 열세",
            flag: "D"
        });
    }
    else if (games >= 5 && winRate <= 40) {
        messages.push({
            message: "상성 불리",
            flag: "W"
        });
    }

    // ==========================================
    // 만남 빈도
    // ==========================================

    if (encounterRate >= 20) {
        messages.push({
            message: "숙명의 상대",
            flag: "P"
        });
    }
    else if (encounterRate >= 15) {
        messages.push({
            message: "단골",
            flag: "N"
        });
    }
    else if (encounterRate >= 10) {
        messages.push({
            message: "자주 마주침",
            flag: "N"
        });
    }

    return messages;
}
