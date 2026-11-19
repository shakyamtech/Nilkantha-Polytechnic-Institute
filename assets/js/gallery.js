/**
 * Nilkantha Polytechnic Institute (NPI), Dhading
 * Interactive Lightbox Gallery
 */

const galleryItems = [
  {
    id: 1,
    title_ne: "शिक्षालयको मुख्य भवन तथा हराभरा क्याम्पस परिसर (खानीगाउँ, धादिङ)",
    title_en: "Main Institute Campus & Green Foothills in Khanigaun, Dhading",
    category: "campus",
    categoryName_ne: "क्याम्पस परिसर",
    src: "assets/images/hero-campus.jpg"
  },
  {
    id: 2,
    title_ne: "सिभिल इन्जिनियरिङ विद्यार्थीहरूको सर्भेइङ तथा टोटल स्टेसन अभ्यास",
    title_en: "Civil Engineering Students Surveying & Total Station Field Practice",
    category: "labs",
    categoryName_ne: "प्रयोगात्मक ल्याब",
    src: "assets/images/ha-lab.jpg"
  },
  {
    id: 3,
    title_ne: "अत्याधुनिक सामग्री परीक्षण तथा कंक्रीट टेक्नोलोजी ल्याब",
    title_en: "Civil Material Testing & Concrete Technology Laboratory",
    category: "labs",
    categoryName_ne: "प्रयोगात्मक ल्याब",
    src: "assets/images/pharmacy-lab.jpg"
  },
  {
    id: 4,
    title_ne: "जलविद्युत आयोजना स्थल तथा पूर्वाधार निर्माण फिल्ड अध्ययन क्याम्प",
    title_en: "Hydropower Project & Infrastructure Construction Field Study Camp",
    category: "community",
    categoryName_ne: "सामुदायिक सेवा & फिल्ड",
    src: "assets/images/community-camp.jpg"
  },
  {
    id: 5,
    title_ne: "समृद्ध इन्जिनियरिङ पुस्तकालय तथा डिजिटल ई-लर्निङ अध्ययन कक्ष",
    title_en: "Well-equipped Central Engineering & Digital E-Library Hall",
    category: "campus",
    categoryName_ne: "क्याम्पस परिसर",
    src: "assets/images/library.jpg"
  },
  {
    id: 6,
    title_ne: "वार्षिक प्राविधिक प्रदर्शनी तथा खेलकुद प्रतियोगिता २०८१",
    title_en: "Annual Technical Exhibition & Sports Festival 2081",
    category: "events",
    categoryName_ne: "कार्यक्रम & खेलकुद",
    src: "assets/images/cultural-event.jpg"
  }
];

let currentGalleryCategory = 'all';
let currentLightboxIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  initGalleryHub();
});

function initGalleryHub() {
  renderGalleryGrid();

  const filterTabs = document.querySelectorAll('.gallery-filter-btn');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentGalleryCategory = tab.getAttribute('data-filter') || 'all';
      renderGalleryGrid();
    });
  });

  initLightboxControls();
}

function renderGalleryGrid() {
  const container = document.getElementById('galleryGridContainer');
  if (!container) return;

  const isEn = (typeof currentLang !== 'undefined' && currentLang === 'en');

  const filtered = galleryItems.filter(item => {
    return (currentGalleryCategory === 'all') || (item.category === currentGalleryCategory);
  });

  container.innerHTML = filtered.map((item, idx) => {
    const title = isEn ? item.title_en : item.title_ne;
    return `
      <div class="gallery-card" onclick="openLightbox(${item.id})">
        <img src="${item.src}" alt="${title}" class="gallery-thumb" loading="lazy" />
        <div class="gallery-overlay">
          <span class="gallery-cat-pill">${item.categoryName_ne}</span>
          <h4 class="gallery-item-title">${title}</h4>
          <span class="gallery-zoom-icon"><i class="fa-solid fa-expand"></i></span>
        </div>
      </div>
    `;
  }).join('');
}

function openLightbox(itemId) {
  const itemIndex = galleryItems.findIndex(i => i.id === itemId);
  if (itemIndex === -1) return;

  currentLightboxIndex = itemIndex;
  updateLightboxContent();

  const modal = document.getElementById('galleryLightboxModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function updateLightboxContent() {
  const item = galleryItems[currentLightboxIndex];
  if (!item) return;

  const isEn = (typeof currentLang !== 'undefined' && currentLang === 'en');
  const imgEl = document.getElementById('lightboxImage');
  const captionEl = document.getElementById('lightboxCaption');
  const counterEl = document.getElementById('lightboxCounter');

  if (imgEl) imgEl.src = item.src;
  if (captionEl) captionEl.textContent = isEn ? item.title_en : item.title_ne;
  if (counterEl) counterEl.textContent = `${currentLightboxIndex + 1} / ${galleryItems.length}`;
}

function initLightboxControls() {
  document.getElementById('lightboxPrevBtn')?.addEventListener('click', () => {
    currentLightboxIndex = (currentLightboxIndex - 1 + galleryItems.length) % galleryItems.length;
    updateLightboxContent();
  });

  document.getElementById('lightboxNextBtn')?.addEventListener('click', () => {
    currentLightboxIndex = (currentLightboxIndex + 1) % galleryItems.length;
    updateLightboxContent();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('galleryLightboxModal');
    if (!modal || !modal.classList.contains('active')) return;

    if (e.key === 'ArrowLeft') {
      currentLightboxIndex = (currentLightboxIndex - 1 + galleryItems.length) % galleryItems.length;
      updateLightboxContent();
    } else if (e.key === 'ArrowRight') {
      currentLightboxIndex = (currentLightboxIndex + 1) % galleryItems.length;
      updateLightboxContent();
    } else if (e.key === 'Escape') {
      closeModal('galleryLightboxModal');
    }
  });
}
