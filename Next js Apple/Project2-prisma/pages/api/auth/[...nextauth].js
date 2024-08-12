// JWT 방식

import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    // 방식설정 리스트에 추가 구글도 추가가능

    GithubProvider({
      clientId: process.env.git_client_id,
      clientSecret: process.env.git_client_secret,
    }),
  ],
  secret: process.env.jwt_secret,
};
export default NextAuth(authOptions);

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
