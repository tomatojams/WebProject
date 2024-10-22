import csrf from "csurf";

const csrfProtection = csrf({ cookie: true });

export default async function handler(req, res) {
  try {
    await csrfProtection(req, res, () => {
      res.status(200).json({ csrfToken: req.csrfToken() });
    });
  } catch (error) {
    res.status(500).json({ message: "CSRF 토큰을 가져오는데 실패했습니다." });
  }
}
