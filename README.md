# Coffee Shop Management System

A comprehensive NextJS-based coffee shop management system with both customer-facing and administrative interfaces.

## Features

### Customer-Facing Features

- **Home**: Landing page with featured products and services
- **Shop**: Browse and purchase coffee products
- **Services**: View available coffee shop services
- **Reservation**: Book tables and make reservations
- **Cart**: Manage shopping cart items
- **Wishlist**: Save favorite products
- **Checkout**: Complete purchase process
- **Order Confirmation**: View order details and status
- **Authentication**:
  - Sign In
  - Sign Up
- **About**: Information about the coffee shop
- **Contact**: Contact information and support

### Administrative Dashboard

- **Dashboard**: Overview and key metrics
- **Orders**: Manage customer orders
- **Inventory**: Track product stock
- **Menu**: Manage product menu
- **Reservations**: Handle table bookings
- **Customers**: Customer management
- **Staff**: Employee management
- **Suppliers**: Supplier management
- **Promotions**: Manage special offers
- **Analytics**: Business insights
- **Reports**: Generate business reports
- **Feedback**: Customer feedback management
- **AI Assistant**: AI-powered business support
- **Settings**: System configuration
- **Search**: Advanced search functionality

## Tech Stack

- **Framework**: Next.js 15.2.3
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Authentication**: Firebase
- **AI Integration**: Google AI, OpenAI
- **Data Visualization**: Recharts
- **Form Handling**: React Hook Form
- **PDF Generation**: jsPDF
- **Excel Handling**: XLSX

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:9002](http://localhost:9002) in your browser

## Available Scripts

- `npm run dev`: Start development server with Turbopack
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint
- `npm run typecheck`: Run TypeScript type checking
- `npm run genkit:dev`: Start Genkit development server
- `npm run genkit:watch`: Start Genkit in watch mode

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── (frontend)/        # Customer-facing pages
│   │   ├── about/        # About page
│   │   ├── cart/         # Shopping cart
│   │   ├── checkout/     # Checkout process
│   │   ├── contact/      # Contact page
│   │   ├── home/         # Home page
│   │   ├── order-confirmation/ # Order confirmation
│   │   ├── product/      # Product details
│   │   ├── reservation/  # Table reservations
│   │   ├── service/      # Services page
│   │   ├── shop/         # Shop page
│   │   ├── signin/       # Sign in page
│   │   ├── signup/       # Sign up page
│   │   └── wishlist/     # Wishlist page
│   │
│   ├── (dashboard)/      # Admin dashboard pages
│   │   ├── ai-assistant/ # AI assistant interface
│   │   ├── analytics/    # Analytics dashboard
│   │   ├── customers/    # Customer management
│   │   ├── dashboard/    # Main dashboard
│   │   ├── feedback/     # Customer feedback
│   │   ├── inventory/    # Inventory management
│   │   ├── logout/       # Logout functionality
│   │   ├── menu/         # Menu management
│   │   ├── orders/       # Order management
│   │   ├── promotions/   # Promotions management
│   │   ├── reports/      # Reports generation
│   │   ├── reservations/ # Reservation management
│   │   ├── search/       # Search functionality
│   │   ├── settings/     # System settings
│   │   ├── staff/        # Staff management
│   │   └── suppliers/    # Supplier management
│   │
│   ├── api/              # API routes
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Root page
│
├── components/           # Reusable components
│   ├── dashboard/       # Dashboard-specific components
│   ├── frontend/        # Frontend-specific components
│   ├── icons/           # Icon components
│   └── ui/              # UI components
│
├── hooks/               # Custom React hooks
│   ├── use-mobile.tsx   # Mobile detection hook
│   └── use-toast.ts     # Toast notification hook
│
├── lib/                 # Utility functions
│   ├── constants.ts     # Application constants
│   └── utils.ts         # Utility functions
│
└── ai/                  # AI-related functionality
    ├── flows/           # AI workflow definitions
    ├── dev.ts           # Development utilities
    └── genkit.ts        # Genkit configuration

# Configuration Files
├── next.config.js       # Next.js configuration
├── next.config.ts       # TypeScript Next.js configuration
├── tailwind.config.ts   # Tailwind CSS configuration
├── postcss.config.mjs   # PostCSS configuration
├── tsconfig.json        # TypeScript configuration
├── components.json      # Components configuration
└── apphosting.yaml      # App hosting configuration
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

- Firebase configuration
- AI API keys
- Other necessary environment variables

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request
