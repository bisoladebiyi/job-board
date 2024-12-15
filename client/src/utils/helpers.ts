/* eslint-disable @typescript-eslint/no-explicit-any */
export const hasAllValues = (obj: any) => {
    return Object.values(obj).every(value => value !== "");
}
