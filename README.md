# Project_v3

> Aplikasi web untuk mengelola data pengluaran setiap hari.

## Tentang

Repo ini adalah monorepo berbasis **pnpm workspaces** yang dikembangkan di Replit. Berisi API server, package library bersama, dan tooling untuk codegen API + database schema.

## Tech Stack

- **Runtime:** Node.js 24
- **Bahasa:** TypeScript 5.9
- **API:** Express 5
- **Database:** PostgreSQL + Drizzle ORM
- **Validasi:** Zod (`zod/v4`), `drizzle-zod`
- **API Codegen:** Orval (generate hooks & schema Zod dari OpenAPI spec)
- **Build:** esbuild (CJS bundle)
- **Package manager:** pnpm (wajib — repo ini menolak npm/yarn)

## Struktur Folder

```
.
├── artifacts/          # package-package aplikasi (mis. api-server)
├── lib/                 # library/kode bersama antar package
├── scripts/             # script utilitas/tooling
├── attached_assets/      # aset yang diunggah/dilampirkan
└── .agents/memory/       # konteks/memori agent (Replit)
```

## Persiapan

1. Install [pnpm](https://pnpm.io/installation) (jangan pakai npm/yarn, repo ini akan menolaknya).
2. Clone repo:
   ```bash
   git clone https://github.com/Sanjisimuya/Project_v3.git
   cd Project_v3
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Siapkan environment variable:
   ```
   DATABASE_URL=<connection string PostgreSQL kamu>
   ```

## Menjalankan Project

| Perintah | Fungsi |
|---|---|
| `pnpm --filter @workspace/api-server run dev` | Menjalankan API server (port 5000) |
| `pnpm run typecheck` | Typecheck seluruh package |
| `pnpm run build` | Typecheck + build semua package |
| `pnpm --filter @workspace/api-spec run codegen` | Generate ulang API hooks & Zod schema dari OpenAPI spec |
| `pnpm --filter @workspace/db run push` | Push perubahan schema database (khusus dev) |

## Kontribusi

Pull request dan issue dipersilakan. Pastikan `pnpm run typecheck` dan `pnpm run build` lolos sebelum membuat PR.

## Lisensi

MIT
