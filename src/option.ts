import * as core from "@actions/core";

export interface Option {
    githubToken: string;
    repository: string;
    graphqlUrl: string;
    number: number;
    id: string;
    show: boolean;
    body: string;
}

export function getOption(): Option {
    return {
        githubToken: getInput("github_token"),
        repository: getInput("repository"),
        graphqlUrl: getInput("graphql_url"),
        number: parseInt(getInput("number")),
        id: getInput("id"),
        show: getInput("show") == "true",
        body: getInput("body"),
    };
}

function getInput(key: string): string {
    return core.getInput(key, { required: true });
}
