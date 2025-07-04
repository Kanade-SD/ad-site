import Mock from "mockjs";

// 公共Token验证方法
const checkToken = (headers: Record<string, string>) => {
  const token = headers["Authorization"] || headers["authorization"];
  return token === "Bearer valid-token"; // 假设有效的 token 是 'Bearer valid-token'
};

// 定义模拟接口
Mock.mock("/api/protected", "get", (options: any) => {
  // 验证 token
  // console.log(options);
  // if (!checkToken(options.headers)) {
  //   return {
  //     code: 401,
  //     message: "未授权，请提供有效的 Token",
  //   };
  // }

  // 如果 token 验证通过，返回正常数据
  return {
    code: 401,
    message: "未授权",
  };
});
