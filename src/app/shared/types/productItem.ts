export type ProductItems = {
    id: number;
    name: string;
    price: number;
    image: string;
}

export type BlogItem = {
    id?: number; // ?: cho phép undefined
    title?: string;
    body?: string;
    author?: string;
}