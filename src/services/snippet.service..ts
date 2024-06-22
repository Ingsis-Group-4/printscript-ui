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
import { ManagerAdapter} from "../utils/adapter/managerAdapter.ts";

const fakeSnippetOperations = new FakeSnippetOperations()
const managerAdapter = new ManagerAdapter()

export class SnippetService implements SnippetOperations {
    createSnippet(createSnippet: CreateSnippet): Promise<Snippet> {
        return axiosInstance.post(`${MANAGER_URL}/create`, managerAdapter.adaptCreateSnippet(createSnippet))
    }

    deleteSnippet(id: string): Promise<string> {
        return axiosInstance.delete(`${MANAGER_URL}/${id}`)
    }

    async formatSnippet(snippet: string): Promise<string> {
        const response = await axiosInstance.post(`${MANAGER_URL}/run/format`, {content: snippet})
        return response.data
    }

    async getFileTypes(): Promise<FileType[]> {
        return [{language: 'printscript', extension: 'prs'}]
    }

    async getFormatRules(): Promise<Rule[]> {
        const response = await axiosInstance.get(`${MANAGER_URL}/rule/all/FORMATTING`)
        return managerAdapter.adaptGetRule(response.data)
    }

    async getLintingRules(): Promise<Rule[]> {
        const response = await axiosInstance.get(`${MANAGER_URL}/rule/all/LINTING`)
        return managerAdapter.adaptGetRule(response.data)
    }

    async getSnippetById(id: string): Promise<Snippet | undefined> {
        const response = await axiosInstance.get(`${MANAGER_URL}/snippets/${id}`)
        return managerAdapter.adaptGetSnippetById(response.data)
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
        const response = await axiosInstance.get(`${MANAGER_URL}/snippets`)
        return managerAdapter.adaptListSnippetDescriptors(response.data)
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
        return managerAdapter.adaptTestCase(response.data)
    }

    async removeTestCase(id: string): Promise<string> {
        await axiosInstance.delete(`${MANAGER_URL}/case/${id}`)
        return id
    }

    shareSnippet(snippetId: string, userId: string): Promise<Snippet> {
        return axiosInstance.post(`${MANAGER_URL}/share`, managerAdapter.adaptShareSnippet(snippetId, userId))
    }

    async testSnippet(testCase: Partial<TestCase>): Promise<TestCaseResult> {
        const response = await axiosInstance.post(`${MANAGER_URL}/case/run/${testCase.id}`)
        return managerAdapter.adaptTestCaseResult(response.data)
    }

    async updateSnippetById(id: string, updateSnippet: UpdateSnippet): Promise<Snippet> {
        const response = await axiosInstance.put(`${MANAGER_URL}/manager/snippets/${id}`, updateSnippet)
        return managerAdapter.adaptSnippet(response.data)
    }


}

export default SnippetService;