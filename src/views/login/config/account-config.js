export const rules = {
  // 使用： name: [{规则1}, {规则2}]
  loginName: [{ required: true, message: "请输入用户名", trigger: "change" }],
  password: [{ required: true, message: "请输入密码", trigger: "change" }]
};
