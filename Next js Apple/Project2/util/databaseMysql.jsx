import mysql from "mysql2/promise";

let dbConnection;

const initDbConnection = async () => {
  if (!dbConnection) {
    try {
      dbConnection = await mysql.createConnection({
        host: process.env.DB_HOST || "",
        user: process.env.DB_USER || "",
        password: process.env.DB_PASSWORD || "",
        database: process.env.DB_NAME || "",
        port: 3307,
      });
      console.log("Database connected successfully");
    } catch (err) {
      console.error("Database connection failed:", err);
      throw err;
    }
  }
  return dbConnection;
};

export { initDbConnection };
