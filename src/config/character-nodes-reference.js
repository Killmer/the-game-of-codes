export const collection = new Map();

export const set = (id, characterNodeRef) => {
    collection.set(id, characterNodeRef);
}

export const get = (id) => collection.get(id);