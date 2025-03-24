document.addEventListener('DOMContentLoaded', () => {
    const currentItem = document.querySelector('.current-item');
    let ticking = false;
    let lastScrollY = window.scrollY;

    // Scroll progress functionality
    const updateScrollProgress = () => {
        const scrollPosition = lastScrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const startOffset = window.innerHeight * 0.2;

        let progress = (scrollPosition - startOffset) / (maxScroll * 0.3);
        progress = Math.max(0, Math.min(1, progress));

        currentItem.style.setProperty('--scroll-progress', progress);
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateScrollProgress();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    const allPosts = [
        {
            id: 'personal-finance-tracker',
            title: 'Personal Finance Tracker App',
            description: 'Building a Personal Finance Tracker App Using Flutter',
            author: 'Ashkan Watson',
            date: 'March 24, 2025',
            category: 'Flutter',
            readTime: '20 Min Read',
            heroImage: './images/flutter.svg',
            blogDescription: [
                'How to Build a Personal Finance Tracker App Using Flutter',
                'Personal finance management is something everyone needs, but not everyone wants to track. That\'s where having a personal finance tracker app comes in handy. It helps you keep an eye on your spending, saving, and investing goals.',
                'In this post, I’ll guide you step-by-step through building a simple Personal Finance Tracker app using Flutter and Firebase. Whether you\'re just starting with Flutter or looking to create your first real-world app, this project will help you get hands-on experience with core Flutter features and Firebase integration.',
                'Prerequisites',
                'Before we dive in, you should have:',
                'Basic knowledge of Flutter (widgets, layouts, and state management).',
                'An active Firebase account.',
                'Flutter installed on your system.',
                'If you\'re not familiar with Firebase, it’s a great platform for building mobile apps quickly with backend features like authentication, databases, and cloud storage.',
                'Step 1: Setting Up the Firebase Project',
                'First, let’s set up Firebase for our app.',
                '1. Go to the Firebase Console and create a new project.',
                '2. Add an Android/iOS app in the Firebase console, depending on your development platform.',
                '3. Download the google-services.json or GoogleService-Info.plist file and add it to your Flutter project directory.',
                '4. Add Firebase dependencies in your pubspec.yaml file:s'
            ]
        },
        {
            id: 'ai-in-softwaredevelopment',
            title: 'AI in Software Development',
            description: 'The Rise of AI in Software Development',
            author: 'Ashkan Watson',
            date: 'March 23, 2025',
            category: 'AI & Software Devlopment',
            readTime: '15 Min Read',
            heroImage: './images/AI.svg',
            blogDescription: [
                'The Rise of AI in Software Development: How It’s Changing the Industry',
                'Artificial Intelligence (AI) is transforming almost every industry, and software development is no exception. From AI-powered coding assistants to automated testing and deployment, developers are now leveraging AI to write better code, speed up workflows, and reduce errors. But what does this mean for the future of software development? Will AI replace developers, or will it simply make our lives easier?',
                'In this post, I’ll explore how AI is shaping the future of software development, the tools that are leading the way, and what developers should do to stay ahead.',
                'As AI becomes more integrated into design tools, we\'re seeing a shift in how designers work and what skills are valued in the industry.',
                '🚀 How AI is Changing Software Development',
                '1️⃣ AI-Powered Code Generation & Assistance',
                'AI tools like GitHub Copilot, Tabnine, and ChatGPT can suggest entire lines of code, complete functions, and even generate full modules. These tools help developers code faster and reduce repetitive tasks. However, they’re not perfect—they still require human oversight to ensure correctness and efficiency.',
                '2️⃣ Automated Debugging & Code Reviews',
                'AI can analyze code for errors, security vulnerabilities, and inefficiencies before developers even run it. Tools like DeepCode and SonarQube use AI to suggest fixes and improve code quality, saving hours of debugging time.',
                '3️⃣ AI in Software Testing',
                'AI-driven testing tools, like Testim and Applitools, can automate test case generation, detect UI inconsistencies, and predict potential failures in code. This significantly reduces manual testing efforts and increases the speed of releases.',
                '4️⃣ AI for DevOps & Automation',
                'CI/CD pipelines are benefiting from AI-powered automation. Tools like AWS CodeGuru and Harness optimize deployments, monitor performance, and suggest improvements to cloud infrastructure—making DevOps workflows more efficient.',
                '5️⃣ AI in Low-Code & No-Code Platforms',
                'Low-code and no-code platforms like Bubble, OutSystems, and Microsoft PowerApps are making it easier for non-developers to build applications using AI-powered suggestions. While this doesn\'t replace traditional development, it does mean that AI is lowering the barrier to entry for software creation.',
                '💡 Will AI Replace Developers?',
                'The short answer: No, but it will change the way we work.',
                'AI is great at suggesting and automating repetitive tasks, but it lacks creativity, problem-solving abilities, and deep contextual understanding.',
                'Developers will shift from writing every line of code manually to curating, debugging, and optimizing AI-generated code.',
                'New roles may emerge, such as AI-powered software architects and AI ethics engineers, as companies look to leverage AI responsibly.',
                'In short, developers who adapt and learn to work alongside AI will be more productive and valuable in the industry.'
            ]
        },
        {
            id: 'git-commands',
            title: 'Essential Git Commands',
            description: 'The Essential Git Commands Every Developer Needs to Know',
            author: 'Ashkan Watson',
            date: 'March 25, 2025',
            category: 'Git',
            readTime: '10 min read',
            heroImage: './images/git.svg',
            blogDescription: [
                'Git is one of the most powerful tools in modern software development. Whether you\'re working solo on a project or collaborating with a team, understanding Git is essential for version control and collaboration. If you\'re new to Git or just need a refresher, this post will cover some of the most essential Git commands every developer should know to efficiently manage their codebase.',
                '1. Git Init: Initialize a New Git Repository',
                'If you\'re starting a new project and want to keep track of changes, you\'ll first need to initialize a Git repository in your project folder. This is where Git begins tracking your files.',
                'git init',
                'This command turns your project directory into a Git repository. After running it, you’ll be able to start tracking changes, making commits, and pushing updates to remote repositories like GitHub.',
                '2. Git Clone: Clone an Existing Repository',
                'When you want to work on an existing project or contribute to an open-source project, you\'ll need to clone a repository.',
                'git clone <repository_url>',
                'For example:',
                'git clone https://github.com/username/repository.git',
                'This command copies all the files and the entire version history of the repository to your local machine, so you can start working on it.',

            ]
        }
    ];

    function updateBlogContent(currentId) {
        const currentPost = allPosts.find(p => p.id === currentId);
        
        if (currentPost) {
            // Update Now Reading section
            const nowReadingSection = document.querySelector('.now-reading .current-item');
            nowReadingSection.innerHTML = `
                <h3>${currentPost.title}</h3>
                <p>${currentPost.description}</p>
            `;

            // Update More Posts section with other posts
            const morePostsContainer = document.querySelector('.more-posts .next-items');
            const otherPosts = allPosts.filter(p => p.id !== currentId);
            morePostsContainer.innerHTML = otherPosts.map(post => `
                <a href="blog.html?post=${post.id}" class="post-item">
                    <h3>${post.title}</h3>
                    <p>${post.description}</p>
                </a>
            `).join('');

            // Update main content
            const heroImage = document.querySelector('.blog-hero .hero-image');
            const blogTitle = document.querySelector('.blog-title');
            const blogInfo = document.querySelector('.blog-info-grid');
            const blogDescription = document.querySelector('.blog-content');

            // Update hero image
            heroImage.src = currentPost.heroImage;
            heroImage.alt = currentPost.title;

            // Update blog title
            blogTitle.textContent = currentPost.title;

            // Update blog info grid
            blogInfo.innerHTML = `
                <div class="detail-row">
                    <div class="detail-label">Author</div>
                    <div class="detail-value">${currentPost.author}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Date</div>
                    <div class="detail-value">${currentPost.date}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Category</div>
                    <div class="detail-value">${currentPost.category}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Read Time</div>
                    <div class="detail-value">${currentPost.readTime}</div>
                </div>
            `;

            // Update blog description
            blogDescription.innerHTML = currentPost.blogDescription
                .map(paragraph => `<p>${paragraph}</p>`)
                .join('');
        }
    }

    // Initialize with URL parameter or default post
    const urlParams = new URLSearchParams(window.location.search);
    const currentPostId = urlParams.get('post') || 'web-development-future';
    updateBlogContent(currentPostId);

    // Handle clicks on more posts items
    document.querySelector('.next-items').addEventListener('click', (e) => {
        const postItem = e.target.closest('.post-item');
        if (postItem) {
            e.preventDefault();
            const postId = new URLSearchParams(postItem.href.split('?')[1]).get('post');
            if (postId) {
                updateBlogContent(postId);
                window.history.pushState({}, '', `?post=${postId}`);
            }
        }
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        const newPostId = new URLSearchParams(window.location.search).get('post') || 'web-development-future';
        updateBlogContent(newPostId);
    });

    // Categories menu functionality
    const categoriesMenu = document.querySelector('.categories-menu');
    const hamburgerBtn = document.querySelector('.hamburger-btn');

    hamburgerBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        categoriesMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (categoriesMenu && !categoriesMenu.contains(e.target)) {
            categoriesMenu.classList.remove('active');
        }
    });

    // Prevent menu from closing when clicking inside the dropdown
    document.querySelector('.categories-dropdown')?.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Handle category selection
    const categoryLinks = document.querySelectorAll('.categories-content a');
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const postId = new URLSearchParams(link.href.split('?')[1]).get('post');
            if (postId) {
                updateBlogContent(postId);
                window.history.pushState({}, '', `?post=${postId}`);
                categoriesMenu.classList.remove('active');
            }
        });
    });
});