document.addEventListener("DOMContentLoaded", () => {
  // Corrected paths (removed spaces in folder names for better browser compatibility)
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
    // 1. Transition Out
    studentImg.style.opacity = "0";
    studentImg.style.transform = "scale(0.95)";
    logoEl.style.opacity = "0";
    logoEl.style.transform = "scale(0.8)";
    
    // Background dynamic rotation
    bgShape.style.transform = `translate(-50%, -50%) rotate(${12 + (i * 20)}deg)`;

    setTimeout(() => {
      // 2. Data Update
      studentImg.src = students[i].image;
      nameEl.textContent = students[i].name;
      pkgEl.textContent = students[i].package;
      logoEl.src = students[i].logo;

      // 3. Transition In
      studentImg.style.opacity = "1";
      studentImg.style.transform = "scale(1)";
      logoEl.style.opacity = "1";
      logoEl.style.transform = "scale(1)";
      
      updateDots(i);
    }, 400);
  }

  function createDots() {
    dotsContainer.innerHTML = "";
    students.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "h-2.5 rounded-full transition-all duration-500 ease-in-out cursor-pointer";
      dot.style.backgroundColor = i === 0 ? "#1e3a8a" : "#cbd5e1";
      dot.style.width = i === 0 ? "2.5rem" : "0.7rem";
      
      dot.onclick = () => {
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
        dots[i].style.backgroundColor = "#1e3a8a";
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