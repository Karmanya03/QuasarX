const btn = document.getElementById('menu-btn');
const overlay = document.getElementById('overlay');
const menu = document.getElementById('mobile-menu');
const counters = document.querySelectorAll('.counter');
let scrollStarted = false;

btn.addEventListener('click', navToggle);
document.addEventListener('scroll', scrollPage);

function navToggle() {
  btn.classList.toggle('open');
  overlay.classList.toggle('overlay-show');
  document.body.classList.toggle('stop-scrolling');
  menu.classList.toggle('show-menu');
}

function scrollPage() {
  const scrollPos = window.scrollY;

  if (scrollPos > 100 && !scrollStarted) {
    countUp();
    scrollStarted = true;
  } else if (scrollPos < 100 && scrollStarted) {
    reset();
    scrollStarted = false;
  }
}

function countUp() {
  counters.forEach((counter) => {
    counter.innerText = '0';

    const updateCounter = () => {
      // Get count target
      const target = +counter.getAttribute('data-target');
      // Get current counter value
      const c = +counter.innerText;

      // Create an increment
      const increment = target / 100;

      // If counter is less than target, add increment
      if (c < target) {
        // Round up and set counter value
        counter.innerText = `${Math.ceil(c + increment)}`;

        setTimeout(updateCounter, 75);
      } else {
        counter.innerText = target;
      }
    };

    updateCounter();
  });
}

function reset() {
  counters.forEach((counter) => (counter.innerHTML = '0'));
}



/*==================NASA API======================= */
async function fetchSpaceNews() {
  const apiKey = 'dR4bbzA5ImT4PIdcFvAre0ezrBrt3jn5Ox6UCLuc'; // Replace with your actual API key
  const apiUrl = 'https://newsapi.org/v2/top-headlines?category=science&apiKey=' + dR4bbzA5ImT4PIdcFvAre0ezrBrt3jn5Ox6UCLuc;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Handle the data and update your website
    updateNewsUI(data.articles);
  } catch (error) {
    console.error('Error fetching space news:', error);
  }
}

function updateNewsUI(articles) {
  // Update your website's UI with the latest news
  // You can create HTML elements dynamically and append them to the DOM
}


// Fetch space news every 15 minutes (adjust as needed)
setInterval(fetchSpaceNews, 900000); // 900,000 milliseconds = 15 minutes



/*=================*/
function updateNewsUI(articles) {
  const newsContainer = document.getElementById('news-container');

  // Clear existing content
  newsContainer.innerHTML = '';

  // Iterate through articles and create HTML elements
  articles.forEach(article => {
    const newsItem = document.createElement('div');
    newsItem.innerHTML = `
      <h3>${article.title}</h3>
      <p>${article.description}</p>
      <a href="${article.url}" target="_blank">Read more</a>
    `;

    // Append news item to the container
    newsContainer.appendChild(newsItem);
  });
}
