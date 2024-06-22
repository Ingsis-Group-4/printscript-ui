import {CreateSnippet, PaginatedSnippets, Snippet} from "../snippet.ts";
import {CreateSnippetInput, ShareSnippetInput} from "./managerTypes.ts";
import {Rule} from "../../types/Rule.ts";
import {TestCase} from "../../types/TestCase.ts";
import {TestCaseResult} from "../queries.tsx";
import {PaginatedUsers} from "../users.ts";

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

export const adaptSnippetList = (snippets: any): PaginatedSnippets => {
    return {
        snippets: snippets.map((snippet: any) => {
            return adaptSnippet(snippet)
        }),
        page: 0,
        count: 1,
        page_size: 10
    }
}

export const adaptSnippet = (snippet: any): Snippet => {
    return {
        id: snippet.id,
        name: snippet.name,
        author: snippet.author,
        language: snippet.language,
        compliance: 'pending',
        content: snippet.content,
        extension: snippet.extension
    }
}

export const adaptTestCases = (data: any): TestCase[] => {
    return data.map((testCase: any) => {
        return adaptTestCase(testCase)
    })
}

export const adaptTestCase = (data: any): TestCase => {
    return {
        id: data.id,
        name: data.testCaseName,
        input: data.inputs,
        output: data.expectedOutputs,
    }
}

export const adaptPostTestCase = (snippetId: string, testCase: Partial<TestCase>): any => {
    return {
        id: testCase.id,
        snippetId: snippetId,
        testCaseName: testCase.name,
        inputs: testCase.input,
        expectedOutputs: testCase.output
    }
}

export const adaptTestCaseResult = (data: any): TestCaseResult => {
    const hasPassed = data.hasPassed
    return hasPassed ? "success" : "fail"
}

export const adaptUsers = (data: any): PaginatedUsers => {
    return {
        users: data.map((user: any) => {
            return {
                id: user.user_id,
                name: user.name
            }
        }),
        page: 0,
        count: data.length,
        page_size: data.length
    }
}
