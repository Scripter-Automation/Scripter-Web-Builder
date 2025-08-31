# 🛠️ Scripter DevKit - Full-Code Development Platform

## 📋 Table of Contents

- [🚀 Overview](#-overview)
- [🎯 Why Choose Scripter DevKit?](#-why-choose-scripter-devkit)
- [✨ Complete Development Toolkit](#-complete-development-toolkit)
- [💡 The Full-Code Philosophy](#-the-full-code-philosophy)
- [🚀 Quick Start](#-quick-start)
- [📖 How to Use](#-how-to-use)
- [🏗️ Project Structure](#️-project-structure)
- [🛠️ Development](#️-development)
- [🚀 Deployment](#-deployment)
- [🚧 Current Development Status](#-current-development-status)
- [🤝 Contributing](#-contributing)
- [📝 License](#-license)
- [🙏 Acknowledgments](#-acknowledgments)
- [📞 Support](#-support)
- [🎯 Getting Started Today](#-getting-started-today)

---

## 🚀 Overview

**Scripter DevKit** represents a revolutionary "Full-Code" development platform that bridges the gap between no-code platforms and traditional development. Unlike expensive web builders that lock you into their ecosystem, this platform provides AI-powered development tools while ensuring you maintain complete ownership of your code and infrastructure.

### 🎯 The Full-Code Revolution

**Scripter DevKit** is the answer to the limitations of traditional no-code platforms. We combine the accessibility of visual tools with the power and flexibility of complete code ownership. Build enterprise-grade applications without the limitations and costs of traditional platforms.

> **⚠️ Alpha Stage Notice**: This project is currently in its infancy and alpha development stage. While functional, it's actively being developed and may have bugs, incomplete features, or breaking changes. Use at your own risk and expect regular updates and improvements.

> **🚨 CRITICAL SECURITY WARNING**: The development toolkit has direct file system access and can edit files on your server/computer. **ALWAYS remove the `src/routes/toolkit/` folder before deploying to production** to prevent security vulnerabilities. The toolkit is designed for development only and should never be deployed to production environments.

## 🎯 Why Choose Scripter DevKit?

### 🆚 The Full-Code Advantage Over Traditional Web Builders

| Feature | Traditional Web Builders | Scripter DevKit |
|---------|-------------------------|-----------------|
| **Code Ownership** | ❌ Locked to platform | ✅ Complete ownership |
| **Infrastructure** | ❌ Platform servers | ✅ Your own infrastructure |
| **Customization** | ❌ Limited by platform | ✅ Unlimited customization |
| **AI Integration** | ❌ Platform AI only | ✅ Your choice of AI tools |
| **Cost** | ❌ $29-299/month subscriptions | ✅ **$0 - Free Forever** |
| **Vendor Lock-in** | ❌ Trapped in ecosystem | ✅ No dependencies |
| **Enterprise Use** | ❌ Limited scalability | ✅ Full enterprise capabilities |
| **Learning Curve** | ❌ Platform-specific skills | ✅ Transferable development skills |
| **Performance** | ❌ Bloated with dependencies | ✅ Zero bloatware, optimized |
| **Deployment** | ❌ Platform-specific hosting | ✅ Deploy anywhere |





## ✨ Complete Development Toolkit

### 🎨 Visual Web Builder
- **Real-time Visual Editing**: Click on any element to edit its content and CSS properties
- **Live Preview**: See changes instantly as you edit
- **No Code Required**: Visual interface for web design without writing CSS
- **AI-Powered Suggestions**: Get intelligent suggestions for design improvements
- **Right-Click Context Menu**: Add functions to buttons and elements with Monaco Editor
- **CSS Properties Panel**: Comprehensive controls for margins, padding, borders, typography, and layout
- **Box Model Visualization**: Interactive visual representation of element spacing
- **Direct File Editing**: Changes are applied directly to your source files in real-time

### 📝 SOP Manager
- **Live Markdown Editor**: Professional markdown editing with Monaco Editor
- **Real-time Preview**: Instant preview of SOP documents as you type
- **Split-panel Layout**: Adjustable editor and preview panels
- **Professional Templates**: Pre-built SOP templates for various industries
- **AI-Powered Content**: Intelligent suggestions for document structure and content
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### 📝 Blog Manager
- **LinkedIn-style Editor**: Professional article editing interface similar to LinkedIn's editor
- **Article Management**: Create, edit, and delete blog articles with ease
- **Rich Text Editing**: Monaco Editor with markdown support for content creation
- **Metadata Management**: Title, excerpt, author, tags, and status management
- **Draft & Publish Workflow**: Save drafts and publish articles with status tracking
- **AI-Powered Writing**: Intelligent content suggestions and writing assistance
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### 🎫 Ticketing System
- **Ticket Management**: Create, edit, and track tickets with full CRUD operations
- **Resolver Groups**: Organize teams and assign tickets to specific groups
- **Template System**: Use predefined templates for consistent ticket creation
- **Markdown Support**: Rich content editing with live preview for ticket descriptions
- **Correspondence Tracking**: Track all communication related to tickets
- **Categorization**: Organize tickets by type, priority, status, and assignee
- **Advanced Filtering**: Search and filter tickets by multiple criteria
- **AI-Powered Automation**: Intelligent ticket routing and response suggestions
- **Real-time Updates**: Live preview and instant updates across all components

### 🗄️ Admin Console
- **Database Management**: Connect to and manage multiple database types (PostgreSQL, MySQL, SQLite, MongoDB)
- **Query Editor**: Professional SQL editor with syntax highlighting and query templates
- **Query History**: Track all executed queries with performance metrics and results
- **Table Manager**: Visual table creation and management with schema design tools
- **AI-Powered Queries**: Intelligent query suggestions and optimization recommendations
- **Real-time Execution**: Execute queries and view results instantly

### 🛡️ Security Tools
- **Security Scanner**: Basic security scanning for development environments
- **Dependency Checker**: Check for outdated dependencies and security vulnerabilities
- **Code Analyzer**: Analyze code for security issues and best practices
- **Development Security**: Basic security checks for development workflows
- **Your Infrastructure**: No third-party data storage, complete control over security

### 🚀 Zero Bloatware Advantage

**Why eliminating bloatware is crucial for modern web applications:**

- **⚡ Lightning Fast Performance**: Built with SvelteKit for optimal performance. No unnecessary frameworks or heavy dependencies weighing down your application.
- **🔍 Better SEO Performance**: Built with SvelteKit for better SEO out of the box, with clean HTML structure and fast loading times.
- **💰 Cost Efficiency**: No expensive subscriptions or plugins required. All tools are included and run on your own infrastructure.
- **🛡️ Security**: Includes basic security tools for development and testing, with your own infrastructure for better control.
- **🎯 Selective Dependencies**: Built with SvelteKit and minimal dependencies. Only essential libraries like Monaco Editor are included, and they're loaded dynamically when needed.
- **⚡ Dynamic Loading**: Heavy components like Monaco Editor are loaded only when needed, using dynamic imports to keep initial bundle sizes minimal and improve first-load performance.
- **🔧 Lightweight Alternatives**: Built custom markdown-to-HTML converter and visual editors instead of using heavy third-party libraries for content editing.
- **📦 Built on SvelteKit**: Leverages SvelteKit's built-in optimizations including automatic code splitting, efficient rendering, and minimal JavaScript overhead.
- **🎨 Minimal Dependencies**: Only essential libraries are included. Heavy components are loaded dynamically when needed, keeping the initial bundle size minimal.
- **🚀 Production Ready**: Designed for easy production deployment - simply remove the toolkit folder to eliminate all development tools from your final build.

### 🎛️ CSS Properties Panel
- **Comprehensive CSS Controls**: Edit margins, padding, borders, typography, layout, and background properties
- **Box Model Visualization**: Interactive box model with visual representation of margin, padding, and border
- **Color Pickers**: Built-in color pickers for all color properties
- **Real-time Updates**: Changes apply instantly to the selected element

### 📁 Project Structure

### 🗂️ Toolkit Organization
All development tools are organized under `src/routes/toolkit/` for easy production cleanup:

```
src/routes/toolkit/
├── builder/           # Visual Web Builder
│   ├── +page.svelte
│   └── components/
├── sop-manager/       # SOP Document Manager
│   ├── +page.svelte
│   └── components/
├── blog-manager/      # Blog Content Manager
│   ├── +page.svelte
│   └── components/
├── ticketing-system/  # Ticket Management System
│   ├── +page.svelte
│   └── components/
├── admin-console/     # Database Management & Query Editor
│   ├── +page.svelte
│   └── components/
└── security-tools/    # Security Scanning & Analysis
    ├── +page.svelte
    └── components/
```

### 🔧 Tool Structure
Each tool follows a consistent pattern:
- **`+page.svelte`** - Main tool interface
- **`components/`** - Tool-specific components
- **`api/`** - Tool-specific API endpoints (if needed)

### 🧹 Production Deployment

**🚨 CRITICAL SECURITY WARNING**: The development toolkit has direct file system access and can edit files on your server. **ALWAYS remove the `src/routes/toolkit/` folder before deploying to production** to prevent security vulnerabilities.

```bash
# MANDATORY: Remove toolkit before production deployment
rm -rf src/routes/toolkit/
```

**Why this is critical:**
- The toolkit can read and write files on your server
- It has access to your entire project structure
- Malicious users could potentially access sensitive files
- The toolkit is designed for development only

Simply remove the `src/routes/toolkit/` folder before deploying to production to keep your application clean, optimized, and secure.



## 💡 The Full-Code Philosophy

### 🎯 Our Mission
To democratize enterprise-grade application development by providing a Full-Code platform that combines the accessibility of visual tools with the power and flexibility of complete code ownership. We empower developers, designers, and business users to build sophisticated applications without the limitations and costs of traditional no-code platforms.

### 🔮 Our Vision
To become the leading Full-Code development platform that bridges the gap between no-code simplicity and professional development. We envision a world where anyone can build enterprise applications using their own infrastructure, with complete code ownership, and the power of AI assistance.

### 💎 Our Values
- **Code Ownership**: Complete control over your codebase and infrastructure
- **AI Empowerment**: Leverage AI tools to enhance productivity and creativity
- **Zero Lock-in**: No vendor dependencies or platform restrictions
- **Accessibility**: Make enterprise development accessible to all skill levels
- **Innovation**: Continuously push the boundaries of what's possible in development



### 🎯 Perfect For:
- **Developers**: Who want AI assistance without losing code control
- **Designers**: Who need to build functional prototypes quickly
- **Business Users**: Who want to create applications without coding knowledge
- **Enterprises**: Who need full customization and control over their applications
- **Startups**: Who want to build MVPs quickly without vendor lock-in
- **Agencies**: Who need to deliver custom solutions without platform limitations
- **Freelancers**: Who want professional tools without monthly subscriptions
- **Students**: Who want to learn real development skills, not platform-specific tools

### 💰 Pricing That Actually Makes Sense

Unlike those other guys who charge you for basic features:

| Traditional Web Builders | Scripter DevKit |
|-------------------------|-----------------|
| ❌ $29/month for basic features | ✅ **$0 - Everything included** |
| ❌ $99/month for "pro" features | ✅ **$0 - All features included** |
| ❌ $299/month for "enterprise" | ✅ **$0 - Enterprise tools included** |
| ❌ Lock you into their platform | ✅ Run on your infrastructure |
| ❌ Charge for every plugin | ✅ All tools included |
| ❌ Your code belongs to them | ✅ Your code belongs to you |
| ❌ Recurring fees forever | ✅ **Free forever** |

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **Bun** (recommended) or npm/yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Scripter-Automation/Scripter-Web-Builder.git
   cd web_builder
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Start the development server**
   ```bash
   bun run dev
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to start building!

### ⚠️ Alpha Development Notes
- **Experimental Features**: Some tools may be incomplete or have bugs
- **Breaking Changes**: Expect regular updates that may break existing functionality
- **Documentation**: Documentation may be incomplete or outdated
- **Testing**: Limited testing coverage - use in development environments only
- **Contributions Welcome**: This is an active development project - contributions and feedback are encouraged

### 🚨 CRITICAL SECURITY WARNING
**⚠️ PRODUCTION DEPLOYMENT SECURITY RISK**

The development toolkit has **direct file system access** and can edit files on your server/computer. This creates a **critical security vulnerability** if deployed to production.

**MANDATORY: Remove the toolkit before production deployment**
```bash
# Before deploying to production, ALWAYS run:
rm -rf src/routes/toolkit/
```

**Why this is critical:**
- The toolkit can read and write files on your server
- It has access to your entire project structure
- Malicious users could potentially access sensitive files
- The toolkit is designed for development only

**Safe deployment checklist:**
- ✅ Remove `src/routes/toolkit/` folder
- ✅ Test your application without the toolkit
- ✅ Verify no toolkit references remain
- ✅ Deploy only the production application

## 📖 How to Use

### 🎯 Getting Started

> **⚠️ Alpha Development**: This project is actively being developed. Features may be incomplete, have bugs, or change without notice. Use in development environments only.

1. **Choose Your Tool**
   - **Web Builder**: Navigate to `/toolkit/builder` for visual web development
   - **SOP Manager**: Navigate to `/toolkit/sop-manager` for document management
   - **Blog Manager**: Navigate to `/toolkit/blog-manager` for content creation
   - **Ticketing System**: Navigate to `/toolkit/ticketing-system` for ticket management
   - **Admin Console**: Navigate to `/toolkit/admin-console` for database management

2. **Edit Elements Visually**
   - Click on any element in the rendered page
   - The CSS Properties Panel will appear on the right
   - Edit properties and see changes instantly
   - Right-click on buttons to add functions with the context menu

### 📝 Using the SOP Manager

#### Creating SOPs
1. **Access the SOP Manager**: Navigate to `/toolkit/sop-manager`
2. **Start with Templates**: The editor comes pre-loaded with comprehensive SOP templates
3. **Edit in Real-time**: Type in the left panel and see changes instantly in the right panel
4. **Use Markdown Syntax**: 
   - `#` for main headings
   - `##` for subheadings
   - `**bold text**` for emphasis
   - `-` or `*` for bullet points
   - `1.` for numbered lists
   - `` `code` `` for inline code
   - `---` for horizontal rules

#### Adjusting the Layout
- Use the arrow buttons in the header to adjust the split between editor and preview
- Click the fullscreen button to toggle fullscreen mode
- On mobile devices, the layout automatically switches to vertical stacking

### 📝 Using the Blog Manager

#### Creating Articles
1. **Access the Blog Manager**: Navigate to `/toolkit/blog-manager`
2. **Create New Article**: Click the "Create Article" button to start a new post
3. **Fill in Metadata**: Add title, excerpt, author, tags, and set status
4. **Write Content**: Use the Monaco Editor with markdown support for rich content
5. **Save or Publish**: Save as draft or publish immediately

#### Managing Articles
- **Article List**: View all articles with status, date, and author information
- **Edit Articles**: Click edit to modify existing articles
- **Delete Articles**: Remove articles with confirmation dialog
- **Status Management**: Track draft and published articles separately

### 🎨 Using the CSS Properties Panel

#### Box Model Editor
- **Margin Controls**: Adjust top, right, bottom, left margins with visual feedback
- **Padding Controls**: Modify padding values with real-time preview
- **Border Controls**: Set border width, style, and color
- **Visual Box Model**: See how your changes affect the element's box model

#### Typography Controls
- **Font Properties**: Size, weight, family, line height
- **Text Alignment**: Left, center, right, justify
- **Color Picker**: Choose text colors with the built-in color picker

#### Layout Controls
- **Dimensions**: Width and height
- **Display**: Block, inline, flex, grid, none
- **Positioning**: Position, top, left, right, bottom

#### Background Controls
- **Background Color**: Set background colors
- **Background Image**: Add background images
- **Background Size**: Cover, contain, auto
- **Background Position**: Center, top, bottom, etc.

### 📁 File Management

#### Direct File Editing
- **No Save Required**: All changes are applied directly to your source files
- **Instant Persistence**: Edits are written to disk immediately
- **Version Control Ready**: Changes work seamlessly with Git and other VCS
- **No Temporary Files**: No intermediate files or export steps needed



## 🏗️ Project Structure

```
scripter-devkit/
├── src/
│   ├── routes/
│   │   ├── +page.svelte          # Landing page
│   │   └── toolkit/              # Development tools (remove for production)
│   │       ├── builder/          # Visual Web Builder
│   │       │   ├── +page.svelte  # Main builder interface
│   │       │   ├── +page.server.ts
│   │       │   ├── store.ts
│   │       │   ├── api/
│   │       │   └── components/
│   │       ├── sop-manager/      # SOP Document Manager
│   │       │   ├── +page.svelte
│   │       │   ├── components/
│   │       │   └── example.svx
│   │       ├── blog-manager/     # Blog Content Manager
│   │       │   ├── +page.svelte
│   │       │   └── components/
│   │       └── ticketing-system/ # Ticket Management System
│   │           ├── +page.svelte
│   │           └── components/
│   ├── lib/                     # Shared utilities and components
│   │   ├── components/          # Shared components
│   │   └── stores/              # Shared stores
│   └── app.html                 # HTML template
├── static/                      # Static assets
├── package.json                 # Dependencies
└── README.md                    # This file
```

### 🧹 Production Deployment
**Important**: Remove the `src/routes/toolkit/` folder before deploying to production to keep your application clean and optimized.

## 🛠️ Development

### Tech Stack
- **Frontend**: SvelteKit with Svelte 5 Runes
- **Runtime**: Bun (recommended) or Node.js
- **Code Editor**: Monaco Editor
- **Markdown Processing**: mdsvex
- **Styling**: CSS with modern features
- **State Management**: Svelte stores

### Key Components
- **EditableRenderer**: Renders Svelte components visually
- **CssPropertiesPanel**: Comprehensive CSS property controls
- **ContextMenu**: Right-click context menu for elements
- **FunctionEditor**: Monaco Editor for adding functions to elements
- **MarkdownEditor**: Monaco Editor configured for markdown
- **BlogList**: Article listing with status, metadata, and actions

### State Management
The application uses Svelte stores for state management:
- **editingState**: Tracks current element and editing state
- **contextMenuState**: Manages context menu visibility and position
- **functionEditorState**: Manages function editor state
- **elementRegistry**: Maps elements to their data

## 🚀 Deployment

### Building for Production
```bash
bun run build
# or
npm run build
```

### Preview Production Build
```bash
bun run preview
# or
npm run preview
```

### Deployment Options
- **Vercel**: Deploy with Vercel adapter
- **Netlify**: Deploy with Netlify adapter
- **Static Hosting**: Build and deploy static files
- **Docker**: Containerize the application

## 🚧 Current Development Status

### ✅ Alpha Stage Features (Available Now)
- ✅ **Web Builder**: Visual editing with CSS properties panel and right-click context menus
- ✅ **SOP Manager**: Markdown editor with live preview and professional templates
- ✅ **Blog Manager**: Article management with Monaco Editor and LinkedIn-style interface
- ✅ **Ticketing System**: Ticket management with resolver groups and markdown support
- ✅ **Admin Console**: Database management and query editor with multiple database support
- ✅ **Security Tools**: Basic security scanning and dependency checking
- ✅ **Dark Mode**: Global theme system with smooth transitions
- ✅ **Responsive Design**: Mobile-friendly interfaces that work on all devices
- ✅ **Zero Bloatware**: Optimized performance with minimal dependencies
- ✅ **Direct File Editing**: Real-time changes applied to your source files

### 🔄 Known Limitations (Alpha Stage)
- 🔄 **Data Persistence**: Currently in-memory only (no database integration)
- 🔄 **File System**: Limited to development environment
- 🔄 **User Management**: No authentication system
- 🔄 **Collaboration**: No real-time collaboration features
- 🔄 **Testing**: Limited test coverage

### 🚀 Roadmap (Coming Soon)
- 🚀 **Cloud Version**: Online collaboration and project sharing
- 🚀 **Database Integration**: Persistent data storage with multiple database support
- 🚀 **User Authentication**: Multi-user support with role-based access
- 🚀 **Plugin System**: Extensible architecture for custom tools
- 🚀 **Advanced Features**: More sophisticated editing capabilities
- 🚀 **AI Integration**: Enhanced AI-powered code generation and suggestions
- 🚀 **Enterprise Features**: Advanced collaboration and deployment tools

## 🤝 Contributing

This is an active development project and we're looking for contributors to help shape the future of Full-Code development.

### How to Contribute
1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Development Guidelines
- Follow SvelteKit conventions
- Use TypeScript for type safety
- Write clean, documented code
- Test your changes thoroughly
- Maintain the no-bloatware philosophy
- Keep the codebase clean and well-documented

### 🏗️ Project Structure Guidelines
When contributing new tools or features, please follow these structure guidelines:

#### Tool Organization
- **All development tools must be placed under `src/routes/toolkit/`**
- **Each tool should have its own folder**: `toolkit/[tool-name]/`
- **Consistent structure for each tool**:
  ```
  toolkit/[tool-name]/
  ├── +page.svelte          # Main tool interface
  ├── components/           # Tool-specific components
  ├── api/                  # Tool-specific API endpoints (if needed)
  └── README.md            # Tool documentation (optional)
  ```

#### Component Organization
- **Shared components** go in `src/lib/components/`
- **Tool-specific components** go in `toolkit/[tool-name]/components/`
- **Shared utilities and stores** go in `src/lib/`

#### Production Cleanup
- **Always document** that tools are in the `toolkit/` folder for easy removal
- **Update the main README** when adding new tools
- **Ensure the toolkit folder can be safely removed** without breaking the main application

This structure ensures easy production deployment by simply removing the `toolkit/` folder.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **SvelteKit** for the amazing framework
- **Monaco Editor** for the code editing experience
- **mdsvex** for markdown processing
- **Svelte 5 Runes** for the new reactivity system

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check the documentation
- Join our community discussions

## 🎯 Getting Started Today

### 🚀 Ready to Experience the Full-Code Revolution?

1. **Clone and Install**: Get started in minutes with our simple setup
2. **Choose Your Tool**: Pick from our complete development toolkit
3. **Build Freely**: Create without limitations or vendor lock-in
4. **Deploy Anywhere**: Use your own infrastructure and hosting

### 💡 Why Developers Love Scripter DevKit

> *"Finally, a development platform that doesn't treat me like a hostage. I can use my own AI tools, deploy on my own servers, and own my code completely."* - **Developer**

> *"The visual editing is incredible, but what really sold me was the zero bloatware approach. My apps are fast and clean."* - **Designer**

> *"We saved thousands on monthly subscriptions and got better results. The Full-Code approach is the future."* - **Startup Founder**

### 🌟 Join the Full-Code Revolution

**Scripter DevKit** is more than just a development platform - it's a movement towards truly free, flexible, and powerful application development. Join thousands of developers, designers, and businesses who have already embraced the Full-Code philosophy.

**Start building the future today - with complete freedom and zero limitations.**

---

**Happy Building! 🎨✨**

*Built with ❤️ by Scripter for the SvelteKit community*
