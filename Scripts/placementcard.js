document.addEventListener("DOMContentLoaded", () => {
  const students = [
    { name: "Diksha Sobti", package: "₹10.89 LPA", image: "Images /diksha-sobti.png", logo: "Images /dhanguard.png" },
    { name: "Dikshant Sharma", package: "₹15.40 LPA", image: "Images /dikshant-sharma.png", logo: "Images /gmr.png" },
    { name: "Vaibhav Negi", package: "₹7.8 LPA", image: "Images /vaibhav-negi.png", logo: "Images /bny-mellon.png" }
  ];

  const studentImg = document.getElementById("studentImage");
  const nameEl = document.getElementById("studentName");
  const pkgEl = document.getElementById("studentPackage");
  const logoEl = document.getElementById("companyLogo");
  const dotsContainer = document.getElementById("dots");
  const bgShape = document.getElementById("bg-shape");

  let index = 0;
  let autoPlay;

 function render(i) {
  // Define colors for each student to make the background feel unique
  const themeColors = [
    "linear-gradient(to tr, #facc15, #fb923c)", // Yellow-Orange
    "linear-gradient(to tr, #3b82f6, #2dd4bf)", // Blue-Teal
    "linear-gradient(to tr, #f472b6, #fb923c)"  // Pink-Orange
  ];

  studentImg.style.opacity = "0";
  studentImg.style.transform = "scale(0.9) translateY(30px)";
  
  // Rotate and change color of the "Liquid" blob
  bgShape.style.transform = `translate(-50%, -50%) rotate(${i * 120}deg)`;
  bgShape.style.background = themeColors[i % themeColors.length];

  setTimeout(() => {
    studentImg.src = students[i].image;
    nameEl.textContent = students[i].name;
    pkgEl.textContent = students[i].package;
    logoEl.src = students[i].logo;

    studentImg.style.opacity = "1";
    studentImg.style.transform = "scale(1) translateY(0px)";
    updateDots(i);
  }, 400);
}
  function createDots() {
    dotsContainer.innerHTML = "";
    students.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "h-2.5 rounded-full transition-all duration-500 ease-in-out cursor-pointer border-none outline-none";
      dot.style.backgroundColor = i === 0 ? "#1e3a8a" : "#cbd5e1";
      dot.style.width = i === 0 ? "2.5rem" : "0.7rem";
      
      dot.onclick = () => {
        if(index === i) return;
        index = i;
        render(index);
        resetAutoPlay();
      };
      dotsContainer.appendChild(dot);
    });
  }

  function updateDots(activeIdx) {
    const dots = dotsContainer.children;
    for (let i = 0; i < dots.length; i++) {
      if (i === activeIdx) {
        dots[i].style.backgroundColor = "#2563eb"; // Brighter blue
        dots[i].style.width = "2.5rem";
      } else {
        dots[i].style.backgroundColor = "#cbd5e1";
        dots[i].style.width = "0.7rem";
      }
    }
  }

  function startAutoPlay() {
    autoPlay = setInterval(() => {
      index = (index + 1) % students.length;
      render(index);
    }, 5000);
  }

  function resetAutoPlay() {
    clearInterval(autoPlay);
    startAutoPlay();
  }

  createDots();
  render(0);
  startAutoPlay();
});