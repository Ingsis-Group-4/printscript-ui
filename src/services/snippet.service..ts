import {SnippetOperations} from "../utils/snippetOperations.ts";
import {CreateSnippet, PaginatedSnippets, Snippet, UpdateSnippet} from "../utils/snippet.ts";
import {FileType} from "../types/FileType.ts";
import {Rule} from "../types/Rule.ts";
import {TestCase} from "../types/TestCase.ts";
import {PaginatedUsers} from "../utils/users.ts";
import {TestCaseResult} from "../utils/queries.tsx";
import {FakeSnippetOperations} from "../utils/mock/fakeSnippetOperations.ts";

const fakeSnippetOperations = new FakeSnippetOperations()

export class SnippetService implements SnippetOperations {
    createSnippet(createSnippet: CreateSnippet): Promise<Snippet> {
        return fakeSnippetOperations.createSnippet(createSnippet)
    }

    deleteSnippet(id: string): Promise<string> {
        return fakeSnippetOperations.deleteSnippet(id)
    }

    formatSnippet(snippet: string): Promise<string> {
        return fakeSnippetOperations.formatSnippet(snippet)
    }

    getFileTypes(): Promise<FileType[]> {
        return fakeSnippetOperations.getFileTypes()
    }

    getFormatRules(): Promise<Rule[]> {
        return fakeSnippetOperations.getFormatRules()
    }

    getLintingRules(): Promise<Rule[]> {
        return fakeSnippetOperations.getLintingRules()
    }

    getSnippetById(id: string): Promise<Snippet | undefined> {
        return fakeSnippetOperations.getSnippetById(id)
    }

    getTestCases(): Promise<TestCase[]> {
        return fakeSnippetOperations.getTestCases()
    }

    getUserFriends(name?: string, page?: number, pageSize?: number): Promise<PaginatedUsers> {
        return fakeSnippetOperations.getUserFriends(name, page, pageSize)
    }

    listSnippetDescriptors(page: number, pageSize: number, sippetName?: string): Promise<PaginatedSnippets> {
        return fakeSnippetOperations.listSnippetDescriptors(page, pageSize, sippetName)
    }

    modifyFormatRule(newRules: Rule[]): Promise<Rule[]> {
        return fakeSnippetOperations.modifyFormatRule(newRules)
    }

    modifyLintingRule(newRules: Rule[]): Promise<Rule[]> {
        return fakeSnippetOperations.modifyLintingRule(newRules)
    }

    postTestCase(testCase: Partial<TestCase>): Promise<TestCase> {
        return fakeSnippetOperations.postTestCase(testCase)
    }

    removeTestCase(id: string): Promise<string> {
        return fakeSnippetOperations.removeTestCase(id)
    }

    shareSnippet(snippetId: string, userId: string): Promise<Snippet> {
        return fakeSnippetOperations.shareSnippet(snippetId)
    }

    testSnippet(testCase: Partial<TestCase>): Promise<TestCaseResult> {
        return fakeSnippetOperations.testSnippet()
    }

    updateSnippetById(id: string, updateSnippet: UpdateSnippet): Promise<Snippet> {
        return fakeSnippetOperations.updateSnippetById(id, updateSnippet)
    }


}

export default SnippetService;