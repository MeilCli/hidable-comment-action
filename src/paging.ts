import { GetIssueOrPullRequestCommentQueryVariables } from "../graphql/graphql";
import { GitHubClient } from "./client";
import { GetIssueOrPullRequestCommentQueryIssueOrPullRequestCommentNode } from "./types";

// guard for infinity loop
const maxLoop = 100;

export interface IssueOrPullRequestWithPagingResult {
    __typename: "Issue" | "PullRequest";
    id: string;
    comments: GetIssueOrPullRequestCommentQueryIssueOrPullRequestCommentNode[];
}

export async function getIssueOrPullRequestCommentWithPaging(
    client: GitHubClient,
    variables: GetIssueOrPullRequestCommentQueryVariables
): Promise<IssueOrPullRequestWithPagingResult> {
    const comments: GetIssueOrPullRequestCommentQueryIssueOrPullRequestCommentNode[] = [];

    let response = await client.getIssueOrPullRequestComment(variables);
    let pageInfo = response.repository?.issueOrPullRequest?.comments.pageInfo;
    if (
        response.repository?.issueOrPullRequest?.comments.nodes == null ||
        response.repository.issueOrPullRequest.comments.nodes == undefined
    ) {
        if (
            response.repository?.issueOrPullRequest?.__typename == undefined ||
            response.repository.issueOrPullRequest.id == undefined
        ) {
            throw Error("__typename or id is invalid response");
        }
        return {
            __typename: response.repository?.issueOrPullRequest?.__typename,
            id: response.repository?.issueOrPullRequest?.id,
            comments: comments,
        };
    }
    for (const node of response.repository.issueOrPullRequest.comments.nodes) {
        if (node == null || node == undefined) {
            continue;
        }
        comments.push(node);
    }

    let loopCount = 0;
    while (
        pageInfo != null &&
        pageInfo != undefined &&
        pageInfo.hasNextPage &&
        pageInfo.endCursor != null &&
        pageInfo.endCursor != undefined
    ) {
        loopCount += 1;
        response = await client.getIssueOrPullRequestComment({ ...variables, after: pageInfo.endCursor });
        pageInfo = response.repository?.issueOrPullRequest?.comments.pageInfo;

        if (
            response.repository?.issueOrPullRequest?.comments.nodes == null ||
            response.repository.issueOrPullRequest.comments.nodes == undefined
        ) {
            if (
                response.repository?.issueOrPullRequest?.__typename == undefined ||
                response.repository.issueOrPullRequest.id == undefined
            ) {
                throw Error("__typename or id is invalid response");
            }
            return {
                __typename: response.repository?.issueOrPullRequest?.__typename,
                id: response.repository?.issueOrPullRequest?.id,
                comments: comments,
            };
        }
        for (const node of response.repository.issueOrPullRequest.comments.nodes) {
            if (node == null || node == undefined) {
                continue;
            }
            comments.push(node);
        }

        if (maxLoop <= loopCount) {
            throw Error("infinity loop detected");
        }
    }

    if (
        response.repository?.issueOrPullRequest?.__typename == undefined ||
        response.repository.issueOrPullRequest.id == undefined
    ) {
        throw Error("__typename or id is invalid response");
    }
    return {
        __typename: response.repository?.issueOrPullRequest?.__typename,
        id: response.repository?.issueOrPullRequest?.id,
        comments: comments,
    };
}
