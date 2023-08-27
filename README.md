<div style="display:flex; align-items: center">
  <h1 style="position:relative; top: -6px" >Epic Movie Quotes</h1>
</div>

Epic Movie Quotes is a platform where users can register, log in, and dive into a vast collection of movies and quotes. Once logged in, users are greeted with their personalised dashboards, where they can explore a variety of features.

Real-time updates keep users informed about the activity on their content, including likes and comments. Users have the flexibility to personalise their profiles and contribute their own content to enrich the collection.

##### Key Features

- Authorisation & authentication \*including Google OAuth
- Email address verification
- Password reset
- Profile customisation
- Interactive newsfeed
- Real-time notifications
- Data search
- CRUD operations
- Multi-language support 🇬🇪🇬🇧

### Table of Contents

- [Prerequisites](#prerequisites)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Resources](#resources)

#

### Prerequisites

- <img src="readme/assets/npm.png" width="35" style="position: relative; top: 4px" /> npm@8.19 and up
- <img src="readme/assets/node.png" width="35" style="position: relative; top: 6px" /> node@16.18 and up
- <img src="readme/assets/typescript.png" width="22" style="position: relative; top: 6px" /> typescript@16.18 and up

#

### Tech Stack

- <img src="readme/assets/next.png" height="22" style="position: relative; top: 4px" /> [Next](https://nextjs.org/) - The React Framework for the Web
- <img src="readme/assets/tailwind.png" height="22" style="position: relative; top: 4px" /> [Tailwind](https://tailwindui.com/) - CSS Framework
- <img src="readme/assets/pusher.png" height="22" style="position: relative; top: 4px" /> [Pusher](https://pusher.com/) - Real-time messaging and event-driven platform
- <img src="readme/assets/react-hook-form.png" height="22" style="position: relative; top: 4px" /> [React Hook Form](https://react-hook-form.com/) - Performant and extensible React forms
- <img src="readme/assets/react-query.png" height="22" style="position: relative; top: 4px" /> [React Query](https://www.npmjs.com/package/react-query) - Data fetching and caching library

#

### Getting Started

1\. First of all you need to clone Epic Movie Quotes repository from github:

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
│   │   ├── newsfeed
│   │   │   ├── NewsItem
│   │   │   │   ├── NewsItem.tsx
│   │   │   │   ├── index.ts
│   │   │   │   ├── types.d.ts
│   │   │   │   └── useNewsItem.tsx
│   │   └── index.ts
│   ├── helpers
│   ├── hooks
│   │   ├── Newsfeed
│   │   │   ├── useNewsFeed.tsx
│   │   │   └── index.tsx
│   │   ├── Profile
│   │   │   ├── useProfile.tsx
│   │   │   └── index.tsx
│   │   └── index.ts
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
