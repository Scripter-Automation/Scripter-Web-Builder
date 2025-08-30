<script lang="ts">
    import ThemeToggle from '$lib/components/ThemeToggle.svelte';
</script>

<style>
    :global(body) {
        margin: 0;
        padding: 0;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        line-height: 1.6;
        color: var(--text-primary);
        background: var(--gradient-bg);
        min-height: 100vh;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
    }

    /* Header */
    header {
        background: var(--bg-header);
        color: var(--text-inverse);
        padding: 1rem 0;
        box-shadow: var(--shadow-lg);
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
        background: var(--gradient-primary);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .cta-button {
        background: var(--gradient-primary);
        color: var(--text-inverse);
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 600;
        text-decoration: none;
        display: inline-block;
        transition: all 0.3s ease;
        box-shadow: var(--shadow-md);
    }

    .cta-button:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
        background: var(--gradient-primary);
        filter: brightness(1.1);
    }

    .header-buttons {
        display: flex;
        gap: 1rem;
        align-items: center;
    }

    .theme-toggle-container {
        margin-left: 1rem;
    }

    .sop-button {
        background: var(--gradient-green);
        box-shadow: var(--shadow-md);
    }

    .sop-button:hover {
        background: var(--gradient-green);
        box-shadow: var(--shadow-lg);
        filter: brightness(1.1);
    }

    .blog-button {
        background: var(--gradient-purple);
        box-shadow: var(--shadow-md);
    }

    .blog-button:hover {
        background: var(--gradient-purple);
        box-shadow: var(--shadow-lg);
        filter: brightness(1.1);
    }

    .ticketing-button {
        background: var(--gradient-yellow);
        box-shadow: var(--shadow-yellow);
    }

    .ticketing-button:hover {
        background: var(--gradient-yellow);
        box-shadow: var(--shadow-yellow-hover);
        filter: brightness(1.1);
    }

    /* Hero Section */
    .hero {
        height: 100vh;
        text-align: center;
        background: var(--gradient-bg);
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .hero::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.1) 0%, transparent 50%);
        pointer-events: none;
    }

    .hero .container {
        position: relative;
        z-index: 1;
        animation: float 6s ease-in-out infinite;
        max-width: 1200px;
        width: 100%;
        padding: 0 2rem;
    }

    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-10px);
        }
    }

    .hero h1 {
        font-size: 4rem;
        font-weight: 900;
        margin-bottom: 1.5rem;
        color: var(--text-primary);
        line-height: 1.1;
        text-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        animation: titleGlow 3s ease-in-out infinite alternate;
    }

    @keyframes titleGlow {
        0% {
            filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.4));
        }
        100% {
            filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.8));
        }
    }

    .hero-subtitle {
        font-size: 1.4rem;
        color: var(--text-primary);
        margin-bottom: 2.5rem;
        max-width: 700px;
        margin-left: auto;
        margin-right: auto;
        line-height: 1.6;
        font-weight: 600;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .hero-buttons {
        display: flex;
        gap: 1.25rem;
        justify-content: center;
        flex-wrap: wrap;
        margin-top: 1rem;
    }

    .btn-primary {
        background: var(--gradient-primary);
        color: var(--text-inverse);
        border: none;
        padding: 18px 36px;
        border-radius: 16px;
        font-weight: 700;
        font-size: 1.1rem;
        text-decoration: none;
        display: inline-block;
        transition: all 0.3s ease;
        box-shadow: var(--shadow-lg);
        position: relative;
        overflow: hidden;
    }

    .btn-primary::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        transition: left 0.5s;
    }

    .btn-primary:hover::before {
        left: 100%;
    }

    .btn-primary:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 25px rgba(59, 130, 246, 0.4);
        background: var(--gradient-primary);
        filter: brightness(1.1);
    }

    .btn-secondary {
        background: var(--bg-card);
        color: var(--accent-primary);
        border: 2px solid var(--accent-primary);
        padding: 18px 36px;
        border-radius: 16px;
        font-weight: 700;
        font-size: 1.1rem;
        text-decoration: none;
        display: inline-block;
        transition: all 0.3s ease;
        box-shadow: var(--shadow-md);
    }

    .btn-secondary:hover {
        background: var(--accent-primary);
        color: var(--text-inverse);
        transform: translateY(-3px);
        box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
    }

    .sop-btn {
        background: var(--gradient-green);
        box-shadow: var(--shadow-md);
    }

    .sop-btn:hover {
        background: var(--gradient-green);
        box-shadow: var(--shadow-lg);
        filter: brightness(1.1);
    }

    .blog-btn {
        background: var(--gradient-purple);
        box-shadow: var(--shadow-md);
    }

    .blog-btn:hover {
        background: var(--gradient-purple);
        box-shadow: var(--shadow-lg);
        filter: brightness(1.1);
    }

    .ticketing-btn {
        background: var(--gradient-yellow);
        box-shadow: var(--shadow-yellow);
    }

    .ticketing-btn:hover {
        background: var(--gradient-yellow);
        box-shadow: var(--shadow-yellow-hover);
        filter: brightness(1.1);
    }

    .admin-btn {
        background: var(--gradient-purple);
        box-shadow: var(--shadow-purple);
    }

    .admin-btn:hover {
        background: var(--gradient-purple);
        box-shadow: var(--shadow-purple-hover);
        filter: brightness(1.1);
    }

    .security-btn {
        background: var(--gradient-red);
        box-shadow: var(--shadow-red);
    }

    .security-btn:hover {
        background: var(--gradient-red);
        box-shadow: var(--shadow-red-hover);
        filter: brightness(1.1);
    }

    

    /* Features Section */
    .features {
        padding: 6rem 0;
        background: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%);
        position: relative;
        overflow: hidden;
    }

    .features::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: 
            radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.05) 0%, transparent 50%);
        pointer-events: none;
    }

    .section-title {
        text-align: center;
        font-size: 3rem;
        font-weight: 800;
        margin-bottom: 1rem;
        color: var(--text-primary);
        position: relative;
        z-index: 1;
    }

    .section-title::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 80px;
        height: 4px;
        background: var(--gradient-primary);
        border-radius: 2px;
        animation: expandWidth 2s ease-in-out infinite;
    }

    @keyframes expandWidth {
        0%, 100% {
            width: 80px;
        }
        50% {
            width: 120px;
        }
    }

    .section-subtitle {
        text-align: center;
        font-size: 1.3rem;
        color: var(--text-secondary);
        margin-bottom: 4rem;
        font-weight: 500;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        z-index: 1;
    }

    .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 2.5rem;
        margin-bottom: 3rem;
        position: relative;
        z-index: 1;
    }



    .feature-card {
        background: var(--bg-card);
        border: 1px solid var(--border-primary);
        border-radius: 20px;
        padding: 2.5rem;
        text-align: center;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: var(--shadow-sm);
        position: relative;
        overflow: hidden;
        backdrop-filter: blur(10px);
    }

    .feature-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: var(--gradient-primary);
        transform: scaleX(0);
        transition: transform 0.4s ease;
    }

    .feature-card:hover::before {
        transform: scaleX(1);
    }

    .feature-card:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        border-color: var(--accent-primary);
    }

    .feature-icon {
        font-size: 4rem;
        margin-bottom: 1.5rem;
        display: block;
        transition: transform 0.3s ease;
    }

    .feature-card:hover .feature-icon {
        transform: scale(1.1) rotate(5deg);
    }

    .feature-title {
        font-size: 1.4rem;
        font-weight: 700;
        margin-bottom: 1.2rem;
        color: var(--text-primary);
        transition: color 0.3s ease;
    }

    .feature-card:hover .feature-title {
        color: var(--accent-primary);
    }

    .feature-description {
        color: var(--text-secondary);
        line-height: 1.7;
        font-size: 1.05rem;
    }

    /* Services Section */
    .services {
        padding: 6rem 0;
        background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-card) 100%);
        border-top: 1px solid var(--border-primary);
        position: relative;
        overflow: hidden;
    }

    .services::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: 
            radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.05) 0%, transparent 50%);
        pointer-events: none;
    }

    .services-subtitle {
        text-align: center;
        font-size: 1.3rem;
        color: var(--text-secondary);
        margin-bottom: 4rem;
        font-weight: 500;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
        position: relative;
        z-index: 1;
    }

    .services-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
        gap: 3rem;
        margin-bottom: 2rem;
        position: relative;
        z-index: 1;
    }



    .service-card {
        background: var(--bg-card);
        border: 1px solid var(--border-primary);
        border-radius: 24px;
        padding: 3rem;
        text-align: center;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: var(--shadow-sm);
        position: relative;
        overflow: hidden;
        backdrop-filter: blur(10px);
    }

    .service-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: var(--gradient-primary);
        transform: scaleX(0);
        transition: transform 0.4s ease;
    }

    .service-card:hover::before {
        transform: scaleX(1);
    }

    .service-card:hover {
        transform: translateY(-10px) scale(1.03);
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
        border-color: var(--accent-primary);
    }

    .service-icon {
        font-size: 4.5rem;
        margin-bottom: 2rem;
        display: block;
        transition: all 0.4s ease;
    }

    .service-card:hover .service-icon {
        transform: scale(1.15) rotate(10deg);
    }

    .service-title {
        font-size: 1.8rem;
        font-weight: 800;
        margin-bottom: 1.5rem;
        color: var(--text-primary);
        transition: color 0.3s ease;
    }

    .service-card:hover .service-title {
        color: var(--accent-primary);
    }

    .service-description {
        color: var(--text-secondary);
        line-height: 1.8;
        margin-bottom: 2.5rem;
        font-size: 1.15rem;
    }

    .service-btn {
        background: var(--gradient-primary);
        color: var(--text-inverse);
        border: none;
        padding: 16px 32px;
        border-radius: 16px;
        font-weight: 700;
        font-size: 1.1rem;
        text-decoration: none;
        display: inline-block;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: var(--shadow-md);
        position: relative;
        overflow: hidden;
    }

    .service-btn::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        transition: left 0.6s ease;
    }

    .service-btn:hover::before {
        left: 100%;
    }

    .service-btn:hover {
        transform: translateY(-3px) scale(1.05);
        box-shadow: 0 15px 30px rgba(59, 130, 246, 0.4);
        filter: brightness(1.1);
    }

    .sop-service-btn {
        background: var(--gradient-green);
        box-shadow: var(--shadow-green);
    }

    .sop-service-btn:hover {
        background: var(--gradient-green);
        box-shadow: 0 15px 30px rgba(34, 197, 94, 0.4);
    }

    .blog-service-btn {
        background: var(--gradient-purple);
        box-shadow: var(--shadow-purple);
    }

    .blog-service-btn:hover {
        background: var(--gradient-purple);
        box-shadow: 0 15px 30px rgba(168, 85, 247, 0.4);
    }

    /* Mission Section */
    .mission-section {
        padding: 6rem 0;
        background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-card) 100%);
        position: relative;
        overflow: hidden;
    }

    .mission-section::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: 
            radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(147, 51, 234, 0.03) 0%, transparent 50%);
        pointer-events: none;
    }

    .mission-content {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
        gap: 3rem;
        margin-top: 3rem;
        position: relative;
        z-index: 1;
    }



    .mission-card {
        background: var(--bg-card);
        border: 1px solid var(--border-primary);
        border-radius: 20px;
        padding: 2.5rem;
        text-align: center;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: var(--shadow-sm);
        backdrop-filter: blur(10px);
        position: relative;
        overflow: hidden;
    }

    .mission-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: var(--gradient-primary);
        transform: scaleX(0);
        transition: transform 0.4s ease;
    }

    .mission-card:hover::before {
        transform: scaleX(1);
    }

    .mission-card:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        border-color: var(--accent-primary);
    }

    .mission-icon {
        font-size: 4rem;
        margin-bottom: 1.5rem;
        transition: transform 0.4s ease;
    }

    .mission-card:hover .mission-icon {
        transform: scale(1.1) rotate(5deg);
    }

    .mission-card h3 {
        color: var(--text-primary);
        font-size: 1.8rem;
        font-weight: 800;
        margin-bottom: 1.5rem;
        transition: color 0.3s ease;
    }

    .mission-card:hover h3 {
        color: var(--accent-primary);
    }

    .mission-card p {
        color: var(--text-muted);
        line-height: 1.7;
        font-size: 1.05rem;
        margin-bottom: 1.5rem;
    }

    .values-list {
        text-align: left;
        margin-top: 1.5rem;
    }

    .value-item {
        margin-bottom: 1rem;
        padding: 1rem;
        border-radius: 12px;
        background: var(--bg-secondary);
        border: 1px solid var(--border-primary);
        transition: all 0.3s ease;
    }

    .value-item:hover {
        background: var(--bg-card);
        border-color: var(--accent-primary);
        transform: translateX(5px);
    }

    .value-item:last-child {
        margin-bottom: 0;
    }

    .value-item strong {
        color: var(--text-primary);
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 700;
    }

    /* Info Section */
    .info-section {
        padding: 6rem 0;
        background: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%);
        border-top: 1px solid var(--border-primary);
        position: relative;
        overflow: hidden;
    }

    .info-section::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: 
            radial-gradient(circle at 25% 75%, rgba(59, 130, 246, 0.04) 0%, transparent 50%),
            radial-gradient(circle at 75% 25%, rgba(147, 51, 234, 0.04) 0%, transparent 50%);
        pointer-events: none;
    }

    .info-content {
        max-width: 900px;
        margin: 0 auto;
        text-align: center;
        position: relative;
        z-index: 1;
    }

    .info-title {
        font-size: 2.5rem;
        font-weight: 800;
        margin-bottom: 2rem;
        color: var(--text-primary);
        position: relative;
    }

    .info-title::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 100px;
        height: 4px;
        background: var(--gradient-primary);
        border-radius: 2px;
    }

    .info-text {
        font-size: 1.2rem;
        color: var(--text-secondary);
        line-height: 1.8;
        margin-bottom: 2.5rem;
    }

    .warning-box {
        background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
        border: 2px solid #f59e0b;
        border-radius: 20px;
        padding: 2rem;
        margin: 3rem 0;
        text-align: left;
        box-shadow: 0 10px 30px rgba(245, 158, 11, 0.3);
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
    }

    .warning-box::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
        transform: translateX(-100%);
        transition: transform 0.6s ease;
    }

    .warning-box:hover::before {
        transform: translateX(100%);
    }

    .warning-box:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 40px rgba(245, 158, 11, 0.4);
    }

    .warning-title {
        font-weight: 700;
        color: #ffffff;
        margin-bottom: 1rem;
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 1.3rem;
    }

    .warning-list {
        color: #ffffff;
        margin: 0;
        padding-left: 1.5rem;
        font-weight: 500;
    }

    .warning-list li {
        margin-bottom: 0.75rem;
        font-size: 1.05rem;
    }

    /* No Bloatware Section */
    .no-bloat-section {
        padding: 6rem 0;
        background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-card) 100%);
        border-top: 1px solid var(--border-primary);
        position: relative;
        overflow: hidden;
    }

    .no-bloat-section::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: 
            radial-gradient(circle at 20% 20%, rgba(34, 197, 94, 0.04) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.04) 0%, transparent 50%);
        pointer-events: none;
    }

    .advantages-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2.5rem;
        margin-top: 4rem;
        position: relative;
        z-index: 1;
    }



    .advantage-card {
        background: var(--bg-secondary);
        border: 1px solid var(--border-primary);
        border-radius: 20px;
        padding: 2.5rem;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: var(--shadow-sm);
        backdrop-filter: blur(10px);
        position: relative;
        overflow: hidden;
    }

    .advantage-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: var(--gradient-primary);
        transform: scaleX(0);
        transition: transform 0.4s ease;
    }

    .advantage-card:hover::before {
        transform: scaleX(1);
    }

    .advantage-card:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        border-color: var(--accent-primary);
    }

    .advantage-icon {
        font-size: 4rem;
        margin-bottom: 1.5rem;
        display: block;
        transition: transform 0.4s ease;
    }

    .advantage-card:hover .advantage-icon {
        transform: scale(1.1) rotate(5deg);
    }

    .advantage-card h3 {
        color: var(--text-primary);
        font-size: 1.5rem;
        font-weight: 800;
        margin-bottom: 1.2rem;
        transition: color 0.3s ease;
    }

    .advantage-card:hover h3 {
        color: var(--accent-primary);
    }

    .advantage-card p {
        color: var(--text-secondary);
        line-height: 1.7;
        margin-bottom: 1.8rem;
        font-size: 1.05rem;
    }

    .advantage-card ul {
        list-style: none;
        padding: 0;
    }

    .advantage-card li {
        color: var(--text-secondary);
        padding: 0.75rem 0;
        position: relative;
        padding-left: 2rem;
        font-size: 1rem;
        transition: all 0.3s ease;
    }

    .advantage-card li:hover {
        color: var(--text-primary);
        transform: translateX(5px);
    }

    .advantage-card li::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: var(--accent-primary);
        font-weight: bold;
        font-size: 1.2rem;
        transition: transform 0.3s ease;
    }

    .advantage-card li:hover::before {
        transform: scale(1.2);
    }

    /* Implementation Section */
    .no-bloat-implementation {
        padding: 6rem 0;
        background: linear-gradient(135deg, var(--bg-card) 0%, var(--bg-secondary) 100%);
        border-top: 1px solid var(--border-primary);
        position: relative;
        overflow: hidden;
    }

    .no-bloat-implementation::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: 
            radial-gradient(circle at 30% 70%, rgba(147, 51, 234, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 70% 30%, rgba(59, 130, 246, 0.03) 0%, transparent 50%);
        pointer-events: none;
    }

    .implementation-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
        gap: 2.5rem;
        margin-top: 4rem;
        position: relative;
        z-index: 1;
    }

    .implementation-item {
        background: var(--bg-card);
        border: 1px solid var(--border-primary);
        border-radius: 16px;
        padding: 2.5rem;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: var(--shadow-sm);
        backdrop-filter: blur(10px);
        position: relative;
        overflow: hidden;
    }

    .implementation-item::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: var(--gradient-primary);
        transform: scaleX(0);
        transition: transform 0.4s ease;
    }

    .implementation-item:hover::before {
        transform: scaleX(1);
    }

    .implementation-item:hover {
        transform: translateY(-6px) scale(1.02);
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
        border-color: var(--accent-secondary);
    }

    .implementation-item h3 {
        color: var(--text-primary);
        font-size: 1.4rem;
        font-weight: 800;
        margin-bottom: 1.2rem;
        transition: color 0.3s ease;
    }

    .implementation-item:hover h3 {
        color: var(--accent-primary);
    }

    .implementation-item p {
        color: var(--text-secondary);
        line-height: 1.7;
        font-size: 1.05rem;
    }

    /* Pricing Section */
    .pricing-section {
        padding: 6rem 0;
        background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-card) 100%);
        border-top: 1px solid var(--border-primary);
        position: relative;
        overflow: hidden;
    }

    .pricing-section::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: 
            radial-gradient(circle at 25% 25%, rgba(168, 85, 247, 0.04) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(34, 197, 94, 0.04) 0%, transparent 50%);
        pointer-events: none;
    }

    .pricing-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
        gap: 3rem;
        margin-top: 4rem;
        margin-bottom: 5rem;
        position: relative;
        z-index: 1;
    }

    .pricing-card {
        background: var(--bg-secondary);
        border: 2px solid var(--border-primary);
        border-radius: 24px;
        padding: 3rem;
        position: relative;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: var(--shadow-md);
        backdrop-filter: blur(10px);
        overflow: visible;
    }

    .pricing-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, transparent 0%, rgba(255, 255, 255, 0.02) 100%);
        opacity: 0;
        transition: opacity 0.4s ease;
    }

    .pricing-card:hover::before {
        opacity: 1;
    }

    .pricing-card:hover {
        transform: translateY(-12px) scale(1.03);
        box-shadow: 0 25px 60px rgba(0, 0, 0, 0.2);
    }

    .free-tier {
        border-color: var(--accent-primary);
    }

    .free-tier:hover {
        border-color: var(--accent-primary);
        box-shadow: 0 25px 60px rgba(59, 130, 246, 0.2);
    }

    .premium-tier {
        border-color: var(--accent-secondary);
        background: linear-gradient(135deg, var(--bg-secondary) 0%, rgba(147, 51, 234, 0.05) 100%);
    }

    .premium-tier:hover {
        border-color: var(--accent-secondary);
        box-shadow: 0 25px 60px rgba(147, 51, 234, 0.2);
    }

    .pricing-badge {
        position: absolute;
        top: -15px;
        right: 25px;
        background: var(--gradient-purple);
        color: var(--text-inverse);
        padding: 10px 20px;
        border-radius: 25px;
        font-size: 1rem;
        font-weight: 700;
        box-shadow: var(--shadow-md);
        animation: pulse 2s infinite;
    }

    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }

    .pricing-header {
        text-align: center;
        margin-bottom: 2.5rem;
    }

    .pricing-header h3 {
        color: var(--text-primary);
        font-size: 1.8rem;
        font-weight: 800;
        margin-bottom: 1.5rem;
        transition: color 0.3s ease;
    }

    .pricing-card:hover .pricing-header h3 {
        color: var(--accent-primary);
    }

    .price {
        margin-bottom: 1.5rem;
    }

    .amount {
        font-size: 3.5rem;
        font-weight: 900;
        color: var(--accent-primary);
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .period {
        font-size: 1.2rem;
        color: var(--text-secondary);
        font-weight: 600;
    }

    .pricing-description {
        color: var(--text-secondary);
        font-size: 1.1rem;
        line-height: 1.6;
    }

    .features-list {
        margin-bottom: 2.5rem;
    }

    .feature-item {
        display: flex;
        align-items: center;
        padding: 1rem 0;
        color: var(--text-primary);
        transition: all 0.3s ease;
    }

    .feature-item:hover {
        transform: translateX(5px);
    }

    .check {
        color: var(--accent-primary);
        font-weight: bold;
        margin-right: 15px;
        font-size: 1.3rem;
        transition: transform 0.3s ease;
    }

    .feature-item:hover .check {
        transform: scale(1.2);
    }

    .pricing-footer {
        text-align: center;
    }

    .pricing-note {
        color: var(--text-secondary);
        font-size: 1rem;
        margin-top: 1.5rem;
        font-style: italic;
    }

    .pricing-comparison {
        margin-top: 5rem;
        padding-top: 4rem;
        border-top: 1px solid var(--border-primary);
        position: relative;
        z-index: 1;
    }

    .pricing-comparison h3 {
        text-align: center;
        color: var(--text-primary);
        font-size: 2.5rem;
        font-weight: 800;
        margin-bottom: 3rem;
        position: relative;
    }

    .pricing-comparison h3::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 80px;
        height: 4px;
        background: var(--gradient-primary);
        border-radius: 2px;
    }

    .comparison-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 3rem;
    }

    .comparison-item {
        background: var(--bg-secondary);
        border: 1px solid var(--border-primary);
        border-radius: 16px;
        padding: 2.5rem;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: var(--shadow-sm);
        backdrop-filter: blur(10px);
        position: relative;
        overflow: hidden;
    }

    .comparison-item::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: var(--gradient-primary);
        transform: scaleX(0);
        transition: transform 0.4s ease;
    }

    .comparison-item:hover::before {
        transform: scaleX(1);
    }

    .comparison-item:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        border-color: var(--accent-primary);
    }

    .comparison-item h4 {
        color: var(--text-primary);
        font-size: 1.5rem;
        font-weight: 800;
        margin-bottom: 2rem;
        text-align: center;
        transition: color 0.3s ease;
    }

    .comparison-item:hover h4 {
        color: var(--accent-primary);
    }

    .comparison-item ul {
        list-style: none;
        padding: 0;
    }

    .comparison-item li {
        padding: 0.75rem 0;
        color: var(--text-secondary);
        font-size: 1.05rem;
        transition: all 0.3s ease;
    }

    .comparison-item li:hover {
        color: var(--text-primary);
        transform: translateX(5px);
    }

    .comparison-item li:first-child {
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: 1.5rem;
        font-size: 1.2rem;
    }

    .future-note {
        margin-top: 4rem;
        padding: 2.5rem;
        background: var(--bg-secondary);
        border: 2px solid var(--border-primary);
        border-radius: 16px;
        text-align: center;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: var(--shadow-sm);
        backdrop-filter: blur(10px);
        position: relative;
        overflow: hidden;
    }

    .future-note::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: var(--gradient-primary);
        transform: scaleX(0);
        transition: transform 0.4s ease;
    }

    .future-note:hover::before {
        transform: scaleX(1);
    }

    .future-note:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
        border-color: var(--accent-primary);
    }

    .future-note h4 {
        color: var(--text-primary);
        font-size: 1.5rem;
        font-weight: 800;
        margin-bottom: 1.5rem;
        transition: color 0.3s ease;
    }

    .future-note:hover h4 {
        color: var(--accent-primary);
    }

    .future-note p {
        color: var(--text-secondary);
        line-height: 1.7;
        font-size: 1.1rem;
    }

    /* Footer */
    footer {
        background: var(--bg-header);
        color: var(--text-inverse);
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
        color: var(--text-secondary);
    }

    .footer-links {
        display: flex;
        gap: 1rem;
    }

    .footer-link {
        color: var(--accent-primary);
        text-decoration: none;
        transition: color 0.3s ease;
    }

    .footer-link:hover {
        color: var(--accent-secondary);
    }

    /* Scroll Animations */
    .feature-card,
    .service-card,
    .mission-card,
    .advantage-card,
    .implementation-item,
    .pricing-card,
    .comparison-item {
        opacity: 0;
        transform: translateY(30px);
        animation: fadeInUp 0.8s ease forwards;
        will-change: opacity, transform;
    }

    .feature-card:nth-child(1) { animation-delay: 0.1s; }
    .feature-card:nth-child(2) { animation-delay: 0.2s; }
    .feature-card:nth-child(3) { animation-delay: 0.3s; }
    .feature-card:nth-child(4) { animation-delay: 0.4s; }
    .feature-card:nth-child(5) { animation-delay: 0.5s; }
    .feature-card:nth-child(6) { animation-delay: 0.6s; }
    .feature-card:nth-child(7) { animation-delay: 0.7s; }
    .feature-card:nth-child(8) { animation-delay: 0.8s; }
    .feature-card:nth-child(9) { animation-delay: 0.9s; }
    .feature-card:nth-child(10) { animation-delay: 1s; }

    .service-card:nth-child(1) { animation-delay: 0.2s; }
    .service-card:nth-child(2) { animation-delay: 0.4s; }

    .mission-card:nth-child(1) { animation-delay: 0.1s; }
    .mission-card:nth-child(2) { animation-delay: 0.2s; }
    .mission-card:nth-child(3) { animation-delay: 0.3s; }

    .advantage-card:nth-child(1) { animation-delay: 0.1s; }
    .advantage-card:nth-child(2) { animation-delay: 0.2s; }
    .advantage-card:nth-child(3) { animation-delay: 0.3s; }
    .advantage-card:nth-child(4) { animation-delay: 0.4s; }

    .implementation-item:nth-child(1) { animation-delay: 0.1s; }
    .implementation-item:nth-child(2) { animation-delay: 0.2s; }
    .implementation-item:nth-child(3) { animation-delay: 0.3s; }
    .implementation-item:nth-child(4) { animation-delay: 0.4s; }
    .implementation-item:nth-child(5) { animation-delay: 0.5s; }
    .implementation-item:nth-child(6) { animation-delay: 0.6s; }

    .pricing-card:nth-child(1) { animation-delay: 0.2s; }
    .pricing-card:nth-child(2) { animation-delay: 0.4s; }

    .comparison-item:nth-child(1) { animation-delay: 0.1s; }
    .comparison-item:nth-child(2) { animation-delay: 0.2s; }

    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Floating Animation for Icons */
    .feature-icon,
    .service-icon,
    .mission-icon,
    .advantage-icon {
        animation: float 3s ease-in-out infinite;
        will-change: transform;
    }

    .feature-card:nth-child(even) .feature-icon,
    .service-card:nth-child(even) .service-icon,
    .mission-card:nth-child(even) .mission-icon,
    .advantage-card:nth-child(even) .advantage-icon {
        animation-delay: 1.5s;
    }

    /* Ensure icons remain visible on hover */
    .feature-card:hover .feature-icon,
    .service-card:hover .service-icon,
    .mission-card:hover .mission-icon,
    .advantage-card:hover .advantage-icon {
        animation: float 3s ease-in-out infinite;
    }

    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-10px);
        }
    }

    /* Gradient Text Animation */
    .section-title {
        background: linear-gradient(45deg, var(--accent-primary), var(--accent-secondary), var(--accent-primary));
        background-size: 200% 200%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: gradientShift 3s ease infinite;
        color: var(--text-primary); /* Fallback for browsers that don't support background-clip */
    }

    @keyframes gradientShift {
        0%, 100% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
    }

    /* Hover Effects Enhancement */
    .feature-card:hover,
    .service-card:hover,
    .mission-card:hover,
    .advantage-card:hover,
    .implementation-item:hover,
    .pricing-card:hover,
    .comparison-item:hover {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    /* Interactive Glow Effects */
    .feature-card:hover,
    .service-card:hover,
    .mission-card:hover,
    .advantage-card:hover,
    .implementation-item:hover,
    .pricing-card:hover,
    .comparison-item:hover {
        box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.15),
            0 0 20px rgba(59, 130, 246, 0.1);
    }

    /* Enhanced Button Animations */
    .service-btn:hover,
    .btn-primary:hover,
    .btn-secondary:hover {
        animation: buttonPulse 0.6s ease-in-out;
        will-change: transform;
    }

    @keyframes buttonPulse {
        0%, 100% {
            transform: translateY(-3px) scale(1.05);
        }
        50% {
            transform: translateY(-3px) scale(1.08);
        }
    }

    /* Section Background Patterns */
    .features::after,
    .services::after,
    .mission-section::after,
    .info-section::after,
    .no-bloat-section::after,
    .no-bloat-implementation::after,
    .pricing-section::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: 
            radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.02) 1px, transparent 0);
        background-size: 20px 20px;
        pointer-events: none;
        z-index: 1;
    }

    /* Responsive Design */
    @media (max-width: 1024px) {
        .hero {
            height: 100vh;
        }

        .hero h1 {
            font-size: 3.2rem;
        }

        .hero-subtitle {
            font-size: 1.2rem;
        }

        .hero-buttons {
            flex-wrap: wrap;
            justify-content: center;
            gap: 1rem;
        }

        .hero-buttons .btn-primary,
        .hero-buttons .btn-secondary {
            flex: 1;
            min-width: 200px;
            text-align: center;
        }

        .features-grid {
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
        }

        .mission-content {
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }

        .mission-card {
            padding: 1.5rem;
        }
    }

    @media (max-width: 768px) {
        .hero {
            height: 100vh;
        }

        /* Disable gradient text animation on mobile for better performance */
        .section-title {
            background: none;
            -webkit-background-clip: initial;
            -webkit-text-fill-color: initial;
            background-clip: initial;
            animation: none;
            color: var(--text-primary);
        }

        /* Reduce floating animation on mobile for better performance */
        .feature-icon,
        .service-icon,
        .mission-icon,
        .advantage-icon {
            animation: float 4s ease-in-out infinite;
        }

        .hero h1 {
            font-size: 2.5rem;
            line-height: 1.2;
        }

        .hero-subtitle {
            font-size: 1.1rem;
            line-height: 1.5;
        }

        .hero-buttons {
            flex-direction: column;
            align-items: center;
            gap: 0.75rem;
        }

        .hero-buttons .btn-primary,
        .hero-buttons .btn-secondary {
            width: 100%;
            max-width: 300px;
        }

        .header-buttons {
            flex-direction: column;
            gap: 0.5rem;
        }

        .features-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
        }

        .services-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
        }

        .service-card {
            padding: 1.5rem;
        }

        .mission-content {
            grid-template-columns: 1fr;
            gap: 1rem;
        }

        .mission-card {
            padding: 1.25rem;
        }

        .footer-content {
            flex-direction: column;
            text-align: center;
        }

        .container {
            padding: 0 1rem;
        }
    }
