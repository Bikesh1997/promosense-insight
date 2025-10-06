# PromoSense Application Documentation

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [Application Overview](#application-overview)
3. [Technology Stack](#technology-stack)
4. [Architecture](#architecture)
5. [User Roles & Access](#user-roles--access)
6. [Features & Functionality](#features--functionality)
7. [Component Structure](#component-structure)
8. [Routing & Navigation](#routing--navigation)
9. [Design System](#design-system)
10. [Data Flow](#data-flow)
11. [Deployment](#deployment)

---

## Executive Summary

**PromoSense** is a comprehensive pharmaceutical promotion analytics platform designed to optimize promotional campaigns, track patient funnel progression, and provide actionable insights for healthcare professionals. The platform serves multiple stakeholders including executives, sales managers, sales representatives, and system administrators through role-based dashboards.

### Key Objectives
- Increase promotion ROI through data-driven insights
- Reduce patient funnel leakage with advanced analytics
- Improve sales representative performance tracking
- Enhance executive decision-making with real-time data
- Streamline promotion management workflows

---

## Application Overview

### Purpose
PromoSense addresses critical challenges in pharmaceutical promotion management:
- **Fragmented Data**: Consolidates data from multiple sources into a unified platform
- **Manual Tracking**: Automates promotion performance tracking
- **Funnel Leakage**: Identifies and addresses patient drop-off points
- **Attribution Issues**: Provides clear attribution of promotion success
- **Performance Gaps**: Highlights areas for improvement across teams

### Target Users
1. **Healthcare Professionals (Primary End Users)**
   - Doctors receiving promotional information
   - Decision-makers for patient treatment options

2. **Internal Stakeholders**
   - Executive Leadership
   - Sales Managers
   - Sales Representatives
   - System Administrators

---

## Technology Stack

### Frontend Framework
- **React 18.3.1**: Modern UI library for building component-based interfaces
- **TypeScript**: Type-safe development with enhanced IDE support
- **Vite**: Next-generation frontend build tool for fast development

### UI & Styling
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **shadcn/ui**: High-quality, accessible React component library
- **Radix UI**: Unstyled, accessible component primitives
- **Lucide React**: Icon library for consistent iconography

### Routing & State Management
- **React Router DOM 6.30.1**: Client-side routing with HashRouter
- **TanStack Query 5.83.0**: Server state management and caching

### Form Management
- **React Hook Form 7.61.1**: Performant form handling
- **Zod 3.25.76**: TypeScript-first schema validation
- **Hookform Resolvers**: Integration between React Hook Form and Zod

### Data Visualization
- **Recharts 2.15.4**: Composable charting library built on React components
- **Date-fns 3.6.0**: Modern date utility library

### UI Enhancements
- **Sonner**: Toast notifications
- **Vaul**: Drawer component
- **Embla Carousel**: Carousel functionality
- **next-themes**: Theme management (dark/light mode support)

---

## Architecture

### Application Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components (shadcn)
│   ├── AllerganLogo.tsx
│   ├── AppSidebar.tsx
│   ├── Dashboard.tsx
│   ├── ExecutiveDashboard.tsx
│   ├── SalesManagerDashboard.tsx
│   ├── RepDashboardRevised.tsx
│   ├── SystemAdminDashboard.tsx
│   ├── PromotionStrategiesEnhanced.tsx
│   ├── FunnelLeakageAnalysis.tsx
│   ├── DataIntegrationHub.tsx
│   ├── AIInsights.tsx
│   ├── LoginPage.tsx
│   ├── Header.tsx
│   ├── MobileSidebar.tsx
│   └── [Modal Components]
├── pages/              # Route pages
│   ├── Index.tsx       # Main dashboard container
│   └── NotFound.tsx    # 404 page
├── hooks/              # Custom React hooks
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib/                # Utility functions
│   └── utils.ts
├── assets/             # Static assets (images, logos)
├── App.tsx             # Root application component
├── main.tsx            # Application entry point
└── index.css           # Global styles and design tokens
```

### Routing Architecture

The application uses **HashRouter** for client-side routing:

```
/ (root)                → LoginPage
/dashboard              → Index (Main Dashboard Container)
* (catch-all)           → NotFound
```

### Component Hierarchy

```
App
└── HashRouter
    └── Routes
        ├── LoginPage (/)
        ├── Index (/dashboard)
        │   ├── Header
        │   ├── AppSidebar (desktop)
        │   ├── MobileSidebar (mobile)
        │   └── Dynamic Content Area
        │       ├── ExecutiveDashboard
        │       ├── SalesManagerDashboard
        │       ├── RepDashboardRevised
        │       ├── SystemAdminDashboard
        │       ├── PromotionStrategiesEnhanced
        │       ├── FunnelLeakageAnalysis
        │       ├── DataIntegrationHub
        │       └── AIInsights
        └── NotFound (*)
```

---

## User Roles & Access

### 1. Executive Dashboard
**Target User**: C-level executives and senior leadership

**Key Capabilities**:
- High-level performance metrics and KPIs
- ROI analysis across all promotions
- Strategic insights and trends
- Executive summaries and reports
- Cross-regional performance comparison

### 2. Sales Manager Dashboard
**Target User**: Regional and territory sales managers

**Key Capabilities**:
- Team performance monitoring
- Territory-level analytics
- Representative performance tracking
- Resource allocation insights
- Goal vs. actual performance tracking

### 3. Sales Representative Dashboard (Revised)
**Target User**: Field sales representatives

**Key Capabilities**:
- Personal performance metrics
- Assigned territories and targets
- Patient engagement tracking
- Promotion material access
- Activity logging and reporting

### 4. System Administrator Dashboard
**Target User**: IT administrators and system managers

**Key Capabilities**:
- User management and permissions
- System configuration
- Data integration monitoring
- Audit logs and security
- System health and performance metrics

---

## Features & Functionality

### 1. **Promotion Management**
- **Create & Edit Promotions**: Modal-based workflows for promotion creation
- **Strategy Planning**: Enhanced promotion strategies with AI recommendations
- **Campaign Tracking**: Real-time monitoring of promotion performance
- **Material Distribution**: Digital asset management for promotional materials

### 2. **Funnel Leakage Analysis**
- **Patient Journey Mapping**: Visual representation of patient progression
- **Drop-off Identification**: Automated detection of leakage points
- **Conversion Optimization**: Recommendations to improve conversion rates
- **Stage-by-Stage Analytics**: Detailed metrics for each funnel stage

### 3. **Data Integration Hub**
- **Multi-Source Integration**: Connect CRM, healthcare platforms, and analytics tools
- **Data Synchronization**: Real-time data sync across systems
- **API Management**: RESTful API endpoints for external integrations
- **Data Quality Monitoring**: Validation and quality checks

### 4. **AI-Powered Insights**
- **Predictive Analytics**: ML-driven promotion outcome predictions
- **Recommendation Engine**: AI-generated action recommendations
- **Sentiment Analysis**: Patient and physician feedback analysis
- **Anomaly Detection**: Automated identification of unusual patterns

### 5. **Lead Routing**
- **Intelligent Assignment**: AI-based lead distribution to sales reps
- **Territory Management**: Geographic and specialty-based routing
- **Priority Scoring**: Lead scoring based on conversion probability
- **Follow-up Automation**: Automated reminders and task creation

### 6. **Patient Analytics**
- **Patient Demographics**: Comprehensive patient profiling
- **Treatment Journey**: Track patient progression through treatment stages
- **Engagement Metrics**: Measure patient interaction with promotions
- **Outcome Tracking**: Monitor treatment outcomes and satisfaction

### 7. **Promotion Details**
- **Performance Metrics**: Detailed analytics for individual promotions
- **ROI Calculation**: Automated return on investment analysis
- **Comparative Analysis**: Benchmark against similar promotions
- **Historical Trends**: Time-series data visualization

---

## Component Structure

### Core Layout Components

#### **AppSidebar**
- Desktop navigation sidebar
- Role-based menu items
- Active view highlighting
- Collapsible navigation groups

#### **MobileSidebar**
- Responsive mobile navigation
- Drawer-style interface
- Touch-optimized interactions
- Overlay with backdrop

#### **Header**
- Application branding (Allergan logo)
- Mobile menu toggle
- User profile access
- Global notifications

### Dashboard Components

#### **ExecutiveDashboard**
- Key performance indicators (KPIs)
- Revenue and ROI charts
- Strategic insights summary
- Executive action items

#### **SalesManagerDashboard**
- Team performance overview
- Territory analytics
- Representative comparisons
- Resource allocation tools

#### **RepDashboardRevised**
- Personal metrics and goals
- Assigned leads and follow-ups
- Activity tracking
- Performance vs. target

#### **SystemAdminDashboard**
- User management interface
- System configuration tools
- Integration status monitoring
- Audit and security logs

### Feature Components

#### **PromotionStrategiesEnhanced**
- Strategy planning interface
- AI-powered recommendations
- Campaign templates
- Success prediction models

#### **FunnelLeakageAnalysis**
- Visual funnel representation
- Leakage point identification
- Conversion rate analytics
- Stage-by-stage breakdown

#### **DataIntegrationHub**
- Integration configuration
- Data source management
- Sync status monitoring
- API documentation

#### **AIInsights**
- ML-generated insights
- Predictive analytics dashboard
- Recommendation cards
- Trend analysis

### Modal Components

#### **CreatePromotionModal**
- Multi-step form for new promotions
- Template selection
- Target audience definition
- Budget and timeline setup

#### **EditPromotionModal**
- Edit existing promotion details
- Version history
- Change tracking
- Update notifications

#### **PromotionDetailsModal**
- Comprehensive promotion view
- Performance metrics
- Associated materials
- Action history

#### **PatientDetailsModal**
- Patient profile information
- Treatment history
- Engagement timeline
- Contact preferences

#### **RecommendationDetailsModal**
- AI recommendation details
- Supporting data and rationale
- Implementation steps
- Expected outcomes

#### **AIConfigModal**
- AI model configuration
- Training data management
- Performance tuning
- Testing and validation

### UI Component Library (shadcn/ui)

The application uses a comprehensive set of accessible, customizable UI components:

- **Form Controls**: Button, Input, Textarea, Select, Checkbox, Radio Group, Switch, Slider
- **Data Display**: Card, Table, Badge, Avatar, Accordion, Tabs
- **Feedback**: Toast, Alert, Alert Dialog, Progress, Skeleton
- **Navigation**: Sidebar, Navigation Menu, Breadcrumb, Pagination
- **Overlay**: Dialog, Sheet, Drawer, Popover, Hover Card, Dropdown Menu, Context Menu
- **Layout**: Separator, Resizable, Scroll Area, Aspect Ratio, Collapsible
- **Advanced**: Calendar, Command, Carousel, Chart, Tooltip, Menubar

---

## Routing & Navigation

### Route Configuration

```typescript
<HashRouter>
  <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route path="/dashboard" element={<Index />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</HashRouter>
```

### View State Management

The main dashboard (`/dashboard`) uses internal state to manage different views:

```typescript
const [activeView, setActiveView] = useState('executive');

// Available views:
// - 'executive'      → ExecutiveDashboard
// - 'manager'        → SalesManagerDashboard
// - 'rep'            → RepDashboardRevised
// - 'admin'          → SystemAdminDashboard
// - 'alle-loyalty'   → PromotionStrategiesEnhanced
// - 'strategies'     → PromotionStrategiesEnhanced
// - 'funnel'         → FunnelLeakageAnalysis
// - 'data-hub'       → DataIntegrationHub
// - 'insights'       → AIInsights
```

### Navigation Flow

1. **Initial Access**: User lands on `/` (LoginPage)
2. **Authentication**: User logs in (demo account or credentials)
3. **Dashboard Redirect**: After login, user navigates to `/dashboard`
4. **View Selection**: User selects view via sidebar navigation
5. **Content Update**: Main content area updates based on `activeView` state

---

## Design System

### Color Tokens

The application uses a semantic color system defined in `index.css`:

```css
:root {
  --background: [HSL value];
  --foreground: [HSL value];
  --card: [HSL value];
  --card-foreground: [HSL value];
  --primary: [HSL value];
  --primary-foreground: [HSL value];
  --secondary: [HSL value];
  --secondary-foreground: [HSL value];
  --muted: [HSL value];
  --muted-foreground: [HSL value];
  --accent: [HSL value];
  --accent-foreground: [HSL value];
  --destructive: [HSL value];
  --destructive-foreground: [HSL value];
  --border: [HSL value];
  --input: [HSL value];
  --ring: [HSL value];
}
```

### Theme Support

- **Light Mode**: Default color scheme
- **Dark Mode**: Alternative color scheme (`.dark` class)
- **System Preference**: Automatically adapts to user's OS settings

### Typography

- **Font Family**: System font stack with fallbacks
- **Font Sizes**: Tailwind's default scale (text-xs to text-9xl)
- **Font Weights**: Regular (400), Medium (500), Semibold (600), Bold (700)

### Spacing & Layout

- **Container**: Responsive max-width containers
- **Grid System**: Tailwind's 12-column grid
- **Flexbox**: Utility classes for flexible layouts
- **Responsive Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)

### Component Styling Approach

**CRITICAL**: All components use semantic design tokens:
- ✅ **Correct**: `className="bg-primary text-primary-foreground"`
- ❌ **Incorrect**: `className="bg-blue-500 text-white"`

### Animation & Transitions

- **Tailwind Animate**: Pre-configured animations (spin, ping, pulse, bounce)
- **Custom Animations**: Defined in `tailwind.config.ts`
- **Transitions**: Smooth state changes with `transition-all` utilities

---

## Data Flow

### State Management Strategy

1. **Local State**: Component-level state with `useState`
2. **URL State**: Route parameters and query strings
3. **Server State**: TanStack Query for data fetching and caching
4. **Global State**: Context API for shared state (theme, auth)

### Data Sources

Currently, the application uses **mock data** for demonstration purposes. In production, data would come from:

- **CRM Systems**: Salesforce, HubSpot, etc.
- **Healthcare Platforms**: EMR/EHR systems
- **Analytics Tools**: Google Analytics, Mixpanel, etc.
- **Internal APIs**: Custom backend services

### API Integration Pattern

```typescript
// Example TanStack Query usage
const { data, isLoading, error } = useQuery({
  queryKey: ['promotions'],
  queryFn: fetchPromotions,
});
```

### Future Backend Integration

The application is prepared for integration with **Lovable Cloud** (Supabase-powered backend):

- **Authentication**: Email/password, social login
- **Database**: PostgreSQL with Row Level Security (RLS)
- **Storage**: File uploads for promotional materials
- **Edge Functions**: Serverless functions for AI processing
- **Real-time**: WebSocket connections for live updates

---

## Deployment

### Build Process

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

### Build Output

- **Static Files**: Compiled to `dist/` directory
- **Assets**: Optimized images, fonts, and static resources
- **Code Splitting**: Automatic chunking for optimal loading

### Hosting Options

1. **Lovable Platform**: One-click deployment via Lovable interface
2. **Custom Domain**: Connect your own domain (requires paid plan)
3. **Self-Hosting**: Deploy `dist/` folder to any static hosting service
   - Vercel
   - Netlify
   - AWS S3 + CloudFront
   - GitHub Pages

### Environment Configuration

- **Development**: `npm run dev` (port 5173)
- **Production**: Environment variables configured in hosting platform
- **API Endpoints**: Configured via `.env.production` file

### Performance Considerations

- **Code Splitting**: Lazy loading of route components
- **Asset Optimization**: Image compression and format optimization
- **Caching Strategy**: Browser caching headers and service workers
- **Bundle Size**: Tree-shaking and dead code elimination

---

## Security Considerations

### Current Security Measures

1. **Client-Side Routing**: HashRouter prevents server-side routing issues
2. **Input Validation**: Zod schema validation for all forms
3. **XSS Prevention**: React's built-in XSS protection
4. **HTTPS**: All deployments use HTTPS by default

### Future Security Enhancements (with Lovable Cloud)

1. **Authentication**: JWT-based authentication with secure token storage
2. **Authorization**: Row Level Security (RLS) policies in Supabase
3. **Data Encryption**: End-to-end encryption for sensitive data
4. **Audit Logging**: Comprehensive activity tracking
5. **Rate Limiting**: API request throttling

---

## Future Roadmap

### Phase 1: Core Platform (Current)
- ✅ Role-based dashboards
- ✅ Promotion management interface
- ✅ Funnel leakage analysis
- ✅ Data integration hub
- ✅ AI insights display

### Phase 2: Backend Integration (Next)
- 🔲 Lovable Cloud integration
- 🔲 User authentication and authorization
- 🔲 Real database with persistent storage
- 🔲 API endpoints for data operations
- 🔲 File storage for promotional materials

### Phase 3: Advanced Features
- 🔲 Real-time notifications
- 🔲 Advanced AI recommendations
- 🔲 Predictive analytics engine
- 🔲 Mobile app (React Native)
- 🔲 Offline support with sync

### Phase 4: Enterprise Features
- 🔲 Multi-tenant architecture
- 🔲 Advanced reporting and exports
- 🔲 Custom workflow automation
- 🔲 Third-party integrations (Salesforce, etc.)
- 🔲 White-label capabilities

---

## Maintenance & Support

### Code Quality

- **TypeScript**: Type safety across the entire codebase
- **ESLint**: Code linting and formatting standards
- **Component Structure**: Modular, reusable component architecture
- **Documentation**: Inline comments and documentation

### Development Workflow

1. **Feature Development**: Create feature branches
2. **Code Review**: Pull request reviews before merging
3. **Testing**: Manual testing in preview environment
4. **Deployment**: Automated deployment via Lovable or GitHub Actions

### Monitoring

- **Console Logs**: Development debugging via browser console
- **Error Tracking**: Future integration with Sentry or similar
- **Performance Monitoring**: Future integration with monitoring tools
- **User Analytics**: Future integration with analytics platforms

---

## Conclusion

PromoSense is a modern, scalable pharmaceutical promotion analytics platform built with cutting-edge web technologies. The application provides role-specific dashboards for executives, sales managers, sales representatives, and system administrators, with features including promotion management, funnel analysis, AI insights, and data integration.

The current implementation provides a solid foundation with a demo/prototype environment. With the addition of Lovable Cloud backend integration, the platform can scale to support real-world production deployments with authentication, persistent data storage, and advanced AI capabilities.

### Key Strengths

- **Modern Tech Stack**: React 18, TypeScript, Vite, Tailwind CSS
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Accessible Components**: shadcn/ui for WCAG-compliant components
- **Scalable Architecture**: Modular component structure
- **Type Safety**: TypeScript throughout the application
- **Design System**: Consistent theming with semantic tokens

### Getting Started

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start development server
4. Access the application at `http://localhost:5173`
5. Use demo account to explore role-based dashboards

---

**Document Version**: 1.0  
**Last Updated**: 2025-10-06  
**Application Version**: Current (see package.json)  
**Maintained By**: Development Team
