# 🛠️ Scripter DevKit - Full-Code Development Platform

A revolutionary "Full-Code" development platform by **Scripter** that bridges the gap between no-code platforms and traditional development. Build enterprise-grade applications with complete code ownership, using your own infrastructure and AI-powered tools.

> **⚠️ Alpha Stage Notice**: This project is currently in its infancy and alpha development stage. While functional, it's actively being developed and may have bugs, incomplete features, or breaking changes. Use at your own risk and expect regular updates and improvements.

**🎯 The Full-Code Revolution:**
- **🤖 AI-Powered Development**: Leverage AI tools like Cursor, Gemini, and Kiro while maintaining complete code ownership
- **💻 Your Infrastructure, Your Code**: No third-party dependencies or expensive subscriptions - use your own computer resources
- **🎯 Beginner-Friendly Power**: Visual tools for non-developers combined with full codebase access for professionals
- **⚡ Zero Limitations**: No platform restrictions, no vendor lock-in, no expensive plugins
- **🔒 Complete Code Ownership**: The code is yours, generated on your infrastructure, with full customization capabilities
- **🚀 Zero Bloatware**: Optimized performance with minimal dependencies and maximum efficiency

## 🚀 The Full-Code Advantage

### 🤖 AI-Powered Development
Scripter DevKit embraces the power of AI tools like Cursor, Gemini, and Kiro while ensuring you maintain complete ownership of your code. Unlike traditional no-code platforms that generate code on their servers, our platform runs on your infrastructure, giving you full control and eliminating dependency on third-party services.

### 💻 Your Infrastructure, Your Code
- **No Third-Party Dependencies**: All code generation happens on your computer
- **Complete Code Ownership**: The generated code is yours, with no licensing fees
- **Choose Your Providers**: Use your preferred hosting, database, and service providers
- **Use Free Libraries**: Leverage open-source libraries instead of expensive plugins
- **Enterprise Ready**: No limitations, full customization, and complete control

### 🎯 Beginner-Friendly Power
- **Visual Tools**: Intuitive interfaces for non-developers
- **Full Codebase Access**: Complete access to generated code for professionals
- **AI Assistance**: AI-powered code generation and suggestions
- **Learning Path**: Gradual transition from visual tools to code editing

### 🚀 Zero Bloatware Advantage
- **Built on SvelteKit**: Leverages SvelteKit's optimizations for performance
- **Dynamic Loading**: Heavy components loaded only when needed using dynamic imports
- **Lightweight Alternatives**: Custom markdown-to-HTML converter and visual editors
- **Minimal Dependencies**: Only essential libraries included
- **Production Ready**: Easy deployment by removing toolkit folder
- **Your Infrastructure**: Runs on your own servers with full control

## ✨ Features

### 🎨 Visual Web Builder
- **Real-time Visual Editing**: Click on any element to edit its content and CSS properties
- **Live Preview**: See changes instantly as you edit
- **No Code Required**: Visual interface for web design without writing CSS
- **AI-Powered Suggestions**: Get intelligent suggestions for design improvements

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
Simply remove the `src/routes/toolkit/` folder before deploying to production to keep your application clean and optimized.

### 🧩 Element Library
- **HTML Elements**: Drag and drop common HTML elements (text, links, images, buttons)
- **Layout Elements**: Container, section, div, article elements
- **Form Elements**: Input, textarea, select, checkbox elements

### 🔧 Developer Experience
- **SvelteKit Integration**: Built on SvelteKit for modern web development
- **TypeScript Support**: Full TypeScript support for type safety
- **Hot Reload**: Instant updates during development
- **Responsive Design**: Works on desktop and tablet devices
- **Zero Bloatware**: No additional dependencies added to your project
- **Direct File Editing**: Changes are applied directly to your source files in real-time

## 💡 Why Full-Code?

### 🆚 Full-Code vs No-Code/Low-Code

| Feature | No-Code/Low-Code | Full-Code (Scripter DevKit) |
|---------|------------------|------------------------------|
| **Code Ownership** | ❌ Locked to platform | ✅ Complete ownership |
| **Infrastructure** | ❌ Platform servers | ✅ Your own infrastructure |
| **Customization** | ❌ Limited by platform | ✅ Unlimited customization |
| **AI Integration** | ❌ Platform AI only | ✅ Your choice of AI tools |
| **Cost** | ❌ Monthly subscriptions | ✅ One-time, no ongoing fees |
| **Vendor Lock-in** | ❌ Trapped in ecosystem | ✅ No dependencies |
| **Enterprise Use** | ❌ Limited scalability | ✅ Full enterprise capabilities |
| **Learning Curve** | ❌ Platform-specific skills | ✅ Transferable development skills |

