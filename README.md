# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/12621bb3-0917-48bf-a50b-aa5f5367a2d8

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/12621bb3-0917-48bf-a50b-aa5f5367a2d8) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/12621bb3-0917-48bf-a50b-aa5f5367a2d8) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Design updates (Oct 2025)

- Mobile-first Home simplified: The Home page now focuses on a single, clear action — sharing a community idea. We removed the hero, quick actions, milestones, impact tree, and noisy stats per feedback.
- Idea-first flow: A concise description explains proposals, with two buttons: “Share your idea” (opens the proposal dialog) and “See community ideas” (deep links to Events > Proposed via `?tab=proposed`).
- Consistent spacing: Introduced section helpers in `src/index.css` (`.section`, `.section-grid`, `.section-title`) for uniform mobile spacing.
- Warm community palette: Teal/green primary with coral accent applied via CSS variables in `src/index.css`. Tailwind colors read from these variables (see `tailwind.config.ts`).

Tip: To preview proposed ideas directly, open `/events?tab=proposed`.