</style>

<header>
    <div class="container">
        <div class="header-content">
            <div class="logo">
                <span class="logo-icon">🛠️</span>
                <span class="logo-text">Scripter DevKit</span>
            </div>
            <div class="header-buttons">
                				<a href="/toolkit/builder" class="cta-button">Web Builder</a>
				<a href="/toolkit/sop-manager" class="cta-button sop-button">SOP Manager</a>
				<a href="/toolkit/blog-manager" class="cta-button blog-button">Blog Manager</a>
				<a href="/toolkit/ticketing-system" class="cta-button ticketing-button">Ticketing System</a>
                <div class="theme-toggle-container">
                    <ThemeToggle />
                </div>
            </div>
        </div>
    </div>
</header>

<main>


    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
                          <h1>Scripter's Full-Code Development Platform</h1>
              <p class="hero-subtitle">
                 The revolutionary "Full-Code" approach - combining AI-powered development with complete code ownership. 
                 Build enterprise-grade applications without limitations, using your own infrastructure and resources.
              </p>
            				<div class="hero-buttons">
					<a href="/toolkit" class="btn-primary">🛠️ All Tools (6 Available)</a>
					<a href="/toolkit/builder" class="btn-primary">🚀 Web Builder</a>
					<a href="/toolkit/admin-console" class="btn-primary admin-btn">🗄️ Admin Console</a>
					<a href="/toolkit/security-tools" class="btn-primary security-btn">🛡️ Security Tools</a>
					<a href="/toolkit/blog-manager" class="btn-primary blog-btn">✍️ Blog Manager</a>
					<a href="/toolkit/sop-manager" class="btn-primary sop-btn">📝 SOP Manager</a>
					<a href="#features" class="btn-secondary">📖 Learn More</a>
				</div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="features" id="features">
        <div class="container">
            <h2 class="section-title">Why Choose Scripter DevKit?</h2>
            <div class="features-grid">
                <div class="feature-card">
                    <span class="feature-icon">⚡</span>
                    <h3 class="feature-title">Plug & Play Integration</h3>
                    <p class="feature-description">
                        Drop-in toolkit that integrates seamlessly with your existing SvelteKit projects. 
                        No complex setup or configuration required.
                    </p>
                </div>
                <div class="feature-card">
                    <span class="feature-icon">🔧</span>
                    <h3 class="feature-title">100% SvelteKit Compatible</h3>
                    <p class="feature-description">
                        Built specifically for SvelteKit projects. Use all SvelteKit features and npm/bun packages. 
                        No compromises, no limitations - just pure SvelteKit power.
                    </p>
                </div>
                <div class="feature-card">
                    <span class="feature-icon">🎨</span>
                    <h3 class="feature-title">Visual Web Building</h3>
                    <p class="feature-description">
                        Click any element to edit content and CSS properties in real-time. 
                        Professional interface with comprehensive controls.
                    </p>
                </div>
                <div class="feature-card">
                    <span class="feature-icon">🗄️</span>
                    <h3 class="feature-title">Admin Console</h3>
                    <p class="feature-description">
                        Database management, query execution, and table administration 
                        for developers with connection management and query history.
                    </p>
                </div>
                <div class="feature-card">
                    <span class="feature-icon">📝</span>
                    <h3 class="feature-title">SOP Document Management</h3>
                    <p class="feature-description">
                        Professional markdown editor with live preview for creating and 
                        managing Standard Operating Procedures and documentation.
                    </p>
                </div>
                <div class="feature-card">
                    <span class="feature-icon">🎫</span>
                    <h3 class="feature-title">Ticketing System</h3>
                    <p class="feature-description">
                        Comprehensive ticket management with resolver groups, templates, 
                        markdown support, and correspondence tracking for efficient issue resolution.
                    </p>
                </div>
                <div class="feature-card">
                    <span class="feature-icon">🤖</span>
                    <h3 class="feature-title">AI-Powered Full-Code</h3>
                    <p class="feature-description">
                        Leverage AI tools like Cursor, Gemini, and Kiro while maintaining complete code ownership. 
                        Generate enterprise-grade code that runs on your own infrastructure.
                    </p>
                </div>
                <div class="feature-card">
                    <span class="feature-icon">💻</span>
                    <h3 class="feature-title">Your Infrastructure, Your Code</h3>
                    <p class="feature-description">
                        No third-party dependencies or expensive subscriptions. Use your own computer resources 
                        and choose your preferred providers and libraries.
                    </p>
                </div>
                <div class="feature-card">
                    <span class="feature-icon">🎯</span>
                    <h3 class="feature-title">Beginner-Friendly Power</h3>
                    <p class="feature-description">
                        Visual tools for non-developers combined with full codebase access for professionals. 
                        The perfect bridge between no-code simplicity and developer flexibility.
                    </p>
                </div>
                <div class="feature-card">
                    <span class="feature-icon">⚡</span>
                    <h3 class="feature-title">Zero Limitations</h3>
                    <p class="feature-description">
                        No platform restrictions, no vendor lock-in, no expensive plugins. 
                        Full customization and enterprise-grade capabilities without the traditional costs.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section class="services">
        <div class="container">
            <h2 class="section-title">📄 Content Services</h2>
            <p class="services-subtitle">Access and manage your content with our dedicated services</p>
            <div class="services-grid">
                <div class="service-card">
                    <div class="service-icon">📋</div>
                    <h3 class="service-title">Standard Operating Procedures</h3>
                    <p class="service-description">
                        Browse and search through your collection of SOPs for development processes, 
                        deployment procedures, and operational guidelines.
                    </p>
                    <a href="/sops" class="service-btn sop-service-btn">📋 View SOPs</a>
                </div>
                <div class="service-card">
                    <div class="service-icon">📝</div>
                    <h3 class="service-title">Blog Articles</h3>
                    <p class="service-description">
                        Discover insights, tutorials, and best practices for modern web development 
                        and technology trends in our blog collection.
                    </p>
                    <a href="/blog" class="service-btn blog-service-btn">📝 Read Blog</a>
                </div>
            </div>
        </div>
    </section>

    <!-- Mission, Vision & Values Section -->
    <section class="mission-section">
        <div class="container">
            <div class="mission-content">
                <div class="mission-card">
                    <div class="mission-icon">🎯</div>
                    <h3>Our Mission</h3>
                    <p>
                        To democratize enterprise-grade application development by providing a Full-Code platform that combines 
                        the accessibility of visual tools with the power and flexibility of complete code ownership. 
                        We empower developers, designers, and business users to build sophisticated applications 
                        without the limitations and costs of traditional no-code platforms.
                    </p>
                </div>
                
                <div class="mission-card">
                    <div class="mission-icon">🔮</div>
                    <h3>Our Vision</h3>
                    <p>
                        To become the leading Full-Code development platform that bridges the gap between no-code simplicity 
                        and professional development. We envision a world where anyone can build enterprise applications 
                        using their own infrastructure, with complete code ownership, and the power of AI assistance.
                    </p>
                </div>
                
                <div class="mission-card">
                    <div class="mission-icon">💎</div>
                    <h3>Our Values</h3>
                    <div class="values-list">
                        <div class="value-item">
                            <strong>Code Ownership:</strong> Complete control over your codebase and infrastructure
                        </div>
                        <div class="value-item">
                            <strong>AI Empowerment:</strong> Leverage AI tools to enhance productivity and creativity
                        </div>
                        <div class="value-item">
                            <strong>Zero Lock-in:</strong> No vendor dependencies or platform restrictions
                        </div>
                        <div class="value-item">
                            <strong>Accessibility:</strong> Make enterprise development accessible to all skill levels
                        </div>
                        <div class="value-item">
                            <strong>Innovation:</strong> Continuously push the boundaries of what's possible in development
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Info Section -->
    <section class="info-section">
        <div class="container">
            <div class="info-content">
                <h2 class="info-title">The Full-Code Revolution</h2>
                <p class="info-text">
                    Scripter DevKit represents a revolutionary "Full-Code" approach that bridges the gap between no-code platforms and traditional development. 
                    Unlike expensive web builders that lock you into their ecosystem, this platform provides AI-powered development tools 
                    while ensuring you maintain complete ownership of your code and infrastructure.
                </p>
                <p class="info-text">
                    The platform integrates seamlessly with your SvelteKit projects, taking advantage of SvelteKit's access to the 
                    filesystem for direct file editing and real-time updates. With AI assistance for code generation, database management, 
                    and content creation, you can build enterprise-grade applications without the limitations and costs of traditional platforms.
                </p>
                
                <div class="warning-box">
                    <h3 class="warning-title">
                        <span>⚠️</span>
                        Before Going to Production
                    </h3>
                    <p style="color: #ffffff; margin-bottom: 1rem;">
                        							Remember to remove the toolkit folder from your project before deploying to production:
                    </p>
                    							<ul class="warning-list">
								<li><code>src/routes/toolkit</code> - Remove this entire folder</li>
							</ul>
                    <p style="color: #ffffff; margin-top: 1rem; font-size: 0.9rem;">
                        <strong>Note:</strong> Scripter DevKit is designed as a development toolkit. Simply remove these folders before deploying to production to keep your application clean and optimized.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- No Bloatware Advantages Section -->
    <section class="no-bloat-section">
        <div class="container">
            <h2 class="section-title">Zero Bloatware, Maximum Performance</h2>
            <p class="section-subtitle">Why eliminating bloatware is crucial for modern web applications</p>
            
            <div class="advantages-grid">
                <div class="advantage-card">
                    <div class="advantage-icon">⚡</div>
                    <h3>Lightning Fast Performance</h3>
                    <p>Built with SvelteKit for optimal performance. No unnecessary frameworks or heavy dependencies weighing down your application.</p>
                    <ul>
                        <li>SvelteKit's efficient rendering</li>
                        <li>Minimal JavaScript overhead</li>
                        <li>Fast component updates</li>
                        <li>Optimized bundle splitting</li>
                    </ul>
                </div>
                
                <div class="advantage-card">
                    <div class="advantage-icon">🔍</div>
                    <h3>Better SEO Performance</h3>
                    <p>Built with SvelteKit for better SEO out of the box, with clean HTML structure and fast loading times.</p>
                    <ul>
                        <li>Clean HTML output</li>
                        <li>Fast loading times</li>
                        <li>Mobile-responsive design</li>
                        <li>Built on SvelteKit</li>
                    </ul>
                </div>
                
                <div class="advantage-card">
                    <div class="advantage-icon">💰</div>
                    <h3>Cost Efficiency</h3>
                    <p>No expensive subscriptions or plugins required. All tools are included and run on your own infrastructure.</p>
                    <ul>
                        <li>No monthly subscriptions</li>
                        <li>No plugin costs</li>
                        <li>Your own infrastructure</li>
                        <li>Complete code ownership</li>
                    </ul>
                </div>
                
                <div class="advantage-card">
                    <div class="advantage-icon">🛡️</div>
                    <h3>Security Tools</h3>
                    <p>Includes basic security tools for development and testing, with your own infrastructure for better control.</p>
                    <ul>
                        <li>Security scanning tools</li>
                        <li>Your own infrastructure</li>
                        <li>No third-party data storage</li>
                        <li>Development security checks</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>

    <!-- How We Achieve No Bloat Section -->
    <section class="no-bloat-implementation">
        <div class="container">
            <h2 class="section-title">How We Eliminate Bloatware</h2>
            <p class="section-subtitle">Our approach to building lean, efficient tools</p>
            
            <div class="implementation-grid">
                <div class="implementation-item">
                    <h3>🎯 Selective Dependencies</h3>
                    <p>Built with SvelteKit and minimal dependencies. Only essential libraries like Monaco Editor are included, and they're loaded dynamically when needed.</p>
                </div>
                
                <div class="implementation-item">
                    <h3>⚡ Dynamic Loading</h3>
                    <p>Heavy components like Monaco Editor are loaded only when needed, using dynamic imports to keep initial bundle sizes minimal and improve first-load performance.</p>
                </div>
                
                <div class="implementation-item">
                    <h3>🔧 Lightweight Alternatives</h3>
                    <p>Built custom markdown-to-HTML converter and visual editors instead of using heavy third-party libraries for content editing.</p>
                </div>
                
                <div class="implementation-item">
                    <h3>📦 Built on SvelteKit</h3>
                    <p>Leverages SvelteKit's built-in optimizations including automatic code splitting, efficient rendering, and minimal JavaScript overhead.</p>
                </div>
                
                <div class="implementation-item">
                    <h3>🎨 Minimal Dependencies</h3>
                    <p>Only essential libraries are included. Heavy components are loaded dynamically when needed, keeping the initial bundle size minimal.</p>
                </div>
                
                <div class="implementation-item">
                    <h3>🚀 Production Ready</h3>
                    <p>Designed for easy production deployment - simply remove the toolkit folder to eliminate all development tools from your final build.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Pricing Section (Troll Edition) -->
    <section class="pricing-section">
        <div class="container">
            <h2 class="section-title">Pricing That Actually Makes Sense</h2>
            <p class="section-subtitle">Unlike those other guys who charge you for basic features</p>
            
            <div class="pricing-grid">
                <div class="pricing-card free-tier">
                    <div class="pricing-header">
                        <h3>🚀 Free Forever</h3>
                        <div class="price">
                            <span class="amount">$0</span>
                            <span class="period">/month</span>
                        </div>
                        <p class="pricing-description">Everything you need, forever. No catches.</p>
                    </div>
                    
                    <div class="features-list">
                        <div class="feature-item">
                            <span class="check">✓</span>
                            <span>All 5 Development Tools</span>
                        </div>
                        <div class="feature-item">
                            <span class="check">✓</span>
                            <span>Complete Code Ownership</span>
                        </div>
                        <div class="feature-item">
                            <span class="check">✓</span>
                            <span>Your Own Infrastructure</span>
                        </div>
                        <div class="feature-item">
                            <span class="check">✓</span>
                            <span>AI-Powered Development</span>
                        </div>
                        <div class="feature-item">
                            <span class="check">✓</span>
                            <span>Zero Bloatware</span>
                        </div>
                        <div class="feature-item">
                            <span class="check">✓</span>
                            <span>No Vendor Lock-in</span>
                        </div>
                        <div class="feature-item">
                            <span class="check">✓</span>
                            <span>Unlimited Projects</span>
                        </div>
                        <div class="feature-item">
                            <span class="check">✓</span>
                            <span>Community Support</span>
                        </div>
                    </div>
                    
                    <div class="pricing-footer">
                        <button class="btn-primary">Start Building Now</button>
                        <p class="pricing-note">No credit card required. Ever.</p>
                    </div>
                </div>
                
                <div class="pricing-card premium-tier">
                    <div class="pricing-badge">You're a Cool Dude</div>
                    <div class="pricing-header">
                        <h3>💎 Premium Donation</h3>
                        <div class="price">
                            <span class="amount">$1</span>
                            <span class="period">/month</span>
                        </div>
                        <p class="pricing-description">Support the project. That's it. No fancy perks.</p>
                    </div>
                    
                    <div class="features-list">
                        <div class="feature-item">
                            <span class="check">✓</span>
                            <span>Everything in Free</span>
                        </div>
                        <div class="feature-item">
                            <span class="check">✓</span>
                            <span>Cool Dude Badge</span>
                        </div>
                        <div class="feature-item">
                            <span class="check">✓</span>
                            <span>Bragging Rights</span>
                        </div>
                        <div class="feature-item">
                            <span class="check">✓</span>
                            <span>Good Karma</span>
                        </div>
                        <div class="feature-item">
                            <span class="check">✓</span>
                            <span>That's it. Seriously.</span>
                        </div>
                    </div>
                    
                    <div class="pricing-footer">
                        <button class="btn-secondary">Become a Cool Dude</button>
                        <p class="pricing-note">Cancel anytime. We won't judge.</p>
                    </div>
                </div>
            </div>
            
            <div class="pricing-comparison">
                <h3>Why We're Different</h3>
                <div class="comparison-grid">
                    <div class="comparison-item">
                        <h4>Traditional Web Builders</h4>
                        <ul>
                            <li>❌ $29/month for basic features</li>
                            <li>❌ $99/month for "pro" features</li>
                            <li>❌ $299/month for "enterprise"</li>
                            <li>❌ Lock you into their platform</li>
                            <li>❌ Charge for every plugin</li>
                            <li>❌ Your code belongs to them</li>
                            <li>❌ Recurring fees forever</li>
                        </ul>
                    </div>
                    <div class="comparison-item">
                        <h4>Scripter DevKit</h4>
                        <ul>
                            <li>✅ $0 for everything</li>
                            <li>✅ $0 for all features</li>
                            <li>✅ $0 for enterprise tools</li>
                            <li>✅ Run on your infrastructure</li>
                            <li>✅ All tools included</li>
                            <li>✅ Your code belongs to you</li>
                            <li>✅ Free forever</li>
                        </ul>
                    </div>
                </div>
                
                <div class="future-note">
                    <h4>🚀 Coming Soon: Cloud Collaboration</h4>
                    <p>We're working on a cloud version for team collaboration. It will be the only paid feature, and it will be reasonably priced. Because we're not greedy like those other guys.</p>
                </div>
            </div>
        </div>
    </section>
</main>

<footer>
    <div class="container">
        <div class="footer-content">
            <div class="footer-text">
                © 2024 Scripter DevKit. Built with ❤️ by Scripter for the SvelteKit community.
            </div>
            <div class="footer-links">
                				<a href="/toolkit/builder" class="footer-link">Web Builder</a>
				<a href="/toolkit/sop-manager" class="footer-link">SOP Manager</a>
				<a href="/toolkit/blog-manager" class="footer-link">Blog Manager</a>
				<a href="/toolkit/ticketing-system" class="footer-link">Ticketing System</a>
				<a href="/toolkit/admin-console" class="footer-link">Admin Console</a>
                <a href="#" class="footer-link">Documentation</a>
                <a href="#" class="footer-link">GitHub</a>
            </div>
        </div>
    </div>
</footer>