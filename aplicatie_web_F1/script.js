document.addEventListener("DOMContentLoaded", function() {

  var logo = document.querySelector(".logo");


  function handleLogoClick() {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  logo.addEventListener("click", handleLogoClick);

  var links = document.querySelectorAll('a[href^="#"]');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function (event) {
      event.preventDefault();
      var targetId = this.getAttribute("href").slice(1);
      var targetElement = document.getElementById(targetId);
      var navElement = document.querySelector('nav');

      if (targetElement && navElement) {
        var targetStyles = getComputedStyle(targetElement);
        var targetOffset = targetElement.getBoundingClientRect().top + window.pageYOffset;
        var navHeight = navElement.offsetHeight;
        var offset = targetOffset - parseInt(targetStyles.paddingTop) - navHeight + 35;

        window.scrollTo({
          top: offset,
          behavior: "smooth"
        });
      }
    });
  }

  document.getElementById('randomizeButton').addEventListener('click', randomizeImages);

  function randomizeImages() {
    const gallery = document.querySelector('.galerie');
    const images = Array.from(gallery.querySelectorAll('.galerie-img'));

    const randomizedImages = shuffleArray(images);

    gallery.innerHTML = '';

    randomizedImages.forEach(image => {
      gallery.appendChild(image);
    });
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const galleryImages = document.querySelectorAll('.galerie-img');

  galleryImages.forEach(image => {
    image.addEventListener('mouseenter', () => {
      galleryImages.forEach(img => img.classList.add('dim'));
      image.classList.remove('dim');
    });

    image.addEventListener('mouseleave', () => {
      galleryImages.forEach(img => img.classList.remove('dim'));
    });
  });

  const animatedTexts = document.querySelectorAll('.titlul-secundar');

  animatedTexts.forEach((animatedText) => {
    animatedText.addEventListener('mouseover', () => {
      animatedText.classList.add('move-right');
    });

    animatedText.addEventListener('animationend', () => {
      animatedText.classList.remove('move-right');
    });
  });

  var intervalElement = document.getElementById('interval');
  var originalText = intervalElement.textContent;
  var dots = "";
  var counter = 0;

  setInterval(function () {
    dots += "!";
    var newText = originalText + dots;
    intervalElement.textContent = newText;

    counter++;
    if (counter === 3) {
      dots = "";
      counter = 0;
    }
  }, 500);

  var newsletterForm = document.getElementById("newsletterForm");

  newsletterForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var nameInput = document.getElementById("name");
    var emailInput = document.getElementById("email");
    var phoneInput = document.getElementById("phone");

    var name = nameInput.value.trim();
    var email = emailInput.value.trim();
    var phone = phoneInput.value.trim();

    
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var phoneRegex = /^\d{10}$/;

    if (!emailRegex.test(email)) {
      alert("Vă rugăm să introduceți o adresă de email validă.");
      return;
    }

    if (!phoneRegex.test(phone)) {
      alert("Vă rugăm să introduceți un număr de telefon valid (10 cifre).");
      return;
    }


    var subscriber = {
      name: name,
      email: email,
      phone: phone
    };

    var subscribers = JSON.parse(localStorage.getItem("subscribers")) || [];
    subscribers.push(subscriber);
    localStorage.setItem("subscribers", JSON.stringify(subscribers));

    
    nameInput.value = "";
    emailInput.value = "";
    phoneInput.value = "";

    alert("Felicitări! V-ați abonat cu succes!");
  });

  function changeColor() {
    var textElement = document.getElementById("rTxt");
    var randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    textElement.style.color = randomColor;
  }
  
  setInterval(changeColor, 1000);
  

});