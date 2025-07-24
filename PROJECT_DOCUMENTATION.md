
# Wrattle - Complete Project Documentation

## Project Overview
Wrattle is a social trading platform built with React, TypeScript, and Firebase. Users can share investment insights, follow friends' trades, view stock data with interactive charts, and manage their portfolios.

## Technology Stack
- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Firebase (Auth + Firestore)
- **Charts**: Recharts library
- **Stock Data**: Alpha Vantage API
- **Routing**: React Router DOM
- **State Management**: React Query (@tanstack/react-query)

## Project Structure

### Root Configuration Files
- `package.json` - Dependencies and scripts
- `tailwind.config.ts` - Tailwind CSS configuration
- `vite.config.ts` - Vite build configuration  
- `tsconfig.json` - TypeScript configuration
- `index.html` - HTML entry point

### Source Code Structure (`/src`)

#### Entry Points
- `main.tsx` - Application entry point, renders AppRouter
- `App.tsx` - Main app router and route definitions
- `index.css` - Global styles and Tailwind imports

#### Pages (`/src/pages`)
- `Index.tsx` - Landing/home page
- `Login.tsx` - User authentication login
- `Signup.tsx` - User registration
- `Onboarding.tsx` - New user onboarding flow
- `App.tsx` - Main authenticated app container
- `NotFound.tsx` - 404 error page

#### Core Components (`/src/components`)

##### Navigation & Layout
- `BottomNavigation.tsx` - Mobile-first bottom navigation bar
- **Props**: None, uses internal routing state

##### Main App Tabs
- `HomeTab.tsx` - Social feed and main dashboard
- `PortfolioTab.tsx` - User's investment portfolio overview
- `ResearchTab.tsx` - Stock research and analysis tools  
- `EducationTab.tsx` - Educational content and resources

##### Stock-Related Components
- `StockDetailModal.tsx` - Main modal container for detailed stock information
  - **Props**: `symbol: string`, `isOpen: boolean`, `onClose: () => void`, `originalPost?: { sender: string, amount: string, timestamp: string }`
  - **Features**: Orchestrates all stock detail components, loading states
- `StockDetailHeader.tsx` - Stock modal header with name, symbol, and close button
  - **Props**: `symbol: string`, `stockName: string`, `onClose: () => void`
- `StockDetailPrice.tsx` - Current price display with change indicators
  - **Props**: `price: number`, `change: number`, `changePercent: number`
- `StockDetailMetrics.tsx` - Key financial metrics display
  - **Props**: `marketCap: string`, `peRatio: number | null`, `volume: string`, `low: number`, `high: number`
- `StockDetailCopyTrade.tsx` - Copy trading functionality
  - **Props**: `symbol: string`, `originalPost: { sender: string, amount: string, timestamp: string }`
- `StockDetailActions.tsx` - Action buttons (Invest, Watchlist, Social actions)
  - **Props**: None, self-contained component
- `StockChart.tsx` - Interactive stock price charts
  - **Props**: `symbol: string`, `currentPrice: number`, `priceChange: number`, `percentChange: number`
  - **Features**: Multiple timeframes (1D, 1W, 1M, 3M, 6M, 1Y), hover tooltips

##### Social Features (`/src/components/friends`)
- `FriendsPage.tsx` - Main friends management interface
- `FriendsList.tsx` - Display user's current friends
- `FriendRequests.tsx` - Manage incoming friend requests
- `AddFriend.tsx` - Send friend requests to other users

##### Feed Components (`/src/components/feed`)
- `FeedPage.tsx` - Social trading feed interface
- `FeedPost.tsx` - Individual post component for trading updates

##### UI Components (`/src/components/ui`)
Complete shadcn/ui component library including:
- `button.tsx`, `card.tsx`, `input.tsx`, `dialog.tsx`
- `toast.tsx`, `badge.tsx`, `avatar.tsx`
- `chart.tsx`, `tabs.tsx`, `select.tsx`
- And 30+ other UI primitives

#### Services & APIs (`/src/services`)
- `stockApi.ts` - Alpha Vantage API integration
  - **Functions**: `fetchStockData(symbol: string)`, `fetchStockChart(symbol: string, interval: string)`
  - **Features**: Caching, rate limiting, fallback data
- `friendsService.ts` - Firebase friends management
  - **Functions**: `sendFriendRequest()`, `acceptFriendRequest()`, `getFriends()`, `getPendingFriendRequests()`

#### Firebase Configuration (`/src/lib`)
- `firebase.ts` - Firebase app initialization
  - **Exports**: `auth`, `db`, `app`
  - **Config**: Connected to wrattle.firebaseapp.com project

#### Context & State Management (`/src/contexts`)
- `AuthContext.tsx` - User authentication state management
  - **Provides**: User session, login/logout functions

#### Custom Hooks (`/src/hooks`)
- `useFriends.ts` - Friends data fetching and management
- `use-mobile.tsx` - Mobile/desktop detection
- `use-toast.ts` - Toast notification system

