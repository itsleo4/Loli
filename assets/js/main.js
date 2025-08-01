// main.js
document.addEventListener('DOMContentLoaded', function() {
    const grid = document.querySelector('.video-grid');
    
    // Add a loading indicator while fetching the data
    grid.innerHTML = '<div class="loading" style="width:100%;text-align:center;padding:2rem;">Loading videos...</div>';

    // Fetch the video data from the JSON file
    fetch('videos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(videos => {
            // Clear the loading message
            grid.innerHTML = '';
            
            // Loop through each video in the array
            videos.forEach(video => {
                // Create a link element for the video card
                const card = document.createElement('a');
                card.href = `video.html?id=${video.id}`;
                card.className = 'video-card';
                card.setAttribute('aria-label', video.title);

                // Use the video data to populate the card's inner HTML
                card.innerHTML = `
                    <div class="video-thumb">
                        <img src="${video.thumbnail}" alt="${video.title}" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/400x225/2a2a2a/f0f0f0?text=No+Image'">
                        ${video.premium ? '<div class="premium-badge">PREMIUM</div>' : ''}
                    </div>
                    <div class="video-info">
                        <h3 class="video-title">${video.title}</h3>
                        <div class="video-meta">
                            <span>${video.duration}</span>
                            <span>${video.model}</span>
                        </div>
                    </div>
                `;

                // Append the created card to the video grid
                grid.appendChild(card);
            });
        })
        .catch(error => {
            console.error('There was a problem fetching the video data:', error);
            grid.innerHTML = '<div class="error" style="width:100%;text-align:center;padding:2rem;color:var(--primary)">Failed to load videos. Please try again later.</div>';
        });
});