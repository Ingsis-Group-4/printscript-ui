export interface CreateSnippetInput {
    name: string,
    content: string,
    language: string,
}

export interface ShareSnippetInput {
    snippetId: string,
    userId: string,
}