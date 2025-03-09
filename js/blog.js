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
            id: 'web-development-future',
            title: 'The Future of Web Development',
            description: 'Exploring upcoming trends in web development',
            author: 'Ashkan Watson',
            date: 'March 9, 2025',
            category: 'Development',
            readTime: '5 min read',
            heroImage: './images/web-dev-future.jpg',
            blogcontent: [
                'The web development landscape is constantly evolving, bringing new opportunities and challenges for developers. As we look ahead, several key trends are shaping the future of how we build for the web.',
                'Artificial intelligence and machine learning are becoming integral parts of web development, enabling more intelligent and personalized user experiences. From automated testing to AI-assisted coding, these technologies are transforming how we approach development.',
                'WebAssembly is revolutionizing browser-based applications, enabling high-performance computing directly in the browser. This opens up new possibilities for complex web applications that previously required native solutions.',
                'Edge computing is changing how we think about deployment and data processing, bringing computation closer to where it\'s needed. This shift is enabling faster response times and better user experiences.'
            ]
        },
        {
            id: 'design-systems-2024',
            title: 'Design Systems in 2024',
            description: 'How design systems are evolving',
            author: 'Ashkan Watson',
            date: 'March 7, 2025',
            category: 'Design',
            readTime: '4 min read',
            heroImage: './images/design-systems.jpg',
            blogDescription: [
                'Design systems have become the backbone of modern digital products, enabling consistent and scalable design across platforms.',
                'Component-driven development has transformed how we build and maintain design systems, making them more flexible and adaptable.',
                'Automation plays an increasingly important role in maintaining and updating design systems, ensuring consistency across large-scale applications.'
            ]
        },
        {
            id: 'ai-in-design',
            title: 'AI in Design',
            description: 'The impact of AI on design',
            author: 'Ashkan Watson',
            date: 'March 5, 2025',
            category: 'AI & Design',
            readTime: '6 min read',
            heroImage: './images/ai-design.jpg',
            blogDescription: [
                'AI is revolutionizing the design process, enabling new possibilities in creative workflows.',
                'Generative AI tools are changing how designers approach their work, offering new ways to explore and iterate on design concepts.',
                'As AI becomes more integrated into design tools, we\'re seeing a shift in how designers work and what skills are valued in the industry.'
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