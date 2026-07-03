HUGO ?= hugo
PS ?= powershell -NoProfile -ExecutionPolicy Bypass -Command

.PHONY: dev build clean new-project check

dev:
	$(HUGO) server -D -F --disableFastRender --navigateToChanged --printPathWarnings

build:
	$(PS) "Remove-Item -Recurse -Force -ErrorAction SilentlyContinue public, 'resources/_gen'"
	$(HUGO) --gc --minify --cleanDestinationDir --printPathWarnings

clean:
	$(PS) "Remove-Item -Recurse -Force -ErrorAction SilentlyContinue public, resources"

new-project:
	$(PS) "if ('$(name)' -eq '') { Write-Error 'usage: make new-project name=my-project'; exit 1 }"
	$(HUGO) new content "projects/$(name)/index.md"

check: build
