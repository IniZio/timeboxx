# Timeboxx

## Environments

<table>
<tr>
	<td>Environment
	<td>Backend
	<td>Frontend
<tr>
	<td><b>Local</b>
	<td><a href="http://localhost:8000/graphql">http://localhost:8000/graphql
	<td><a href="http://localhost:5173">http://localhost:5173

<tr>
	<td><b>Production</b>
	<td><a href="https://timeboxx.fly.dev/graphql">https://timeboxx.fly.dev/graphql
	<td><a href="https://timeboxx.fly.dev">https://timeboxx.fly.dev
</table>

## Development

### Pre-requisites

- [asdf](https://asdf-vm.com/)

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

## Deployment

### Pre-requisites

- [flyctl](https://fly.io/docs/hands-on/install-flyctl/)
- [blackbox](https://github.com/StackExchange/blackbox)


### Steps

```sh
task deploy:production
```