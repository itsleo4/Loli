// main.js
document.addEventListener('DOMContentLoaded', function() {
    const grid = document.querySelector('.video-grid');
    grid.innerHTML = '<div style="padding:20px;text-align:center">Loading videos...</div>';

    fetch('videos.json')
        .then(response => response.json())
        .then(videos => {
            grid.innerHTML = '';
            videos.forEach(video => {
                const card = document.createElement('a');
                card.href = `video.html?id=${video.id}`;
                card.className = 'video-card';
                card.innerHTML = `
                    <div class="video-thumb">
                        <img src="${video.thumbnail}" alt="${video.title}" onerror="this.src='https://placehold.co/400x225/2a2a2a/fff?text=No+Thumbnail'">
                    </div>
                    <div class="video-info">
                        <h3 class="video-title">${video.title}</h3>
                        <div class="video-meta">
                            <span>${video.duration}</span>
                            <span>${video.model}</span>
                        </div>
                    </div>
                `;
                grid.appendChild(card);
            });
        })
        .catch(error => {
            grid.innerHTML = '<div style="padding:20px;text-align:center;color:var(--primary)">Failed to load videos</div>';
        });
});