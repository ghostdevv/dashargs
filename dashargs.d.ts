declare module 'dashargs' {
    export function strip(string: string, options?: {
        removeWhitespace: boolean,
        removeFlags: boolean,
        removeArgs: boolean
    }): string;

    export function config(options: {
        unique: boolean,
        parseFlags: boolean,
        parseArgs: boolean,
        typeCoerce: boolean,
        prefix: string,
    }): void;
}