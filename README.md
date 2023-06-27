<div style="display:flex; align-items: center">
  <img src="public/readme/assets/logo-redberry.png" alt="logo" width="220" style="margin-right: 20px" />
  <h1 style="position:relative; top: -6px" >Epic Movie Quotes</h1>
</div>

Epic Movie Quotes is a full-stack application designed to cater to movie enthusiasts. It provides a user-friendly platform where users can register, log in, and dive into a vast collection of movies and their quotes.Real-time updates keep users informed about the activity on their quotes, including likes and comments. Users have the flexibility to personalize their profiles and contribute their own quotes to enrich the collection. Features, such as multilinguality and data searching are supported.

#

### Table of Contents

- [Prerequisites](#prerequisites)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Resources](#resources)

#

### Prerequisites

- <img src="public/readme/assets/npm.png" width="35" style="position: relative; top: 4px" /> npm@8.19 and up
- <img src="public/readme/assets/node.png" width="35" style="position: relative; top: 6px" /> node@16.18 and up
- <img src="public/readme/assets/typescript.png" width="25" style="position: relative; top: 6px" /> typescript@16.18 and up

#

### Tech Stack

- <img src="public/readme/assets/next.png" height="18" style="position: relative; top: 4px" /> [Next](https://nextjs.org/) - The React Framework for the Web
- <img src="public/readme/assets/tailwind.png" height="19" style="position: relative; top: 4px" /> [Tailwind](https://tailwindui.com/) - CSS Framework
- <img src="public/readme/assets/pusher.png" height="19" style="position: relative; top: 4px" /> [Pusher](https://pusher.com/) - Real-time messaging and event-driven platform
- <img src="public/readme/assets/react-hook-form.png" height="19" style="position: relative; top: 4px" /> [React Hook Form](https://react-hook-form.com/) - Performant and extensible React forms
- <img src="public/readme/assets/react-query.png" height="19" style="position: relative; top: 4px" /> [React Query](https://react-hook-form.com/) - Data fetching and caching library

#

### Getting Started

1\. First of all you need to clone Covid Questionnaire repository from github:

```sh
git clone https://github.com/RedberryInternship/elene-metreveli-epic-movie-quotes-front
```

2\. Next step requires you to run _npm install_ in order to install all the dependencies.

```sh
npm install
```

3\. after you have installed all the dependencies, it's time to run the project.

```sh
npm run dev
```

#

### Project Structure

```bash
├── public
├── src
│   ├── components
│   │   ├── movie
│   │   │   ├── AddQuoteFromMovies
│   │   │   │   ├── AddQuoteFromMovies.tsx
│   │   │   │   ├── index.ts
│   │   │   │   ├── types.d.ts
│   │   │   │   └── useAddQuoteFromMovies.tsx
│   │   └──  index.ts
│   ├── helpers
│   ├── hooks
│   │   ├── Newsfeed
│   │   │   ├── useNewsFeed.tsx
│   │   │   └── index.tsx
│   │   └──  index.ts
│   ├── pages
│   │   └──dashboard
│   │   │   ├── movies
│   │   │   │   ├── [id].tsx
│   │   │   │   └── index.tsx
│   │   │   ├── newsfeed.tsx
│   │   │   └── profile.tsx
│   │   └── index.ts
│   ├── store
│   ├── types
│   └── services
├── .eslintrc.json
├── .gitignore
├── .prettierrc.json
├── postcss.config.js
├── tailwind.config.js
├── next.config.js
├── next-env.d.ts
└── next-i18next.config.js
└── tsconfig.json
```

For more information about project standards, take a look at these docs:

- [Next](https://nextjs.org/docs)

#

### Resources

[Figma Design](https://www.figma.com/file/5uMXCg3itJwpzh9cVIK3hA/Movie-Quotes-Bootcamp-assignment?type=design&node-id=0-1&mode=design&t=c5A843fLo1dWnBRi-0)
