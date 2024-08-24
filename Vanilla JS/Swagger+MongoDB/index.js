const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Router = require("./routes/router");
const dotenv = require("dotenv");
// 파일 경로를 다루기 위한 path 모듈
const path = require("path");

// Swagger UI를 제공하기 위한 swagger-ui-express 모듈을 가져옵니다.
// YAML 파일을 읽기 위한 yamljs 모듈
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
dotenv.config();
const app = express();

// Swagger 문서 설정: Swagger UI에서 사용할 Swagger 문서를 로드합니다.
const swaggerSpec = YAML.load(path.join(__dirname, "build/swagger.yaml"));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors());

// Body-parser를 설정하여 URL 인코딩된 데이터와 JSON 데이터를 파싱할 수 있게 합니다.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 라우터를 애플리케이션에 등록합니다. 이 라우터는 API 경로와 핸들러를 정의합니다.
app.use("/", Router);

// MongoDB의 URI를 환경 변수에서 가져옵니다.
const mongoURI = process.env.MONGODB_LOCAL;

// Mongoose를 사용하여 MongoDB에 연결합니다.
mongoose
  .connect(mongoURI)
  .then(() => console.log("mongoose connected"))
  .catch((err) => console.log("db connect error", err));

// 서버가 실행될 포트 번호를 설정하고, 서버를 시작합니다.
const PORT = 9000;
app.listen(PORT, () => console.log(`server on http://localhost:${PORT}`));

// 뷰 폴더와 EJS 템플릿 엔진을 설정합니다. EJS는 서버 측에서 HTML을 렌더링하는 데 사용됩니다.
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

// 루트 경로에 대한 GET 요청이 오면 index.html 파일을 렌더링합니다.
app.get("/", (req, res) => {
  res.render("index.html");
});

// MySQL 데이터베이스 연결을 위한 mysql2 모듈을 가져옵니다.
const mysql = require("mysql2");

// MySQL 연결 풀을 생성합니다. 연결 풀은 데이터베이스 연결을 관리하여 성능을 향상시킵니다.
const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "1234",
  database: "forum",
  port: 3307,
});

// MySQL 데이터베이스에서 forum.member 테이블의 모든 데이터를 조회하는 GET 요청 라우트를 설정합니다.
app.get("/db", (req, res) => {
  pool.query("SELECT * FROM forum.member", (error, results, fields) => {
    if (error) {
      console.error("쿼리 실행 중 오류 발생:", error);
      res.status(500).send("데이터베이스 쿼리에 실패했습니다.");
      return;
    }
    res.json(results); // 쿼리 결과를 JSON 형식으로 반환합니다.
  });
});

// /api/users/:type 경로에 대한 GET 요청 핸들러가 정의되어 있지만, 핸들러 내용이 없습니다.
app.get("/api/users/:type");
