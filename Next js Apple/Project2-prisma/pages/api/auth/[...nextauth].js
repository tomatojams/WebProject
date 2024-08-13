//JWT 방식

// import NextAuth from "next-auth";
// import GithubProvider from "next-auth/providers/github";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client"
// const prisma = new PrismaClient()
// export const authOptions = {
//   providers: [
//     // 방식설정 리스트에 추가 구글도 추가가능

//     GithubProvider({
//       clientId: process.env.git_client_id,
//       clientSecret: process.env.git_client_secret,
//     }),
//   ],
//   secret: process.env.jwt_secret,
//   // adapter: PrismaAdapter(prisma),
// };
// export default NextAuth(authOptions);

// prisma -session 방식

// 1. client 파일 2. model에 github에서 작성하는 모든 모델을 schema에 만들어야 한다.
// 그리고 migrate해서 연결이 가능하게
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/client";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.git_client_id,
      clientSecret: process.env.git_client_secret, //       clientSecret: process.env.git_client_secret,
    }),
  ],
};
export default NextAuth(authOptions);

// prisma -mongoDB 방식

// import NextAuth from "next-auth";
// import GithubProvider from "next-auth/providers/github";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { connectDB } from "@/util/databaseMongo";

// export const authOptions = {
//   adapter: PrismaAdapter(connectDB),
//   providers: [
//     GithubProvider({
//       clientId: process.env.git_client_id,
//       clientSecret: process.env.git_client_secret, //       clientSecret: process.env.git_client_secret,
//     }),
//   ],
// };
// export default NextAuth(authOptions);

// 몽고DB 활용 session 방식

// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// import NextAuth from "next-auth";
// import GithubProvider from "next-auth/providers/github";
// import { connectDB } from "@/util/databaseMongo";

// export const authOptions = {
//   providers: [
//     // 방식설정 리스트에 추가 구글도 추가가능

//     GithubProvider({
//       clientId: process.env.git_client_id,
//       clientSecret: process.env.git_client_secret,
//     }),
//   ],
//   secret: process.env.jwt_secret,
//   adapter: MongoDBAdapter(connectDB),
// };
// export default NextAuth(authOptions);
