import Mock from "mockjs";

// 生成数据列表
var dataList = [];
for (let i = 0; i < Math.floor(Math.random() * 10 + 1); i++) {
  dataList.push(
    Mock.mock({
      articleId: "@increment",
      articleTitle: "@csentence",
      desc: "@csentence",
      categoryName: "@ctitle",
      categoryId: "@ctitle",
      tags: new Array(Math.floor(Math.random() * 4 + 1)).fill("@cname"),
      coverImage: "@image",
      slider: "@boolean",
      createTime: "datetime"
    })
  );
}

// 获取文章列表
export function list() {
  return {
    // isOpen: false,
    url: "/artic/article/list",
    type: "get",
    data: {
      msg: "success",
      code: 0,
      page: {
        totalCount: dataList.length,
        pageSize: 10,
        totalPage: 1,
        currPage: 1,
        list: dataList
      }
    }
  };
}
// 获取文章信息
export function info() {
  return {
    // isOpen: false,
    url: "/artic/article/info",
    type: "get",
    data: {
      msg: "success",
      code: 0,
      article: dataList[0]
    }
  };
}

// 修改密码
export function updatePassword() {
  return {
    // isOpen: false,
    url: "/sys/user/password",
    type: "post",
    data: {
      msg: "success",
      code: 0
    }
  };
}

// 添加用户
export function add() {
  return {
    // isOpen: false,
    url: "/sys/user/save",
    type: "post",
    data: {
      msg: "success",
      code: 0
    }
  };
}

// 修改用户
export function update() {
  return {
    // isOpen: false,
    url: "/sys/user/update",
    type: "post",
    data: {
      msg: "success",
      code: 0
    }
  };
}

// 删除用户
export function del() {
  return {
    // isOpen: false,
    url: "/sys/user/delete",
    type: "post",
    data: {
      msg: "success",
      code: 0
    }
  };
}
