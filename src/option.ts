import * as core from "@actions/core";

export interface Option {
    githubToken: string;
    repository: string;
    graphqlUrl: string;
    number: number;
    id: string;
    show: boolean;
    body: string | null;
    bodyPath: string | null;
}

export function getOption(): Option {
    return {
        githubToken: getInput("github_token"),
        repository: getInput("repository"),
        graphqlUrl: getInput("graphql_url"),
        number: parseInt(getInput("number")),
        id: getInput("id"),
        show: getInput("show") == "true",
        body: getInputOrNull("body"),
        bodyPath: getInputOrNull("body_path"),
    };
}

function getInput(key: string): string {
    return core.getInput(key, { required: true });
}

function getInputOrNull(key: string): string | null {
    const value = core.getInput(key, { required: false });
    if (value.length == 0) {
        return null;
    }
    return value;
}
