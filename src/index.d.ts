declare module 'dashargs' {
    export function strip(
        string: string,
        options?: {
            removeWhitespace?: boolean;
            removeFlags?: boolean;
            removeArgs?: boolean;
            prefix?: string;
        },
    ): string;

    export function config(options: {
        parse?: {
            unique?: boolean;
            parseFlags?: boolean;
            parseArgs?: boolean;
            typeCoerce?: boolean;
            prefix?: string;
        },
        strip?: {
            removeWhitespace?: boolean;
            removeFlags?: boolean;
            removeArgs?: boolean;
            prefix?: string;
        }
    }): void;

    class DashArgs {
        constructor(
            string: string,
            config?: {
                unique?: boolean;
                parseFlags?: boolean;
                parseArgs?: boolean;
                typeCoerce?: boolean;
                prefix?: string;
            },
        );
        get string(): string;
        get config(): object;
        has(key: string): boolean;
        get(key: string): any;
        array(): Array<object>;
    }

    export function parse(
        string: string,
        options?: {
            unique?: boolean;
            parseFlags?: boolean;
            parseArgs?: boolean;
            typeCoerce?: boolean;
            prefix?: string;
        },
    ): DashArgs;

    export function argv(
        options?: {
            unique?: boolean;
            parseFlags?: boolean;
            parseArgs?: boolean;
            typeCoerce?: boolean;
            prefix?: string;
        },
    ): DashArgs;
}
