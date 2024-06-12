import {CreateSnippet} from "../snippet.ts";
import {CreateSnippetInput, ShareSnippetInput} from "./managerTypes.ts";

export const adaptCreateSnippet = (createSnippet: CreateSnippet): CreateSnippetInput => {
    return {
        name: createSnippet.name,
        content: createSnippet.content,
        language: createSnippet.language
    }
}

export const adaptShareSnippet = (snippetId: string, userId: string): ShareSnippetInput => {
    return {
        snippetId: snippetId,
        userId: userId
    }
}