### 🎯 Perfect For:
- **Developers**: Who want AI assistance without losing code control
- **Designers**: Who need to build functional prototypes quickly
- **Business Users**: Who want to create applications without coding knowledge
- **Enterprises**: Who need full customization and control over their applications
- **Startups**: Who want to build MVPs quickly without vendor lock-in

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

## 📖 How to Use

### 🎯 Getting Started

> **⚠️ Alpha Development**: This project is actively being developed. Features may be incomplete, have bugs, or change without notice. Use in development environments only.

1. **Choose Your Tool**
   - **Web Builder**: Navigate to `/toolkit/builder` for visual web development
   - **SOP Manager**: Navigate to `/toolkit/sop-manager` for document management
   - **Blog Manager**: Navigate to `/toolkit/blog-manager` for content creation
   - **Ticketing System**: Navigate to `/toolkit/ticketing-system` for ticket management
   - **Admin Console**: Navigate to `/toolkit/admin-console` for database management

2. **Launch the Builder**
   - Open the application in your browser
   - You'll see the main interface with sidebar, content area, and navigation

3. **Navigate Your Project**
   - Use the "Project" tab in the sidebar to browse your file structure
   - Click on any `.svelte` file to open it in the visual editor

4. **Edit Elements Visually**
   - Click on any element in the rendered page
   - The CSS Properties Panel will appear on the right
   - Edit properties and see changes instantly

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

#### Visual vs Code Editing
- **Svelte Files**: Open in visual editor for drag-and-drop editing
- **Other Files**: Open in Monaco code editor for traditional code editing
- **Automatic Switching**: The system automatically chooses the appropriate editor

#### Project Navigation
- **File Tree**: Browse your entire project structure
- **File Selection**: Click any file to open and edit
- **Real-time Updates**: Changes are saved automatically

#### Direct File Editing
- **No Save Required**: All changes are applied directly to your source files
- **Instant Persistence**: Edits are written to disk immediately
- **Version Control Ready**: Changes work seamlessly with Git and other VCS
- **No Temporary Files**: No intermediate files or export steps needed

### 🧩 Adding Elements

1. **Switch to Elements Tab**
   - Click the "Elements" tab in the sidebar

2. **Choose Element Category**
   - **Basic Elements**: Text, links, images, buttons
   - **Layout Elements**: Containers, sections, divs
   - **Form Elements**: Inputs, textareas, selects

3. **Drag and Drop**
   - Drag elements from the sidebar to your page
   - Elements are automatically added to your Svelte component

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

#### Web Builder Components
- **EditableRenderer**: Renders Svelte components visually
- **CssPropertiesPanel**: Comprehensive CSS property controls
- **BoxModel**: Interactive box model representation
- **FolderStructure**: File tree navigation

#### SOP Manager Components
- **MarkdownEditor**: Monaco Editor configured for markdown
- **MarkdownPreview**: Live preview with custom styling
- **Example Templates**: Pre-built SOP templates

#### Blog Manager Components
- **BlogList**: Article listing with status, metadata, and actions
- **ArticleEditor**: LinkedIn-style editor with metadata panel and content editor

### State Management
The application uses Svelte stores for state management:
- **editingState**: Tracks current element and editing state
- **editorState**: Manages file content and editor type
- **elementRegistry**: Maps elements to their data
- **markdownContent**: Manages SOP document content
- **articles**: Manages blog articles and their metadata

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

### Alpha Stage Features
- ✅ **Web Builder**: Visual editing with CSS properties panel
- ✅ **SOP Manager**: Markdown editor with live preview
- ✅ **Blog Manager**: Article management with Monaco Editor
- ✅ **Ticketing System**: Ticket management with resolver groups
- ✅ **Admin Console**: Database management and query editor
- ✅ **Dark Mode**: Global theme system
- ✅ **Responsive Design**: Mobile-friendly interfaces

### Known Limitations
- 🔄 **Data Persistence**: Currently in-memory only (no database integration)
- 🔄 **File System**: Limited to development environment
- 🔄 **User Management**: No authentication system
- 🔄 **Collaboration**: No real-time collaboration features
- 🔄 **Testing**: Limited test coverage

### Roadmap
- 🚀 **Cloud Version**: Online collaboration and project sharing
- 🚀 **Database Integration**: Persistent data storage
- 🚀 **User Authentication**: Multi-user support
- 🚀 **Plugin System**: Extensible architecture
- 🚀 **Advanced Features**: More sophisticated editing capabilities

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

---

**Happy Building! 🎨✨**
