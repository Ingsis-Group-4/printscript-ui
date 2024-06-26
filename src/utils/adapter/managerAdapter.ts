import {ComplianceEnum, CreateSnippet, PaginatedSnippets, Snippet} from "../snippet.ts";
import {CreateSnippetInput, GetSnippetOutput, ShareSnippetInput} from "./managerTypes.ts";
import {Rule} from "../../types/Rule.ts";
import {TestCase} from "../../types/TestCase.ts";
import {TestCaseResult} from "../queries.tsx";
import {PaginatedUsers} from "../users.ts";

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

    adaptListSnippetDescriptors(snippetsOutput: GetSnippetOutput[], page: number, page_size: number, count: number): PaginatedSnippets {
        const snippets: Snippet[] = snippetsOutput.map(snippet => ({
            id: snippet.id,
            name: snippet.name,
            content: snippet.content,
            language: snippet.language,
            extension: "ps",
            compliance: this.adaptSnippetStatus(snippet.status) ,
            author: snippet.author
        }));

        return {
            page: page,
            page_size: page_size,
            count: count,
            snippets: snippets
        };
    }

    private adaptSnippetStatus(status: string): ComplianceEnum {
        switch (status) {
            case "PENDING":
                return "pending";
            case "NOT_COMPLIANT":
                return "not-compliant";
            case "COMPLIANT":
                return "compliant";
            default:
                return "failed";
        }
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
            envVars: this.adaptEnvVar(data.envs)
        }
    }

    adaptPostTestCase = (snippetId: string, testCase: Partial<TestCase>): any => {
        return {
            id: testCase.id,
            snippetId: snippetId,
            testCaseName: testCase.name,
            inputs: testCase.input,
            expectedOutputs: testCase.output,
            envs: this.adaptPostEnvVar(testCase.envVars)
        }
    }

    adaptTestCaseResult = (data: any): TestCaseResult => {
        const hasPassed = data.hasPassed
        return hasPassed ? "success" : "fail"
    }

    adaptUsers = (data: any): PaginatedUsers => {
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

    adaptModifyRules(newRules: Rule[]): any {
        const adaptedModifiedRules = newRules.map(rule => {
            return {
                id: rule.id,
                isActive: rule.isActive,
                value: rule.value ? rule.value.toString() : ""
            }
        })
        console.log(adaptedModifiedRules)
        return adaptedModifiedRules
    }

    private adaptPostEnvVar(envVars: string | undefined): any {
        if (envVars) {
            const keyValuePairStrings = envVars.split(";")
            return keyValuePairStrings.map((keyValuePairString: string) => {
                const keyValuePair = keyValuePairString.split("=")
                return {
                    key: keyValuePair[0],
                    value: keyValuePair[1]
                }
            })
        }else {
            return []
        }
    }

    private adaptEnvVar(envs: any) {
        return envs.map((env: any) => {
            return `${env.key}=${env.value}`
        }).join(";")
    }
}
