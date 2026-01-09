document.addEventListener("DOMContentLoaded", () => {
  const allPrograms = [
    // --- ENGINEERING & TECH ---
    { title: "B.Tech CSE", level: "UG", campuses: ["Dehradun", "Bhimtal", "Haldwani"], intro: "Full-stack development, AI, and Cloud.", bullets: ["Data Structures", "Cloud Computing", "Web Tech"], about: "Flagship program producing elite software architects. Covers OS, Database, and High-level coding.", eligibility: "10+2 with Physics/Maths" },
    { title: "B.Tech AI & ML", level: "UG", campuses: ["Dehradun"], intro: "The future of intelligent automation.", bullets: ["Neural Networks", "Python AI", "NLP"], about: "Explore algorithms that allow machines to simulate human intelligence. Build chatbots and predictive engines.", eligibility: "10+2 with PCM" },
    { title: "B.Tech Cyber Security", level: "UG", campuses: ["Dehradun", "Bhimtal"], intro: "Protect the digital world from threats.", bullets: ["Ethical Hacking", "Cryptography", "Network Security"], about: "Train as a digital defender. Learn ethical hacking to patch system vulnerabilities and secure networks.", eligibility: "10+2 with PCM" },
    { title: "B.Tech Data Science", level: "UG", campuses: ["Dehradun"], intro: "Turning big data into big insights.", bullets: ["Big Data Analytics", "Statistics", "Tableau"], about: "Master the art of data interpretation. Use machine learning to solve complex business problems.", eligibility: "10+2 with PCM" },
    
    // --- MANAGEMENT ---
    { title: "MBA Finance", level: "PG", campuses: ["Dehradun", "Bhimtal"], intro: "Master financial markets and strategy.", bullets: ["Investment Banking", "Stock Market", "Taxation"], about: "Theoretical knowledge mixed with practical financial modeling for global certifications.", eligibility: "Graduation (Min 50%)" },
    { title: "MBA HR", level: "PG", campuses: ["Dehradun"], intro: "Lead people and organization effectively.", bullets: ["Talent Acquisition", "Employee Wellness", "Industrial Law"], about: "Focus on HR analytics and strategic talent management. Develops high-EQ corporate leaders.", eligibility: "Any Graduate" },
    { title: "BBA Professional", level: "UG", campuses: ["Dehradun", "Haldwani"], intro: "Foundation for future business leaders.", bullets: ["Business Ethics", "Marketing", "Economics"], about: "A comprehensive business degree focusing on entrepreneurship and management principles.", eligibility: "10+2 Any Stream" },
    
    // --- COMPUTER APPLICATIONS ---
    { title: "BCA Cloud Computing", level: "UG", campuses: ["Dehradun", "Haldwani"], intro: "Infrastructure for the digital age.", bullets: ["AWS/Azure", "Virtualization", "DevOps"], about: "Learn to architect and scale applications on major cloud platforms like AWS and Azure.", eligibility: "10+2 with Maths" },
    { title: "MCA (General)", level: "PG", campuses: ["Dehradun", "Haldwani"], intro: "Advanced masters in computer apps.", bullets: ["Software Eng.", "Advanced Java", "Mobile App Dev"], about: "Deep dive into software development lifecycles and advanced database management systems.", eligibility: "BCA/B.Sc IT" },
    
    // --- MEDICAL & HEALTH ---
    { title: "B.Pharma", level: "UG", campuses: ["Bhimtal"], intro: "Science behind medicine and drugs.", bullets: ["Pharmaceutics", "Pharmacology", "Medicinal Chemistry"], about: "Become a licensed pharmacist. Learn drug manufacturing, testing, and distribution.", eligibility: "10+2 with PCB/PCM" },
    { title: "B.Sc Nursing", level: "UG", campuses: ["Dehradun"], intro: "Noble profession of healthcare.", bullets: ["Anatomy", "Patient Care", "Medical Ethics"], about: "Professional training for healthcare environments. Focus on clinical skills and patient wellness.", eligibility: "10+2 with PCB" },
    
    // --- LAW & HUMANITIES ---
    { title: "BA LLB (Integrated)", level: "UG", campuses: ["Dehradun"], intro: "5-year combined law program.", bullets: ["Corporate Law", "Criminal Law", "Moot Court"], about: "Integrates arts with legal education. Includes internships under senior advocates and law firms.", eligibility: "10+2 Any Stream (45%)" },
    { title: "B.Com Honors", level: "UG", campuses: ["Haldwani", "Dehradun"], intro: "Expertise in accounting and trade.", bullets: ["Audit", "Corporate Accounting", "GST"], about: "Prepares students for CA/CS exams with a strong foundation in commerce and accounting.", eligibility: "10+2 Any Stream" },
    
    // --- DIPLOMA ---
    { title: "Diploma in CS", level: "Diploma", campuses: ["Haldwani", "Bhimtal"], intro: "Fast-track into the IT world.", bullets: ["Basic Programming", "Hardware Basics", "IT Tools"], about: "Practical hardware and software troubleshooting skills essential for IT support roles.", eligibility: "10th Pass" },
    { title: "Diploma in ME", level: "Diploma", campuses: ["Haldwani"], intro: "Mechanical engineering fundamentals.", bullets: ["Workshop Tech", "AutoCAD", "Thermal Eng."], about: "Hands-on training in machine operations, production planning, and mechanical design.", eligibility: "10th Pass" }
  ];

  const wrapper = document.getElementById("scrollWrapper");
  const track = document.getElementById("scrollTrack");
  const campusDropdown = document.getElementById("campusFilterDropdown");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const searchInput = document.getElementById("searchInput");
  const clearBtn = document.getElementById("clearSearchBtn");

  let currentCategory = "all";
  let currentCampus = "all";
  let scrollIndex = 0;
  let autoScrollTimer = null;
  let isInteracting = false;
  const CARD_WIDTH = 372; 

  function startAutoScroll() {
    stopAutoScroll();
    autoScrollTimer = setInterval(() => {
      if (isInteracting) return;
      scrollIndex++;
      const dataLength = track.children.length / 2;
      
      track.style.transition = "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
      track.style.transform = `translateX(-${scrollIndex * CARD_WIDTH}px)`;

      if (scrollIndex >= dataLength) {
        setTimeout(() => {
          track.style.transition = "none";
          scrollIndex = 0;
          track.style.transform = "translateX(0)";
        }, 800);
      }
    }, 3000);
  }

  function stopAutoScroll() { clearInterval(autoScrollTimer); }

  wrapper.addEventListener("mouseenter", () => isInteracting = true);
  wrapper.addEventListener("mouseleave", () => {
    isInteracting = false;
    if (!searchInput.value && currentCategory === "all" && currentCampus === "all") startAutoScroll();
  });

  function attachHandlers() {
    document.querySelectorAll(".read-more-btn").forEach(btn => {
      btn.onclick = () => {
        const content = btn.previousElementSibling;
        const isExpanded = content.classList.contains("expanded");
        isInteracting = !isExpanded; 

        document.querySelectorAll(".course-content").forEach(c => {
          c.classList.remove("expanded");
          c.nextElementSibling.textContent = "READ DETAILS ▼";
        });

        if (!isExpanded) {
          content.classList.add("expanded");
          btn.textContent = "CLOSE DETAILS ▲";
        }
      };
    });

    document.querySelectorAll(".apply-btn").forEach(btn => {
      btn.onclick = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); };
    });
  }

  function updateGallery() {
    const query = searchInput.value.toLowerCase().trim();
    const filtered = allPrograms.filter(p => {
      const matchesSearch = !query || `${p.title} ${p.about}`.toLowerCase().includes(query);
      const matchesCategory = currentCategory === "all" || p.level === currentCategory;
      const matchesCampus = currentCampus === "all" || p.campuses.includes(currentCampus);
      return matchesSearch && matchesCategory && matchesCampus;
    });
    renderCards(filtered, !query && currentCategory === "all" && currentCampus === "all");
  }

  function renderCards(data, loop = false) {
    track.innerHTML = "";
    scrollIndex = 0;
    track.style.transform = "translateX(0)";
    const list = loop ? [...data, ...data] : data;

    if (list.length === 0) {
        track.innerHTML = `<div class="col-span-full py-20 text-center text-gray-400 font-medium w-full">No programs found for these filters.</div>`;
        stopAutoScroll();
        return;
    }

    list.forEach((p) => {
      const card = document.createElement("div");
      card.className = "program-card bg-white rounded-2xl p-6 flex flex-col border border-gray-100 h-fit w-[340px] shadow-sm";
      card.innerHTML = `
        <div class="flex justify-between items-start mb-2">
          <h3 class="text-xl font-bold text-blue-900">${p.title}</h3>
          <span class="text-[10px] px-2 py-1 bg-blue-50 text-blue-600 font-bold rounded uppercase">${p.level}</span>
        </div>
        <div class="flex flex-wrap gap-1 mb-3">
          ${p.campuses.map(c => `<span class="text-[9px] bg-gray-50 text-gray-400 px-2 py-0.5 rounded border border-gray-100">${c}</span>`).join("")}
        </div>
        <p class="text-sm text-gray-500 mb-4 font-medium">${p.intro}</p>
        <div class="space-y-2 text-gray-600 text-sm">${p.bullets.map(b => `<div>• ${b}</div>`).join("")}</div>
        <div class="border-t border-gray-50 my-4"></div>
        <div class="course-content space-y-3">
          <p class="text-[13px] text-gray-700 leading-relaxed">${p.about}</p>
          <div class="bg-blue-50 p-3 rounded text-[11px] font-medium"><span class="text-blue-800 font-bold">ELIGIBILITY:</span> ${p.eligibility}</div>
          <button class="apply-btn w-full py-3 rounded-xl text-white text-xs font-bold bg-gradient-to-r from-blue-600 to-yellow-400 shadow-md">Apply Now</button>
        </div>
        <button class="mt-4 text-blue-600 text-[11px] font-bold self-start read-more-btn">READ DETAILS ▼</button>
      `;
      track.appendChild(card);
    });

    attachHandlers();
    if (loop) startAutoScroll(); else stopAutoScroll();
  }

  function populateCampusDropdown() {
    let camps = new Set();
    allPrograms.forEach(p => {
      if (currentCategory === "all" || p.level === currentCategory) {
        p.campuses.forEach(c => camps.add(c));
      }
    });
    campusDropdown.innerHTML = `<option value="all">All Campuses</option>`;
    camps.forEach(c => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.textContent = `GEHU ${c}`;
      campusDropdown.appendChild(opt);
    });
    campusDropdown.value = Array.from(camps).includes(currentCampus) ? currentCampus : "all";
  }

  campusDropdown.onchange = (e) => { currentCampus = e.target.value; updateGallery(); };

  filterBtns.forEach(btn => {
    btn.onclick = () => {
      filterBtns.forEach(b => {
        b.classList.remove("active", "text-white", "border-transparent");
        b.classList.add("text-gray-600", "border-gray-200");
      });
      btn.classList.add("active", "text-white", "border-transparent");
      btn.classList.remove("text-gray-600", "border-gray-200");
      currentCategory = btn.dataset.category;
      populateCampusDropdown();
      updateGallery();
    };
  });

  clearBtn.onclick = () => {
    searchInput.value = "";
    currentCategory = "all"; currentCampus = "all";
    filterBtns.forEach(b => {
      b.classList.remove("active", "text-white", "border-transparent");
      b.classList.add("text-gray-600", "border-gray-200");
      if(b.dataset.category === "all") b.classList.add("active");
    });
    populateCampusDropdown(); updateGallery();
  }

  searchInput.oninput = updateGallery;
  populateCampusDropdown();
  updateGallery();
});