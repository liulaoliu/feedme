/**
 * 获取 JS变量的 运行时类型
 */
export default function getType(variable: any) {
  return Object.prototype.toString.call(variable).slice(8, -1);
}
