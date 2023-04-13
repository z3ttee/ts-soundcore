
export function isUndefined(target: any): boolean {
    return typeof target === "undefined";
}

export function isNull(target: any): boolean {
    return isUndefined(target) || target == null;
}

export function isString(target: any): boolean {
    return !isNull(target) && typeof target === "string";
}

export function pascalToSnakeCase(input: string): string {
    return input?.split(/\.?(?=[A-Z])/)?.join('_')?.toLowerCase();
}

export function hasProperty<T = any>(propertyKey: keyof T, obj: T): boolean {
    return !isUndefined(obj[propertyKey]);
}