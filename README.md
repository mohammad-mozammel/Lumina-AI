# Lumina AI

Lumina AI is a credit-based image transformation platform built with Next.js. Users can upload images, apply AI-powered transformations, manage their image collections, and purchase additional credits through Stripe.

## Live Demo

Visit the deployed application at [web-lumina-ai.vercel.app](https://web-lumina-ai.vercel.app/).

## Features

- Image restoration
- Background removal
- Generative fill
- Object removal
- Object recoloring
- Clerk authentication and account management
- Cloudinary image upload, transformation, and delivery
- Credit balances and Stripe payments
- Responsive dashboard for browsing and managing transformed images

## Tech Stack

- **Framework:** Next.js 14 with the App Router
- **Language:** TypeScript
- **UI:** React, Tailwind CSS, Radix UI, Lucide React
- **Authentication:** Clerk
- **Database:** MongoDB with Mongoose
- **Media:** Cloudinary
- **Payments:** Stripe
- **Validation:** React Hook Form and Zod

## Requirements

- Node.js 18 or newer
- A MongoDB database
- A Clerk application
- A Cloudinary account
- A Stripe account with webhook access

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env.local` file in the project root:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
WEBHOOK_SECRET=your_clerk_webhook_secret

# MongoDB
MONGODB_URL=your_mongodb_connection_string

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishable_key
STRIPE_SECRET_KEY=your_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

Never commit `.env.local` or any other file containing credentials.

### 3. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run the Next.js lint checks |

## Application Routes

| Route | Purpose |
| --- | --- |
| `/` | Landing page |
| `/sign-in` | User sign-in |
| `/sign-up` | User registration |
| `/dashboard` | Image dashboard and collection view |
| `/transformations/add/[type]` | Create a new transformation |
| `/transformations/[id]` | View a transformation |
| `/transformations/[id]/update` | Update a transformation |
| `/credits` | View and purchase credit packages |
| `/profile` | View account and usage information |

## Project Structure

```text
app/            Next.js routes, layouts, and webhook handlers
components/     Shared application and UI components
constants/      Shared application constants
lib/actions/    Server actions for users, images, and transactions
lib/database/   MongoDB connection and Mongoose models
public/         Static assets, icons, and service worker files
types/          Shared TypeScript declarations
```

## Webhooks

Configure the following webhook endpoints in your providers:

- Clerk: `POST /api/webhooks/clerk`
- Stripe: `POST /api/webhooks/stripe`

Use the corresponding signing secrets in `WEBHOOK_SECRET` and `STRIPE_WEBHOOK_SECRET`.

## Deployment

Lumina AI can be deployed to Vercel or another Node.js-compatible platform.

1. Connect the repository to your hosting provider.
2. Add all required environment variables for the target environment.
3. Set `NEXT_PUBLIC_SERVER_URL` to the deployed application URL.
4. Update the Clerk and Stripe webhook URLs to use the deployed domain.
5. Run `npm run build` to verify the production build before release.

## License

This project is licensed under the MIT License.

