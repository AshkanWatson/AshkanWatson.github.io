// DOM Elements
const header = document.getElementById('header');
const mainContent = document.getElementById('main-content');
const commitsBtn = document.getElementById('commits-btn');
const snakeBtn = document.getElementById('snake-btn');
const languageBtn = document.getElementById('language-btn');
const languageText = document.getElementById('language-text');
const commitsModal = document.getElementById('commits-modal');
const snakeModal = document.getElementById('snake-modal');
const commitsContainer = document.getElementById('commits-container');
const snakeCanvas = document.getElementById('snake-canvas');
const startGameBtn = document.getElementById('start-game');
const closeBtns = document.querySelectorAll('.close-btn');

// State
let isScrolled = false;
let snakeGame = null;
let currentLanguage = 'en';

// Translations
const translations = {
    en: {
        title: 'Ashkan Yadollahi - Resume',
        name: 'Ashkan Yadollahi',
        mainTitle: 'Flutter Developer',
        about: 'About Me',
        aboutText: 'Hi, my name\'s Ashkan and I\'m a Flutter Developer. I have worked at EEFA Post Production Studio gaining teamwork skills as an IT Expert, Network System Administrator, Flutter Developer and Linux Kernel.',
        skillsText: 'I am most skilled in:',
        projects: 'Projects',
        experience: 'Experience',
        education: 'Education',
        commits: '[C] commits',
        snake: '[S] snake',
        blog: '[B] blog',
        language: '[L] language',
        website: '[W] website',
        changeLanguage: 'Change Language',
        jobTitle: 'Network System Administrator, Flutter Developer, Linux Kernel',
        jobDescription1: 'EEFA Studio Solving 21st century problems by diging holes and making game changing products like the *not a flamethrower*',
        jobDescription2: 'Every company needs its networks properly administered and The VFX company is no exception. Digging holes is hard and I play my part making sure the whole company stays connected. I enjoy driving the company to try new technologies.',
        education1: 'Electronic Diploma',
        // Project section
        projectTitle: 'Chandome?! Project',
        projectLink: 'github.com/Chandome',
        projectDesc1: 'This is probably one of the greatest apps ever created, if you don\'t agree you\'re probably wrong.',
        projectDesc2: 'I started this project as a way if learning Flutter and it has since grown into a fully fledged app. I have learned many skills through this and been I\'m very proud of having this in my portfolio. If you don\'t have a project as awesome as this I would advise you make one.',
        // Experience section
        companyName: 'The EEFA Studio',
        dateRange: 'November 2022 - Present',
        // Education section
        schoolName: 'Payam',
        educationDate: '2017 - 2020',
    },
    fa: {
        title: 'رزومه - اشکان یداللهی',
        name: 'اشکان یداللهی',
        mainTitle: 'توسعه‌دهنده فلاتر',
        about: 'درباره من',
        aboutText: 'سلام، اسم من اشکان هست و من یک توسعه‌دهنده فلاتر هستم. من در استودیو پست پروداکشن EEFA کار کرده‌ام و مهارت‌های کار تیمی را به عنوان متخصص IT، مدیر سیستم شبکه، توسعه‌دهنده فلاتر و کرنل لینوکس کسب کرده‌ام.',
        skillsText: 'من بیشترین مهارت را در این زمینه‌ها دارم:',
        projects: 'پروژه‌ها',
        experience: 'تجربیات',
        education: 'تحصیلات',
        commits: '[C] کامیت‌ها',
        snake: '[S] بازی مار',
        blog: '[B] وبلاگ',
        language: '[L] زبان',
        website: '[W] وب‌سایت',
        changeLanguage: 'تغییر زبان',
        jobTitle: 'مدیر سیستم شبکه، توسعه‌دهنده فلاتر، کرنل لینوکس',
        jobDescription1: 'استودیو EEFA حل مشکلات قرن ۲۱ با حفر چاله‌ها و ساخت محصولات تغییردهنده بازی مانند *شعله‌افکن نیست*',
        jobDescription2: 'هر شرکتی نیاز به مدیریت صحیح شبکه دارد و شرکت VFX نیز از این قاعده مستثنی نیست. حفر چاله‌ها سخت است و من نقش خود را در اطمینان از اتصال کل شرکت ایفا می‌کنم. من از هدایت شرکت به سمت فناوری‌های جدید لذت می‌برم.',
        education1: 'دیپلم الکترونیک',
        // Project section
        projectTitle: 'پروژه چندومه؟!',
        projectLink: 'github.com/Chandome',
        projectDesc1: 'این احتمالاً یکی از بهترین برنامه‌هایی است که تا به حال ساخته شده است، اگر موافق نیستید احتمالاً اشتباه می‌کنید.',
        projectDesc2: 'من این پروژه را به عنوان راهی برای یادگیری فلاتر شروع کردم و از آن زمان به یک برنامه کامل تبدیل شده است. من مهارت‌های زیادی از طریق این پروژه یاد گرفته‌ام و بسیار افتخار می‌کنم که این پروژه در نمونه کارهای من است. اگر شما پروژه‌ای به این عالی ندارید، توصیه می‌کنم یکی بسازید.',
        // Experience section
        companyName: 'استودیو EEFA',
        dateRange: 'نوامبر ۲۰۲۲ - تاکنون',
        // Education section
        schoolName: 'پیام',
        educationDate: '۲۰۱۷ - ۲۰۲۰',
    }
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Only handle shortcuts on desktop
        if (window.innerWidth <= 768) return;

        if (e.key === 'c') {
            toggleModal(commitsModal);
            snakeModal.style.display = 'none';
            languageModal.style.display = 'none';
            if (commitsModal.style.display === 'block') {
                loadCommits();
            }
        }
        if (e.key === 's') {
            toggleModal(snakeModal);
            commitsModal.style.display = 'none';
            languageModal.style.display = 'none';
        }
        if (e.key === 'l') {
            toggleLanguage();
        }
        if (e.key === 'b') {
            // Handle blog navigation
            window.location.href = 'https://ashkanwatson.github.io/blog/?post=ai-in-softwaredevelopment';
        }
        if (e.key === 'w') {
            // Handle blog navigation
            window.location.href = 'https://ashkanwatson.github.io';
        }
        if (e.key === 'Escape') {
            commitsModal.style.display = 'none';
            snakeModal.style.display = 'none';
            languageModal.style.display = 'none';
            if (snakeGame) {
                snakeGame.pause();
            }
        }
    });

    // Scroll event for sticky header
    window.addEventListener('scroll', () => {
        if (window.innerWidth > 768) {
            // Desktop behavior
            if (window.scrollY > 10) {
                header.classList.add('sticky');
                mainContent.classList.add('header-fixed');
            } else {
                header.classList.remove('sticky');
                mainContent.classList.remove('header-fixed');
            }
        } else {
            // Always remove sticky on mobile
            header.classList.remove('sticky');
            mainContent.classList.remove('header-fixed');
        }
    });

    // Handle mobile modal positioning and header sticky fix on resize
    const adjustModalForMobile = () => {
        const isMobile = window.innerWidth <= 768;
        const modals = [commitsModal, snakeModal];
        
        modals.forEach(modal => {
            if (isMobile) {
                modal.style.paddingBottom = '4rem'; // Add space for bottom nav
            } else {
                modal.style.paddingBottom = '0';
            }
        });
        // Remove sticky class if on mobile
        if (isMobile) {
            header.classList.remove('sticky');
            mainContent.classList.remove('header-fixed');
        }
    };

    window.addEventListener('resize', adjustModalForMobile);
    adjustModalForMobile();

    // On DOMContentLoaded, ensure sticky is not present on mobile
    if (window.innerWidth <= 768) {
        header.classList.remove('sticky');
        mainContent.classList.remove('header-fixed');
    }

    // Button click events
    commitsBtn.addEventListener('click', () => {
        toggleModal(commitsModal);
        snakeModal.style.display = 'none';
        languageModal.style.display = 'none';
        if (commitsModal.style.display === 'block') {
            loadCommits();
        }
    });

    snakeBtn.addEventListener('click', () => {
        toggleModal(snakeModal);
        commitsModal.style.display = 'none';
        languageModal.style.display = 'none';
    });
    
    languageBtn.addEventListener('click', () => {
        toggleLanguage();
    });

    startGameBtn.addEventListener('click', () => {
        if (snakeGame) {
            snakeGame.reset();
        } else {
            snakeGame = new SnakeGame(snakeCanvas);
        }
        snakeGame.start();
    });

    // Close buttons
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            modal.style.display = 'none';
            if (modal === snakeModal && snakeGame) {
                snakeGame.pause();
            }
        });
    });
    
    // Language toggle function
    function toggleLanguage() {
        if (currentLanguage === 'en') {
            currentLanguage = 'fa';
            languageBtn.style.backgroundColor = '#3eb489';
            languageBtn.style.color = 'black';
        } else {
            currentLanguage = 'en';
            languageBtn.style.backgroundColor = '';
            languageBtn.style.color = '';
        }
        updateLanguage();
    }
    
    // Function to update page content based on selected language
    function updateLanguage() {
        const t = translations[currentLanguage];
        // Update document title
        document.title = t.title;
        // Update navigation buttons
        commitsBtn.innerHTML = t.commits;
        snakeBtn.innerHTML = t.snake;
        document.querySelector('a[data-shortcut="b"]').innerHTML = t.blog;
        languageText.textContent = currentLanguage === 'en' ? 'language' : 'زبان';
        // Update section titles
        document.querySelectorAll('.section-title').forEach((el, index) => {
            if (index === 0) el.textContent = t.about;
            if (index === 1) el.textContent = t.projects;
            if (index === 2) el.textContent = t.experience;
            if (index === 3) el.textContent = t.education;
        });
        // Update main name
        const mainName = document.getElementById('main-name');
        if (mainName) mainName.textContent = t.name;
        // Update main title (Flutter Developer)
        const mainTitle = document.getElementById('main-title');
        if (mainTitle) mainTitle.textContent = t.mainTitle;
        // About section
        const aboutText = document.getElementById('about-text');
        if (aboutText) aboutText.textContent = t.aboutText;
        const skillsText = document.getElementById('skills-text');
        if (skillsText) skillsText.innerHTML = `${t.skillsText} <span class="highlight">Python</span> and <span class="highlight">Dart</span>`;
        // Project section
        const projectTitle = document.getElementById('project-title');
        if (projectTitle) projectTitle.innerHTML = `<span class="highlight-marker">*</span> ${t.projectTitle}`;
        const projectLink = document.getElementById('project-link');
        if (projectLink) projectLink.textContent = t.projectLink;
        const projectDesc1 = document.getElementById('project-desc1');
        if (projectDesc1) projectDesc1.textContent = t.projectDesc1;
        const projectDesc2 = document.getElementById('project-desc2');
        if (projectDesc2) projectDesc2.textContent = t.projectDesc2;
        // Experience section
        const companyName = document.getElementById('company-name');
        if (companyName) companyName.innerHTML = `<span class="highlight-marker">*</span> ${t.companyName}`;
        const jobDate = document.getElementById('job-date');
        if (jobDate) jobDate.textContent = t.dateRange;
        const jobTitle = document.getElementById('job-title');
        if (jobTitle) jobTitle.textContent = t.jobTitle;
        const jobDesc1 = document.getElementById('job-desc1');
        if (jobDesc1) jobDesc1.textContent = t.jobDescription1;
        const jobDesc2 = document.getElementById('job-desc2');
        if (jobDesc2) jobDesc2.textContent = t.jobDescription2;
        // Education section
        const schoolName = document.getElementById('school-name');
        if (schoolName) schoolName.innerHTML = `<span class="highlight-marker">*</span> ${t.schoolName}`;
        const educationDate = document.getElementById('education-date');
        if (educationDate) educationDate.textContent = t.educationDate;
        const education1 = document.getElementById('education1');
        if (education1) education1.textContent = t.education1;
        // Footer
        const footerWebsite = document.getElementById('footer-website');
        if (footerWebsite) footerWebsite.textContent = t.website;
        // Set text direction based on language (only for main-content)
        const mainContent = document.getElementById('main-content');
        if (currentLanguage == 'fa') {
            mainContent.classList.add('rtl');
            mainContent.setAttribute('dir', 'rtl');
        } else {
            mainContent.classList.remove('rtl');
            mainContent.setAttribute('dir', 'ltr');
        }
        // Align .align-side elements right in FA, left in EN
        document.querySelectorAll('.align-side').forEach(el => {
            el.style.textAlign = (currentLanguage === 'fa') ? 'right' : 'left';
            el.style.justifyContent = 'flex-start';
        });
        // Align .date-side elements: left in FA, right in EN
        document.querySelectorAll('.date-side').forEach(el => {
            if (currentLanguage === 'fa') {
                el.style.order = '-1';
                el.style.marginRight = 'auto';
                el.style.marginLeft = '0';
                el.style.textAlign = 'left';
            } else {
                el.style.order = '';
                el.style.marginRight = '';
                el.style.marginLeft = '';
                el.style.textAlign = '';
            }
        });
    }
});

