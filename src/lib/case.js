const toCamelKey = (s) => s.replace(/_[a-z]/g, (_, c) => c.toUpperCase());
const toSnakeKey = (s) => s.replace(/[A-Z]/g, (c) => "_" + c.toLowerCase());

export const toCamel = (obj) => {
    if (Array.isArray(obj)) return obj.map(toCamel);
    if (obj && typeof obj === "object") {
        return Object.fromEntries(Object.entries(obj).map(([ka, v]) => [toCamelKey(k), toCamel(v)]));
    }
    return obj;
};

export const toSnake = (obj) => {
    if (Array.isArray(obj)) return obj.map(toSnake);
    if (obj && typeof obj === "object") {
        return Object.fromEntries(Object.entries(obj).map(([k, v]) => [toSnakeKey(k), toSnake(v)]));
    }
    return obj;
};