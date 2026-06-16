# ⚙️ E-Commerce Admin Panel

A Next.js admin dashboard for managing an eCommerce platform.
Provides full control over products, categories, stock levels,
customers, and orders — built with **Shadcn/ui** components and
Tailwind CSS.

🔗 **Related Repositories**
- [REST API Backend (Laravel)](https://github.com/kaiser-hamid/shop_api)
- [Customer Storefront (Next.js)](https://github.com/kaiser-hamid/shop_frontend)

---

## ✨ Features

- Product management — create, edit, delete, image upload
- Hierarchical category management (3-level nesting)
- Stock and quantity control
- Customer listing and management
- Order management and status tracking
- Shadcn/ui components for consistent, accessible UI
- Custom React hooks for reusable data fetching logic
- Next.js App Router with protected admin routes

---

## 🛠️ Tech Stack

**Framework:** Next.js 14+ (App Router)  
**Language:** JavaScript  
**UI Components:** Shadcn/ui  
**Styling:** Tailwind CSS  
**Auth:** Laravel Sanctum (via API)  

---

## 🚀 Getting Started

### Requirements
- Node.js 18+
- Running instance of [shop_api](https://github.com/kaiser-hamid/shop_api)

### Installation

```bash
git clone https://github.com/kaiser-hamid/shop_admin.git
cd shop_admin
npm install
cp .env.example .env.local
npm run dev
```

### Environment Variables

NEXT_PUBLIC_API_URL=http://localhost:8000/api

Open [http://localhost:3000](http://localhost:3000) to view in browser.

---

## 📁 Project Structure

app/                  # Next.js App Router pages

├── products/         # Product management pages

├── categories/       # Category management pages

├── customers/        # Customer management pages

└── orders/           # Order management pages

components/           # Reusable UI components

hooks/                # Custom React hooks

lib/                  # API utilities and helpers

---

## 🔮 Planned Improvements

- Dashboard analytics and sales charts
- Role-based access control (admin/manager)
- Bulk product import via CSV
- TypeScript migration
