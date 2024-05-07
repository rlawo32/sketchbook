import { NextResponse } from "next/server";

// app 폴더 위에 api 폴더 생성 후 원하는 api용 폴더 이름 생성, route.ts 파일로 api 소스 작성

export async function POST(request: Request) {
    return NextResponse.json({ message: 'Hello from Next.js!' })
}
