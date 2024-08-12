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

// // pages/api/auth/[...nextauth].js
// import NextAuth from "next-auth";
// import { SequelizeAdapter } from "@next-auth/sequelize-adapter";
// import sequelized from "@/lib/sequelize";

// export default NextAuth({
//   providers: [
//     // 인증 제공자 설정
//   ],
//   adapter: SequelizeAdapter(sequelized),
//   // 추가 설정
// });
