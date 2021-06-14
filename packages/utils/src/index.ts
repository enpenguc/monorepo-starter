/**
 * 判断是否为数字
 * @param value 字符串
 * @returns 时间为数字
 */
export const isNumber = (value: any): boolean => {
  if (typeof value === 'string' && value.trim() === '') {
    return false;
  }
  return !Number.isNaN(Number(value));
};
/**
 * 延迟执行
 * @param timeout 延迟的毫秒数
 * @returns Promise回调函数
 */
export async function delay(timeout: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}
