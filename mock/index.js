export default {
    "GET /api/currentUser": function (req, res) {
        const query = req.query || {};
        return res.json({
            success: true,
            data: {
                name: "Mr Zhang",
                avatar:
                    "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
                userid: "00000001",
            },
        });
    },
    "GET /api/list": function (req, res) {
        const query = req.query || {};
        return res.json({
            success: true,
            data: [
                {
                    username: "张三",
                    address: '北京',
                    date: "1993-12-03",
                    type: query.a
                },
                {
                    username: "李四",
                    address: '上海',
                    date: "1993-12-03",
                    type: query.a
                },
                {
                    username: "王五",
                    address: '广东',
                    date: "1993-12-03",
                    type: query.a
                },
                {
                    username: "马六",
                    address: '深圳',
                    date: "1993-12-03",
                    type: query.a
                },
            ],
        });
    },
    "GET /api/userinfo/:id": (req, res) => {
        return res.json({
            id: req.params.id,
            username: "kenny",
        });
    },
    "DELETE /api/user/:id": (req, res) => {
        // console.log(req.params.id);
        res.send({ status: "ok", message: "delete success!" });
    },
    "PUT /api/user/:id": (req, res) => {
        // console.log(req.params.id);
        // console.log(req.body);
        res.send({ status: "ok", message: "update success！" });
    },
    "POST /api/login/account": (req, res) => {
        const { password, username } = req.body;
        if (password === "888888" && username === "admin") {
            return res.json({
                status: "ok",
                token: "sdfsdfsdfdsf",
            });
        } else {
            return res.json({
                status: "error",
                code: 403,
            });
        }
    },
    "GET /api/login/outLogin": (req, res) => {
        res.send({ data: {}, success: true });
    },
};
