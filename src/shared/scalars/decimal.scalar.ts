import {CustomScalar, Scalar} from "@nestjs/graphql";
import Decimal from "decimal.js";
import {Kind} from 'graphql';

@Scalar('Decimal', (type) => Decimal)
export class DecimalScalar implements CustomScalar<string, Decimal> {
    name = 'Decimal'

    description = 'Date custom scalar type';

    parseValue = (value: string): Decimal => new Decimal(value)

    serialize = (value: Decimal): string => value.toString()

    parseLiteral = (ast: any): Decimal | null => {
        if (ast.kind === Kind.STRING) {
            return new Decimal(ast.value);
        }
        return null;
    }
}
