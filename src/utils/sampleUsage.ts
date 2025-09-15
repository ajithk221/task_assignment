const obj = {
    a: 1,
    b: {
        c: "hello",
        d: {e: true},
    },
    f: [ {g: "world"}],
};

import { flattenObject, Flatten } from "./flattenObject";

const flattened = flattenObject(obj);