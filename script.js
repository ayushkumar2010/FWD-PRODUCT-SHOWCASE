const quizSetup = document.querySelector('.quiz-setup');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const categorySelect = document.getElementById('category');
const difficultySelect = document.getElementById('difficulty');
const startBtn = document.getElementById('start-btn');
const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const nextBtn = document.getElementById('next-btn');
const questionNumberSpan = document.getElementById('question-number');
const showResultBtn = document.getElementById('show-result-btn');
const finalScoreH2 = document.getElementById('final-score');
const playAgainBtn = document.getElementById('play-again-btn');
const timerDisplay = document.getElementById('timer-display');

let timer;
const TIME_PER_QUESTION = 10;
let questions = [];
let currentQuestionIndex = 0;
let score = 0;


const quizData = {
    categories: [
        { id: 'math', name: 'Mathematics'},
        { id: 'history', name: 'History'},
        { id: 'tech', name: 'Technology'},
        { id: 'gk', name: 'General Knowledge'},
        { id: 'web', name: 'Web Development'},
        { id: 'science', name: 'Science'}
    ],
    questions: [
        { category: 'math', difficulty: 'easy', question: "What is 7 + 8?", answers: ["14", "15", "16", "17"], correct_answer: "15", feedback: "7 plus 8 equals 15." },
        { category: 'math', difficulty: 'easy', question: "What is 9 - 3?", answers: ["5", "6", "7", "8"], correct_answer: "6", feedback: "9 minus 3 equals 6." },
        { category: 'math', difficulty: 'easy', question: "What is 5 x 3?", answers: ["15", "10", "8", "12"], correct_answer: "15", feedback: "5 multiplied by 3 equals 15." },
        { category: 'math', difficulty: 'easy', question: "What is 16 ÷ 4?", answers: ["2", "3", "4", "5"], correct_answer: "4", feedback: "16 divided by 4 equals 4." },
      
        { category: 'math', difficulty: 'medium', question: "What is the square root of 64?", answers: ["6", "7", "8", "9"], correct_answer: "8", feedback: "The square root of 64 is 8." },
        { category: 'math', difficulty: 'medium', question: "What is 2 to the power of 5?", answers: ["10", "16", "32", "64"], correct_answer: "32", feedback: "2 to the power of 5 equals 32." },
        { category: 'math', difficulty: 'medium', question: "If x + 5 = 12, what is x?", answers: ["5", "6", "7", "8"], correct_answer: "7", feedback: "x equals 7." },
        { category: 'math', difficulty: 'medium', question: "What is 45% of 200?", answers: ["80", "85", "90", "95"], correct_answer: "90", feedback: "45% of 200 is 90." },
      
        { category: 'math', difficulty: 'hard', question: "What is the value of pi to two decimal places?", answers: ["3.12", "3.13", "3.14", "3.15"], correct_answer: "3.14", feedback: "Pi to two decimal places is 3.14." },
        { category: 'math', difficulty: 'hard', question: "What is the derivative of x²?", answers: ["x", "2x", "x²", "2"], correct_answer: "2x", feedback: "The derivative of x² is 2x." },
        { category: 'math', difficulty: 'hard', question: "Solve for x: 3x - 7 = 11", answers: ["4", "5", "6", "7"], correct_answer: "6", feedback: "x equals 6." },
        { category: 'math', difficulty: 'hard', question: "What is the integral of 2x dx?", answers: ["x² + C", "2x² + C", "x + C", "x³ + C"], correct_answer: "x² + C", feedback: "The integral of 2x dx is x² + C." },
      

        { category: 'science', difficulty: 'easy', question: "What planet is known as the Red Planet?", answers: ["Earth", "Venus", "Mars", "Jupiter"], correct_answer: "Mars", feedback: "Mars is known as the Red Planet due to its reddish appearance." },
        { category: 'science', difficulty: 'easy', question: "What gas do plants breathe in that humans and animals breathe out?", answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"], correct_answer: "Carbon Dioxide", feedback: "Plants take in carbon dioxide and release oxygen." },
        { category: 'science', difficulty: 'easy', question: "How many legs does an insect have?", answers: ["4", "6", "8", "10"], correct_answer: "6", feedback: "Insects have six legs." },
        { category: 'science', difficulty: 'easy', question: "What is H2O commonly known as?", answers: ["Hydrogen Peroxide", "Water", "Oxygen", "Salt"], correct_answer: "Water", feedback: "H2O is the chemical formula for water." },
      
        { category: 'science', difficulty: 'medium', question: "What organ in the human body pumps blood?", answers: ["Liver", "Brain", "Kidney", "Heart"], correct_answer: "Heart", feedback: "The heart pumps blood throughout the body." },
        { category: 'science', difficulty: 'medium', question: "What force keeps us on the ground?", answers: ["Magnetism", "Gravity", "Friction", "Electricity"], correct_answer: "Gravity", feedback: "Gravity attracts objects toward the Earth." },
        { category: 'science', difficulty: 'medium', question: "Which element has the chemical symbol 'O'?", answers: ["Gold", "Oxygen", "Silver", "Helium"], correct_answer: "Oxygen", feedback: "Oxygen's chemical symbol is 'O'." },
        { category: 'science', difficulty: 'medium', question: "At what temperature does water boil (in Celsius)?", answers: ["50°C", "75°C", "90°C", "100°C"], correct_answer: "100°C", feedback: "Water boils at 100 degrees Celsius at sea level." },
      
        { category: 'science', difficulty: 'hard', question: "What is the powerhouse of the cell?", answers: ["Nucleus", "Mitochondria", "Ribosome", "Chloroplast"], correct_answer: "Mitochondria", feedback: "Mitochondria generate most of the cell's energy." },
        { category: 'science', difficulty: 'hard', question: "What particle has a negative charge?", answers: ["Proton", "Neutron", "Electron", "Photon"], correct_answer: "Electron", feedback: "Electrons carry a negative charge." },
        { category: 'science', difficulty: 'hard', question: "What type of bond involves sharing electron pairs between atoms?", answers: ["Ionic", "Covalent", "Metallic", "Hydrogen"], correct_answer: "Covalent", feedback: "Covalent bonds involve sharing electrons." },
        { category: 'science', difficulty: 'hard', question: "What phenomenon causes a prism to split white light into a spectrum?", answers: ["Reflection", "Diffraction", "Dispersion", "Refraction"], correct_answer: "Dispersion", feedback: "Dispersion separates light into colors." },

        { category: 'history', difficulty: 'easy', question: "Who was the first President of the United States?", answers: ["George Washington", "Thomas Jefferson", "Abraham Lincoln", "John Adams"], correct_answer: "George Washington", feedback: "George Washington was the first U.S. President." },
        { category: 'history', difficulty: 'easy', question: "In which year did World War II end?", answers: ["1943", "1945", "1947", "1950"], correct_answer: "1945", feedback: "World War II ended in 1945." },
        { category: 'history', difficulty: 'easy', question: "The Great Wall is located in which country?", answers: ["India", "China", "Japan", "Mongolia"], correct_answer: "China", feedback: "The Great Wall is in China." },
        { category: 'history', difficulty: 'easy', question: "Who discovered America?", answers: ["Christopher Columbus", "Ferdinand Magellan", "Marco Polo", "Leif Erikson"], correct_answer: "Christopher Columbus", feedback: "Christopher Columbus discovered America in 1492." },
    
        { category: 'history', difficulty: 'medium', question: "Who was the British Prime Minister during WWII?", answers: ["Winston Churchill", "Neville Chamberlain", "Clement Attlee", "Margaret Thatcher"], correct_answer: "Winston Churchill", feedback: "Churchill was the British PM during WWII." },
        { category: 'history', difficulty: 'medium', question: "Which empire was ruled by Genghis Khan?", answers: ["Roman Empire", "Mongol Empire", "Ottoman Empire", "British Empire"], correct_answer: "Mongol Empire", feedback: "Genghis Khan founded the Mongol Empire." },
        { category: 'history', difficulty: 'medium', question: "When did the French Revolution begin?", answers: ["1780", "1789", "1795", "1800"], correct_answer: "1789", feedback: "The French Revolution started in 1789." },
        { category: 'history', difficulty: 'medium', question: "Which U.S. President issued the Emancipation Proclamation?", answers: ["Abraham Lincoln", "Andrew Jackson", "Theodore Roosevelt", "Ulysses S. Grant"], correct_answer: "Abraham Lincoln", feedback: "Lincoln issued the Emancipation Proclamation in 1863." },
    
        { category: 'history', difficulty: 'hard', question: "What year did the Berlin Wall fall?", answers: ["1987", "1989", "1991", "1993"], correct_answer: "1989", feedback: "The Berlin Wall fell in 1989." },
        { category: 'history', difficulty: 'hard', question: "Who was the last Pharaoh of Ancient Egypt?", answers: ["Tutankhamun", "Cleopatra", "Ramses II", "Akhenaten"], correct_answer: "Cleopatra", feedback: "Cleopatra was the last Pharaoh of Ancient Egypt." },
        { category: 'history', difficulty: 'hard', question: "Where was the signing of the Treaty of Versailles?", answers: ["Paris", "Versailles", "London", "Berlin"], correct_answer: "Versailles", feedback: "The Treaty of Versailles was signed in Versailles." },
        { category: 'history', difficulty: 'hard', question: "Who was the main author of the Declaration of Independence?", answers: ["Thomas Jefferson", "John Hancock", "Benjamin Franklin", "James Madison"], correct_answer: "Thomas Jefferson", feedback: "Jefferson was the primary author." },    

        { category: 'gk', difficulty: 'easy', question: "What is the capital of France?", answers: ["Paris", "London", "Berlin", "Madrid"], correct_answer: "Paris", feedback: "Paris is the capital city of France." },
        { category: 'gk', difficulty: 'easy', question: "Which animal is known as the King of the Jungle?", answers: ["Lion", "Tiger", "Elephant", "Bear"], correct_answer: "Lion", feedback: "The lion is known as the King of the Jungle." },
        { category: 'gk', difficulty: 'easy', question: "What is the largest ocean on Earth?", answers: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"], correct_answer: "Pacific Ocean", feedback: "The Pacific Ocean is the largest ocean on Earth." },
        { category: 'gk', difficulty: 'easy', question: "How many continents are there on Earth?", answers: ["5", "6", "7", "8"], correct_answer: "7", feedback: "There are 7 continents on Earth." },
    
        { category: 'gk', difficulty: 'medium', question: "Which planet is known as the Red Planet?", answers: ["Venus", "Mars", "Jupiter", "Saturn"], correct_answer: "Mars", feedback: "Mars is known as the Red Planet." },
        { category: 'gk', difficulty: 'medium', question: "In which year did the Titanic sink?", answers: ["1905", "1912", "1918", "1925"], correct_answer: "1912", feedback: "The Titanic sank in 1912." },
        { category: 'gk', difficulty: 'medium', question: "What is the chemical symbol for Gold?", answers: ["Au", "Ag", "Gd", "Go"], correct_answer: "Au", feedback: "Gold's chemical symbol is Au." },
        { category: 'gk', difficulty: 'medium', question: "Who painted the Mona Lisa?", answers: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Donatello"], correct_answer: "Leonardo da Vinci", feedback: "Leonardo da Vinci painted the Mona Lisa." },
    
        { category: 'gk', difficulty: 'hard', question: "What is the smallest country in the world?", answers: ["Monaco", "Nauru", "Vatican City", "San Marino"], correct_answer: "Vatican City", feedback: "Vatican City is the smallest country." },
        { category: 'gk', difficulty: 'hard', question: "Who proposed the theory of relativity?", answers: ["Isaac Newton", "Albert Einstein", "Nikola Tesla", "Galileo Galilei"], correct_answer: "Albert Einstein", feedback: "Albert Einstein proposed the theory of relativity." },
        { category: 'gk', difficulty: 'hard', question: "Which element has the highest atomic number?", answers: ["Uranium", "Oganesson", "Radon", "Plutonium"], correct_answer: "Oganesson", feedback: "Oganesson has the highest atomic number." },
        { category: 'gk', difficulty: 'hard', question: "The Heisenberg Uncertainty Principle is related to which field?", answers: ["Classical Mechanics", "Quantum Mechanics", "Thermodynamics", "Electromagnetism"], correct_answer: "Quantum Mechanics", feedback: "It relates to Quantum Mechanics." },    

        { category: 'web', difficulty: 'easy', question: "What does HTML stand for?", answers: ["HyperText Markup Language", "Home Tool Markup Language", "Hyperlinks Text Mark Language", "Hyper Tool Multi Language"], correct_answer: "HyperText Markup Language", feedback: "HTML stands for HyperText Markup Language." },
        { category: 'web', difficulty: 'easy', question: "Which tag is used to create a hyperlink in HTML?", answers: ["<a>", "<link>", "<href>", "<hyperlink>"], correct_answer: "<a>", feedback: "The <a> tag is used to create hyperlinks." },
        { category: 'web', difficulty: 'easy', question: "What does CSS stand for?", answers: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"], correct_answer: "Cascading Style Sheets", feedback: "CSS stands for Cascading Style Sheets." },
        { category: 'web', difficulty: 'easy', question: "Which language is mainly used for web page scripting?", answers: ["Python", "Java", "JavaScript", "C++"], correct_answer: "JavaScript", feedback: "JavaScript is mainly used for web page scripting." },
    
        { category: 'web', difficulty: 'medium', question: "Which HTML attribute is used to define inline styles?", answers: ["style", "class", "font", "styles"], correct_answer: "style", feedback: "The 'style' attribute is used for inline CSS styles." },
        { category: 'web', difficulty: 'medium', question: "Which property is used to change the background color in CSS?", answers: ["background-color", "color", "bgcolor", "background"], correct_answer: "background-color", feedback: "Use 'background-color' for changing background colors." },
        { category: 'web', difficulty: 'medium', question: "What is DOM in web development?", answers: ["Document Object Model", "Data Object Model", "Document Oriented Model", "Data Oriented Model"], correct_answer: "Document Object Model", feedback: "DOM stands for Document Object Model." },
        { category: 'web', difficulty: 'medium', question: "Which method is used to add an event listener in JavaScript?", answers: ["addEventListener()", "attachEvent()", "addListener()", "listenEvent()"], correct_answer: "addEventListener()", feedback: "addEventListener() is the modern method for adding event listeners." },
    
        { category: 'web', difficulty: 'hard', question: "Which HTTP method is used to update existing data?", answers: ["POST", "PUT", "GET", "DELETE"], correct_answer: "PUT", feedback: "PUT method updates existing data on the server." },
        { category: 'web', difficulty: 'hard', question: "What does JSON stand for?", answers: ["JavaScript Object Notation", "Java Standard Output Notation", "JavaScript Output Name", "Java Simple Object Notation"], correct_answer: "JavaScript Object Notation", feedback: "JSON is JavaScript Object Notation used for data interchange." },
        { category: 'web', difficulty: 'hard', question: "Which CSS framework uses a grid system based on 12 columns?", answers: ["Foundation", "Bootstrap", "Tailwind", "Materialize"], correct_answer: "Bootstrap", feedback: "Bootstrap uses a 12-column grid system." },
        { category: 'web', difficulty: 'hard', question: "Which command line tool is used for managing Node.js packages?", answers: ["npm", "node", "nodemon", "npx"], correct_answer: "npm", feedback: "npm is used to manage Node.js packages." },    

        { category: 'tech', difficulty: 'easy', question: "What does 'HTML' stand for?", answers: ["HyperText Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyperloop Machine Language"], correct_answer: "HyperText Markup Language", feedback: "HTML stands for HyperText Markup Language, used to create webpages." },
        { category: 'tech', difficulty: 'easy', question: "Which company created the Windows operating system?", answers: ["Apple", "Microsoft", "Google", "IBM"], correct_answer: "Microsoft", feedback: "Microsoft developed the Windows OS." },
        { category: 'tech', difficulty: 'easy', question: "What is the CPU in a computer?", answers: ["Central Processing Unit", "Computer Personal Unit", "Central Power Unit", "Core Processing Unit"], correct_answer: "Central Processing Unit", feedback: "CPU stands for Central Processing Unit, the brain of the computer." },
        { category: 'tech', difficulty: 'easy', question: "Which device is primarily used to input data?", answers: ["Monitor", "Keyboard", "Printer", "Speaker"], correct_answer: "Keyboard", feedback: "The keyboard is used to input data into a computer." },
      
        { category: 'tech', difficulty: 'medium', question: "What does CSS stand for?", answers: ["Computer Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets", "Creative Style Sheets"], correct_answer: "Cascading Style Sheets", feedback: "CSS stands for Cascading Style Sheets used for styling webpages." },
        { category: 'tech', difficulty: 'medium', question: "Which programming language is mainly used to create dynamic web pages?", answers: ["HTML", "Python", "JavaScript", "C++"], correct_answer: "JavaScript", feedback: "JavaScript is used to create dynamic web content." },
        { category: 'tech', difficulty: 'medium', question: "In which year was Python programming language created?", answers: ["1989", "1991", "1995", "2000"], correct_answer: "1991", feedback: "Python was created in 1991 by Guido van Rossum." },
        { category: 'tech', difficulty: 'medium', question: "What does RAM stand for in computers?", answers: ["Random Access Memory", "Read Able Memory", "Run Active Memory", "Ready Access Memory"], correct_answer: "Random Access Memory", feedback: "RAM is the Random Access Memory used to store working data." },
      
        { category: 'tech', difficulty: 'hard', question: "What is the primary purpose of the OSI model in networking?", answers: ["Operating System Interface", "Standardizing network communication", "Organizing internet systems", "Operating System Integration"], correct_answer: "Standardizing network communication", feedback: "OSI model standardizes communication protocols." },
        { category: 'tech', difficulty: 'hard', question: "Which algorithm is the basis of RSA encryption?", answers: ["Symmetric Key Algorithm", "Public Key Cryptography", "Hashing Algorithm", "Stream Cipher"], correct_answer: "Public Key Cryptography", feedback: "RSA uses Public Key Cryptography." },
        { category: 'tech', difficulty: 'hard', question: "What does the acronym 'API' stand for?", answers: ["Advanced Programming Interface", "Application Programming Interface", "Applied Program Integration", "Authorized Program Instructions"], correct_answer: "Application Programming Interface", feedback: "API stands for Application Programming Interface, a set of routines and tools for building software." },
        { category: 'tech', difficulty: 'hard', question: "What is the function of the DNS system?", answers: ["Converts domain names to IP addresses", "Encrypts network data", "Filters internet traffic", "Monitors network health"], correct_answer: "Converts domain names to IP addresses", feedback: "DNS translates domain names into IP addresses for internet connectivity." }
      
    ]
};

function populateCategories(){
    categorySelect.innerHTML = ''; 
    quizData.categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });
}

function startQuiz(){
    const selectedCategory = categorySelect.value;
    const selectedDifficulty = difficultySelect.value;
    
    questions = quizData.questions.filter(q => q.category === selectedCategory && q.difficulty === selectedDifficulty);

    if (questions.length === 0){
        alert("No questions found for the selected criteria. Please try different settings.");
        return;
    }

    questions.sort(() => Math.random() - 0.5);

    currentQuestionIndex = 0;
    score = 0;

    quizSetup.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    resultContainer.classList.add('hidden');

    showQuestion();
}

function resetState(){
    while (answerButtons.firstChild){
      answerButtons.firstChild.remove();
    }
    
    const feedbackElement = document.getElementById('feedback');
    feedbackElement.innerText = '';
  
    nextBtn.style.display = 'none';
  }
  
function showQuestion(){
    resetState();
  
    if (currentQuestionIndex >= questions.length){
      showScore();
      return;
    }
  
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
    questionNumberSpan.textContent = `Question: ${currentQuestionIndex + 1}/${questions.length}`;
  
    const shuffledAnswers = [...currentQuestion.answers].sort(() => Math.random() - 0.5);
  
    shuffledAnswers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.classList.add('btn');
        if (answer === currentQuestion.correct_answer) {
            button.dataset.correct = 'true';
        }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    });
  
    startTimer();
  }
  
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    clearInterval(timer);

    if (isCorrect){
        selectedBtn.classList.add('correct');
        score++;
    } else{
        selectedBtn.classList.add('incorrect');
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add('correct');
        }
        button.disabled = true;
    });

    const feedbackElement = document.getElementById('feedback');
    const explanationText = questions[currentQuestionIndex].feedback || '';
    feedbackElement.innerHTML = explanationText ? `<strong>Explanation:</strong> ${explanationText}` : '';
    
    nextBtn.style.display = 'block';
}

