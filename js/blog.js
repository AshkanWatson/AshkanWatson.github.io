document.addEventListener('DOMContentLoaded', () => {
    const currentItem = document.querySelector('.current-item');
    let ticking = false;
    let lastScrollY = window.scrollY;

    // Scroll progress functionality
    const updateScrollProgress = () => {
        const scrollPosition = lastScrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const startOffset = window.innerHeight * 0.2;

        let progress = (scrollPosition - startOffset) / (maxScroll * 0.8);
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
            heroImage: '../images/flutter.svg',
            blogDescription: [
                'How to Build a Personal Finance Tracker App Using Flutter',
                'Personal finance management is something everyone needs, but not everyone wants to track. That\'s where having a personal finance tracker app comes in handy. It helps you keep an eye on your spending, saving, and investing goals.',
                'In this post, I’ll guide you step-by-step through building a simple Personal Finance Tracker app using Flutter and Firebase. Whether you\'re just starting with Flutter or looking to create your first real-world app, this project will help you get hands-on experience with core Flutter features and Firebase integration.',
                '# Prerequisites',
                '• Before we dive in, you should have:',
                'Basic knowledge of Flutter (widgets, layouts, and state management).',
                'An active Firebase account.',
                'Flutter installed on your system.',
                'If you\'re not familiar with Firebase, it’s a great platform for building mobile apps quickly with backend features like authentication, databases, and cloud storage.',
                'Step 1: Setting Up the Firebase Project',
                'First, let’s set up Firebase for our app.',
                '1. Go to the Firebase Console and create a new project.',
                '2. Add an Android/iOS app in the Firebase console, depending on your development platform.',
                '3. Download the google-services.json or GoogleService-Info.plist file and add it to your Flutter project directory.',
                '4. Add Firebase dependencies in your pubspec.yaml file:',
                '```dependencies:\n  firebase_core: ^latest_version\n  firebase_auth: ^latest_version\n  cloud_firestore: ^latest_version',
                '5. Run flutter pub get to install the dependencies.',
                'Step 2: Setting Up the Firebase Firestore Database',
                'We will use Firebase Firestore as our database to store the finance data, like expenses, income, and balance.',
                '1. In your Firebase console, go to the Firestore Database section and create a database.',
                '2. Structure the Firestore database like this:',
                '• users: Store user information (name, email).',
                '• transactions: Store financial transactions (type: income/expense, amount, date, category).',
                'Step 3: Designing the App Layout',
                'Now, let’s focus on building the UI with Flutter. We’ll create several screens:',
                '1. Home Screen',
                'This will show the summary of the user’s financial status — total income, total expenses, and current balance.',
                'Dart Code',
                '```dart',
                '2. Add Transaction Screen',
                'This screen allows users to add new transactions (income or expense). Users will enter the amount, type, category, and date.',
                'Dart Code',
                '```dart',
                'Step 4: Handling User Authentication',
                'You can also add user authentication using Firebase Authentication. Here’s how you can add a sign-in and sign-up screen:',
                '1. Set up Firebase Authentication in the console (email/password login).',
                '2. Add firebase_auth dependency to pubspec.yaml.',
                '3. Implement user sign-in and sign-up:',
                'Dart Code',
                '```dart',
                'Step 5: Testing & Deployment',
                'Test your app on both Android and iOS devices. Ensure that Firebase authentication and Firestore integration are working correctly.',
                'Once you’re satisfied with the app’s functionality and UI, you can publish your app to Google Play or Apple App Store.',
                '#Conclusion',
                'Building a personal finance tracker app with Flutter and Firebase is a fantastic way to get hands-on experience with both Flutter\'s UI features and Firebase\'s backend services. This app is a great starting point for your portfolio, and you can expand on it by adding features like recurring transactions, a pie chart visualization for expenses, or integrating with a third-party service for real-time stock prices.',
                'Happy coding! If you have any questions or run into issues, feel free to drop them in the comments below! 🚀'
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
            heroImage: '../images/AI.svg',
            blogDescription: [
                'The Rise of AI in Software Development: How It’s Changing the Industry',
                'Artificial Intelligence (AI) is transforming almost every industry, and software development is no exception. From AI-powered coding assistants to automated testing and deployment, developers are now leveraging AI to write better code, speed up workflows, and reduce errors. But what does this mean for the future of software development? Will AI replace developers, or will it simply make our lives easier?',
                'In this post, I’ll explore how AI is shaping the future of software development, the tools that are leading the way, and what developers should do to stay ahead.',
                'As AI becomes more integrated into design tools, we\'re seeing a shift in how designers work and what skills are valued in the industry.',
                '#🚀 How AI is Changing Software Development',
                ' ',
                '#1️⃣ AI-Powered Code Generation & Assistance',
                'AI tools like GitHub Copilot, Tabnine, and ChatGPT can suggest entire lines of code, complete functions, and even generate full modules. These tools help developers code faster and reduce repetitive tasks. However, they’re not perfect—they still require human oversight to ensure correctness and efficiency.',
                '#2️⃣ Automated Debugging & Code Reviews',
                'AI can analyze code for errors, security vulnerabilities, and inefficiencies before developers even run it. Tools like DeepCode and SonarQube use AI to suggest fixes and improve code quality, saving hours of debugging time.',
                '#3️⃣ AI in Software Testing',
                'AI-driven testing tools, like Testim and Applitools, can automate test case generation, detect UI inconsistencies, and predict potential failures in code. This significantly reduces manual testing efforts and increases the speed of releases.',
                '#4️⃣ AI for DevOps & Automation',
                'CI/CD pipelines are benefiting from AI-powered automation. Tools like AWS CodeGuru and Harness optimize deployments, monitor performance, and suggest improvements to cloud infrastructure—making DevOps workflows more efficient.',
                '#5️⃣ AI in Low-Code & No-Code Platforms',
                'Low-code and no-code platforms like Bubble, OutSystems, and Microsoft PowerApps are making it easier for non-developers to build applications using AI-powered suggestions. While this doesn\'t replace traditional development, it does mean that AI is lowering the barrier to entry for software creation.',
                '#💡 Will AI Replace Developers?',
                'The short answer: No, but it will change the way we work.',
                ' • AI is great at suggesting and automating repetitive tasks, but it lacks creativity, problem-solving abilities, and deep contextual understanding.',
                ' • Developers will shift from writing every line of code manually to curating, debugging, and optimizing AI-generated code.',
                ' • New roles may emerge, such as AI-powered software architects and AI ethics engineers, as companies look to leverage AI responsibly.',
                'In short, developers who adapt and learn to work alongside AI will be more productive and valuable in the industry.',
                '#🛠 How Developers Can Stay Ahead',
                '1️⃣ Learn AI-Assisted Development – Experiment with GitHub Copilot, ChatGPT, or Tabnine to see how AI can enhance your workflow.',
                '2️⃣ Focus on Problem-Solving & Creativity – AI can generate code, but it can’t understand business logic or user needs the way humans do.',
                '3️⃣ Improve Debugging & Code Review Skills – AI-written code still needs validation and optimization by experienced developers.',
                '4️⃣ Explore AI & Machine Learning Basics – Understanding how AI works (even at a basic level) will give you an edge.',
                '5️⃣ Stay Updated – AI tools are evolving fast, so keeping up with trends will help you remain competitive in the industry.',
                '# 🔮 The Future of AI in Software Development',
                'AI is not here to take jobs—it’s here to change them. Just as compilers, IDEs, and frameworks improved development over the years, AI is simply the next step in making programming more efficient.',
                'Developers who embrace AI as a tool, not a replacement, will be the ones leading the future of software development.',
                '🚀 What do you think? Have you used AI-powered coding tools before? Let me know in the comments!',
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
            heroImage: '../images/git.svg',
            blogDescription: [
                'Git is one of the most powerful tools in modern software development. Whether you\'re working solo on a project or collaborating with a team, understanding Git is essential for version control and collaboration. If you\'re new to Git or just need a refresher, this post will cover some of the most essential Git commands every developer should know to efficiently manage their codebase.',
                '#1. Git Init: Initialize a New Git Repository',
                'If you\'re starting a new project and want to keep track of changes, you\'ll first need to initialize a Git repository in your project folder. This is where Git begins tracking your files.',
                '```git init',
                'This command turns your project directory into a Git repository. After running it, you’ll be able to start tracking changes, making commits, and pushing updates to remote repositories like GitHub.',
                '#2. Git Clone: Clone an Existing Repository',
                'When you want to work on an existing project or contribute to an open-source project, you\'ll need to clone a repository.',
                '```git clone <repository_url>',
                '# For example:',
                '```git clone https://github.com/username/repository.git',
                'This command copies all the files and the entire version history of the repository to your local machine, so you can start working on it.',
                '#3. Git Status: Check the Status of Your Files',
                'Git allows you to track changes to your project. To see what files have been modified, added, or deleted since your last commit, use:',
                '```git status',
                'This command shows you the current state of the working directory and staging area. It lets you know which files are being tracked by Git, which are untracked, and which are modified or staged for the next commit.',
                '#4. Git Add: Stage Changes for Commit',
                'Before committing changes to Git, you need to stage the modified files using git add. This command tells Git which changes to include in your next commit.',
                '```git add <file_name>',
                'For example, if you modified a file named app.js, you can stage it using:',
                '```git add app.js',
                'To stage all modified files in the directory:',
                '```git add .',
                '#5. Git Commit: Save Changes to the Repository',
                'After staging changes, you’ll want to commit them. A commit is like a snapshot of your project at a specific point in time.',
                '```git commit -m "Commit message"',
                'For example:',
                '```git commit -m "Fixed login bug and updated UI"',
                'It\'s important to write meaningful commit messages so others (or your future self) can understand the purpose of the changes.',
                '#6. Git Push: Push Local Commits to a Remote Repository',
                'After committing your changes locally, you’ll want to push them to the remote repository so others can see and collaborate on your work. The git push command sends your commits to the remote server.',
                '```git push origin <branch_name>',
                'For example, to push changes to the main branch:',
                '```git push origin main',
                'If you\'re pushing to a remote repository for the first time, Git will prompt you for your GitHub username and password.',
                '#7. Git Pull: Fetch and Merge Changes from Remote Repository',
                'When working in a team, it’s essential to stay up-to-date with changes made by others. You can fetch and merge changes from the remote repository into your local branch using git pull.',
                '```git pull origin <branch_name>',
                'For example:',
                '```git pull origin main',
                'This command retrieves the latest changes and automatically merges them into your local branch.',
                '#8. Git Branch: Create and List Branches',
                'In Git, branches allow you to work on different versions of a project simultaneously. To view all branches in your repository, use:',
                '```git branch',
                'To create a new branch:',
                '```git branch <branch_name>',
                'For example:',
                '```git branch feature/new-ui',
                'This creates a new branch named feature/new-ui. You can then switch to that branch using:',
                '```git checkout <branch_name>',
                'Or you can use a shortcut to create and switch to the new branch in one step:',
                '```git checkout -b <branch_name>',
                '#9. Git Merge: Merge Changes from Another Branch',
                'Once you’ve completed work on a branch, you’ll want to merge your changes into the main branch. Switch to the branch you want to merge into (usually main), and run:',
                '```git merge <branch_name>',
                'For example, to merge changes from feature/new-ui into main:',
                '```git checkout main',
                '```git merge feature/new-ui',
                'Git will attempt to automatically merge the changes. If there are conflicts, you’ll need to resolve them manually before completing the merge.',
                '#10. Git Log: View Commit History',
                'To view the commit history of your repository, use:',
                '```git log',
                'This will show you a list of commits with their hash IDs, author names, dates, and commit messages.',
                'For a more compact view of the log:',
                '```git log --oneline',
                'This will display each commit on a single line, making it easier to scan the history.',
                '#11. Git Checkout: Switch Between Branches or Restore Files',
                'The git checkout command allows you to switch between branches or restore files to a previous state.',
                'To switch to a different branch:',
                '```git checkout <branch_name>',
                'To discard local changes and restore a file from the last commit:',
                '```git checkout -- <file_name>',
                '#12. Git Diff: View Changes Between Commits',
                'When you want to see what changes were made in a file, you can use git diff. This shows the differences between your working directory and the last commit.',
                '```git diff',
                'To compare changes between two commits:',
                '```git diff <commit_hash_1> <commit_hash_2>',
                '#13. Git Revert: Undo a Commit',
                'If you want to undo a commit but keep the changes in your working directory, you can use:',
                '```git revert <commit_hash>',
                'This creates a new commit that undoes the changes from the specified commit.',
                '#14. Git Reset: Unstage Changes or Reset to a Previous Commit',
                'Sometimes, you might want to uncommit or unstage changes. git reset helps with this.',
                'To unstage a file (remove it from the staging area but keep the changes):',
                '```git reset <file_name>',
                'To reset to a previous commit (discarding all changes after that commit):',
                '```git reset --hard <commit_hash>',
                'Be cautious with --hard as it discards changes permanently.',
                '#15. Git Stash: Temporarily Store Changes',
                'If you’re in the middle of something and need to switch branches, but don’t want to commit unfinished work, use:',
                '```git stash',
                'This saves your changes temporarily. When you’re ready to retrieve them:',
                '```git stash pop',
                '#Conclusion',
                'These are just a few of the most essential Git commands every developer should be comfortable with. Mastering Git is a key skill for collaborating with teams and managing your project history efficiently.',
                'As you grow as a developer, you’ll likely encounter more advanced Git features, but these basics will form the foundation of your version control workflow. Take the time to get familiar with these commands, and you’ll find your development process much smoother.',
                'Happy coding, and may your commits be clean and your merges conflict-free! 🖥️✨'
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

            // Function to highlight technical terms with inline code styling
            const highlightTechnicalTerms = (text) => {
                // List of technical terms to highlight
                const technicalTerms = [
                    'pubspec.yaml', 'firebase_auth', 'flutter pub get','git add','app.js','git push','main', 'git pull',
                    'feature/new-ui', 'git checkout', 'git diff','git reset', '--hard',
                ];
                
                // Sort by length (descending) to ensure longer terms are replaced first
                technicalTerms.sort((a, b) => b.length - a.length);
                
                // Replace technical terms with inline code styling
                let highlightedText = text;
                technicalTerms.forEach(term => {
                    // Use regex with word boundaries to avoid partial replacements
                    const regex = new RegExp(`\\b${term}\\b`, 'g');
                    highlightedText = highlightedText.replace(regex, `<code class="inline-code">${term}</code>`);
                });
                
                return highlightedText;
            };

            // Update blog description
            blogDescription.innerHTML = currentPost.blogDescription
                .map(paragraph => {
                    // Apply different tags based on content patterns
                    if (paragraph.startsWith('#')) {
                        // Lines starting with # are treated as headings
                        return `<h3>${highlightTechnicalTerms(paragraph.substring(1).trim())}</h3>`;
                    } else if (paragraph.startsWith('```')) {
                        // Lines starting with ``` are treated as code blocks
                        return `<pre><code>${paragraph.substring(3).trim()}</code></pre>`;
                    } else if (paragraph.match(/^\d+[\.\)]/)) {
                        // Lines starting with numbers followed by . or ) are treated as list items
                        return `<div class="list-item">${highlightTechnicalTerms(paragraph)}</div>`;
                    } else if (paragraph.startsWith('•') || paragraph.startsWith('*')) {
                        // Lines starting with bullet points
                        return `<div class="bullet-point">${highlightTechnicalTerms(paragraph)}</div>`;
                    } else if (paragraph.startsWith('Step') || paragraph.match(/^\d+\./)) {
                        // Lines that appear to be steps or numbered items
                        return `<h3>${highlightTechnicalTerms(paragraph)}</h3>`;
                    } else if (paragraph.length < 50 && !paragraph.endsWith('.')) {
                        // Short lines without a period at the end are likely subheadings
                        return `<p>${highlightTechnicalTerms(paragraph)}</p>`;
                    } else {
                        // Default to paragraph
                        return `<p>${highlightTechnicalTerms(paragraph)}</p>`;
                    }
                })
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