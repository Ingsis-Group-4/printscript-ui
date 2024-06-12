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
import {adaptCreateSnippet, adaptShareSnippet} from "../utils/adapter/managerAdapter.ts";

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

    getFormatRules(): Promise<Rule[]> {
        return fakeSnippetOperations.getFormatRules()
        //TODO: Implement this method
    }

    getLintingRules(): Promise<Rule[]> {
        return fakeSnippetOperations.getLintingRules()
        //TODO: Implement this method
    }

    getSnippetById(id: string): Promise<Snippet | undefined> {
        return axiosInstance.get(`${MANAGER_URL}/snippets/${id}`)
    }

    getTestCases(): Promise<TestCase[]> {
        return fakeSnippetOperations.getTestCases()
        //TODO: Implement this method
    }

    getUserFriends(name?: string, page?: number, pageSize?: number): Promise<PaginatedUsers> {
        return fakeSnippetOperations.getUserFriends(name, page, pageSize)
        //TODO: Implement this method
    }

    listSnippetDescriptors(page: number, pageSize: number, sippetName?: string): Promise<PaginatedSnippets> {
        return fakeSnippetOperations.listSnippetDescriptors(page, pageSize, sippetName)
        //TODO: Implement this method
    }

    modifyFormatRule(newRules: Rule[]): Promise<Rule[]> {
        return fakeSnippetOperations.modifyFormatRule(newRules)
        //TODO: Implement this method
    }

    modifyLintingRule(newRules: Rule[]): Promise<Rule[]> {
        return fakeSnippetOperations.modifyLintingRule(newRules)
        //TODO: Implement this method
    }

    postTestCase(testCase: Partial<TestCase>): Promise<TestCase> {
        return fakeSnippetOperations.postTestCase(testCase)
        //TODO: Implement this method
    }

    removeTestCase(id: string): Promise<string> {
        return fakeSnippetOperations.removeTestCase(id)
        //TODO: Implement this method
    }

    shareSnippet(snippetId: string, userId: string): Promise<Snippet> {
        return axiosInstance.post(`${MANAGER_URL}/share`, adaptShareSnippet(snippetId, userId))
    }

    testSnippet(testCase: Partial<TestCase>): Promise<TestCaseResult> {
        return fakeSnippetOperations.testSnippet()
        //TODO: Implement this method
    }

    updateSnippetById(id: string, updateSnippet: UpdateSnippet): Promise<Snippet> {
        return fakeSnippetOperations.updateSnippetById(id, updateSnippet)
        //TODO: Implement this method
    }


}

export default SnippetService;