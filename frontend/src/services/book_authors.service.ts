/* eslint-disable @typescript-eslint/no-explicit-any */
import { request } from "./api-client";

export const bookAuthorsApi = {
    // sách -> authors
    getByBook: (bookId: string) => request(`/api/book-authors/${bookId}`),
    // author -> books
    getBooksByAuthor: (authorId: string) => request(`/api/book-authors/author/${authorId}`),
    link: (data: any) => request("/api/book-authors", { method: "POST", body: JSON.stringify(data) }),
    unlink: (data: any) => request("/api/book-authors", { method: "DELETE", body: JSON.stringify(data) }),
};
