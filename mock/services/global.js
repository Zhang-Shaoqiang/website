import { mock } from "mockjs";
export default {
  "POST /mdb/query/treeInfo": function(req, res) {
    return res.json({
      success: true,
      code: "sucecess",
      message: "查询所有模型组基本信息成功",
      data: mock([
        {
          code: `@increment(1)`,
          parentCode: `@increment(1)`,
          level: 1,
          isLeaf: 0,
          name: "京东集团",
          "children|1-5": [
            {
              code: `@increment(1)`,
              parentCode: `@increment(1)`,
              level: 2,
              isLeaf: 0,
              name: "@ctitle",
              "children|5-10": [
                {
                  code: `@increment(1)`,
                  parentCode: `@increment(1)`,
                  level: 3,
                  isLeaf: 0,
                  name: "@ctitle",
                },
              ],
            },
          ],
        },
      ]),
    });
  },
  "POST /workspace/current": function(req, res) {
    return res.json({
      success: true,
      code: "success",
      data: mock([
        {
          id: 1,
          name: "预算空间",
        },
        {
          id: 2,
          name: "资债空间",
        },
        {
          id: 3,
          name: "人资空间",
        },
        {
          id: 4,
          name: "产研空间",
        },
        {
          id: 5,
          name: "bsun_测试",
        },
      ]),
      message: "",
    });
  },
  "POST /workspace/erpCurrent": function(req, res) {
    return res.json({
      success: true,
      code: "success",
      data: mock({
        id: 2,
        erp: "huyi23",
        name: "资债空间",
      }),
      message: "",
    });
  },
  "POST /workspace/setUpCurrent": function(req, res) {
    const { defaultOrNotSpace, workspaceId } = req.body;
    return res.json({
      success: true,
      code: "success",
      data: {
        defaultOrNotSpace,
        workspaceId,
      },
      message: "",
    });
  },
};
