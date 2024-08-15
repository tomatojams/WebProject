import { NextResponse } from "next/server";

export function middleware(request) {
  // console.log("User Request info");
  // console.log("URL:", request.nextUrl); // 유저가 요청한 URL
  // console.log("COOKIE:", request.cookies);
  // console.log("HEADERS:", request.headers.get("user-agent")); // headers 정보 - 이전방문페이지, 사용중 OS, 브라우저, 선호언어, IP, 쿠키
  // NextResponse.next(); //통과
  // NextResponse.redirect() // 다른페이지로 강제이동
  // NextResponse.rewrite() // 다른페이지 이동 현재URL  유지

  // list 페이지 접속시 시간 유저정보 출력

  if (request.nextUrl.pathname.startsWith("/list")) {
    console.log(new Date());
    // console.log(request.body);
    // console.log(request.headers.get("sce-ch-ua-platform"));
    return NextResponse.next();
  }

  // 미로그인 유저/ write 접속시 로그인 페이지로
}
