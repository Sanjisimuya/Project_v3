---
name: Orval OpenAPI codegen quirks in this project
description: Known incompatibilities between Orval-generated Zod validators and the project's pinned zod version.
---

Do not add `format: email` (or other string `format` keywords that map to Zod v4-only validators) to OpenAPI schemas in `lib/api-spec/openapi.yaml`.

**Why:** Orval generates `zod.email()` for `format: email`, which only exists in Zod v4. This project's catalog pins `zod: ^3.25.76`, so the generated code fails typecheck with TS2339 (`email` does not exist on the zod string builder). Removing the `format` keyword (keep plain `type: string`) fixes codegen without losing much — do manual/basic validation server-side if the format must be enforced.

**How to apply:** When writing or editing OpenAPI specs for Orval codegen in this project, stick to `type` + `enum`/`minLength`/`maxLength` constraints and avoid `format: email`, `format: uuid`, etc. unless you've confirmed the Zod version in `package.json`/catalog supports the generated helper.
