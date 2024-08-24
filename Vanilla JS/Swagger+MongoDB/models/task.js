// Mongoose 모듈을 가져옵니다. Mongoose는 MongoDB와의 연결 및 데이터 모델을 정의하는 데 사용됩니다.
const mongoose = require("mongoose");

// Mongoose 스키마를 정의합니다. 스키마는 MongoDB 문서의 구조를 정의합니다.
const taskSchema = new mongoose.Schema(
  {
    task: { type: String, required: true },

    isComplete: { type: Boolean, required: true, default: false },
  },
  // 스키마 옵션: 문서의 생성 및 수정 시간을 자동으로 저장
  { timestamps: true }
);

// 스키마를 기반으로 모델을 생성합니다.
// 'Task'라는 이름의 모델을 생성(테이블은 tasks)하며, 이 모델은 'taskSchema'를 사용하여 MongoDB의 'tasks' 컬렉션과 상호작용합니다.
const TaskModel = mongoose.model("Task", taskSchema);

// 생성한 모델을 다른 파일에서 사용할 수 있도록 내보냅니다.
module.exports = TaskModel;
