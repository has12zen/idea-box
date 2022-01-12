This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started
Install all the dependencies with:

```bash
npm install
# or
yarn install
```

run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack used

- [Next.js](https://nextjs.org/)
- [Chakra Ui](https://chakra-ui.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Rnd](https://github.com/bokuweb/react-rnd/)

## Dir Structure
```
.
├── public
│   ├── favicon.ico
│   ├── styles
│   │   ├── globals.css
│   │   └── Home.module.css
│   └── vercel.svg
├── README.md
├── src
│   ├── components
│   │   ├── addBucket.tsx
│   │   ├── Buckets.tsx
│   │   ├── editNote.tsx
│   │   ├── Navbar.tsx
│   │   └── Note.tsx
│   ├── pages
│   │   ├── api
│   │   │   └── hello.ts
│   │   ├── _app.tsx
│   │   └── index.tsx
│   └── utils
│       ├── _BucketValue.tsx
│       ├── _NoteValue.tsx
│       └── useLocalStorage.tsx
```