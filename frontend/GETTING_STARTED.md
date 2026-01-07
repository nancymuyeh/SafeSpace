# Getting Started with SafeSpace (Frontend Prototype)

This project is a frontend-only prototype of the SafeSpace mental health support platform. It uses mock data to demonstrate the UI and user interactions without requiring a backend or database.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## Installation

1. Clone or download the project files.
2. Open your terminal in the project root directory.
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the App Locally

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000` (or the port specified in your terminal).

## Key Features in this Prototype

- **Anonymous Feed**: Browse supportive stories from the community.
- **Story Sharing**: Experience the flow of sharing your own story.
- **Reactions**: Interact with stories using supportive reactions.
- **Resources**: View mental health support resources and emergency contacts.
- **Calm UI**: Designed with a soothing palette for emotional safety.

## Project Structure

- `client/src/pages`: Main application views (Home, Community, Resources).
- `client/src/components`: Reusable UI components.
- `client/src/hooks`: Mock data hooks (`use-stories.ts`, `use-auth.ts`).
- `client/src/index.css`: Global styles and theme configuration.
