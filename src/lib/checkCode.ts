import { CheckCodeTypes } from "../types/types.js";

export function checkCode(params: CheckCodeTypes) {
    if(!params.code) {
        throw new Error("Code is required.");
    }
}