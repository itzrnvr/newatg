class EmptyArrayUtils<T> {
    private isEmpty: boolean;
    private array: Array<T>;

    constructor(isEmpty: boolean, array: Array<T>) {
        this.isEmpty = isEmpty;
        this.array = array;
    }

    yes(callback: (arg: Array<T>) => void): EmptyArrayUtils<T> {
        if (this.isEmpty) {
            callback(this.array);
        }
        return this;
    }

    no(callback: (arg: Array<T>) => void): EmptyArrayUtils<T> {
        if (this.isEmpty) {
            callback(this.array);
        }
        return this;
    }
}

export const isArrayEmpty = <T>(array: Array<T>): EmptyArrayUtils<T> => {
    return new EmptyArrayUtils(array.length === 0, array);
};
