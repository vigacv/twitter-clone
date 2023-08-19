This is a Twitter Clone made using NextJS 13 and Supabase. NextJS newly App Router is used along with server components and server actions.

## Auth
The authentication is made using Supabase. For simplicity, a one-time password sent via email is used, but Supabase supports authentication with multiple providers.

## Database
The Database is hosted and managed by Supabase.

## Server Actions
The tweet, like and reply features are implemented using server actions. This allow to execute the code on server-side to avoid exposing credentials or sensitive data.

## Styling and components
The styling is made using Tailwind and shadcn/ui components (https://ui.shadcn.com/)