function startTimer(){
    let timeLeft = TIME_PER_QUESTION;
    timerDisplay.textContent = `Time: ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time: ${timeLeft}s`;

        if (timeLeft <= 0){
            clearInterval(timer);
            Array.from(answerButtons.children).forEach(button => {
                if (button.dataset.correct === "true") {
                    button.classList.add('correct');
                }
                button.disabled = true;
            });
            
            const feedbackElement = document.getElementById('feedback');
            const explanationText = questions[currentQuestionIndex].feedback || '';
            feedbackElement.innerHTML = explanationText ? `<strong>Explanation:</strong> ${explanationText}` : '';
            
            nextBtn.style.display = 'block';
        }
    }, 1000);
}

function showScore(){
    clearInterval(timer);
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    finalScoreH2.innerHTML = `You scored ${score} out of ${questions.length} questions!`;

    const resultImage = document.getElementById('result-image');
    const resultMessage = document.getElementById('result-message');

    if (score === 0){
        resultImage.src = 'images/unhappy.png';
        resultImage.alt = 'Unhappy face';
        resultMessage.textContent = "Don't give up! Try again to improve your score."
    } 
    else if (score >= 1 && score <= 2){
        resultImage.src = 'images/good.png';
        resultImage.alt = 'Good job';
        resultMessage.textContent = "Good effort! Keep practicing to get better."
    }
    else if (score === 3){
        resultImage.src = 'images/smile.png';
        resultImage.alt = 'Smile';
        resultMessage.textContent = "Well done! You're getting there."
    }  
    else if (score === 4){
        resultImage.src = 'images/trophy.png';
        resultImage.alt = 'Trophy';
        resultMessage.textContent = "Excellent! You nailed it."
    } 
    else {
        resultImage.src = '';
        resultImage.alt = '';
        resultMessage.textContent = "Thanks for playing! Try again for a higher score."
    }

    const category = categorySelect.value;
    const difficulty = difficultySelect.value;
    const username = localStorage.getItem("quizUsername") || "Anonymous"; // fallback username
    const scoreHistory = JSON.parse(localStorage.getItem("quizScoreHistory")) || [];

    scoreHistory.push({
        username: localStorage.getItem("quizUsername"),
        score,
        totalQuestions: questions.length,
        date: new Date().toISOString(),
        category,
        difficulty
    });
    localStorage.setItem("quizScoreHistory", JSON.stringify(scoreHistory));
}

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    showQuestion();
});
showResultBtn.addEventListener('click', showScore);
playAgainBtn.addEventListener('click', () => {
    quizSetup.classList.remove('hidden');
    resultContainer.classList.add('hidden');
    populateCategories();
});

