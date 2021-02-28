import { MockedResponse, MockLink } from "@apollo/react-testing";
import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import {
    GetIssueOrPullRequestComment,
    GetIssueOrPullRequestCommentQuery,
    GetIssueOrPullRequestCommentQueryVariables,
} from "../graphql/graphql";
import { GitHubClient } from "../src/client";
import { getIssueOrPullRequestCommentWithPaging } from "../src/paging";

function createMockClient(mocks: ReadonlyArray<MockedResponse>): ApolloClient<NormalizedCacheObject> {
    return new ApolloClient({
        cache: new InMemoryCache({ addTypename: true }),
        link: new MockLink(mocks, true),
    });
}

test("getIssueOrPullRequestCommentWithPaging", async () => {
    const mocks: MockedResponse[] = [
        {
            request: {
                query: GetIssueOrPullRequestComment,
                variables: {
                    owner: "MeilCli",
                    name: "hidable-comment-action",
                    number: 1,
                    after: undefined,
                } as GetIssueOrPullRequestCommentQueryVariables,
            },
            result: {
                data: {
                    __typename: "Query",
                    repository: {
                        __typename: "Repository",
                        issueOrPullRequest: {
                            __typename: "Issue",
                            id: "id",
                            comments: {
                                __typename: "IssueCommentConnection",
                                pageInfo: { __typename: "PageInfo", hasNextPage: true, endCursor: "1" },
                                nodes: [
                                    {
                                        __typename: "IssueComment",
                                        body: "body1",
                                        id: "id1",
                                        author: {
                                            login: "MeilCli",
                                        },
                                    },
                                ],
                            },
                        },
                    },
                } as GetIssueOrPullRequestCommentQuery,
            },
        },
        {
            request: {
                query: GetIssueOrPullRequestComment,
                variables: {
                    owner: "MeilCli",
                    name: "hidable-comment-action",
                    number: 1,
                    after: "1",
                } as GetIssueOrPullRequestCommentQueryVariables,
            },
            result: {
                data: {
                    __typename: "Query",
                    repository: {
                        __typename: "Repository",
                        issueOrPullRequest: {
                            __typename: "Issue",
                            id: "id",
                            comments: {
                                __typename: "IssueCommentConnection",
                                pageInfo: { __typename: "PageInfo", hasNextPage: false, endCursor: "2" },
                                nodes: [
                                    {
                                        __typename: "IssueComment",
                                        body: "body2",
                                        id: "id2",
                                        author: {
                                            login: "MeilCli",
                                        },
                                    },
                                ],
                            },
                        },
                    },
                } as GetIssueOrPullRequestCommentQuery,
            },
        },
    ];

    const client = new GitHubClient(createMockClient(mocks));
    const result = await getIssueOrPullRequestCommentWithPaging(client, {
        owner: "MeilCli",
        name: "hidable-comment-action",
        number: 1,
    });

    expect(result.__typename).toBe("Issue");
    expect(result.id).toBe("id");
    expect(result.comments.length).toBe(2);
    expect(result.comments[0]).toMatchObject({
        __typename: "IssueComment",
        body: "body1",
        id: "id1",
        author: {
            login: "MeilCli",
        },
    });
    expect(result.comments[1]).toMatchObject({
        __typename: "IssueComment",
        body: "body2",
        id: "id2",
        author: {
            login: "MeilCli",
        },
    });
});

test("getIssueOrPullRequestCommentWithPagingInfinityLoop", async () => {
    const mocks: MockedResponse[] = [
        {
            request: {
                query: GetIssueOrPullRequestComment,
                variables: {
                    owner: "MeilCli",
                    name: "hidable-comment-action",
                    number: 1,
                    after: undefined,
                } as GetIssueOrPullRequestCommentQueryVariables,
            },
            result: {
                data: {
                    __typename: "Query",
                    repository: {
                        __typename: "Repository",
                        issueOrPullRequest: {
                            __typename: "Issue",
                            id: "id",
                            comments: {
                                __typename: "IssueCommentConnection",
                                pageInfo: { __typename: "PageInfo", hasNextPage: true, endCursor: "1" },
                                nodes: [
                                    {
                                        __typename: "IssueComment",
                                        body: "body1",
                                        id: "id1",
                                        author: {
                                            login: "MeilCli",
                                        },
                                    },
                                ],
                            },
                        },
                    },
                } as GetIssueOrPullRequestCommentQuery,
            },
        },
        {
            request: {
                query: GetIssueOrPullRequestComment,
                variables: {
                    owner: "MeilCli",
                    name: "hidable-comment-action",
                    number: 1,
                    after: "1",
                } as GetIssueOrPullRequestCommentQueryVariables,
            },
            result: {
                data: {
                    __typename: "Query",
                    repository: {
                        __typename: "Repository",
                        issueOrPullRequest: {
                            __typename: "Issue",
                            id: "id",
                            comments: {
                                __typename: "IssueCommentConnection",
                                pageInfo: { __typename: "PageInfo", hasNextPage: true, endCursor: "1" },
                                nodes: [
                                    {
                                        __typename: "IssueComment",
                                        body: "body2",
                                        id: "id2",
                                        author: {
                                            login: "MeilCli",
                                        },
                                    },
                                ],
                            },
                        },
                    },
                } as GetIssueOrPullRequestCommentQuery,
            },
        },
    ];

    const client = new GitHubClient(createMockClient(mocks));
    await expect(
        getIssueOrPullRequestCommentWithPaging(client, {
            owner: "MeilCli",
            name: "hidable-comment-action",
            number: 1,
        })
    ).rejects.toThrow();
});
