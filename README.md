# HostelHub

HostelHub is a modern hostel management platform designed to streamline meal management, user administration, payments, and community engagement for students and administrators. Built with React, Node.js, MongoDB, and Stripe, HostelHub offers a seamless experience for both web and mobile users.

## Features

- **User Authentication & Roles:** Secure login/signup, with roles for students and admins.
- **Meal Management:** Add, update, delete, and view meals with image uploads and category filtering.
- **Meal Requests:** Students can request meals, view status, and cancel requests.
- **Payment Integration:** Secure payments via Stripe for memberships and meal plans.
- **Review System:** Students can review meals; admins can manage reviews.
- **Cooking Challenges:** Participate in monthly cooking challenges and view winners.
- **Membership Plans:** Multiple membership tiers with different benefits.
- **Admin Dashboard:** Manage users, meals, reviews, and view analytics.
- **Responsive UI:** Modern, mobile-friendly design using Tailwind CSS and Framer Motion.
- **Notifications:** Real-time feedback with toast notifications.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Framer Motion, React Query
- **Backend:** Node.js, Express, MongoDB
- **Authentication:** Firebase Auth
- **Payments:** Stripe
- **Image Hosting:** ImgBB
- **Deployment:** Vercel (client), (server URL configurable)

## Project Structure

```
HostelHub Client/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── firebase/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   └── utils/
├── .env.local
├── package.json
├── vite.config.js
└── README.md

HostelHub-Server/
├── index.js
├── package.json
└── ...
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- MongoDB database
- Firebase project (for Auth)
- Stripe account (for payments)
- ImgBB account (for image uploads)

### Environment Variables

Create a `.env.local` file in the client root:

```
VITE_BASE_URL=your_server_url
VITE_IMGBB_API_KEY=your_imgbb_api_key
VITE_stripe_publishable_key=your_stripe_publishable_key
```

Set up environment variables for the server as needed (MongoDB URI, Firebase credentials, Stripe secret key, etc).

### Installation

#### Client

```sh
cd HostelHub\ Client
npm install
npm run dev
```

#### Server

```sh
cd HostelHub-Server
npm install
npm start
```

### Deployment

- Client: Deploy to Vercel or Netlify.
- Server: Deploy to Vercel, Render, or your preferred Node.js hosting.

## Usage

- Visit the deployed site or run locally at `http://localhost:5173`
- Register as a student or log in as an admin to access the dashboard.
- Manage meals, users, reviews, and participate in community features.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

---

**HostelHub** – Empowering hostel communities, one meal at a time.