populateCategories();

document.addEventListener('DOMContentLoaded', function(){
    const loginPanel = document.getElementById("login-panel");
    const usernameInput = document.getElementById("username-input");
    const loginBtn = document.getElementById("login-btn");
    const quizSetup = document.querySelector('.quiz-setup');
    const quizContainer = document.getElementById('quiz-container');
    const resultContainer = document.getElementById('result-container');
    const leaderboardContainer = document.getElementById('leaderboard-container');
    const leaderboardTableBody = document.querySelector('#leaderboard-table tbody');
    const closeLeaderboardBtn = document.getElementById('close-leaderboard');
    const logoutBtn = document.getElementById('logout-btn');
    const viewLeaderboardBtn = document.getElementById('view-leaderboard-btn');
    const viewLeaderboardBtnResult = document.getElementById('view-leaderboard-btn-result');
  
    
    loginBtn.addEventListener("click", () => {
        const username = usernameInput.value.trim();
        if (username){
            localStorage.setItem("quizUsername", username);
            loginPanel.classList.add("hidden");
            quizSetup.classList.remove("hidden");
            populateCategories();
        } 
        else{
            alert("Please enter a username to proceed.");
        }
    });
  
    const savedUser = localStorage.getItem("quizUsername");
    if (savedUser){
        loginPanel.classList.add("hidden");
        quizSetup.classList.remove("hidden");
        populateCategories();
    } 
    else{
        loginPanel.classList.remove("hidden");
        quizSetup.classList.add("hidden");
    }  
    if (logoutBtn){
        logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('quizUsername');
        window.location.reload();
        });
    }
  
    function showLeaderboard() {
        const scoreHistory = JSON.parse(localStorage.getItem("quizScoreHistory")) || [];        
        const selectedCategory = categorySelect.value;
        const selectedDifficulty = difficultySelect.value;
      
        const filteredScores = scoreHistory.filter(entry => 
          entry.category === selectedCategory && entry.difficulty === selectedDifficulty
        );
      
        const sortedScores = filteredScores.sort((a, b) => b.score - a.score);
      
        leaderboardTableBody.innerHTML = '';
      
        sortedScores.forEach((entry, index) => {
            const dateObj = new Date(entry.date);
            const dateStr = dateObj.toLocaleDateString();
            const timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }); // "HH:MM" format
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${entry.username}</td>
                <td>${entry.score}</td>
                <td>${new Date(entry.date).toLocaleDateString()}</td>
                <td>${timeStr}</td>
            `;
            leaderboardTableBody.appendChild(tr);
        });
      
        leaderboardContainer.classList.remove('hidden');
      
        quizSetup.classList.add('hidden');
        quizContainer.classList.add('hidden');
        resultContainer.classList.add('hidden');
    }
      
    if (closeLeaderboardBtn){
        closeLeaderboardBtn.addEventListener('click', () => {
        leaderboardContainer.classList.add('hidden');
        quizSetup.classList.remove('hidden');
        });
    }
    if (viewLeaderboardBtn){
        viewLeaderboardBtn.addEventListener('click', showLeaderboard);
    }
    if (viewLeaderboardBtnResult){
        viewLeaderboardBtnResult.addEventListener('click', showLeaderboard);
    }
}); 