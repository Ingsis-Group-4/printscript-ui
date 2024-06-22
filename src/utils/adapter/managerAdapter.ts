import {CreateSnippet, PaginatedSnippets, Snippet} from "../snippet.ts";
import {CreateSnippetInput, GetSnippetOutput, ShareSnippetInput} from "./managerTypes.ts";
import {Rule} from "../../types/Rule.ts";
import {TestCase} from "../../types/TestCase.ts";
import {TestCaseResult} from "../queries.tsx";

export class ManagerAdapter {
    adaptCreateSnippet(createSnippet: CreateSnippet): CreateSnippetInput {
        return {
            name: createSnippet.name,
            content: createSnippet.content,
            language: createSnippet.language
        };
    }

    adaptShareSnippet(snippetId: string, userId: string): ShareSnippetInput {
        return {
            snippetId: snippetId,
            userId: userId
        };
    }

    adaptListSnippetDescriptors(snippetsOutput: GetSnippetOutput[]): Promise<PaginatedSnippets> {
        const snippets: Snippet[] = snippetsOutput.map(snippet => ({
            id: snippet.id,
            name: snippet.name,
            content: snippet.content,
            language: snippet.language,
            extension: "",
            compliance: 'compliant', // Asignar un valor por defecto o de otra fuente
            author: snippet.author
        }));

        return {
            page: 1,
            page_size: 1,
            count: snippets.length,
            snippets: snippets
        };
    }

    adaptGetSnippetById(snippetOutput: GetSnippetOutput): Snippet {
        return {
            id: snippetOutput.id,
            name: snippetOutput.name,
            content: snippetOutput.content, // Asumiendo que content y extension no están en el response y deben ser asignados de otra manera.
            language: snippetOutput.language,
            extension: "", // Asumiendo que content y extension no están en el response y deben ser asignados de otra manera.
            compliance: 'compliant', // Asignar un valor por defecto o de otra fuente
            author: snippetOutput.author
        }
    }

    adaptGetRule = (data: any): Rule[] => {
        return data.map((rule: any) => {
            return {
                id: rule.id,
                name: rule.name,
                isActive: rule.isActive,
                value: rule.valueType == "INTEGER" ? parseInt(rule.value) : rule.valueType == "STRING" ? rule.value : null
            }
        })
    }

    adaptSnippetList = (snippets: any): PaginatedSnippets => {
        return {
            snippets: snippets.map((snippet: any) => {
                return this.adaptSnippet(snippet)
            }),
            page: 0,
            count: 1,
            page_size: 10
        }
    }

    adaptSnippet = (snippet: any): Snippet => {
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

    adaptTestCases = (data: any): TestCase[] => {
        return data.map((testCase: any) => {
            return this.adaptTestCase(testCase)
        })
    }

    adaptTestCase = (data: any): TestCase => {
        return {
            id: data.id,
            name: data.testCaseName,
            input: data.inputs,
            output: data.expectedOutputs,
        }
    }

    adaptPostTestCase = (snippetId: string, testCase: Partial<TestCase>): any => {
        return {
            id: testCase.id,
            snippetId: snippetId,
            testCaseName: testCase.name,
            inputs: testCase.input,
            expectedOutputs: testCase.output
        }
    }

    adaptTestCaseResult = (data: any): TestCaseResult => {
        const hasPassed = data.hasPassed
        return hasPassed ? "success" : "fail"
    }
}
