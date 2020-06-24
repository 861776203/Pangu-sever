define({ "api": [
  {
    "type": "get",
    "url": "/tables/info",
    "title": "查询表信息",
    "description": "<p>数据库表列表</p>",
    "name": "select",
    "group": "TablesApi",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>库名</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "table_name",
            "description": "<p>表名</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "x",
            "description": "<p>表的x轴位置</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "y",
            "description": "<p>表的y轴位置</p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "info",
            "description": "<p>字段信息</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  {\n      \"data\" : {\n         \"table_name\" : \"表名\",\n         \"x\" : \"表的x轴位置\",\n         \"y\" : \"表的y轴位置\",\n         \"info\" : [{\n             \"name\": \"字段名\",\n             \"type\": \"字段类型\",\n             \"notes\": \"字段备注\"\n          }]\n      }\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.1",
    "filename": "routes/tables.js",
    "groupTitle": "TablesApi"
  },
  {
    "type": "post",
    "url": "/tables/updata_coordinate",
    "title": "修改表位置",
    "description": "<p>修改表位置</p>",
    "name": "updata",
    "group": "TablesApi",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "table_name",
            "description": "<p>表名</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "x",
            "description": "<p>x轴位置</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "y",
            "description": "<p>y轴位置</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "code",
            "description": "<p>code</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p>返回状态</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"code\": 0,\n    \"status\": 1\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.1",
    "filename": "routes/tables.js",
    "groupTitle": "TablesApi"
  },
  {
    "type": "post",
    "url": "/users/add",
    "title": "添加用户",
    "description": "<p>用户列表</p>",
    "name": "add",
    "group": "UsersApi",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "name",
            "description": "<p>姓名</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "texts",
            "description": "<p>内容</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "classid",
            "description": "<p>班级id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  {\n      \"data\" : {\n         \"id\" : \"id\",\n         \"name\" : \"用户名\",\n         \"texts\" : \"内容\",\n         \"createdate\" : \"创建时间\",\n         \"classid\": \"班级id\"\n      }\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.1",
    "filename": "routes/users.js",
    "groupTitle": "UsersApi"
  },
  {
    "type": "get",
    "url": "/users/all",
    "title": "用户列表",
    "description": "<p>用户列表</p>",
    "name": "all",
    "group": "UsersApi",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "classid",
            "description": "<p>班级id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  {\n      \"data\" : {\n         \"id\" : \"id\",\n         \"name\" : \"用户名\",\n         \"texts\" : \"内容\",\n         \"createdate\" : \"创建时间\",\n         \"classid\": \"班级id\"\n      }\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.1",
    "filename": "routes/users.js",
    "groupTitle": "UsersApi"
  },
  {
    "type": "get",
    "url": "/users/classlist",
    "title": "班级列表",
    "description": "<p>班级信息</p>",
    "name": "classlist",
    "group": "UsersApi",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  {\n      \"data\" : {\n         \"id\" : \"id\",\n         \"classname\" : \"班级名称\"\n      }\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.1",
    "filename": "routes/users.js",
    "groupTitle": "UsersApi"
  },
  {
    "type": "get",
    "url": "/users/delete",
    "title": "删除用户",
    "description": "<p>删除</p>",
    "name": "delete",
    "group": "UsersApi",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "number",
            "optional": false,
            "field": "id",
            "description": "<p>id</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "classid",
            "description": "<p>班级id</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "  {\n      \"data\" : {\n         \"id\" : \"id\",\n         \"name\" : \"用户名\",\n         \"texts\" : \"内容\",\n         \"createdate\" : \"创建时间\",\n         \"classid\": \"班级id\"\n      }\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.1",
    "filename": "routes/users.js",
    "groupTitle": "UsersApi"
  }
] });
