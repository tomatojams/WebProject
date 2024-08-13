// prisma db login + 깃허브 로그인 -session 방식

// 1. client 파일 2. model에 github에서 작성하는 모든 모델을 schema에 만들어야 한다.
// 그리고 migrate해서 연결이 가능하게
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.jwt_secret,
  providers: [
    GithubProvider({
      clientId: process.env.git_client_id,
      clientSecret: process.env.git_client_secret, //       clientSecret: process.env.git_client_secret,
    }),

    CredentialsProvider({
      //1. 로그인페이지 폼 자동생성해주는 코드
      name: "credentials",
      // email을 넣어도 됨
      credentials: {
        name: { label: "name", type: "text" },
        password: { label: "password", type: "password" },
      },

      //2. 로그인요청시 실행되는코드
      //직접 DB에서 아이디,비번 비교

      async authorize(credentials) {
        const user = await prisma.member.findUnique({
          where: {
            name: credentials.name,
          },
        });

        if (!user) {
          console.log("해당 아이디는 없음");
          return null;
        }
        const pwcheck = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!pwcheck) {
          console.log("비번틀림");
          return null;
        }
        return user;
      },
    }),
  ],

  //3. jwt 만료일설정
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, //1일
  },

  callbacks: {
    //4. jwt 제작
    //DB에서 가져와 토큰에 넣어줌
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {};
        token.user.name = user.name;
        token.user.email = user.email;
        // 유저의 역할등을 추가 가능
      }
      return token;
    },
    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    session: async ({ session, token }) => {
      // 토큰의 모든 정보를 세션에 보냄
      session.user = token.user;
      return session;
    },
  },
};

export default NextAuth(authOptions);

// prisma 깃허브 -session 방식

// 1. client 파일 2. model에 github에서 작성하는 모든 모델을 schema에 만들어야 한다.
// 그리고 migrate해서 연결이 가능하게
// import NextAuth from "next-auth";
// import GithubProvider from "next-auth/providers/github";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { prisma } from "@/lib/client";

// export const authOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GithubProvider({
//       clientId: process.env.git_client_id,
//       clientSecret: process.env.git_client_secret, //       clientSecret: process.env.git_client_secret,
//     }),
//   ],
// };
// export default NextAuth(authOptions);

// JWT 깃허브 토큰방식 - DB 사용안함

// import NextAuth from "next-auth";
// import GithubProvider from "next-auth/providers/github";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
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

// 몽고DB -깃허브 session 방식

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
