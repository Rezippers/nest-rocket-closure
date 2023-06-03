import {TransformFnParams} from "class-transformer";
import Decimal from 'decimal.js';
import {ValueTransformer} from 'typeorm';

// https://medium.com/@matthew.bajorek/how-to-properly-handle-decimals-with-typeorm-f0eb2b79ca9c
export class DecimalTransformer implements ValueTransformer {
    // https://clintonblackburn.medium.com/decimaltransformer-to-has-a-type-error-eddd97089ea7
    to = (decimal?: Decimal): string | null | undefined => {
        // NOTE: We need to return undefined if given undefined to ensure that TypeORM does
        // not attempt to write data that should not be written. If we return `null`, for
        // example, TypeORM will create a malformed parameterized query instead of relying
        // on the column's default value (if one is set).
        switch (decimal) {
            case undefined:
                return undefined;
            case null:
                return null;
            default:
                return decimal.toString();
        }
    }

    from = (decimal?: string): Decimal | null => decimal ? new Decimal(decimal) : null
}

export const DecimalToString = (decimals = 2) => ({ value }: TransformFnParams) => {
    if (value instanceof Decimal) {
        return value.toFixed(decimals);
    }
    return value;
};