#### Type Definitions (`/src/types`)
- `friends.ts` - Friend request and friendship types
- `feed.ts` - Social feed post types

#### Utilities (`/src/lib`)
- `utils.ts` - Common utility functions (cn, clsx utilities)

## Key Features & Functionality

### Authentication Flow
1. **Landing Page** (`Index.tsx`) - Marketing page with signup/login
2. **Registration** (`Signup.tsx`) - Email/password registration with Firebase
3. **Login** (`Login.tsx`) - User authentication
4. **Onboarding** (`Onboarding.tsx`) - New user setup
5. **Main App** (`App.tsx`) - Authenticated user dashboard

### Main App Navigation
- **Home Tab**: Social feed, trending stocks, friend activity
- **Portfolio Tab**: Investment holdings, performance charts, returns
- **Research Tab**: Stock analysis, market data, charts
- **Education Tab**: Learning resources, trading guides

### Stock Data Integration
- **API**: Alpha Vantage (5 calls/minute limit)
- **Caching**: 5-minute cache to avoid rate limits
- **Fallback**: Realistic demo data when API unavailable
- **Real-time**: Live price updates and percentage changes

### Social Trading Features
- **Friend System**: Send/accept friend requests via email
- **Copy Trading**: Replicate friends' investment amounts
- **Feed Posts**: Share investment decisions and insights
- **Social Proof**: See friends' portfolio performance

### Interactive Charts
- **Library**: Recharts for data visualization
- **Timeframes**: 1D, 1W, 1M, 3M, 6M, 1Y views
- **Interactivity**: Hover tooltips, zoom, responsive design
- **Data**: Algorithmically generated historical data + real current prices

## Database Schema (Firebase Firestore)

### Collections
- `friendRequests` - Pending/accepted friend requests
  - Fields: `fromUserId`, `toUserId`, `fromUserName`, `fromUserEmail`, `status`, `createdAt`
- `friends` - Bidirectional friendship records
  - Fields: `userId`, `friendId`, `createdAt`
- `users` - User profiles and settings (implied)

## API Integrations

### Alpha Vantage Stock API
- **Base URL**: `https://www.alphavantage.co/query`
- **Key Functions**: 
  - `GLOBAL_QUOTE` for current prices
  - `TIME_SERIES_INTRADAY` for chart data
- **Rate Limits**: 5 requests/minute (free tier)
- **Error Handling**: Fallback to demo data

## Styling & Design System

### Tailwind Configuration
- **Colors**: Custom blue theme (`#002E5D`, `#4DA8DA`, `#A6E1FA`)
- **Components**: shadcn/ui for consistent design
- **Responsive**: Mobile-first approach
- **Dark Mode**: Supported via next-themes

### Component Patterns
- **Cards**: Primary content containers
- **Buttons**: Action triggers with loading states
- **Modals**: Detailed views and forms
- **Charts**: Data visualization with interactions

## Performance Considerations

### Optimization Strategies
- **React Query**: Caching and background updates
- **Code Splitting**: Route-based lazy loading
- **Image Optimization**: Responsive images
- **API Caching**: Reduce external API calls

### Architecture Improvements
- **Modular Components**: Stock detail modal successfully refactored into 6 focused components
- **Single Responsibility**: Each component handles one specific concern
- **Reusability**: Components can be used independently

## Development Workflow

### Commands
- `npm run dev` - Start development server
- `npm run build` - Production build
- `npm run preview` - Preview production build

### Code Organization
- **Small Files**: All components under 100 lines after refactoring
- **Single Responsibility**: Each component has one clear purpose
- **TypeScript**: Full type safety throughout
- **Import Structure**: Absolute imports with @ alias

## Deployment & Production

### Build Process
- **Vite**: Fast development and optimized production builds
- **TypeScript**: Compile-time type checking
- **Tailwind**: CSS purging for smaller bundle sizes

### Environment Variables
- Firebase configuration embedded in code
- Alpha Vantage API key embedded (should be moved to env vars)

## Future Development Priorities

### Code Quality Improvements
1. **Environment Variables** - Move API keys to .env
2. **Error Boundaries** - Add React error boundaries
3. **Loading States** - Improve loading UX throughout app
4. **Testing** - Add unit and integration tests

### Architecture Improvements
- **State Management**: Consider Zustand for complex state
- **API Layer**: Abstract API calls into service classes
- **Component Library**: Extract common patterns
- **Performance**: Implement virtual scrolling for large lists

## Security Considerations

### Current Implementation
- **Firebase Auth**: Secure user authentication
- **Firestore Rules**: Database security rules needed
- **API Keys**: Exposed in frontend (should be proxied)
- **HTTPS**: Enforced in production

### Recommendations
- Move sensitive API keys to backend proxy
- Implement proper Firestore security rules
- Add rate limiting on frontend API calls
- Implement proper error boundaries

---

*This documentation represents the complete codebase structure with recent refactoring improvements. The StockDetailModal has been successfully broken down into focused, maintainable components.*

