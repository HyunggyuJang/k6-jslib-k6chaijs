/// <reference types="chai" />
declare module "types" {
    export type AssertionArgsWithoutExpression = [
        successMessage: string,
        failureMessage: string,
        expected: object,
        actual?: object,
        showDiff?: boolean
    ];
    export type Assert = (expression: object, ...args: AssertionArgsWithoutExpression) => asserts expression;
    export type AssertionArgs = [
        expression: object,
        ...args: AssertionArgsWithoutExpression
    ];
}
declare module "constants" {
    export const AGGREGATE_CHECKS = true;
    export const EXIT_ON_ERROR = false;
    export const LOG_FAILURES = false;
    export const TRUNCATE_VARIABLE_THRESHOLD = 100;
    export const TRUNCATE_MSG_THRESHOLD = 300;
}
declare module "utils/regex" {
    export const regexTag: (value?: string) => RegExp;
}
declare module "utils/predicate" {
    export const isFunction: (x: unknown) => x is <T, R>(...xs: T[]) => R;
}
declare module "utils/string" {
    export const truncate: (str?: string, len?: number) => string;
}
declare module "utils/index" {
    export * from "utils/regex";
    export * from "utils/predicate";
    export * from "utils/string";
}
declare module "matchers" {
    /**
     * Anonymizes the value of "this" in the message
    // useful for hiding tokens/passwords in the check messages.
     */
    export function anonymize(fn?: (msg?: string) => string): void;
    /**
     * Determines whether the object is valid JSON
     */
    export function validJsonBody(): void;
}
declare module "config" {
    import chai from 'chai';
    export default chai;
}
declare module "assert" {
    import { Assert } from "types";
    /**
     * Overriding Chai's main assert() function to inject check() calls for both
     * successful and failed assertions.
     *
     * The original chai.util.getMessage did not truncate strings.
     * We are overriding it to prevent users from shooting themselves in the foot by
     * asserting large request.body and getting it printed on the terminal as a check message.
     */
    export function assert(): Assert;
}
declare module "exceptions" {
    /**
     * Handle exceptions the K6 way
     */
    export const handleUnexpectedException: (error: string, testName: string) => void;
}
declare module "describe" {
    /**
     * Handle assertion grouping the K6 way
     */
    export function describe(name: string, fn: (...xs: unknown[]) => unknown): boolean;
}
declare module "index" {
    import chai from "config";
    export { describe } from "describe";
    export default chai;
    export const expect: Chai.ExpectStatic;
}
