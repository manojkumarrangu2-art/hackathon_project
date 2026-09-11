This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## PDF/DOCX Grounding Fix (ExamAce)

The Ask AI flow is now document-first:
- Real PDF/DOCX/TXT uploads are extracted on the server.
- Uploaded files are chunked into source-specific material chunks.
- Auto-match uses the selected subject ID, not only the display name.
- The upload modal synchronizes its subject with the current Ask AI subject.
- Question terms rank the most relevant chunks before sending context to the model.
- The AI prompt is strict about using only the selected document.
- If no live AI key is configured, the demo fallback returns source-faithful extracts instead of inventing a generic answer.

After pulling this version, run:

```bash
npm install
npm run dev
```

For scanned/image-only PDFs, OCR is still required because text extraction cannot read images without an OCR engine.


## PDF/RAG setup

This version performs real server-side extraction for uploaded PDF/DOCX/TXT/MD files and grounds Ask AI in the selected document's chunks.

After extracting the project, use:

```bash
npm install
npm run dev
```

Do **not** run `npm ci` on this package because the lockfile is intentionally omitted so npm can generate a lockfile matching the added PDF/DOCX extraction dependencies.

If a PDF is scanned/image-only, text extraction will report that OCR is required rather than generating an unrelated answer.
