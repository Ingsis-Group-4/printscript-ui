export interface CreateSnippetInput {
    name: string,
    content: string,
    language: string,
}

export interface ShareSnippetInput {
    snippetId: string,
    userId: string,
}

export interface GetSnippetOutput {
    id: string,
    name: string,
    content: string,
    language: string,
    author: string,
    status: string,
}

