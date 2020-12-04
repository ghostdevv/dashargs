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

    export class DashArgs {
        constructor(string: string, config?: {
            unique: boolean,
            parseFlags: boolean,
            parseArgs: boolean,
            typeCoerce: boolean,
            prefix: string,
        });
        get string(): string;
        get config(): object;
        has(key: string): boolean;
        get(key: string): any;
        array(): Array<object>;
    }

    export function parse(string: string, options?: {
        unique: boolean,
        parseFlags: boolean,
        parseArgs: boolean,
        typeCoerce: boolean,
        prefix: string,
    }): DashArgs
}