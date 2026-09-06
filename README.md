# Lumina AI

Lumina AI is an AI-powered image generation and transformation web application built with **Next.js**. It allows users to enhance, edit, and transform images using state-of-the-art AI features like restoration, background removal, generative fill, object removal, and recoloring — all powered by a **credit-based system**.

---
## 🔗 Live Demo

> Rebranded as **Lumina AI**. Configure your production deployment URL in your hosting provider.

## 🚀 Features

- ✨ **Image Restoration** – Enhance and restore old or damaged photos
- 🔍 **Background Removal** – Remove image backgrounds using AI
- 🧠 **Generative Fill** – Fill in missing parts of images with AI
- ❌ **Object Removal** – Eliminate unwanted objects from images
- 🎨 **Object Recoloring** – Change colors of specific image elements
- 🔐 **User Authentication** – Secure account management with Clerk
- 💳 **Credit System** – Usage-based features via credit pricing plans
- 📱 **Responsive Design** – Optimized for mobile, tablet, and desktop

---

## 🧰 Tech Stack

- **Frontend**: Next.js 14.1.0, React 18, Tailwind CSS
- **Authentication**: [Clerk](https://clerk.dev)
- **Database**: MongoDB, Mongoose
- **Image Processing**: [Cloudinary](https://cloudinary.com/)
- **Payments**: Stripe
- **Forms & Validation**: React Hook Form, Zod
- **UI**: Radix UI

---

## 📦 Project Structure
```
Lumina AI/
├── app/                    # Next.js App Router structure
├── assets/                 # Static assets
├── components/             # React components
├── constants/              # Application constants
├── lib/                    # Utility functions and server actions
│   ├── actions/            # Server actions
│   └── database/           # Database models and connection
└── public/                 # Public static files

```
---

## ⚙️ Getting Started

### ✅ Prerequisites

- Node.js **v18+**
- MongoDB account
- Cloudinary account
- Stripe account
- Clerk account

---

### 🔐 Environment Variables

Create a `.env.local` file in your root directory and add:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/


# Clerk Webhook
WEBHOOK_SECRET=your_webhook_secret

# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

### 🧑‍💻 Installation
Clone the repository:

git clone https://github.com/mozammel787/AImagery.git
cd AImagery
Install dependencies:

npm install
yarn install
Run the development server:

npm run dev
yarn dev
Open http://localhost:3000 to view the app in your browser.

### 🎯 Transformation Types
Lumina AI offers five main AI-powered transformation tools:

Restore Image – Enhance and restore old or damaged images

Background Remove – Remove image backgrounds

Generative Fill – Fill in missing or blank areas

Object Remove – Eliminate unwanted objects

Object Recolor – Change the color of specific objects

### 💳 Credit System
Each image transformation consumes credits. Users can choose from different pricing plans:

| Plan Name    | Credits | Price |
| ------------ | ------- | ----- |
| Free Plan    | 10      | Free  |
| Pro Package  | 120     | \$40  |
| Premium Plan | 2000    | \$199 |


Each transformation consumes 1 credit.

### 🚢 Deployment
The easiest way to deploy Lumina AI is to use Vercel, the creators of Next.js. Just connect your GitHub repository and set your environment variables.

### 📄 License
This project is licensed under the MIT License.

### 🙏 Acknowledgements
Next.js

Clerk

Cloudinary

MongoDB

Stripe

Tailwind CSS

Radix UI


---

Let me know if you’d like a version with badges, screenshots, or documentation links added.

