document.addEventListener("DOMContentLoaded", () => {
    const highlightsData = [
        {
            id: "card-1",
            title: "Global Exposure Programs",
            image: "Images /global-program.png",
            text: "International collaborations, student exchange programs, and global internship opportunities to broaden your horizons and build an international career. Our partnerships span across universities in the USA, UK, and Europe, allowing students to experience diverse cultures and global academic standards firsthand while developing a truly professional network for their future success."
        },
        {
            id: "card-2",
            title: "Specialized Teaching from Experts",
            image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1000",
            text: "The academic rigor and the task of creative transformation of an individual are the center pieces of this program - both these targets are met by experts. Our faculty includes industry veterans and Ph.D. scholars who bring real-world case studies into the classroom, ensuring students learn practical applications of theory and stay ahead of the competition in today's rapidly evolving market."
        },
        {
            id: "card-3",
            title: "Top Internships and Placements",
            image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000",
            text: "We have held great pride in being one of the first few private Universities in India who took on the task of ensuring Top of the Line placements for our students. With recruiters like Amazon, Adobe, and Microsoft, our dedicated placement cell prepares students through mock interviews and soft-skill workshops from the very first year to ensure high success rates."
        }
    ];

    const container = document.getElementById('highlightsContainer');
    
    if (!container) return;

    function renderCards() {
        container.innerHTML = highlightsData.map((item, index) => `
            <div class="highlight-card bg-slate-900 rounded-[2rem] overflow-hidden flex flex-col animate__animated animate__fadeInUp" style="animation-delay: ${index * 0.2}s">
                
                <div class="img-zoom-container">
                    <img src="${item.image}" alt="${item.title}" class="highlight-img" onerror="this.src='https://via.placeholder.com/400x250?text=Graphic+Era'">
                    <div class="img-overlay"></div>
                    <div class="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                        Feature 0${index + 1}
                    </div>
                </div>
                
                <div class="p-8 flex-grow flex flex-col">
                    <h3 class="text-2xl font-bold text-white mb-4 leading-tight">${item.title}</h3>
                    
                    <p id="desc-${item.id}" class="description-text clamped text-slate-400 text-sm leading-relaxed mb-6">
                        ${item.text}
                    </p>

                    <div class="mt-auto">
                        <button onclick="toggleHighlight('${item.id}')" class="read-more-btn group text-yellow-400 font-bold text-sm flex items-center gap-2 transition-all">
                            <span id="label-${item.id}">READ MORE</span>
                            <svg id="icon-${item.id}" class="arrow-icon w-4 h-4 transform transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    window.toggleHighlight = (id) => {
        const textElement = document.getElementById(`desc-${id}`);
        const label = document.getElementById(`label-${id}`);
        const icon = document.getElementById(`icon-${id}`);

        if (textElement.classList.contains('clamped')) {
            textElement.classList.remove('clamped');
            label.innerText = 'READ LESS';
            icon.style.transform = 'rotate(-180deg)';
            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>';
        } else {
            textElement.classList.add('clamped');
            label.innerText = 'READ MORE';
            icon.style.transform = 'rotate(0deg)';
            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>';
        }
    };

    renderCards();
});