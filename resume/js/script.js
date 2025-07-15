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
        title: 'Ashkan Watson - Resume',
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
        title: 'اشکان واتسون - رزومه',
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
        jobDescription1: 'استودیو EEFA حل مشکلات قرن 21 با حفر چاله‌ها و ساخت محصولات تغییردهنده بازی مانند *شعله‌افکن نیست*',
        jobDescription2: 'هر شرکتی نیاز به مدیریت صحیح شبکه دارد و شرکت VFX نیز از این قاعده مستثنی نیست. حفر چاله‌ها سخت است و من نقش خود را در اطمینان از اتصال کل شرکت ایفا می‌کنم. من از هدایت شرکت به سمت فناوری‌های جدید لذت می‌برم.',
        education1: 'دیپلم الکترونیک',
        // Project section
        projectTitle: 'پروژه چندومه؟!',
        projectLink: 'github.com/Chandome',
        projectDesc1: 'این احتمالاً یکی از بهترین برنامه‌هایی است که تا به حال ساخته شده است، اگر موافق نیستید احتمالاً اشتباه می‌کنید.',
        projectDesc2: 'من این پروژه را به عنوان راهی برای یادگیری فلاتر شروع کردم و از آن زمان به یک برنامه کامل تبدیل شده است. من مهارت‌های زیادی از طریق این پروژه یاد گرفته‌ام و بسیار افتخار می‌کنم که این پروژه در نمونه کارهای من است. اگر شما پروژه‌ای به این عالی ندارید، توصیه می‌کنم یکی بسازید.',
        // Experience section
        companyName: 'استودیو EEFA',
        dateRange: 'نوامبر 2022 - تاکنون',
        // Education section
        schoolName: 'پیام',
        educationDate: '2017 - 2020',
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
        }
    });

    // Handle mobile modal positioning
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
    };

    window.addEventListener('resize', adjustModalForMobile);
    adjustModalForMobile();

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
        
        // Update about section
        document.querySelectorAll('.text-gray-300.mb-4')[0].textContent = t.aboutText;
        document.querySelectorAll('.text-gray-300')[1].innerHTML = `${t.skillsText} <span class="highlight">Python</span> and <span class="highlight">Dart</span>`;
        
        // Update job title and descriptions
        document.querySelectorAll('.text-gray-400.mb-4')[2].textContent = t.jobTitle;
        document.querySelectorAll('.text-gray-300.mb-4')[2].textContent = t.jobDescription1;
        document.querySelectorAll('.text-gray-300')[6].textContent = t.jobDescription2;
        
        // Update education
        document.querySelectorAll('.text-gray-400.mb-4')[3].textContent = t.education1;
        
        // Update project section
        document.querySelectorAll('.text-lg.mb-2.flex-center, .text-lg.flex-center')[0].innerHTML = `<span class="highlight-marker">*</span> ${t.projectTitle}`;
        document.querySelectorAll('.highlight-link')[0].textContent = t.projectLink;
        document.querySelectorAll('.text-gray-300.mb-4')[1].textContent = t.projectDesc1;
        document.querySelectorAll('.text-gray-300')[3].textContent = t.projectDesc2;
        
        // Update experience section - company name and date
        document.querySelectorAll('.text-lg.flex-center')[1].innerHTML = `<span class="highlight-marker">*</span> ${t.companyName}`;
        document.querySelectorAll('.text-gray-400.text-sm')[0].textContent = t.dateRange;
        
        // Update education section - school name and details
        document.querySelectorAll('.text-lg.flex-center')[2].innerHTML = `<span class="highlight-marker">*</span> ${t.schoolName}`;
        document.querySelectorAll('.text-gray-400.text-sm')[1].textContent = t.educationDate;
        document.querySelectorAll('.text-gray-300.mb-4')[3].textContent = t.educationDesc1;
        document.querySelectorAll('.text-gray-300.mb-4')[4].textContent = t.educationDesc2;
        document.querySelectorAll('.text-gray-300')[7].textContent = t.educationDesc3;
        
        // Update footer
        document.querySelector('.text-sm.hover-highlight').textContent = t.website;
        
        // Set text direction based on language
        if (currentLanguage === 'fa') {
            document.documentElement.setAttribute('dir', 'rtl');
            document.body.classList.add('rtl');
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
            document.body.classList.remove('rtl');
        }
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
