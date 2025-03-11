# hidable-comment-action
[![CI-Master](https://github.com/MeilCli/hidable-comment-action/actions/workflows/ci-master.yml/badge.svg)](https://github.com/MeilCli/hidable-comment-action/actions/workflows/ci-master.yml)    
Create, update or delete comment by action argument

Features:
- Sticky comment
  - This action upsert comment.
- Conditional comment
  - This action can hide comment by action argument.
- Multiple comment type support
  - You can set multiple sticky comment by using `id`.
- Comment body from file
  - You can set comment body from file.
- Enterprise server support
  - You can use this action in enterprise server.

## Example
### Stick pull request comment
```yml
name: 'Example: Sticky Comment Body'

on:
  pull_request:
jobs:
  example:
    runs-on: ubuntu-latest
    steps:
      - uses: MeilCli/hidable-comment-action@v2
        with:
          number: ${{ github.event.pull_request.number }}
          show: true
          id: 'example-sticky-comment-body'
          body: 'your comment body'
```

You can also pin to a [specific release](https://github.com/MeilCli/hidable-comment-action/releases) version in the format @v2.x.x

And, you can use `body_path` to read comment body from file.

```yml
name: 'Example: Sticky Comment Body Path'

on:
  pull_request:
jobs:
  example:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: MeilCli/hidable-comment-action@v2
        with:
          number: ${{ github.event.pull_request.number }}
          show: true
          id: 'example-sticky-comment-body-path'
          body_path: 'file_path_to_your_comment_body'
```

### Check issue title
```yml
name: 'Check-Issue-Title'

on:
  issues:
    types: [opened, edited, reopened]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: MeilCli/regex-match@v2
        id: regex
        with:
          regex_pattern: 'test: .*'
          regex_option: 'g'
          search_string: ${{ github.event.issue.title }}
      - uses: MeilCli/hidable-comment-action@v2
        with:
          number: ${{ github.event.issue.number }}
          show: ${{ steps.regex.outputs.matched == 'false' }}
          id: 'title-lint'
          body: |
            title lint example body
            - test1
            - test2
            - test3
```

### Check Pull Request title
```yml
name: 'Check-Pull-Request-Title'

on:
  pull_request:
    types: [opened, edited, reopened]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: MeilCli/regex-match@v2
        id: regex
        with:
          regex_pattern: 'test: .*'
          regex_option: 'g'
          search_string: ${{ github.event.pull_request.title }}
      - uses: MeilCli/hidable-comment-action@v2
        with:
          number: ${{ github.event.pull_request.number }}
          show: ${{ steps.regex.outputs.matched == 'false' }}
          id: 'title-lint'
          body: |
            title lint example body
            - test1
            - test2
            - test3
```

## Input
- `github_token`
  - required
  - github token, using to read repository
  - default: `${{ github.token }}`
- `repository`
  - required
  - executed repository name
  - for example: MeilCli/hidable-comment-action
  - default: `${{ github.repository }}`
- `graphql_url`
  - required
  - github graphql api url
  - default: `${{ github.graphql_url }}`
- `number`
  - required
  - issue or pull request number
- `id`
  - required
  - Id for identify multiple hidable-comment-action in same issue or repository
  - default: `hidable-comment`
- `show`
  - required
  - value: `true` or `false`
  - if set the true, add or update comment. if set the false, delete comment
- `body`
  - required, eigher body or body_path
  - comment body
- `body_path`
  - required, eigher body or body_path
  - comment body path, if set, read body from file

## Contributes
[<img src="https://gist.githubusercontent.com/MeilCli/31fde39d6f48f6d2978d05cad61faf7e/raw/metrics_contributors.svg">](https://github.com/MeilCli/hidable-comment-action/graphs/contributors)

### Could you want to contribute?
see [Contributing.md](./.github/CONTRIBUTING.md)

## License
[<img src="https://gist.githubusercontent.com/MeilCli/31fde39d6f48f6d2978d05cad61faf7e/raw/metrics_licenses.svg">](LICENSE.txt)

### Using
- [actions/toolkit](https://github.com/actions/toolkit), published by [MIT License](https://github.com/actions/toolkit/blob/master/LICENSE.md)
- [apollo-client](https://github.com/apollographql/apollo-client), published by [MIT License](https://github.com/apollographql/apollo-client/blob/main/LICENSE)
- [cross-fetch](https://github.com/lquixada/cross-fetch), published by [MIT License](https://github.com/lquixada/cross-fetch/blob/main/LICENSE)
- [graphql](https://github.com/graphql/graphql-js), published by [MIT License](https://github.com/graphql/graphql-js/blob/main/LICENSE)