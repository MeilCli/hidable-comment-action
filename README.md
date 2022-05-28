# hidable-comment-action
[![CI-Master](https://github.com/MeilCli/hidable-comment-action/actions/workflows/ci-master.yml/badge.svg)](https://github.com/MeilCli/hidable-comment-action/actions/workflows/ci-master.yml)    
Create, update or delete comment by action argument

## Example
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
      - uses: MeilCli/regex-match@v1
        id: regex
        with:
          regex_pattern: 'test: .*'
          regex_option: 'g'
          search_string: ${{ github.event.issue.title }}
      - uses: MeilCli/hidable-comment-action@v1
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
You can also pin to a [specific release](https://github.com/MeilCli/hidable-comment-action/releases) version in the format @v1.x.x

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
      - uses: MeilCli/regex-match@v1
        id: regex
        with:
          regex_pattern: 'test: .*'
          regex_option: 'g'
          search_string: ${{ github.event.pull_request.title }}
      - uses: MeilCli/hidable-comment-action@v1
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
  - required
  - comment body

## Contributes
[<img src="https://gist.github.com/MeilCli/31fde39d6f48f6d2978d05cad61faf7e/raw/372f88f3f9a7a1cf3315fb146935b3994ba89cf3/metrics_contributors.svg">](https://github.com/MeilCli/hidable-comment-action/graphs/contributors)

### Could you want to contribute?
see [Contributing.md](./.github/CONTRIBUTING.md)

## License
[<img src="https://gist.github.com/MeilCli/31fde39d6f48f6d2978d05cad61faf7e/raw/372f88f3f9a7a1cf3315fb146935b3994ba89cf3/metrics_licenses.svg">](LICENSE.txt)

### Using
- [actions/toolkit](https://github.com/actions/toolkit), published by [MIT License](https://github.com/actions/toolkit/blob/master/LICENSE.md)
- [apollo-client](https://github.com/apollographql/apollo-client), published by [MIT License](https://github.com/apollographql/apollo-client/blob/main/LICENSE)
- [cross-fetch](https://github.com/lquixada/cross-fetch), published by [MIT License](https://github.com/lquixada/cross-fetch/blob/main/LICENSE)
- [graphql](https://github.com/graphql/graphql-js), published by [MIT License](https://github.com/graphql/graphql-js/blob/main/LICENSE)