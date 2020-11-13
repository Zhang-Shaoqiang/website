import { mock } from "mockjs";
export default {
  "POST /common/getCurrentLoginUser": function (req, res) {
    return res.json({
      success: true,
      code: "sucecess",
      data: mock({
        email: "test@jd.com",
        fullname: "胡祎",
        userId: 1704910,
      }),
      message: "",
    });
  },
};
