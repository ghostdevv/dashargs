declare module 'dashargs' {
    export function strip(string: string, options?: {
        removeWhitespace: boolean,
        removeFlags: boolean,
        removeArgs: boolean
    }) : string;
}