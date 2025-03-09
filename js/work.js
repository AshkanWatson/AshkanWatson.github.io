document.addEventListener('DOMContentLoaded', () => {
    const currentItem = document.querySelector('.current-item');
    let ticking = false;
    let lastScrollY = window.scrollY;

    const updateScrollProgress = () => {
        const scrollPosition = lastScrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const startOffset = window.innerHeight * 0.2;

        // Calculate progress (0 to 1)
        let progress = (scrollPosition - startOffset) / (maxScroll * 0.3);
        progress = Math.max(0, Math.min(1, progress));

        // Update CSS custom property
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

    // Project navigation functionality
    const allProjects = [
        {
            id: 'chandome-app',
            title: 'Chandome App',
            description: 'Calendar app for iOS platform',
            client: 'App Store',
            timeline: 'Jan 23 – Jul 22',
            role: 'Product Designer & User Researcher',
            outcome: 'The redesigned Alpha App proved to be highly impactful, particularly on mobile devices, as users exhibited increased shopping activity. Mobile users experienced a remarkable 50% surge in shopping behavior, with a substantial 45% increase in mobile conversions.',
            heroImage: './images/Chandome.avif',
            projectDescription: [
                'Chandome? Is a Persian calendar app.The idea came from the day that i switched my phone from an android to iOS where i found out that there no solar date widget for lock-screen on iPhone that is well designed & non of them was the app that i was looking for!',
                'After that i decided to develop my own solar calendar app and widget for iOS “Chandome?” Which means “What day is it?” In Persian with much minimalistic design that i’d rather to use.',
                'The goal for this app is to have more features than just a calendar like date converter and also be developed on macOS.'
            ]
        },
        {
            id: 'residam-app',
            title: 'Residam App',
            description: 'Enterprise management platform',
            client: 'Residam Corp',
            timeline: 'Nov 23 – Feb 24',
            role: 'Full Stack Developer',
            outcome: 'Successfully implemented enterprise solution with 40% increase in productivity',
            heroImage: './images/residam-preview.jpg',
            projectDescription: [
                'Developed a comprehensive enterprise management platform that streamlines operations and improves efficiency.',
                'Implemented modern technologies and best practices to create a scalable and maintainable solution.'
            ]
        },
        {
            id: 'clippy-app',
            title: 'Clippy App',
            description: 'Web clipboard manager',
            client: 'Internal Project',
            timeline: 'Dec 23 – Jan 24',
            role: 'Frontend Developer',
            outcome: 'Created an intuitive clipboard manager with cross-platform compatibility',
            heroImage: './images/clippy-preview.jpg',
            projectDescription: [
                'Designed and developed a web-based clipboard manager that works seamlessly across different devices.',
                'Focused on user experience and performance while maintaining security and privacy.'
            ]
        }
    ];

    function updateProjectContent(currentId) {
        const currentProject = allProjects.find(p => p.id === currentId);
        
        if (currentProject) {
            // Update Now Viewing section
            const nowViewingSection = document.querySelector('.now-viewing .current-item');
            nowViewingSection.innerHTML = `
                <h3>${currentProject.title}</h3>
                <p>${currentProject.description}</p>
            `;

            // Update Up Next section with other projects
            const nextItemsContainer = document.querySelector('.up-next .next-items');
            const otherProjects = allProjects.filter(p => p.id !== currentId);
            nextItemsContainer.innerHTML = otherProjects.map(project => `
                <a href="work.html?project=${project.id}" class="next-item">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                </a>
            `).join('');

            // Update main content
            const heroImage = document.querySelector('.project-hero .hero-image');
            const projectTitle = document.querySelector('.project-title');
            const projectInfo = document.querySelector('.project-info-grid');
            const projectDescription = document.querySelector('.project-description');

            // Update hero image
            heroImage.src = currentProject.heroImage;
            heroImage.alt = `${currentProject.title} Interface`;

            // Update project title
            projectTitle.textContent = currentProject.title;

            // Update project info grid
            projectInfo.innerHTML = `
                <div class="detail-row">
                    <div class="detail-label">Client</div>
                    <div class="detail-value">${currentProject.client}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Timeline</div>
                    <div class="detail-value">${currentProject.timeline}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Role</div>
                    <div class="detail-value">${currentProject.role}</div>
                </div>
                <div class="detail-row">
                    <div class="detail-label">Outcome</div>
                    <div class="detail-value">${currentProject.outcome}</div>
                </div>
            `;

            // Update project description
            projectDescription.innerHTML = currentProject.projectDescription
                .map(paragraph => `<p>${paragraph}</p>`)
                .join('');
        }
    }

    // Initialize with URL parameter or default project
    const urlParams = new URLSearchParams(window.location.search);
    const currentProjectId = urlParams.get('project') || 'chandome-app';
    updateProjectContent(currentProjectId);

    // Handle clicks on next items
    document.querySelector('.next-items').addEventListener('click', (e) => {
        const nextItem = e.target.closest('.next-item');
        if (nextItem) {
            e.preventDefault();
            const projectId = new URLSearchParams(nextItem.href.split('?')[1]).get('project');
            if (projectId) {
                updateProjectContent(projectId);
                window.history.pushState({}, '', `?project=${projectId}`);
            }
        }
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        const newProjectId = new URLSearchParams(window.location.search).get('project') || 'chandome-app';
        updateProjectContent(newProjectId);
    });

    // Categories menu functionality
    const categoriesMenu = document.querySelector('.categories-menu');
    const hamburgerBtn = document.querySelector('.hamburger-btn');

    hamburgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        categoriesMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!categoriesMenu.contains(e.target)) {
            categoriesMenu.classList.remove('active');
        }
    });

    // Prevent menu from closing when clicking inside the dropdown
    document.querySelector('.categories-dropdown').addEventListener('click', (e) => {
        e.stopPropagation();
    });
});