// ============================================================
// InstaScraping — Main Application Logic
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

// ── State ──
let currentResults = null;

// ── Init ──
function initApp() {
    const form = document.getElementById('scrapeForm');
    if (form) {
        form.addEventListener('submit', handleScrape);
    }

    // Close modal on overlay click
    const modal = document.getElementById('postModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
    }
}

// ── Scrape Handler ──
async function handleScrape(e) {
    e.preventDefault();

    const urlInput = document.getElementById('profileUrl');
    const limitInput = document.getElementById('postsLimit');
    const btn = document.getElementById('scrapeBtn');

    const profileUrl = urlInput.value.trim();
    const postsLimit = parseInt(limitInput.value) || 10;

    // Validación frontend
    if (!profileUrl) {
        showToast('Ingresa una URL de Instagram', 'error');
        urlInput.focus();
        return;
    }

    if (!profileUrl.includes('instagram.com/')) {
        showToast('La URL debe ser de Instagram (instagram.com/...)', 'error');
        urlInput.focus();
        return;
    }

    // UI: loading state
    btn.classList.add('loading');
    btn.disabled = true;
    showLoading(true);
    hideResults();

    try {
        const data = await fetchScrape(profileUrl, postsLimit);

        if (data.success) {
            currentResults = data;
            showToast(`✅ Scraping completado — ${data.postsCount || 0} publicaciones extraídas`, 'success');
            renderResults(data);
        } else {
            showToast(data.message || 'Error desconocido en el scraping', 'error');
        }
    } catch (err) {
        console.error('Scrape error:', err);
        showToast(`❌ ${err.message || 'Error al conectar con el servidor'}`, 'error');
    } finally {
        btn.classList.remove('loading');
        btn.disabled = false;
        showLoading(false);
    }
}

// ── API Call ──
async function fetchScrape(profileUrl, postsLimit) {
    const webhookUrl = CONFIG.WEBHOOK_URL;

    if (!webhookUrl || webhookUrl.includes('TU-N8N')) {
        throw new Error('Configura WEBHOOK_URL en config.js con la URL de tu webhook n8n');
    }

    const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileUrl, postsLimit }),
    });

    if (!response.ok) {
        let errorMsg = `Error HTTP ${response.status}`;
        try {
            const errData = await response.json();
            errorMsg = errData.message || errData.error || errorMsg;
        } catch (_) { }
        throw new Error(errorMsg);
    }

    return response.json();
}

// ── Render Results ──
function renderResults(data) {
    const profile = data.profile;
    const posts = data.posts || [];

    // Profile card
    renderProfileCard(profile);

    // Posts grid
    renderPostsGrid(posts);

    // Show results section
    const section = document.getElementById('resultsSection');
    if (section) section.classList.add('active');
}

function renderProfileCard(profile) {
    if (!profile) return;

    const el = document.getElementById('profileCard');
    if (!el) return;

    const verified = profile.is_verified
        ? '<span class="profile-verified">✓ Verificado</span>'
        : '';

    el.innerHTML = `
    <div class="profile-header">
      <img class="profile-avatar"
           src="${profile.profile_pic || ''}"
           alt="${profile.username}"
           onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%23667eea%22 width=%22100%22 height=%22100%22/><text x=%2250%22 y=%2255%22 font-size=%2240%22 fill=%22white%22 text-anchor=%22middle%22>📷</text></svg>'">
      <div class="profile-info">
        <h2 class="profile-name">
          ${profile.full_name || profile.username}
          ${verified}
        </h2>
        <p class="profile-username">@${profile.username}</p>
        ${profile.biography ? `<p class="profile-bio">${escapeHtml(profile.biography)}</p>` : ''}
      </div>
    </div>
    <div class="profile-stats">
      <div class="stat-item">
        <div class="stat-value">${formatNumber(profile.followers)}</div>
        <div class="stat-label">Seguidores</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">${formatNumber(profile.following)}</div>
        <div class="stat-label">Siguiendo</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">${formatNumber(profile.posts_count)}</div>
        <div class="stat-label">Publicaciones</div>
      </div>
    </div>
  `;
}

