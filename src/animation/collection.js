export const collection = new Map();

export const register = (id, classInstance) => {
    collection.set(id, classInstance);
}

export const get = (id) => collection.get(id);