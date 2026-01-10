<script>
  let previewTimer;

  document.querySelectorAll('.video-card').forEach(card => {
    const videoId = card.dataset.video;
    const iframe = card.querySelector('.preview');
    const thumb = card.querySelector('.thumb');
    const playBtn = card.querySelector('.play-btn');

    card.addEventListener('mouseenter', () => {
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&rel=0`;
      iframe.classList.remove('hidden');
      thumb.classList.add('hidden');
      playBtn.classList.add('hidden');

      previewTimer = setTimeout(() => stopPreview(card), 20000);
    });

    card.addEventListener('mouseleave', () => stopPreview(card));
    card.addEventListener('click', () => openModal(videoId));
  });

  function stopPreview(card) {
    const iframe = card.querySelector('.preview');
    const thumb = card.querySelector('.thumb');
    const playBtn = card.querySelector('.play-btn');

    clearTimeout(previewTimer);
    iframe.src = '';
    iframe.classList.add('hidden');
    thumb.classList.remove('hidden');
    playBtn.classList.remove('hidden');
  }

  function openModal(videoId) {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('modalIframe');

    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  function closeModal() {
    const modal = document.getElementById('videoModal');
    const iframe = document.getElementById('modalIframe');

    iframe.src = '';
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
</script>
