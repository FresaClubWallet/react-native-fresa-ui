DEPLOY?=testnet

help:
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'


setup: ## install package dapp & contract-deploy
	npm install
	cd contract-deploy | npm install

generate-factory: ## clean & generate type chain from contract-deploy
	cd contract-deploy && npx hardhat clean
	cd contract-deploy && npx hardhat compile

start: ## start dapp expo
	npm start
