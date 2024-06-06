import {SnippetOperations} from "../utils/snippetOperations.ts";


const SnippetService: () => SnippetOperations = () => {
    const [fakeStore] = useState(new FakeSnippetStore());

    const listSnippetDescriptors = (page: number, pageSize: number, sippetName?: string): Promise<PaginatedSnippets> => {
        const response = {
            page: page,
            page_size: pageSize,
            count: 20,
            snippets: page === 0 ? fakeStore.listSnippetDescriptors().splice(0, pageSize) : fakeStore.listSnippetDescriptors().splice(1, 2)
        };
        return new Promise(resolve => {
            setTimeout(() => resolve(response), DELAY);
        });
    };

    const createSnippet = (createSnippetData: CreateSnippet): Promise<Snippet> => {
        return new Promise(resolve => {
            setTimeout(() => resolve(fakeStore.createSnippet(createSnippetData)), DELAY);
        });
    };

    const getSnippetById = (id: string): Promise<Snippet | undefined> => {
        return new Promise(resolve => {
            setTimeout(() => resolve(fakeStore.getSnippetById(id)), DELAY);
        });
    };

    const updateSnippetById = (id: string, updateSnippet: UpdateSnippet): Promise<Snippet> => {
        return new Promise(resolve => {
            setTimeout(() => resolve(fakeStore.updateSnippet(id, updateSnippet)), DELAY);
        });
    };

    const getUserFriends = (name?: string, page?: number, pageSize?: number): Promise<PaginatedUsers> => {
        return new Promise(resolve => {
            setTimeout(() => resolve(fakeStore.getUserFriends(name, page, pageSize)), DELAY);
        });
    };
}

export default SnippetService;