// Helper Functions
function toggleModal(modal) {
    if (modal.style.display === 'block') {
        modal.style.display = 'none';
        if (modal === snakeModal && snakeGame) {
            snakeGame.pause();
        }
    } else {
        modal.style.display = 'block';
    }
}

// GitHub Commits
async function loadCommits() {
    commitsContainer.innerHTML = '<div class="loading">Loading commits...</div>';
    
    try {
        // This would normally fetch from GitHub API
        // For demo purposes, we'll use mock data
        setTimeout(() => {
            const mockCommits = [
                {
                    title: 'Update README.md',
                    date: '2023-04-15',
                    message: 'Added installation instructions and updated documentation'
                },
                {
                    title: 'Fix responsive layout issues',
                    date: '2023-04-12',
                    message: 'Fixed header alignment on mobile devices and improved accessibility'
                },
                {
                    title: 'Implement snake game',
                    date: '2023-04-10',
                    message: 'Added snake game easter egg with keyboard controls'
                },
                {
                    title: 'Initial commit',
                    date: '2023-04-05',
                    message: 'Created project structure and basic layout'
                }
            ];
            
            displayCommits(mockCommits);
        }, 1000);
    } catch (error) {
        commitsContainer.innerHTML = '<div class="error">Error loading commits. Please try again later.</div>';
    }
}

