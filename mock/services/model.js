import { mock } from "mockjs";
export default {
  "GET /modelGroup/list": function(req, res) {
    const { page, pageSize } = req.query || {
      page: 1,
      pageSize: 10,
      creator: null,
    };
    return res.json({
      success: true,
      code: "sucecess",
      message: "查询所有模型组基本信息成功",
      data: mock({
        ["current|" + page]: 0,
        ["records|" + pageSize]: [
          {
            id: `@increment(1)`,
            name: "@ctitle",
            createdTime: "@now",
            creator: "@cname",
            deleted: 0,
            "status|1-2": 0,
            "type|1-3": 0,
            workspaceId: 2,
          },
        ],
        ["size|" + pageSize]: 0,
        "total|10-1000": 0,
      }),
    });
  },

  "POST /modelGroup/setGroupStatus": function(req, res) {
    return res.json({
      success: true,
      code: "sucecess",
      data: null,
      message: "",
    });
  },

  "GET /modelGroup/delModelGroup": function(req, res) {
    return res.json({
      success: true,
      code: "sucecess",
      data: null,
      message: "",
    });
  },
  "GET /modelGroup/getModelGroup": function(req, res) {
    const { modelGroupId } = req.body;
    return res.json({
      success: true,
      code: "sucecess",
      data: mock({
        columnList: [],
        modelGroup: {
          id: modelGroupId,
          name: "@ctitle(2,3)模型",
          departmentName: "@ctitle(2,3)部",
          "type|1-3": 0,
        },
        modelGroupId: modelGroupId,
        styleJson: "",
      }),
      message: "",
    });
  },
};
