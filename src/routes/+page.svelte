<script lang="ts">
    // Add any interactive functionality here if needed
</script>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        line-height: 1.6;
        color: #1f2937;
        background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        min-height: 100vh;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
    }

    /* Header */
    header {
        background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
        color: white;
        padding: 1rem 0;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .logo {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 1.5rem;
        font-weight: 700;
    }

    .logo-icon {
        font-size: 2rem;
    }

    .logo-text {
        background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .cta-button {
        background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 600;
        text-decoration: none;
        display: inline-block;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    }

    .cta-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
        background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
    }

    /* Hero Section */
    .hero {
        padding: 4rem 0;
        text-align: center;
        background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
        border-bottom: 1px solid #e2e8f0;
    }

    .hero h1 {
        font-size: 3.5rem;
        font-weight: 800;
        margin-bottom: 1.5rem;
        background: linear-gradient(135deg, #1e293b 0%, #475569 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        line-height: 1.2;
    }

    .hero-subtitle {
        font-size: 1.25rem;
        color: #64748b;
        margin-bottom: 2rem;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
    }

    .hero-buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
    }

    .btn-primary {
        background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
        color: white;
        border: none;
        padding: 16px 32px;
        border-radius: 12px;
        font-weight: 600;
        font-size: 1.1rem;
        text-decoration: none;
        display: inline-block;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
    }

    .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
        background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
    }

    .btn-secondary {
        background: white;
        color: #3b82f6;
        border: 2px solid #3b82f6;
        padding: 16px 32px;
        border-radius: 12px;
        font-weight: 600;
        font-size: 1.1rem;
        text-decoration: none;
        display: inline-block;
        transition: all 0.3s ease;
    }

    .btn-secondary:hover {
        background: #3b82f6;
        color: white;
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(59, 130, 246, 0.2);
    }

    /* Features Section */
    .features {
        padding: 4rem 0;
        background: white;
    }

    .section-title {
        text-align: center;
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 3rem;
        color: #1e293b;
    }

    .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-bottom: 3rem;
    }

    .feature-card {
        background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
        border: 1px solid #e2e8f0;
        border-radius: 16px;
        padding: 2rem;
        text-align: center;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }

    .feature-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
        border-color: #3b82f6;
    }

    .feature-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
        display: block;
    }

    .feature-title {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 1rem;
        color: #1e293b;
    }

    .feature-description {
        color: #64748b;
        line-height: 1.6;
    }

    /* Info Section */
    .info-section {
        padding: 4rem 0;
        background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
        border-top: 1px solid #cbd5e1;
    }

    .info-content {
        max-width: 800px;
        margin: 0 auto;
        text-align: center;
    }

    .info-title {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
        color: #1e293b;
    }

    .info-text {
        font-size: 1.1rem;
        color: #475569;
        line-height: 1.7;
        margin-bottom: 2rem;
    }

    .warning-box {
        background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
        border: 1px solid #f59e0b;
        border-radius: 12px;
        padding: 1.5rem;
        margin: 2rem 0;
        text-align: left;
    }

    .warning-title {
        font-weight: 600;
        color: #92400e;
        margin-bottom: 0.5rem;
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .warning-list {
        color: #92400e;
        margin: 0;
        padding-left: 1.5rem;
    }

    .warning-list li {
        margin-bottom: 0.5rem;
    }

    /* Footer */
    footer {
        background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
        color: white;
        padding: 2rem 0;
        text-align: center;
    }

    .footer-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 1rem;
    }

    .footer-text {
        color: #cbd5e1;
    }

    .footer-links {
        display: flex;
        gap: 1rem;
    }

    .footer-link {
        color: #60a5fa;
        text-decoration: none;
        transition: color 0.3s ease;
    }

    .footer-link:hover {
        color: #93c5fd;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
        .hero h1 {
            font-size: 2.5rem;
        }

        .hero-buttons {
            flex-direction: column;
            align-items: center;
        }

        .features-grid {
            grid-template-columns: 1fr;
        }

        .footer-content {
            flex-direction: column;
            text-align: center;
        }
    }
</style>

