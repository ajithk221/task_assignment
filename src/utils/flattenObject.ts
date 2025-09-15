// type Primitive = string| number| boolean| null| undefined;

// import { join } from "path";
// import { off } from "process";

// //resursive utility type to flatten nested objects

// export type Flatten<T, Prefix extends string =""> = {

//     [K in keyof T & (string | number)]: T[K] extends Primitive
//     ?{[P in `${Prefix}${K}`]: T[K]}
//     : T[K] extends Array<infer U>
//     ? Flatten<U, `${Prefix}${K}.`>
//     extends infer 0
//     ? {
//         [I in keyof T[K]& `${number}`]
//         : Flatten<T[K][number],`${prefix}${K}.${I}.`>;
//     }[keyof T[K] & `${number}`]
//     : never
//     : Flatten <T[K], `${Prefix}${K}.`>;
// } [keyof T & (string | number)] extends infer 0
// ? {[K in keyof 0]: 0[K]}
// :never;

// export function flattenObject<T extends object>(
//     obj: T,
//     prefix =""
// ): Flatten<T>{
//     const result: Record<string, unknown> ={};

//     function recurse(value: unknown,
//         path: string
//     ){
//         if(value !== null && typeof value === "object" &&
//             !Array,isArray(value)
//         ){
//             for (const [k,v] of Object.entries(value)){
//                 recurse(v, path ? `${path}.${k}`:k);
//             }
//         } else if (Array.isArray(Value)){
//             value.forEach((item,index)=>{
//                 recurse(item,`${path}.${index}`
//                 );
//             });
//         } else {
//             result[path] = value;
//         }
//     }
//     recurse(obj, prefix);
//     return result as Flatten<T>;
// }


type Primitive = string| number| boolean| null| undefined;

export function flattenObject(
    obj: Record<string, any>,
    parentKey = "",
    result: Record<string, any> ={}
  ): Record<string, any>{
        for (const [key, value] of
            Object.entries(obj)){
                const newKey = parentKey ? `${parentKey}.${key}`: key;

                if(Array.isArray(value)){
                    value.forEach((item, index)=>{
                        flattenObject(item, `${newKey}.${index}`, result);
                    });
                    }else if(value !== null && typeof value === "object"){
                        flattenObject(value, newKey, result);

                    } else{
                        result[newKey] = value as Primitive;
                    }
                }
                return result
            
    }
        
    

type Join<K,P> = K extends string | number ? P extends string | number
? `${K},${P}`: never : never;

type UnionIntersection<U> =
(U extends any? (k:U)=> void :
never) extends(k:infer I)=> void
? I : never;

type FlattenHelper<T> = T extends object
? UnionIntersection<{
    [K in keyof T &(string | number)]:
    T[K] extends Array<infer U>
    ? U extends object
    ? {[P in keyof FlattenHelper<U> & (string| number) as 
        Join<K,P>]: FlattenHelper<U>[P]}
    : { [P in Join<K, number>]:U}
    : T[K] extends object
    ?{[P in keyof FlattenHelper<T[K]> &(string | number) as 
        Join<K,P>]: FlattenHelper<T[K]>[P]}
        :{[P in K]: T[K]}
}[keyof T] &(string | number)>: never;

export type Flatten<T> = T extends 
object ? FlattenHelper<T> : never;