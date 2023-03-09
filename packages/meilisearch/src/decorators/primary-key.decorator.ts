import { isUndefined } from "@soundcore/common";
import { REFLECT_MEILIINDEX_PRIMARY_KEY } from "../constants";
import { AccessorDecorator } from "../definitions";
import { addToAttrs } from "../utils/reflectUtils";
import { PropertyOptions } from "./property.decorator";

export interface PrimaryKeyOptions extends PropertyOptions {
    name?: string;
}

export function PrimaryKey();
export function PrimaryKey(name: string);
export function PrimaryKey(options: PrimaryKeyOptions);
export function PrimaryKey(keyOrOptions?: string | PrimaryKeyOptions): AccessorDecorator {
    let keyName;
    let options: PropertyOptions = {};

    if(!isUndefined(keyOrOptions)) {
        if(typeof keyOrOptions === "string") {
            keyName = keyOrOptions;
        } else {
            keyName = keyOrOptions.name;
            options = keyOrOptions;
        }
    }

    return (target, propertyKey) => {
        const constructor = target.constructor;

        if(Reflect.hasMetadata(REFLECT_MEILIINDEX_PRIMARY_KEY, constructor)) {
            throw new Error(`An index schema can only have one primary key field.`);
        }

        addToAttrs(target, propertyKey, options);
        // Set propertyKey as primary key
        Reflect.defineMetadata(REFLECT_MEILIINDEX_PRIMARY_KEY, keyName ?? propertyKey ?? "id", constructor);
    };
}