<header>
    <div class="container">
        <div class="header-content">
            <div class="logo">
                <span class="logo-icon">🚀</span>
                <span class="logo-text">SvelteKitBuilder</span>
            </div>
            <a href="/builder" class="cta-button">Launch Builder</a>
        </div>
    </div>
</header>

<main>
    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <h1>Build Web Apps Visually with SvelteKit</h1>
            <p class="hero-subtitle">
                A powerful visual web builder that's 100% compatible with SvelteKit. 
                Create stunning applications without leaving your favorite framework.
            </p>
            <div class="hero-buttons">
                <a href="/builder" class="btn-primary">🚀 Start Building</a>
                <a href="#features" class="btn-secondary">📖 Learn More</a>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="features" id="features">
        <div class="container">
            <h2 class="section-title">Why Choose SvelteKitBuilder?</h2>
            <div class="features-grid">
                <div class="feature-card">
                    <span class="feature-icon">⚡</span>
                    <h3 class="feature-title">Lightweight & Fast</h3>
                    <p class="feature-description">
                        No bloatware added to your codebase. The builder works internally, 
                        leveraging SvelteKit's filesystem access for optimal performance.
                    </p>
                </div>
                <div class="feature-card">
                    <span class="feature-icon">🔧</span>
                    <h3 class="feature-title">100% SvelteKit Compatible</h3>
                    <p class="feature-description">
                        Use all SvelteKit features and npm/bun packages. 
                        No compromises, no limitations - just pure SvelteKit power.
                    </p>
                </div>
                <div class="feature-card">
                    <span class="feature-icon">🎨</span>
                    <h3 class="feature-title">Visual Editing</h3>
                    <p class="feature-description">
                        Click any element to edit content and CSS properties in real-time. 
                        Professional interface with controls.
                    </p>
                </div>
                <div class="feature-card">
                    <span class="feature-icon">📁</span>
                    <h3 class="feature-title">File System Integration</h3>
                    <p class="feature-description">
                        Direct access to your project structure. Edit files live and see 
                        changes instantly in the browser.
                    </p>
                </div>
                <div class="feature-card">
                    <span class="feature-icon">🔄</span>
                    <h3 class="feature-title">Real-time Updates</h3>
                    <p class="feature-description">
                        Changes are applied immediately. No need to refresh or rebuild - 
                        see your updates live as you make them.
                    </p>
                </div>
                <div class="feature-card">
                    <span class="feature-icon">🛡️</span>
                    <h3 class="feature-title">Production Ready</h3>
                    <p class="feature-description">
                        Simply remove the builder folder before deployment. 
                        Your production app remains clean and optimized.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Info Section -->
    <section class="info-section">
        <div class="container">
            <div class="info-content">
                <h2 class="info-title">How It Works</h2>
                <p class="info-text">
                    SvelteKitBuilder is not a SvelteKit superset but a powerful plugin that adds 
                    visual web building capabilities to your existing SvelteKit projects. The builder 
                    leverages SvelteKit's API functionalities to provide a simple and fast way to 
                    build web applications.
                </p>
                <p class="info-text">
                    The builder has its own API that takes advantage of SvelteKit's access to the 
                    filesystem, allowing the rendering of your application within the builder interface. 
                    This approach ensures there's no bloatware added to your codebase since the builder 
                    works internally rather than parsing code externally.
                </p>
                
                <div class="warning-box">
                    <h3 class="warning-title">
                        <span>⚠️</span>
                        Before Going to Production
                    </h3>
                    <p style="color: #92400e; margin-bottom: 1rem;">
                        Remember to remove the builder folder from your project before deploying to production:
                    </p>
                    <ul class="warning-list">
                        <li><code>src/routes/builder</code> - Remove this entire folder</li>
</ul>
                </div>
            </div>
        </div>
    </section>
</main>

<footer>
    <div class="container">
        <div class="footer-content">
            <div class="footer-text">
                © 2024 SvelteKitBuilder. Built with ❤️ for the SvelteKit community.
            </div>
            <div class="footer-links">
                <a href="/builder" class="footer-link">Launch Builder</a>
                <a href="#" class="footer-link">Documentation</a>
                <a href="#" class="footer-link">GitHub</a>
            </div>
        </div>
    </div>
</footer>