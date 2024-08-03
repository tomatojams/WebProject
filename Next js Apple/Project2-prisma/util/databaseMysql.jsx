// 연결 풀 사용: mysql.createPool을 사용하여 연결 풀을 생성하고,
//이를 통해 연결을 효율적으로 관리합니다.
// 연결 자동 관리: pool.query()를 사용하여 쿼리를 실행하고,
//연결을 자동으로 관리합니다.따라서 연결을 수동으로 닫을 필요가 없습니다.

import mysql from "mysql2/promise";

let pool;

const initDbConnection = () => {
  if (!pool) {
    // createConnetion이 아니라 Pool을 쓴다
    pool = mysql.createPool({
      host: process.env.DB_HOST || "",
      user: process.env.DB_USER || "",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "",
      port: 3307,
      waitForConnections: true,
      connectionLimit: 10, // 최대 연결 수 설정
      queueLimit: 0,
    });
    console.log("Database pool created successfully");
  }
  return pool;
};

export { initDbConnection };
