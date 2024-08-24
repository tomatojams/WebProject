const express = require("express");
// Express의 라우터 객체를 생성합니다. 라우터는 특정 경로에 대한 요청을 처리하는 핸들러를 정의합니다.
const router = express.Router();
// Task 모델을 가져옵니다. 이 모델은 MongoDB의 'tasks' 컬렉션과 상호작용
const Task = require("../models/task");

// POST /tasks 엔드포인트를 정의합니다. 새로운 태스크를 생성합니다.
router.post("/tasks", async (req, res) => {
  try {
    const { task, isComplete } = req.body;

    // 새로운 Task 인스턴스를 생성합니다. 'task'와 'isComplete'는 요청 본문에서 가져옵니다.
    const newTask = new Task({ task, isComplete });

    // 생성된 태스크를 MongoDB에 저장
    await newTask.save();
    return res.status(200).json({ status: "ok", data: newTask });
  } catch (error) {
    res.status(400).json({ status: "fail", error });
  }
});

router.get("/tasks", async (req, res) => {
  try {
    // MongoDB에서 모든 태스크를 조회
    const tasks = await Task.find();
    return res.status(200).json({ status: "ok", data: tasks });
  } catch (error) {
    res.status(400).json({ status: "fail", error });
  }
});

// 정의한 라우터를 모듈로 내보내어 다른 파일에서 사용할 수 있도록 합니다.
module.exports = router;
