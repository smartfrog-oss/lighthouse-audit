# Lighthouse Audit Generator

Change URL in `config.json`, it's possible to have many URLs as an array, a dedicated lighthouse report will be generated to each URL, the current date will be used as a subfolder inside the reports folder.

## Commands

Generate report and start an HTTP server pointing to the reports folder:

```bash
yarn start
```

A dedicated command to only generate the reports:

```bash
yarn generate
```

A dedicated command to only serve the reports:

```bash
yarn serve
```
