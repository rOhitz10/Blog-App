
client/
│
├── public/
│   ├── index.html
│   ├── favicon.ico
│   ├── manifest.json
│   └── robots.txt
│
├── src/
│   ├── api/                 # API calls and services
│   │   ├── axiosConfig.js
│   │   ├── blogApi.js
│   │   ├── authApi.js
│   │   ├── commentApi.js
│   │   └── likeApi.js
│   │
│   ├── components/          # Reusable UI components
│   │   ├── common/         # Very generic components
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Modal/
│   │   │   ├── Loader/
│   │   │   └── Alert/
│   │   │
│   │   ├── layout/         # Layout components
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   ├── Navigation/
│   │   │   └── Sidebar/
│   │   │
│   │   ├── blog/           # Blog-specific components
│   │   │   ├── BlogCard/
│   │   │   ├── BlogForm/
│   │   │   ├── CommentSection/
│   │   │   ├── LikeButton/
│   │   │   └── BlogFilter/
│   │   │
│   │   └── ui/             # Other UI components
│   │       ├── Pagination/
│   │       ├── SearchBar/
│   │       └── ImageUpload/
│   │
│   ├── contexts/           # React contexts for state management
│   │   ├── AuthContext.js
│   │   ├── BlogContext.js
│   │   └── ThemeContext.js
│   │
│   ├── hooks/              # Custom React hooks
│   │   ├── useAuth.js
│   │   ├── useBlogs.js
│   │   ├── useApi.js
│   │   └── useLocalStorage.js
│   │
│   ├── pages/              # Page components (routes)
│   │   ├── Home/
│   │   ├── Blog/
│   │   │   ├── BlogList/
│   │   │   ├── BlogDetail/
│   │   │   ├── CreateBlog/
│   │   │   └── EditBlog/
│   │   │
│   │   ├── Auth/
│   │   │   ├── Login/
│   │   │   ├── Register/
│   │   │   └── Profile/
│   │   │
│   │   ├── User/
│   │   │   ├── Dashboard/
│   │   │   └── Settings/
│   │   │
│   │   └── Error/
│   │       ├── NotFound/
│   │       └── ServerError/
│   │
│   ├── store/              # State management (Redux/Zustand)
│   │   ├── slices/
│   │   │   ├── authSlice.js
│   │   │   ├── blogSlice.js
│   │   │   └── uiSlice.js
│   │   ├── index.js
│   │   └── store.js
│   │
│   ├── utils/              # Utility functions
│   │   ├── helpers.js
│   │   ├── validators.js
│   │   ├── constants.js
│   │   └── formatters.js
│   │
│   ├── styles/             # Global styles and themes
│   │   ├── index.css
│   │   ├── components/
│   │   ├── pages/
│   │   └── variables.css
│   │
│   ├── assets/             # Static assets
│   │   ├── images/
│   │   ├── icons/
│   │   ├── fonts/
│   │   └── svgs/
│   │
│   ├── routes/             # Routing configuration
│   │   ├── AppRouter.js
│   │   ├── ProtectedRoute.js
│   │   └── PublicRoute.js
│   │
│   ├── config/             # App configuration
│   │   ├── appConfig.js
│   │   └── routesConfig.js
│   │
│   ├── App.js              # Main App component
│   ├── App.css
│   ├── index.js            # Entry point
│   └── index.css
│
├── tests/                  # Test files
│   ├── components/
│   ├── pages/
│   ├── utils/
│   └── __mocks__/
│
├── docs/                   # Documentation
│   ├── API.md
│   ├── COMPONENTS.md
│   └── SETUP.md
│
├── .env                    # Environment variables
├── .env.development
├── .env.production
│
├── package.json
├── package-lock.json
├── vite.config.js          # or webpack.config.js
├── eslintrc.js
├── prettierrc.js
└── README.md