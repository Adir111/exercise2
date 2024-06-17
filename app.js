// Global variables
const header = document.querySelector('h1'); // Header element
const app = document.getElementById('app'); // App container element
const ddMenu = document.querySelector('#ddMenu'); // Dropdown menu element
const topMenu = document.getElementById('topMenu'); // Top menu element
const sandwitch = document.querySelectorAll('svg'); // SVG elements
const html = document.documentElement; // HTML element

// Function to toggle dark mode
const toggle = () => html.classList.toggle('dark');

// Function to set view based on the selected option
const setView = (v) => {
    header.innerText = v;
    toggleMenu(true);

    // Render different views based on the selected option
    if (v === 'Calculator') {
        renderCalculator();
    } else if (v === 'About') {
        renderAbout();
    } else if (v === 'Contact') {
        renderContact();
    }
}

// Function to toggle the dropdown menu
const toggleMenu = (hide) => {
    if (!hide) {
        ddMenu.classList.toggle('hidden');
        document.querySelectorAll('svg').forEach((el) => {
            el.classList.toggle('hidden');
        });
    } else {
        ddMenu.classList.add('hidden');
        document.querySelectorAll('svg')[0].classList.remove('hidden');
        document.querySelectorAll('svg')[1].classList.add('hidden');
    }
}

// Function to add a row to the container
const addRow = (container, content) => {
    const row = `<div class='grid grid-cols-5 gap-2'>${content}</div>`;
    container.insertAdjacentHTML('beforeend', row);
}

// Function to add a monitor to the container
const addMonitor = (container, text) => {
    const t = text ?? '';
    const monitor = `<div id='monitor' class="bg-white border-4 border-blue-400 h-20 flex items-center col-span-5 text-blue-800 p-2 rounded-lg mb-2 font-bold text-4xl">${t}</div>`;
    container.insertAdjacentHTML('beforeend', monitor);
}

// Function to create a button element
const button = (text) => {
    const c = text === 'calculate' ? 'col-span-4' : '';
    return `<div class='bg-blue-400 hover:bg-blue-600 text-white ${c} py-1 rounded-md text-center text-lg font-bold cursor-pointer d-btn'>${text}</div>`;
}

// Function to add buttons to the container
const addButtons = (container, nums) => {
    const btnHTML = nums.map((n) => button(n)).join('');
    addRow(container, btnHTML);
}

// Function to handle button click event
const click = (event) => {
    const monitor = document.getElementById('monitor');
    const bac = monitor.innerText.trim();
    const a = event.target.innerText;
    console.log(a);
    if (a === 'clear') {
        monitor.innerText = '';
    } else if (a === 'calculate') {
        monitor.innerText = bac + '=' + eval(bac);
    } else {
        monitor.innerText += a;
    }
}

// Function to render the calculator view
const renderCalculator = () => {
    const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '+', '-', '*', '/', '**', 'calculate', 'clear'];
    app.innerHTML = '';
    addMonitor(app);
    addButtons(app, labels);
    const buttons = document.querySelectorAll('.d-btn');
    buttons.forEach((el) => el.addEventListener('click', click));

    // Add dark mode class to app
    app.classList.add('dark');
}

// Function to render the About view
const renderAbout = () => {
    app.innerHTML = '<div class="p-4 h-[200px] flex items-center justify-center">Temp for About</div>';
}

// Function to render the Contact view
const renderContact = () => {
    app.innerHTML = '<div class="p-4 h-[200px] flex items-center justify-center">Temp for Contact</div>';
}

// Function to render the menu
const renderMenu = () => {
    const menuItems = ['Calculator', 'About', 'Contact'];

    // Add menu items to the dropdown menu and top menu
    menuItems.forEach(item => {
        const button = `<button class="block py-1 px-2" onclick="setView('${item}')">${item}</button>`;
        ddMenu.insertAdjacentHTML('beforeend', button);
        topMenu.insertAdjacentHTML('beforeend', button);
    });
}

// Function to render the dark/light theme toggle buttons
const renderThemeToggle = () => {
    const darkButton = `<button class="dark:hidden block" onclick="toggle()">Dark</button>`;
    const lightButton = `<button class="hidden dark:block" onclick="toggle()">Light</button>`;

    const themeContainer = document.querySelector('#themeToggleContainer');
    themeContainer.innerHTML = `${darkButton}${lightButton}`;
}

// Initial render
renderMenu();
renderThemeToggle();
renderCalculator();
