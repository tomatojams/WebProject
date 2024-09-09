import express from 'express';
import { ObjectId } from 'mongodb';
// 기존 dirname을 사용하기 위한 세팅
import path from 'path';
const root = process.cwd();

const newRouter = (db) => {
  const router = express.Router();

  // 라우터에 메서드들을 추가
  router.get('/', (req, res) => {
    res.render('index.pug');
  });

  router.get('/about', (req, res) => {
    // path.join은 경로를 그냥 더하지 않고, 상대경로 변환을 해줌
    // 따라서../ 을 하면 상위폴더이동

    // __dirname과 root 둘다 되지만 sendFile은 별칭을 사용할수 없음
    res.sendFile(path.join(root, 'about.html'));
    // res.sendFile(path.join(root, "about.html"));
  });

  // 게시판
  router.get('/list', async (req, res) => {
    let result = await db.collection('post').find().toArray();
    res.render('list.pug', { post: result }); // 파일 object 대응
  });

  // 글쓰기 페이지
  router.get('/write', (req, res) => {
    res.render('write.pug');
  });

  // 상세
  router.get('/detail/:post_id', async (req, res) => {
    console.log(req.params);
    let id = req.params.post_id;

    try {
      const post = await db.collection('post').findOne({ _id: new ObjectId(id) });
      // 문자가 하나만 틀리면 에러가 아니라  null이 오게됨.
      if (post === null) {
        res.render('error.pug');
      }
      res.render('detail.pug', { postAlias: post });
      // 에러 처리
    } catch (e) {
      console.log(e);
      res.render('error.pug');
    }
  });

  router.get('/editpage/:post_id', async (req, res) => {
    console.log(req.params);
    let id = req.params.post_id;

    try {
      const post = await db.collection('post').findOne({ _id: new ObjectId(id) });
      // 문자가 하나만 틀리면 에러가 아니라  null이 오게됨.
      if (post === null) {
        res.render('error.pug');
      }
      res.render('edit.pug', { postAlias: post });
      // 에러 처리
    } catch (e) {
      console.log(e);
      res.render('error.pug');
    }
  });

  // 수정함
  router.post('/edit/:post_id', async (req, res) => {
    const { post_id } = req.params;
    const { title, content } = req.body;
    if (!title || !content) {
      res.status(400).send('제목이나 내용을 입력해주세요');
      return;
    }
    await db.collection('post').updateOne(
      {
        _id: new ObjectId(post_id), // 수정할 대상
      },
      {
        $set: { title: title, content: content }, // 수정할 값
      },
    );
    res.status(200).redirect('/list');
  });

  // 글을 올림
  router.post('/post', async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
      res.status(400).send('제목이나 내용을 입력해주세요');
      return;
    }
    await db.collection('post').insertOne({ title: title, content: content });
    res.status(200).redirect('/list');
  });

  //  메더스가 추가된 라우터를 반환
  return router;
};
export default newRouter;
