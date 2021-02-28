import { GetIssueOrPullRequestCommentQuery } from "../graphql/graphql";

export type GetIssueOrPullRequestCommentQueryRepository = Exclude<
    GetIssueOrPullRequestCommentQuery["repository"],
    null | undefined
>;
export type GetIssueOrPullRequestCommentQueryIssueOrPullRequest = Exclude<
    GetIssueOrPullRequestCommentQueryRepository["issueOrPullRequest"],
    null | undefined
>;
export type GetIssueOrPullRequestCommentQueryIssueOrPullRequestComment = Exclude<
    GetIssueOrPullRequestCommentQueryIssueOrPullRequest["comments"],
    null | undefined
>;
export type GetIssueOrPullRequestCommentQueryIssueOrPullRequestCommentNodes = Exclude<
    GetIssueOrPullRequestCommentQueryIssueOrPullRequestComment["nodes"],
    null | undefined
>;
export type GetIssueOrPullRequestCommentQueryIssueOrPullRequestCommentNode = Exclude<
    GetIssueOrPullRequestCommentQueryIssueOrPullRequestCommentNodes[number],
    null | undefined
>;
