HUGO ?= hugo
PS ?= powershell -NoProfile -ExecutionPolicy Bypass -Command
CACHE_DIR ?= $(CURDIR)/resources/_cache

.PHONY: dev build clean new-project check

dev:
	$(HUGO) server -D -F --disableFastRender --navigateToChanged --printPathWarnings --cacheDir "$(CACHE_DIR)"

build:
	$(HUGO) --gc --minify --cleanDestinationDir --printPathWarnings --cacheDir "$(CACHE_DIR)"

clean:
	$(PS) "Remove-Item -Recurse -Force -ErrorAction SilentlyContinue public, resources"

new-project:
	$(PS) "if ('$(name)' -eq '') { Write-Error 'usage: make new-project name=my-project'; exit 1 }"
	$(HUGO) new content "projects/$(name)/index.md"

check: build
