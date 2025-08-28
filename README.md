# 🚀 Visual Web Builder

A powerful visual web builder built with **SvelteKit** that allows you to visually edit and design web pages with real-time CSS property editing. Think of it as a visual code editor that combines the power of SvelteKit with an intuitive drag-and-drop interface.

**🎯 Key Benefits:**
- **No Bloat**: Doesn't add any unnecessary dependencies or bloatware to your project
- **Real-time File Editing**: Edits your actual source files directly - no need to save changes manually
- **Lightweight**: Minimal footprint that works with your existing SvelteKit projects

## ✨ Features

### 🎨 Visual Editor
- **Real-time Visual Editing**: Click on any element to edit its content and CSS properties
- **Live Preview**: See changes instantly as you edit
- **No Code Required**: Visual interface for web design without writing CSS

### 🎛️ CSS Properties Panel
- **Comprehensive CSS Controls**: Edit margins, padding, borders, typography, layout, and background properties
- **Box Model Visualization**: Interactive box model with visual representation of margin, padding, and border
- **Color Pickers**: Built-in color pickers for all color properties
- **Real-time Updates**: Changes apply instantly to the selected element

### 📁 Project Structure
- **File Tree Navigation**: Browse and manage your entire project structure
- **File Editor Integration**: Switch between visual editor and Monaco code editor
- **Svelte File Support**: Visual editing for `.svelte` files, code editing for other file types

### 🧩 Element Library
- **HTML Elements**: Drag and drop common HTML elements (text, links, images, buttons)
- **Layout Elements**: Container, section, div, article elements
- **Form Elements**: Input, textarea, select, checkbox elements

### 🔧 Developer Experience
- **SvelteKit Integration**: Built on SvelteKit for modern web development
- **TypeScript Support**: Full TypeScript support for type safety
- **Hot Reload**: Instant updates during development
- **Responsive Design**: Works on desktop and tablet devices
- **Zero Bloat**: No additional dependencies added to your project
- **Direct File Editing**: Changes are applied directly to your source files in real-time

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **Bun** (recommended) or npm/yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
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

## 📖 How to Use

### 🎯 Getting Started

1. **Launch the Builder**
   - Open the application in your browser
   - You'll see the main interface with sidebar, content area, and navigation

2. **Navigate Your Project**
   - Use the "Project" tab in the sidebar to browse your file structure
   - Click on any `.svelte` file to open it in the visual editor

3. **Edit Elements Visually**
   - Click on any element in the rendered page
   - The CSS Properties Panel will appear on the right
   - Edit properties and see changes instantly

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
web_builder/
├── src/
│   ├── routes/
│   │   ├── +page.svelte          # Landing page
│   │   └── builder/
│   │       ├── +page.svelte      # Main builder interface
│   │       ├── +page.server.ts   # Server-side file loading
│   │       ├── store.ts          # State management
│   │       ├── api/
│   │       │   └── load-file/    # File loading API
│   │       └── components/
│   │           ├── EditableRenderer.svelte    # Visual editor
│   │           ├── CssPropertiesPanel.svelte  # CSS controls
│   │           ├── BoxModel.svelte            # Box model visualization
│   │           ├── FolderStructure.svelte     # File tree
│   │           └── MonacoEditor.svelte        # Code editor
│   ├── lib/                     # Shared utilities
│   └── app.html                 # HTML template
├── static/                      # Static assets
├── package.json                 # Dependencies
└── README.md                    # This file
```

## 🛠️ Development

### Tech Stack
- **Frontend**: SvelteKit with Svelte 5 Runes
- **Runtime**: Bun (recommended) or Node.js
- **Code Editor**: Monaco Editor
- **Styling**: CSS with modern features
- **State Management**: Svelte stores

### Key Components

#### EditableRenderer
- Renders Svelte components visually
- Makes elements clickable for editing
- Handles element selection and interaction

#### CssPropertiesPanel
- Comprehensive CSS property controls
- Real-time property updates
- Box model visualization

#### BoxModel
- Interactive box model representation
- Visual feedback for margin, padding, border
- Intuitive property editing

#### FolderStructure
- File tree navigation
- Expandable/collapsible folders
- File selection and opening

### State Management
The application uses Svelte stores for state management:
- **editingState**: Tracks current element and editing state
- **editorState**: Manages file content and editor type
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

## 🤝 Contributing

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

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **SvelteKit** for the amazing framework
- **Monaco Editor** for the code editing experience
- **Svelte 5 Runes** for the new reactivity system

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check the documentation
- Join our community discussions

---

**Happy Building! 🎨✨**
# Scripter-Web-Builder
