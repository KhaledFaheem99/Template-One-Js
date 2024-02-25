// color local storage
let mainColor = localStorage.getItem("color-option");
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);

  document.querySelectorAll(".colors-list li").forEach((li) => {
    li.classList.remove("active");

    if (li.dataset.color === mainColor) {
      li.classList.add("active");
    }
  });
}

// setting box
document.querySelector(".holder-icon .setting-icon").onclick = function () {
  this.classList.toggle("fa-spin");

  document.querySelector(".setting-box").classList.toggle("open");
};
// setting box options color
let allLis = document.querySelectorAll(".colors-list li");

allLis.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("color-option", e.target.dataset.color);
    handleActive(e);
  });
});

// setting box options backgroundImage
const randomBackImage = document.querySelectorAll(".holder-spans span");
let backgroundOption = true;
let backgroundInterval;
// check local storage
let localSotrageBackground = localStorage.getItem("background-option");
if (localSotrageBackground !== null) {
  document.querySelectorAll(".holder-spans span").forEach((span) => {
    span.classList.remove("active");
  });
  if (localSotrageBackground === `true`) {
    backgroundOption = true;
    document.querySelector(".holder-spans .yes").classList.add("active");
  } else {
    backgroundOption = false;
    document.querySelector(".holder-spans .no").classList.add("active");
  }
}
randomBackImage.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);
    if (e.target.dataset.background === "yes") {
      randomizImg();
      localStorage.setItem("background-option", true);
    } else {
      clearInterval(backgroundInterval);
      localStorage.setItem("background-option", false);
    }
  });
});
// change background-Image landing
let landingPage = document.querySelector(".landing-page");
let imgsArray = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"];
function randomizImg() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
      landingPage.style.backgroundImage =
        `url("/Imgs/` + imgsArray[randomNumber] + `")`;
      landingPage.style.transition = "1s";
    }, 5000);
  }
}
randomizImg();
// li links header
let links = document.querySelectorAll(".links li a");
let linksLocalStorage = localStorage.getItem("links");

if (linksLocalStorage !== null) {
  links.forEach((link) => {
    if (link.dataset.link === linksLocalStorage) {
      link.classList.add("active");
    } else link.classList.remove("active");
  });
}
links.forEach((a) => {
  a.addEventListener("click", (e) => {
    // remove active class
    links.forEach((link) => {
      link.classList.remove("active");
    });

    e.target.classList.add("active");
    localStorage.setItem("links", e.target.dataset.link);
  });
});

// our skills section
let skills = document.querySelector(".skills");
let span = document.querySelector(".up");

window.onscroll = function () {
  let skillsOffsetTop = skills.offsetTop;

  let skillsOffsetHeight = skills.offsetHeight;

  let windowHeight = this.innerHeight;

  let windowScrollTop = this.scrollY;

  let allSpans = document.querySelectorAll(".our-skills .skills-progress span");

  this.scrollY >= 1000
    ? span.classList.add("show")
    : span.classList.remove("show");
  span.onclick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  if (windowScrollTop > skillsOffsetTop + skillsOffsetHeight - windowHeight) {
    allSpans.forEach((span) => {
      span.style.width = span.dataset.progress;
      span.classList.add("active");
      if (span.classList.contains("active")) {
        span.style.opacity = "1";
      }
    });
  } else {
    allSpans.forEach((span) => {
      span.style.width = "0%";
      if (span.classList.contains("active")) {
        span.style.opacity = "0";
      }
    });
  }
};
// gallary popup

let ourGallary = document.querySelectorAll(".images-box img");

ourGallary.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overLay = document.createElement("div");
    overLay.className = "popup-overlay";
    document.body.appendChild(overLay);

    let popupBox = document.createElement("div");
    let caption = document.createElement("h2");
    caption.className = "caption-photo";
    let captionText = document.createTextNode(img.alt);
    caption.appendChild(captionText);
    popupBox.className = "popup-box";
    let popupImage = document.createElement("img");
    popupImage.src = img.src;
    popupBox.appendChild(caption);
    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);

    let closeButton = document.createElement("span");
    let closeButtonText = document.createTextNode("X");
    closeButton.appendChild(closeButtonText);
    closeButton.className = "close-button";
    popupBox.appendChild(closeButton);
    document.addEventListener("click", (e) => {
      if (e.target.className == "close-button") {
        e.target.parentElement.remove();
        overLay.remove();
        // document.querySelector(".popup-overlay").remove();
      }
    });
  });
});

// star icons

let icons = document.querySelectorAll(".star-icons i");

icons.forEach((i) => {
  i.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-regular")) {
      e.target.classList.remove("fa-regular");
      e.target.classList.add("fa-solid");
    } else {
      e.target.classList.remove("fa-solid");
      e.target.classList.add("fa-regular");
    }
  });
});

// Navigation Bullets

let bullets = document.querySelectorAll(".nav-bullets .bullets");
let link = document.querySelectorAll(".links a");

function scrollInToSection(ele) {
  ele.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: `smooth`,
      });
    });
  });
}

scrollInToSection(bullets);
scrollInToSection(link);

function handleActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((ele) => {
    ele.classList.remove("active");
  });
  ev.target.classList.add("active");
}

// Bullets localStorage

let bulletsSpan = document.querySelectorAll(".bullets-options span");

let navBullets = document.querySelector(".nav-bullets");

let bulletsLocal = localStorage.getItem("bullets-option");

if (bulletsLocal !== null) {
  if (bulletsLocal === "block") {
    navBullets.style.display = "block";
    document.querySelector(".bullets-options .yes").classList.add("active");
  } else {
    navBullets.style.display = "none";
    document.querySelector(".bullets-options .no").classList.add("active");
  }
}

bulletsSpan.forEach((e) => {
  e.addEventListener("click", (e) => {
    if (e.target.dataset.display === "show") {
      navBullets.style.display = "block";
      localStorage.setItem("bullets-option", "block");
    } else {
      navBullets.style.display = "none";
      localStorage.setItem("bullets-option", "none");
    }
  });
});

// reset button
document.querySelector(".reset-button").onclick = () => {
  localStorage.removeItem("color-option");
  localStorage.removeItem("background-option");
  localStorage.removeItem("bullets-option");
  window.location.reload();
};

// toggle menu
let toggleMenu = document.querySelector(".toggle-menu");
let ulToggle = document.querySelector(".links-container ul");
toggleMenu.onclick = (e) => {
  e.stopPropagation();

  toggleMenu.classList.toggle("menu-active");
  ulToggle.classList.toggle("open");
};

// click anywhere outside menu to close menu

document.addEventListener("click", (e) => {
  if (e.target !== toggleMenu && e.target !== ulToggle) {
    if (ulToggle.classList.contains("open")) {
      ulToggle.classList.toggle("open");
      toggleMenu.classList.toggle("menu-active");
    }
  }
});

// stopPropagation in menu
ulToggle.onclick = (e) => {
  e.stopPropagation();
};