function displayCommits(commits) {
    if (!commits || commits.length === 0) {
        commitsContainer.innerHTML = '<div class="no-data">No commits found</div>';
        return;
    }
    
    let html = '';
    commits.forEach(commit => {
        html += `
            <div class="commit">
                <div class="commit-header">
                    <div class="commit-title">${commit.title}</div>
                    <div class="commit-date">${commit.date}</div>
                </div>
                <div class="commit-message">${commit.message}</div>
            </div>
        `;
    });
    
    commitsContainer.innerHTML = html;
}

// Snake Game
class SnakeGame {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.gridSize = 20;
        this.tileCount = canvas.width / this.gridSize;
        this.snake = [
            { x: 10, y: 10 },
            { x: 9, y: 10 },
            { x: 8, y: 10 }
        ];
        this.food = { x: 15, y: 15 };
        this.direction = { x: 1, y: 0 };
        this.speed = 7;
        this.score = 0;
        this.gameOver = false;
        this.paused = false;
        this.gameLoop = null;
        
        // Event listeners for arrow keys
        document.addEventListener('keydown', this.handleKeyPress.bind(this));
    }
    
    handleKeyPress(e) {
        // Only handle keys if game is active
        if (this.gameOver || this.paused) return;
        
        // Prevent default behavior for arrow keys
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            e.preventDefault();
        }
        
        // Change direction based on key press
        switch (e.key) {
            case 'ArrowUp':
                if (this.direction.y !== 1) {
                    this.direction = { x: 0, y: -1 };
                }
                break;
            case 'ArrowDown':
                if (this.direction.y !== -1) {
                    this.direction = { x: 0, y: 1 };
                }
                break;
            case 'ArrowLeft':
                if (this.direction.x !== 1) {
                    this.direction = { x: -1, y: 0 };
                }
                break;
            case 'ArrowRight':
                if (this.direction.x !== -1) {
                    this.direction = { x: 1, y: 0 };
                }
                break;
        }
    }
    
    start() {
        this.paused = false;
        this.gameOver = false;
        if (!this.gameLoop) {
            this.gameLoop = setInterval(() => {
                this.update();
                this.draw();
            }, 1000 / this.speed);
        }
    }
    
    pause() {
        this.paused = true;
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
            this.gameLoop = null;
        }
    }
    
    reset() {
        this.snake = [
            { x: 10, y: 10 },
            { x: 9, y: 10 },
            { x: 8, y: 10 }
        ];
        this.food = { x: 15, y: 15 };
        this.direction = { x: 1, y: 0 };
        this.score = 0;
        this.gameOver = false;
        this.paused = false;
        if (this.gameLoop) {
            clearInterval(this.gameLoop);
            this.gameLoop = null;
        }
    }
    
    update() {
        if (this.gameOver || this.paused) return;
        
        // Move snake
        const head = { 
            x: this.snake[0].x + this.direction.x, 
            y: this.snake[0].y + this.direction.y 
        };
        
        // Check for wall collision
        if (head.x < 0 || head.x >= this.tileCount || 
            head.y < 0 || head.y >= this.tileCount) {
            this.gameOver = true;
            return;
        }
        
        // Check for self collision
        for (let i = 0; i < this.snake.length; i++) {
            if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
                this.gameOver = true;
                return;
            }
        }
        
        // Add new head
        this.snake.unshift(head);
        
        // Check for food collision
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score++;
            // Generate new food
            this.food = {
                x: Math.floor(Math.random() * this.tileCount),
                y: Math.floor(Math.random() * this.tileCount)
            };
        } else {
            // Remove tail if no food was eaten
            this.snake.pop();
        }
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw snake
        this.ctx.fillStyle = '#3eb489';
        this.snake.forEach((segment, index) => {
            this.ctx.fillRect(
                segment.x * this.gridSize,
                segment.y * this.gridSize,
                this.gridSize - 2,
                this.gridSize - 2
            );
            
            // Draw eyes on head
            if (index === 0) {
                this.ctx.fillStyle = '#000000';
                
                // Position eyes based on direction
                if (this.direction.x === 1) {
                    this.ctx.fillRect(
                        segment.x * this.gridSize + this.gridSize - 6,
                        segment.y * this.gridSize + 4,
                        3, 3
                    );
                    this.ctx.fillRect(
                        segment.x * this.gridSize + this.gridSize - 6,
                        segment.y * this.gridSize + this.gridSize - 7,
                        3, 3
                    );
                } else if (this.direction.x === -1) {
                    this.ctx.fillRect(
                        segment.x * this.gridSize + 3,
                        segment.y * this.gridSize + 4,
                        3, 3
                    );
                    this.ctx.fillRect(
                        segment.x * this.gridSize + 3,
                        segment.y * this.gridSize + this.gridSize - 7,
                        3, 3
                    );
                } else if (this.direction.y === -1) {
                    this.ctx.fillRect(
                        segment.x * this.gridSize + 4,
                        segment.y * this.gridSize + 3,
                        3, 3
                    );
                    this.ctx.fillRect(
                        segment.x * this.gridSize + this.gridSize - 7,
                        segment.y * this.gridSize + 3,
                        3, 3
                    );
                } else if (this.direction.y === 1) {
                    this.ctx.fillRect(
                        segment.x * this.gridSize + 4,
                        segment.y * this.gridSize + this.gridSize - 6,
                        3, 3
                    );
                    this.ctx.fillRect(
                        segment.x * this.gridSize + this.gridSize - 7,
                        segment.y * this.gridSize + this.gridSize - 6,
                        3, 3
                    );
                }
                
                this.ctx.fillStyle = '#3eb489';
            }
        });
        
        // Draw food
        this.ctx.fillStyle = '#ff0000';
        this.ctx.fillRect(
            this.food.x * this.gridSize,
            this.food.y * this.gridSize,
            this.gridSize - 2,
            this.gridSize - 2
        );
        
        // Draw score
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = '20px Space Mono';
        this.ctx.fillText(`Score: ${this.score}`, 10, 25);
        
        // Draw game over message
        if (this.gameOver) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            this.ctx.fillStyle = '#ffffff';
            this.ctx.font = '30px Space Mono';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('Game Over', this.canvas.width / 2, this.canvas.height / 2 - 20);
            
            this.ctx.font = '20px Space Mono';
            this.ctx.fillText(`Score: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 20);
            this.ctx.fillText('Press Start to play again', this.canvas.width / 2, this.canvas.height / 2 + 50);
            
            this.pause();
        }
    }
}
