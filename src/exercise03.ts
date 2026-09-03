export function getInventoryValue(
  inventory: Array<[string, number, number]>,
): number {
  return inventory
    .filter((item) => item[1] > 5)
    .map((item) => item[1] * item[2])
    .reduce((total, value) => total + value, 0);
}
