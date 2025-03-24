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
            timeline: 'March 25 – Now',
            role: 'Software Developer',
            outcome: 'Null',
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
            timeline: 'March 25 – Now',
            role: 'Software Developer',
            outcome: 'Null',
            heroImage: './images/residam-preview.jpg',
            projectDescription: [
                'Residam! Is an app that i’m currently working on it.',
                'The concept of is for the companies check-in & check-out.Which is a user-friendly app designed to be much easier for both manager and employees.',
                'The idea came from where i actually worked and some problems that we had with the checkin machine.',
                'I will inform you more on “Residam!” Features in as soon as possible as long as it’s still in progress!'
            ]
        },
        {
            id: 'clippy-app',
            title: 'Clippy App',
            description: 'Mac clipboard',
            client: 'Internal Project',
            timeline: 'March 25 – Now',
            role: 'Software Developer',
            outcome: 'Null',
            heroImage: './images/clippy-preview.jpg',
            projectDescription: [
                'As you can tell about “clippy”’s name it’s a clipboard app.',
                'The idea came from when i switched from windows to macOS. Usually i used (Win Key + V) shortcut on my windows laptop which on my mac it wasn’t an option!',
                'I searched app store for this feature but unfortunately couldn’t find what i was looking for and mostly the UI of apps where too old & not what i needed. Also privacy is an important factor for me and some of those apps privacy was really questionable!',
                'Then i had the idea & decided to develop my own app “Clippy” with more features, modern UI and also safe!',
                'I’m looking forward to develop “Clippy” for iPhone too in next updates.'
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