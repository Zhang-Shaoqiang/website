import { mock } from "mockjs";
export default {
  "GET /taskInfo/list": function (req, res) {
    const { page, pageSize } = req.query || {
      page: 1,
      pageSize: 10,
      creator: null,
    };
    return res.json({
      success: true,
      code: "sucecess",
      message: "",
      data: mock({
        ["current|" + page]: 0,
        ["records|" + pageSize]: [
          {
            id: `@increment(1)`,
            name: "@ctitle",
            description: "@csentence",
            createdTime: "@now",
            creator: "@cname",
            "taskType|1-": 1,
            "connectorFinished|1": true,
            "departmentLevel|3-5": 0,
            "status|1-3": 0,
            "type|1-3": 0,
            workspaceId: 2,
          },
        ],
        ["size|" + pageSize]: 0,
        "total|10-1000": 0,
      }),
    });
  },
  "POST /taskGroup/getUserTask": function (req, res) {
    const { page, pageSize } = req.body || {
      page: 1,
      pageSize: 10,
      creator: null,
    };
    return res.json({
      success: true,
      code: "sucecess",
      message: "",
      data: mock({
        ["current|" + page]: 0,
        ["records|" + pageSize]: [
          {
            id: `@increment(1)`,
            executionName: "测试任务@ctitle(2,5)",
            taskName: "@ctitle(2,5)任务",
            remark: "@csentence",
            departmentName: "@ctitle(2,3)部",
            modelGroupName: "@ctitle(2,3)模型",
            applicant: "@cname",
            "taskType|1-": 1,
            "connectorFinished|1": true,
            "departmentLevel|3-5": 0,
            "status|1-3": 0,
            "type|1-3": 0,
            erp: "@name",
            workspaceId: 2,
          },
        ],
        ["size|" + pageSize]: 0,
        "total|10-1000": 0,
      }),
    });
  },

  "POST /taskInfo/setStatus": function (req, res) {
    const { status } = req.body;
    res.json({
      success: status === 2 ? true : false,
      code: "Error",
      message: "任务执行中无法禁用",
    });
  },
};
