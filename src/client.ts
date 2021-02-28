import fetch from "cross-fetch";
import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { Option } from "./option";
import {
    AddComment,
    AddCommentMutation,
    AddCommentMutationVariables,
    DeleteIssueComment,
    DeleteIssueCommentMutation,
    DeleteIssueCommentMutationVariables,
    DeletePullRequestComment,
    DeletePullRequestCommentMutation,
    DeletePullRequestCommentMutationVariables,
    GetIssueOrPullRequestComment,
    GetIssueOrPullRequestCommentQuery,
    GetIssueOrPullRequestCommentQueryVariables,
    GetLoginUser,
    GetLoginUserQuery,
    GetLoginUserQueryVariables,
    UpdateIssueComment,
    UpdateIssueCommentMutation,
    UpdateIssueCommentMutationVariables,
    UpdatePullRequestComment,
    UpdatePullRequestCommentMutation,
    UpdatePullRequestCommentMutationVariables,
} from "../graphql/graphql";

export function githubClient(option: Option): GitHubClient {
    return new GitHubClient(
        new ApolloClient({
            link: new HttpLink({
                uri: "https://api.github.com/graphql",
                headers: { authorization: `token ${option.githubToken}` },
                fetch,
            }),
            cache: new InMemoryCache(),
        })
    );
}

export class GitHubClient {
    constructor(private readonly client: ApolloClient<NormalizedCacheObject>) {}

    async addComment(variables: AddCommentMutationVariables): Promise<AddCommentMutation | null | undefined> {
        const result = await this.client.mutate<AddCommentMutation>({
            mutation: AddComment,
            variables: variables,
        });
        return result.data;
    }

    async deleteIssuComment(
        variables: DeleteIssueCommentMutationVariables
    ): Promise<DeleteIssueCommentMutation | null | undefined> {
        const result = await this.client.mutate<DeleteIssueCommentMutation>({
            mutation: DeleteIssueComment,
            variables: variables,
        });
        return result.data;
    }

    async deletePullRequestComment(
        variables: DeletePullRequestCommentMutationVariables
    ): Promise<DeletePullRequestCommentMutation | null | undefined> {
        const result = await this.client.mutate<DeletePullRequestCommentMutation>({
            mutation: DeletePullRequestComment,
            variables: variables,
        });
        return result.data;
    }

    async getIssueOrPullRequestComment(
        variables: GetIssueOrPullRequestCommentQueryVariables
    ): Promise<GetIssueOrPullRequestCommentQuery> {
        const result = await this.client.query<GetIssueOrPullRequestCommentQuery>({
            query: GetIssueOrPullRequestComment,
            variables: variables,
        });
        return result.data;
    }

    async getLoginUser(variables: GetLoginUserQueryVariables): Promise<GetLoginUserQuery> {
        const result = await this.client.query<GetLoginUserQuery>({
            query: GetLoginUser,
            variables: variables,
        });
        return result.data;
    }

    async updateIssueComment(
        variables: UpdateIssueCommentMutationVariables
    ): Promise<UpdateIssueCommentMutation | null | undefined> {
        const result = await this.client.mutate<UpdateIssueCommentMutation>({
            mutation: UpdateIssueComment,
            variables: variables,
        });
        return result.data;
    }

    async updatePullRequestComment(
        variables: UpdatePullRequestCommentMutationVariables
    ): Promise<UpdatePullRequestCommentMutation | null | undefined> {
        const result = await this.client.mutate<UpdatePullRequestCommentMutation>({
            mutation: UpdatePullRequestComment,
            variables: variables,
        });
        return result.data;
    }
}
