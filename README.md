# AI Print Configurator 🎨🤖

Create custom T-shirt designs with AI-generated slogans and icons.

## Features
- 🧠 AI slogan generator (GPT-4)
- 🎨 AI image creator (DALL·E 3)
- 💾 Save designs with Supabase
- 💰 Stripe subscription system
- 🚀 Built with Next.js 14, Tailwind, and ShadCN

## Tech Stack
Next.js, TypeScript, Tailwind, OpenAI API, Supabase, Stripe

## Demo
[ai-print.vercel.app](https://ai-print.vercel.app)

## Setup
1. Clone repo
2. Add `.env.local` with API keys
3. Run `npm install`
4. Run `npm run dev`
                          
                          
                          ┌────────────────────--┐
                          │   Next.js Frontend   │
                          │ (React + TypeScript  │
                          │  + Tailwind + ShadCN)│
                          └─────────┬──────────--┘
                                    │
                    ┌───────────────┼────────────────┐
                    │                                │
          ┌─────────▼────────┐            ┌──────────▼────────┐
          │  OpenAI API      │            │  DALL·E 3 (Images)│
          │ (Text generation)│            │ (Design icons)    │
          └─────────▲────────┘            └──────────▲────────┘
                    │                                │
                    │                                │
           ┌────────┴─────────┐          ┌───────────┴───────────┐
           │  Supabase DB     │          │      Stripe API       │
           │ (Auth, Designs,  │          │ (Payments, Subscriptions)
           │  AI History)     │          └───────────┬───────────┘
           └────────▲─────────┘                      │
                    │                                │
            ┌───────┴────────┐             ┌─────────▼──────────┐
            │  Configurator  │             │  Dashboard / Admin  │
            │ (Canvas, Fonts,│             │ (Manage users, plans)│
            │  Exports)      │             └─────────────────────┘
            └────────────────┘
