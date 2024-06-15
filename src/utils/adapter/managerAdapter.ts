import {CreateSnippet} from "../snippet.ts";
import {CreateSnippetInput, ShareSnippetInput} from "./managerTypes.ts";
import {Rule} from "../../types/Rule.ts";

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

export const adaptGetRule = (data: any): Rule[] => {
    return data.map((rule: any) => {
        return {
            id: rule.id,
            name: rule.name,
            isActive: rule.isActive,
            value: rule.valueType == "INTEGER" ? parseInt(rule.value) : rule.valueType == "STRING" ? rule.value : null
        }
    })
}
