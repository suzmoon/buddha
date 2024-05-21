document.addEventListener('DOMContentLoaded', () => {
    const greeting = document.getElementById('greeting');
    const fontButton = document.getElementById('fontButton');
    const slides = document.querySelectorAll('.slide');
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');
    const quoteButton = document.getElementById('newQuote');
    const quoteDisplay = document.getElementById('quote');
    const timerDisplay = document.getElementById('timer');
    const weatherDisplay = document.getElementById('weather');
    const mapContainer = document.getElementById('map');
    const infoModal = document.getElementById('infoModal');
    const infoButton = document.getElementById('infoButton');
    const closeModal = document.getElementById('closeModal');
    const fontSizeSlider = document.getElementById('fontSizeSlider');
    const toggleModeButton = document.getElementById('toggleMode');
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const feedbackForm = document.getElementById('feedbackForm');
    const gameContainer = document.getElementById('game');
    let currentSlide = 0;
    let quotes = [
      "The mind is everything. What you think you become.",
      "What we think, we become.",
      "Peace comes from within. Do not seek it without.",
      "The only real failure in life is not to be true to the best one knows.",
      "Health is the greatest gift, contentment the greatest wealth, faithfulness the best relationship."
    ];
  
    // Change Font Style on Click
    fontButton.addEventListener('click', () => {
      greeting.style.fontFamily = greeting.style.fontFamily === 'Georgia' ? 'Arial' : 'Georgia';
    });
  
    // Image Slider
    prev.addEventListener('click', () => {
      slides[currentSlide].style.display = 'none';
      currentSlide = (currentSlide > 0) ? currentSlide - 1 : slides.length - 1;
      slides[currentSlide].style.display = 'block';
    });
  
    next.addEventListener('click', () => {
      slides[currentSlide].style.display = 'none';
      currentSlide = (currentSlide < slides.length - 1) ? currentSlide + 1 : 0;
      slides[currentSlide].style.display = 'block';
    });
  
    // Interactive Quote Generator
    quoteButton.addEventListener('click', () => {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      quoteDisplay.textContent = randomQuote;
    });
  
    // Countdown Timer to an Event
    const countdownDate = new Date('May 23, 2025 00:00:00').getTime();
    const countdownInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;
  
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      timerDisplay.textContent = days;
  
      if (distance < 0) {
        clearInterval(countdownInterval);
        timerDisplay.textContent = 'Event has passed';
      }
    }, 1000);
  
    // Weather Widget using an API
    fetch('https://api.openweathermap.org/data/2.5/weather?q=Kathmandu&appid=YOUR_WEATHER_API_KEY')
      .then(response => response.json())
      .then(data => {
        const temp = (data.main.temp - 273.15).toFixed(1); // Convert from Kelvin to Celsius
        weatherDisplay.textContent = `${data.weather[0].description}, ${temp}°C`;
      })
      .catch(error => console.error('Error fetching weather data:', error));
  
    // Interactive Map Showing Locations Relevant to Buddhism
    function initMap() {
      const map = new google.maps.Map(mapContainer, {
        center: { lat: 27.7172, lng: 85.3240 },
        zoom: 5
      });
  
      const locations = [
        { lat: 27.7172, lng: 85.3240, title: 'Kathmandu, Nepal' },
        { lat: 27.712, lng: 85.312, title: 'Swayambhunath, Kathmandu' },
        { lat: 25.771, lng: 85.097, title: 'Bodh Gaya, India' },
      ];
  
      locations.forEach(location => {
        new google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map,
          title: location.title
        });
      });
    }
  
    // Modal Popup for Detailed Information
    infoButton.addEventListener('click', () => {
      infoModal.style.display = 'block';
    });
  
    closeModal.addEventListener('click', () => {
      infoModal.style.display = 'none';
    });
  
    window.addEventListener('click', (event) => {
      if (event.target == infoModal) {
        infoModal.style.display = 'none';
      }
    });
  
    // Dynamic Font Size Adjustment Slider
    fontSizeSlider.addEventListener('input', () => {
      greeting.style.fontSize = `${fontSizeSlider.value}px`;
    });
  
    // Toggle Between Day and Night Modes
    toggleModeButton.addEventListener('click', () => {
      document.body.classList.toggle('night-mode');
    });
  
    // Use Canvas for Drawing or Animation
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.arc(200, 200, 50, 0, Math.PI * 2, false);
      ctx.fillStyle = 'orange';
      ctx.fill();
      ctx.stroke();
    }
  
    draw();
  
    // Implement a Simple Game Related to the Theme
    function createFallingObject() {
      const fallingObject = document.createElement('div');
      fallingObject.classList.add('falling-object');
      fallingObject.style.left = `${Math.random() * 90}%`;
      gameContainer.appendChild(fallingObject);
  
      setTimeout(() => {
        gameContainer.removeChild(fallingObject);
      }, 5000);
    }
  
    setInterval(createFallingObject, 1000);
  
    gameContainer.addEventListener('click', (event) => {
      if (event.target.classList.contains('falling-object')) {
        gameContainer.removeChild(event.target);
      }
    });
  
    // Form Validation for a User Feedback Section
    feedbackForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const name = document.getElementById('name').value;
      const feedback = document.getElementById('feedback').value;
  
      if (name && feedback) {
        alert('Thank you for your feedback!');
        feedbackForm.reset();
      } else {
        alert('Please fill out all fields.');
      }
    });
  
    // Implement Drag-and-Drop Feature
    const draggables = document.querySelectorAll('.draggable');
    const dropzone = document.getElementById('dropzone');
  
    draggables.forEach(draggable => {
      draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
      });
  
      draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
      });
    });
  
    dropzone.addEventListener('dragover', (event) => {
      event.preventDefault();
      const dragging = document.querySelector('.dragging');
      dropzone.appendChild(dragging);
    });
  });
  