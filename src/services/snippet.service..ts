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
import {ManagerAdapter} from "../utils/adapter/managerAdapter.ts";

const fakeSnippetOperations = new FakeSnippetOperations()
const managerAdapter = new ManagerAdapter()

export class SnippetService implements SnippetOperations {
    createSnippet(createSnippet: CreateSnippet): Promise<Snippet> {
        return axiosInstance.post(`${MANAGER_URL}/manager/create`, managerAdapter.adaptCreateSnippet(createSnippet))
    }

    deleteSnippet(id: string): Promise<string> {
        return axiosInstance.delete(`${MANAGER_URL}/manager/${id}`)
    }

    async formatSnippet(snippet: string): Promise<string> {
        const response = await axiosInstance.post(`${MANAGER_URL}/run/format`, {content: snippet})
        return response.data
    }

    async getFileTypes(): Promise<FileType[]> {
        return [{language: 'printscript', extension: 'ps'}]
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
        const response = await axiosInstance.get(`${MANAGER_URL}/manager/snippets/${id}`)
        return managerAdapter.adaptGetSnippetById(response.data)
    }

    async getTestCases(snippetId: string): Promise<TestCase[]> {
        const response = await axiosInstance.get(`${MANAGER_URL}/case/${snippetId}`)
        return managerAdapter.adaptTestCases(response.data)
    }

    async getUserFriends(name?: string, page?: number, pageSize?: number): Promise<PaginatedUsers> {
        const response = await axiosInstance.get(`${MANAGER_URL}/users`)
        return managerAdapter.adaptUsers(response.data)
    }

    async listSnippetDescriptors(page: number, pageSize: number, sippetName?: string): Promise<PaginatedSnippets> {
        const response = await axiosInstance.get(`${MANAGER_URL}/manager/snippets`)
        return managerAdapter.adaptListSnippetDescriptors(response.data)
    }

    async modifyFormatRule(newRules: Rule[]): Promise<Rule[]> {
        const response = await axiosInstance.put(`${MANAGER_URL}/rule`, managerAdapter.adaptModifyRules(newRules))
        return managerAdapter.adaptGetRule(response.data)
    }

    async modifyLintingRule(newRules: Rule[]): Promise<Rule[]> {
        const response = await axiosInstance.put(`${MANAGER_URL}/rule`, managerAdapter.adaptModifyRules(newRules))
        return managerAdapter.adaptGetRule(response.data)
    }

    async postTestCase(snippetId: string, testCase: Partial<TestCase>): Promise<TestCase> {
        const response = await axiosInstance.post(`${MANAGER_URL}/case`, managerAdapter.adaptPostTestCase(snippetId, testCase))
        return managerAdapter.adaptTestCase(response.data)
    }

    async removeTestCase(id: string): Promise<string> {
        await axiosInstance.delete(`${MANAGER_URL}/case/${id}`)
        return id
    }

    shareSnippet(snippetId: string, userId: string): Promise<Snippet> {
        return axiosInstance.post(`${MANAGER_URL}/manager/share`, managerAdapter.adaptShareSnippet(snippetId, userId))
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