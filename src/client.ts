import fetch from "cross-fetch";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { Option } from "./option.js";
import {
    AddComment,
    AddCommentMutation,
    AddCommentMutationVariables,
    DeleteComment,
    DeleteCommentMutation,
    DeleteCommentMutationVariables,
    GetIssueOrPullRequestComment,
    GetIssueOrPullRequestCommentQuery,
    GetIssueOrPullRequestCommentQueryVariables,
    GetLoginUser,
    GetLoginUserQuery,
    GetLoginUserQueryVariables,
    UpdateComment,
    UpdateCommentMutation,
    UpdateCommentMutationVariables,
} from "../graphql/graphql.js";

export function githubClient(option: Option): GitHubClient {
    return new GitHubClient(
        new ApolloClient({
            link: new HttpLink({
                uri: option.graphqlUrl,
                headers: { authorization: `token ${option.githubToken}` },
                fetch,
            }),
            cache: new InMemoryCache(),
        }),
    );
}

export class GitHubClient {
    constructor(private readonly client: ApolloClient) {}

    async addComment(variables: AddCommentMutationVariables): Promise<AddCommentMutation | null | undefined> {
        const result = await this.client.mutate<AddCommentMutation>({ mutation: AddComment, variables: variables });
        return result.data;
    }

    async deleteComment(variables: DeleteCommentMutationVariables): Promise<DeleteCommentMutation | null | undefined> {
        const result = await this.client.mutate<DeleteCommentMutation>({
            mutation: DeleteComment,
            variables: variables,
        });
        return result.data;
    }

    async getIssueOrPullRequestComment(
        variables: GetIssueOrPullRequestCommentQueryVariables,
    ): Promise<GetIssueOrPullRequestCommentQuery | undefined> {
        const result = await this.client.query<GetIssueOrPullRequestCommentQuery>({
            query: GetIssueOrPullRequestComment,
            variables: variables,
        });
        return result.data;
    }

    async getLoginUser(variables: GetLoginUserQueryVariables): Promise<GetLoginUserQuery | undefined> {
        const result = await this.client.query<GetLoginUserQuery>({ query: GetLoginUser, variables: variables });
        return result.data;
    }

    async updateComment(variables: UpdateCommentMutationVariables): Promise<UpdateCommentMutation | null | undefined> {
        const result = await this.client.mutate<UpdateCommentMutation>({
            mutation: UpdateComment,
            variables: variables,
        });
        return result.data;
    }
}
