#Makefile

install:
	npm install

build:
	npm run build

start:
	npx babel-node src/bin/gendiff.js

publish:
	publish --dry-run

lint:
	npx eslint .

test:
	npm test
