# SmartBiz AI — Frontend

Next.js 14 frontend for SmartBiz AI.

## Tech Stack

- Next.js 14 with App Router
- React 18 + TypeScript
- Tailwind CSS
- TanStack Query
- Recharts
- React Hook Form + Zod
- react-toastify
- Lucide React
- js-cookie

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

Create `.env.local` in the frontend root:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=
```

## Demo Credentials

```
Email: demo@smartbizai.com
Password: Demo12345
```

## Routes

### Public
- `/` — Landing page
- `/features`
- `/how-it-works`
- `/about`
- `/contact`
- `/login`
- `/register`

### Protected
- `/dashboard`
- `/dashboard/business`
- `/dashboard/products`
- `/dashboard/data`
- `/dashboard/analytics`
- `/dashboard/reports`
- `/dashboard/ai-advisor`
- `/dashboard/recommendations`
- `/dashboard/admin`

## Deployment

### Vercel

```bash
npm run build
vercel --prod
```

Set `NEXT_PUBLIC_API_URL` to your backend URL in Vercel environment variables.

### Build

```bash
npm run build
npm start
```

## UI Notes

- Mobile-first responsive design
- Auth state managed via cookies
- API calls include Bearer token from cookies
- Toast notifications via react-toastify
