import * as core from "@actions/core";
import * as fs from "fs";
import { getOption, Option } from "./option";
import { githubClient } from "./client";
import { getIssueOrPullRequestCommentWithPaging } from "./paging";
import { isHidableComment, createHidableComment } from "./comment";

function getCommentBody(option: Option): string {
    if (option.body != null) {
        return option.body;
    }
    if (option.bodyPath == null) {
        throw Error("body or body_path is required");
    }

    if (fs.existsSync(option.bodyPath) == false) {
        throw Error("body_path does not exist");
    }

    return fs.readFileSync(option.bodyPath).toString();
}

async function run() {
    try {
        const option = getOption();
        const client = githubClient(option);
        if (option.repository.includes("/") == false) {
            throw Error("invalid repository value");
        }
        const owner = option.repository.split("/")[0];
        const name = option.repository.split("/")[1];
        // if bot account, including '[bot]'. but author.login will not include it
        const loginUser = (await client.getLoginUser({})).viewer.login.split("[")[0];
        const issueOrPullRequest = await getIssueOrPullRequestCommentWithPaging(client, {
            owner,
            name,
            number: option.number,
        });

        let targetCommentId: string | null = null;
        let targetCommentBody: string | null = null;
        for (const comment of issueOrPullRequest.comments) {
            if (comment.author?.login != loginUser) {
                continue;
            }
            if (isHidableComment(comment.body, option.id)) {
                targetCommentId = comment.id;
                targetCommentBody = comment.body;
                break;
            }
        }

        if (targetCommentId == null) {
            if (option.show) {
                await client.addComment({
                    id: issueOrPullRequest.id,
                    body: createHidableComment(getCommentBody(option), option.id),
                });
                core.info(`added comment to ${issueOrPullRequest.id}`);
            } else {
                core.info(`not found comment`);
            }
        } else {
            if (option.show) {
                const expectBody = createHidableComment(getCommentBody(option), option.id);
                if (expectBody != targetCommentBody) {
                    await client.updateComment({ id: targetCommentId, body: expectBody });
                    core.info(`updated comment at ${targetCommentId}`);
                } else {
                    core.info(`not updated comment at ${targetCommentId}`);
                }
            } else {
                await client.deleteComment({ id: targetCommentId });
                core.info(`deleted comment at ${targetCommentId}`);
            }
        }
    } catch (error) {
        if (error instanceof Error) {
            core.setFailed(error.message);
        }
    }
}

run();
