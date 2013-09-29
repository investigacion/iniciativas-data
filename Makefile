data/json/iniciativas.json: \
	data/csv/iniciativas.csv \
	scripts/iniciativas.js \
	node_modules
	node \
		scripts/iniciativas $< $@

data/csv/iniciativas.csv:
	curl \
		--compressed \
		--output $@ \
		--time-cond $@ \
		--progress-bar \
		"https://docs.google.com/spreadsheet/pub?key=0Au1_UCDowko-dGpDSEdzRGs5VkZsLUtWTzZRY1NPckE&single=true&gid=0&output=csv"

node_modules: package.json
	npm install
	touch $@

test:
	jshint data/json/*.json

clean:
	rm -rf node_modules

.PHONY: test clean
