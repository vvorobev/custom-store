export const inFunction = (
  value: unknown
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): value is (...args: any[]) => any => typeof value === "function";
