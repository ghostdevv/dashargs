declare module 'dashargs' {
    interface DashArgsOptions {
        unique: boolean,
        parseFlags: boolean,
        parseArgs: boolean,
        typeCoerce: boolean,
        prefix: string,
    }

    interface stripOptions {
        removeWhitespace: boolean,
        removeFlags: boolean,
        removeArgs: boolean,
        prefix: string
    }

    export function strip(string: string, options?: stripOptions): string;

    export function config(options: DashArgsOptions): void;

    export class DashArgs {
        constructor(string: string, config?: DashArgsOptions);
        get string(): string;
        get config(): object;
        has(key: string): boolean;
        get(key: string): any;
        array(): Array<object>;
    }

    export function parse(string: string, options?: DashArgsOptions): DashArgs
}