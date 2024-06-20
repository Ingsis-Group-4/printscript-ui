import {SnippetOperations} from "../utils/snippetOperations.ts";
import {CreateSnippet, PaginatedSnippets, Snippet, UpdateSnippet} from "../utils/snippet.ts";
import {FileType} from "../types/FileType.ts";
import {Rule} from "../types/Rule.ts";
import {TestCase} from "../types/TestCase.ts";
import {PaginatedUsers} from "../utils/users.ts";
import {TestCaseResult} from "../utils/queries.tsx";
import {FakeSnippetOperations} from "../utils/mock/fakeSnippetOperations.ts";
import axiosInstance from "./axiosInstance.ts";
import {MANAGER_URL} from "../utils/constants.ts";
import {
    adaptCreateSnippet,
    adaptGetRule,
    adaptPostTestCase,
    adaptShareSnippet,
    adaptSnippet,
    adaptSnippetList,
    adaptTestCase, adaptTestCaseResult,
    adaptTestCases
} from "../utils/adapter/managerAdapter.ts";

const fakeSnippetOperations = new FakeSnippetOperations()

export class SnippetService implements SnippetOperations {
    createSnippet(createSnippet: CreateSnippet): Promise<Snippet> {
        console.log('primer paso')
        return axiosInstance.post(`${MANAGER_URL}/create`, adaptCreateSnippet(createSnippet))
    }

    deleteSnippet(id: string): Promise<string> {
        return axiosInstance.delete(`${MANAGER_URL}/${id}`)
    }

    formatSnippet(snippet: string): Promise<string> {
        return fakeSnippetOperations.formatSnippet(snippet)
        //TODO: Implement this method
    }

    getFileTypes(): Promise<FileType[]> {
        return fakeSnippetOperations.getFileTypes()
        //TODO: Implement this method
    }

    async getFormatRules(): Promise<Rule[]> {
        const response = await axiosInstance.get(`${MANAGER_URL}/rule/all/FORMATTING`)
        return adaptGetRule(response.data)
    }

    async getLintingRules(): Promise<Rule[]> {
        const response = await axiosInstance.get(`${MANAGER_URL}/rule/all/LINTING`)
        return adaptGetRule(response.data)
    }

    async getSnippetById(id: string): Promise<Snippet | undefined> {
        const response = await axiosInstance.get(`${MANAGER_URL}/manager/snippets/${id}`)
        return adaptSnippet(response.data)
    }

    async getTestCases(snippetId: string): Promise<TestCase[]> {
        const response = await axiosInstance.get(`${MANAGER_URL}/case/${snippetId}`)
        return adaptTestCases(response.data)
    }

    getUserFriends(name?: string, page?: number, pageSize?: number): Promise<PaginatedUsers> {
        return fakeSnippetOperations.getUserFriends(name, page, pageSize)
        //TODO: Implement this method
    }

    async listSnippetDescriptors(page: number, pageSize: number, sippetName?: string): Promise<PaginatedSnippets> {
        const response = await axiosInstance.get(`${MANAGER_URL}/manager/snippets`)
        const snippets = response.data
        return adaptSnippetList(snippets)
    }

    modifyFormatRule(newRules: Rule[]): Promise<Rule[]> {
        return fakeSnippetOperations.modifyFormatRule(newRules)
        //TODO: Implement this method
    }

    modifyLintingRule(newRules: Rule[]): Promise<Rule[]> {
        return fakeSnippetOperations.modifyLintingRule(newRules)
        //TODO: Implement this method
    }

    async postTestCase(snippetId: string, testCase: Partial<TestCase>): Promise<TestCase> {
        const response = await axiosInstance.post(`${MANAGER_URL}/case`, adaptPostTestCase(snippetId, testCase))
        return adaptTestCase(response.data)
    }

    async removeTestCase(id: string): Promise<string> {
        await axiosInstance.delete(`${MANAGER_URL}/case/${id}`)
        return id
    }

    shareSnippet(snippetId: string, userId: string): Promise<Snippet> {
        return axiosInstance.post(`${MANAGER_URL}/share`, adaptShareSnippet(snippetId, userId))
    }

    async testSnippet(testCase: Partial<TestCase>): Promise<TestCaseResult> {
        const response = await axiosInstance.post(`${MANAGER_URL}/case/run/${testCase.id}`)
        return adaptTestCaseResult(response.data)
    }

    updateSnippetById(id: string, updateSnippet: UpdateSnippet): Promise<Snippet> {
        return fakeSnippetOperations.updateSnippetById(id, updateSnippet)
        //TODO: Implement this method
    }


}

export default SnippetService;