function renderPostsGrid(posts) {
    const grid = document.getElementById('postsGrid');
    const countBadge = document.getElementById('postsCountBadge');
    if (!grid) return;

    if (countBadge) {
        countBadge.textContent = `${posts.length} publicaciones`;
    }

    if (posts.length === 0) {
        grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-icon">📭</div>
        <h3>Sin publicaciones</h3>
        <p>No se encontraron publicaciones para este perfil</p>
      </div>
    `;
        return;
    }

    grid.innerHTML = posts.map((post, i) => `
    <div class="post-card glass-panel" onclick="openPostModal(${i})" data-index="${i}">
      <div class="post-image-wrapper">
        <img class="post-image"
             src="${post.display_url || ''}"
             alt="Post"
             loading="lazy"
             onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%2312121a%22 width=%22100%22 height=%22100%22/><text x=%2250%22 y=%2255%22 font-size=%2230%22 fill=%22%23667eea%22 text-anchor=%22middle%22>📷</text></svg>'">
        ${post.type && post.type !== 'Image' ? `<span class="post-type-badge">${getTypeIcon(post.type)} ${post.type}</span>` : ''}
        <div class="post-overlay">
          <span>♥ ${formatNumber(post.likes_count)}</span>
          <span>💬 ${formatNumber(post.comments_count)}</span>
        </div>
      </div>
      <div class="post-body">
        ${post.caption ? `<p class="post-caption">${escapeHtml(post.caption)}</p>` : '<p class="post-caption" style="color:var(--text-muted);font-style:italic;">Sin leyenda</p>'}
        <div class="post-meta">
          <div class="post-stats">
            <span>♥ ${formatNumber(post.likes_count)}</span>
            <span>💬 ${formatNumber(post.comments_count)}</span>
            ${post.video_views ? `<span>▶ ${formatNumber(post.video_views)}</span>` : ''}
          </div>
          <span>${post.published_at ? formatDate(post.published_at) : ''}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// ── Post Modal ──
function openPostModal(index) {
    const posts = currentResults?.posts || [];
    const post = posts[index];
    if (!post) return;

    const modal = document.getElementById('postModal');

    document.getElementById('modalImage').src = post.display_url || '';
    document.getElementById('modalLikes').textContent = `♥ ${formatNumber(post.likes_count)}`;
    document.getElementById('modalComments').textContent = `💬 ${formatNumber(post.comments_count)}`;
    document.getElementById('modalCaption').textContent = post.caption || 'Sin leyenda';
    document.getElementById('modalDate').textContent = post.published_at ? formatDate(post.published_at) : '';

    const linkEl = document.getElementById('modalLink');
    if (post.post_url) {
        linkEl.href = post.post_url;
        linkEl.style.display = 'inline';
    } else {
        linkEl.style.display = 'none';
    }

    // Hashtags
    const hashtagsEl = document.getElementById('modalHashtags');
    if (post.hashtags && post.hashtags.length > 0) {
        hashtagsEl.innerHTML = post.hashtags.map(h => `<span class="hashtag-chip">#${h}</span>`).join('');
        hashtagsEl.style.display = 'flex';
    } else {
        hashtagsEl.style.display = 'none';
    }

    // Video views
    const viewsEl = document.getElementById('modalViews');
    if (post.video_views) {
        viewsEl.textContent = `▶ ${formatNumber(post.video_views)} views`;
        viewsEl.style.display = 'inline';
    } else {
        viewsEl.style.display = 'none';
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('postModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ── UI Helpers ──
function showLoading(show) {
    const el = document.getElementById('loadingOverlay');
    if (el) el.classList.toggle('active', show);
}

function hideResults() {
    const section = document.getElementById('resultsSection');
    if (section) section.classList.remove('active');
}

// ── Toast System ──
function showToast(message, type = 'info') {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span>${icons[type] || ''}</span> <span>${escapeHtml(message)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('hiding');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// ── Format Helpers ──
function formatNumber(num) {
    if (num == null) return '0';
    const n = Number(num);
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M';
    if (n >= 1_000) return (n / 1_000).toFixed(1) + 'k';
    return n.toLocaleString();
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('es-AR', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}

function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function getTypeIcon(type) {
    switch (type) {
        case 'Video': return '▶';
        case 'Sidecar': return '📑';
        default: return '📷';
    }
}
