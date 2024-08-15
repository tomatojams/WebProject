import { Adapter } from "next-auth/adapters";
import mysql from "mysql2/promise";

const dbClient = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

export const MySQLAdapter = () => {
  return {
    async getUser(id) {
      const [rows] = await dbClient.query("SELECT * FROM users WHERE id = ?", [
        id,
      ]);
      return rows[0] || null;
    },
    async getUserByEmail(email) {
      const [rows] = await dbClient.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );
      return rows[0] || null;
    },
    async getUserByAccount({ provider, providerAccountId }) {
      const [rows] = await dbClient.query(
        "SELECT users.* FROM users JOIN accounts ON users.id = accounts.userId WHERE accounts.provider = ? AND accounts.providerAccountId = ?",
        [provider, providerAccountId]
      );
      return rows[0] || null;
    },
    async createUser(data) {
      const [result] = await dbClient.query(
        "INSERT INTO users (id, name, email) VALUES (?, ?, ?)",
        [data.id, data.name, data.email]
      );
      return { id: result.insertId, ...data };
    },
    async updateUser(data) {
      await dbClient.query(
        "UPDATE users SET name = ?, email = ? WHERE id = ?",
        [data.name, data.email, data.id]
      );
      return data;
    },
    async deleteUser(userId) {
      await dbClient.query("DELETE FROM users WHERE id = ?", [userId]);
    },
    async linkAccount(account) {
      await dbClient.query(
        "INSERT INTO accounts (id, userId, type, provider, providerAccountId) VALUES (?, ?, ?, ?, ?)",
        [
          account.id,
          account.userId,
          account.type,
          account.provider,
          account.providerAccountId,
        ]
      );
    },
    async unlinkAccount({ provider, providerAccountId }) {
      await dbClient.query(
        "DELETE FROM accounts WHERE provider = ? AND providerAccountId = ?",
        [provider, providerAccountId]
      );
    },
    async createSession(session) {
      const [result] = await dbClient.query(
        "INSERT INTO sessions (id, userId, expires) VALUES (?, ?, ?)",
        [session.id, session.userId, session.expires]
      );
      return { id: result.insertId, ...session };
    },
    async getSession(sessionToken) {
      const [rows] = await dbClient.query(
        "SELECT * FROM sessions WHERE id = ?",
        [sessionToken]
      );
      return rows[0] || null;
    },
    async updateSession(session) {
      await dbClient.query("UPDATE sessions SET expires = ? WHERE id = ?", [
        session.expires,
        session.id,
      ]);
      return session;
    },
    async deleteSession(sessionToken) {
      await dbClient.query("DELETE FROM sessions WHERE id = ?", [sessionToken]);
    },
    async createVerificationRequest({ identifier, token, expires }) {
      await dbClient.query(
        "INSERT INTO verificationRequests (id, identifier, token, expires) VALUES (?, ?, ?, ?)",
        [token, identifier, token, expires]
      );
    },
    async getVerificationRequest({ identifier, token }) {
      const [rows] = await dbClient.query(
        "SELECT * FROM verificationRequests WHERE identifier = ? AND token = ?",
        [identifier, token]
      );
      return rows[0] || null;
    },
    async deleteVerificationRequest({ identifier, token }) {
      await dbClient.query(
        "DELETE FROM verificationRequests WHERE identifier = ? AND token = ?",
        [identifier, token]
      );
    },
  };
};
