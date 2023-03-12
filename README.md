# Timeboxx

## Development

### Pre-requisites

- asdf

### Steps

```sh
asdf plugin add task || true
asdf plugin add nodejs || true
asdf plugin add pnpm || true
asdf plugin add poetry || true
asdf install

task setup-local
task docker:dev # `task dev` if you host your own db

# After db is ready
task db:upgrade
```