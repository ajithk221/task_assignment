type Primitive = string | number | boolean | null | undefined;

export function flattenObject<T extends object>(
    obj: T,
    parentKey = "",
    result: Record<string, Primitive> = {}
): Flatten<T> {
    for (const [key, value] of Object.entries(obj)) {
        const newKey = parentKey ? `${parentKey}.${key}` : key;
        if (Array.isArray(value)) {
            value.forEach((item, index) => {
                flattenObject(item, `${newKey}.${index}`, result);
            });
        } else if (value !== null && typeof value === "object") {
            flattenObject(value, newKey, result);
        } else {
            result[newKey] = value as Primitive;
        }
    }
    return result as Flatten<T>;
}

// Use "." as separator for consistency
type Join<K, P> = K extends string | number
    ? P extends string | number
        ? `${K}.${P}`
        : never
    : never;

type UnionIntersection<U> =
    (U extends any ? (k: U) => void : never) extends (k: infer I) => void
        ? I
        : never;

type FlattenHelper<T> = T extends object
    ? UnionIntersection<{
        [K in keyof T & (string | number)]:
        T[K] extends Array<infer U>
            ? U extends object
                ? { [P in keyof FlattenHelper<U> & (string | number) as Join<K, P>]: FlattenHelper<U>[P] }
                : { [P in Join<K, number>]: U }
            : T[K] extends object
                ? { [P in keyof FlattenHelper<T[K]> & (string | number) as Join<K, P>]: FlattenHelper<T[K]>[P] }
                : { [P in K]: T[K] }
    }[keyof T & (string | number)]>
    : never;

export type Flatten<T> = T extends object ? FlattenHelper<T> : never;