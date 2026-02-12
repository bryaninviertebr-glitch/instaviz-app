
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('gallery-grid');
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');

    // Modal Elements
    const modal = document.getElementById('postModal');
    const closeModal = document.querySelector('.close-btn');
    const modalImg = document.getElementById('modalImg');
    const modalCaption = document.getElementById('modalCaption');
    const modalLikes = document.getElementById('modalLikes');
    const modalComments = document.getElementById('modalComments');
    const modalUser = document.getElementById('modalUser');
    const modalLink = document.getElementById('modalLink');
    const modalDate = document.getElementById('modalDate');

    let allPosts = [];
    let groupFilteredPosts = [];

    // Fetch Data from Supabase
    DataService.loadAllPosts()
        .then(data => {
            allPosts = data;

            // Init business groups then app
            if (window.BusinessGroups) {
                BusinessGroups.init('groupSelectorContainer', () => {
                    // On group change: re-filter and re-init
                    groupFilteredPosts = BusinessGroups.filterPosts(allPosts);
                    calculateKPIs(groupFilteredPosts);
                    populateOwnerFilter();
                    sortAndRender();
                }).then(() => {
                    groupFilteredPosts = BusinessGroups.filterPosts(allPosts);
                    initApp();
                });
            } else {
                groupFilteredPosts = allPosts;
                initApp();
            }
        })
        .catch(err => {
            grid.innerHTML = `<div class="error">Erro ao carregar dados: ${err.message}. Verifique a conexão com Supabase.</div>`;
        });

    function initApp() {
        calculateKPIs(groupFilteredPosts);
        renderGrid(groupFilteredPosts);
        populateOwnerFilter();
        setupRangeSliders();

        // Event Listeners
        const refreshBtn = document.getElementById('refreshBtn');
        if (refreshBtn) refreshBtn.addEventListener('click', handleRefresh);

        searchInput.addEventListener('input', (e) => filterPosts(e.target.value));
        sortSelect.addEventListener('change', () => sortAndRender());

        // Filter toggle
        const toggleFiltersBtn = document.getElementById('toggleFiltersBtn');
        const filtersContent = document.getElementById('filtersContent');
        toggleFiltersBtn.addEventListener('click', () => {
            filtersContent.classList.toggle('active');
            toggleFiltersBtn.textContent = filtersContent.classList.contains('active')
                ? 'Ocultar Filtros'
                : 'Mostrar Filtros';
        });

        // Filter actions
        document.getElementById('applyFiltersBtn').addEventListener('click', applyAdvancedFilters);
        document.getElementById('clearFiltersBtn').addEventListener('click', clearAdvancedFilters);

        // Modal Close
        closeModal.addEventListener('click', () => modal.classList.add('hidden'));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.add('hidden');
        });

        // ── Scraping Form Logic ──
        const dashboardScrapeForm = document.getElementById('dashboardScrapeForm');
        if (dashboardScrapeForm) {
            dashboardScrapeForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const urlInput = document.getElementById('scrapeProfileUrl');
                const limitInput = document.getElementById('scrapePostsLimit');
                const btn = document.getElementById('dashboardScrapeBtn');
                const feedback = document.getElementById('scrapeFeedback');
                const statusBadge = document.getElementById('scrapeStatusBadge');

                const url = urlInput.value.trim();
                const limit = parseInt(limitInput.value) || 10;

                if (!url) return;

                // UI Loading State
                const originalBtnContent = btn.innerHTML;
                btn.innerHTML = '<span class="spinning">⏳</span> Analizando...';
                btn.disabled = true;
                feedback.style.display = 'none';
                feedback.className = '';

                if (statusBadge) {
                    statusBadge.textContent = 'Procesando...';
                    statusBadge.style.display = 'inline-block';
                    statusBadge.style.backgroundColor = 'var(--accent)';
                    statusBadge.style.color = 'black';
                    statusBadge.style.padding = '2px 8px';
                    statusBadge.style.borderRadius = '4px';
                    statusBadge.style.fontSize = '0.8rem';
                }

                try {
                    // Extract profile name for feedback
                    const profileMatch = url.match(/instagram\.com\/([^/?]+)/);
                    const profileName = profileMatch ? profileMatch[1] : 'perfil';

                    await DataService.triggerScrape(url, limit);

                    // Success Feedback
                    feedback.innerHTML = `✅ Análisis iniciado para <b>@${profileName}</b>. Los datos aparecerán en breve. <br><button id="manualRefreshBtn" style="background:none; border:none; color:var(--accent); text-decoration:underline; cursor:pointer; margin-top:5px;">🔄 Actualizar ahora</button>`;
                    feedback.style.display = 'block';
                    feedback.style.color = 'var(--text-primary)';

                    // Specific listener for the dynamic button
                    setTimeout(() => {
                        const manualRefresh = document.getElementById('manualRefreshBtn');
                        if (manualRefresh) {
                            manualRefresh.addEventListener('click', (e) => {
                                e.preventDefault();
                                handleRefresh();
                                feedback.style.display = 'none';
                            });
                        }
                    }, 100);

                    // Reset inputs
                    urlInput.value = '';

                } catch (err) {
                    console.error(err);
                    feedback.textContent = `❌ Error: ${err.message}`;
                    feedback.style.display = 'block';
                    feedback.style.color = '#ff5252';
                } finally {
                    btn.innerHTML = originalBtnContent;
                    btn.disabled = false;
                    if (statusBadge) statusBadge.style.display = 'none';
                }
            });
        }
    }

    function populateOwnerFilter() {
        const owners = new Set();
        groupFilteredPosts.forEach(post => {
            const owner = post.ownerUsername || post.ownerFullName;
            if (owner) owners.add(owner);
        });

        const select = document.getElementById('filterOwner');
        // Clear existing options except the first "All" option
        select.innerHTML = '<option value="">Todos os usuários</option>';
        Array.from(owners).sort().forEach(owner => {
            const option = document.createElement('option');
            option.value = owner;
            option.textContent = owner;
            select.appendChild(option);
        });
    }

    function setupRangeSliders() {
        // Calculate dynamic ranges from actual data
        const likes = allPosts.map(p => p.likesCount || 0).filter(l => l > 0);
        const comments = allPosts.map(p => p.commentsCount || 0).filter(c => c > 0);

        // Setup percentage sliders
        const topLikesSlider = document.getElementById('filterTopLikes');
        const topCommentsSlider = document.getElementById('filterTopComments');
        const topLikesLabel = document.getElementById('topLikesLabel');
        const topCommentsLabel = document.getElementById('topCommentsLabel');

        topLikesSlider.addEventListener('input', () => {
            topLikesLabel.textContent = `${topLikesSlider.value}%`;
        });

        topCommentsSlider.addEventListener('input', () => {
            topCommentsLabel.textContent = `${topCommentsSlider.value}%`;
        });
    }

    function calculateKPIs(posts = allPosts) {
        // Safe helpers
        const getVal = (item, key) => (item[key] ? Number(item[key]) : 0);

        const totalPosts = posts.length;
        const totalLikes = posts.reduce((acc, curr) => acc + getVal(curr, 'likesCount'), 0);
        const totalComments = posts.reduce((acc, curr) => acc + getVal(curr, 'commentsCount'), 0);

        // Hashtag Analysis
        const hashtagCounts = {};
        posts.forEach(post => {
            if (post.hashtags && Array.isArray(post.hashtags)) {
                post.hashtags.forEach(tag => {
                    hashtagCounts[tag] = (hashtagCounts[tag] || 0) + 1;
                });
            }
        });

        let topHashtag = '-';
        let maxCount = 0;
        Object.entries(hashtagCounts).forEach(([tag, count]) => {
            if (count > maxCount) {
                maxCount = count;
                topHashtag = tag;
            }
        });

        // Update DOM
        animateValue('kpi-posts', 0, totalPosts, 1000);
        animateValue('kpi-likes', 0, totalLikes, 1500);
        animateValue('kpi-comments', 0, totalComments, 1200);
        document.getElementById('kpi-hashtag').innerText = topHashtag !== '-' ? `#${topHashtag}` : '-';
    }

    function renderGrid(posts) {
        grid.innerHTML = '';

        if (posts.length === 0) {
            grid.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding: 2rem; color: #666;">Nenhuma publicação encontrada.</div>';
            return;
        }

        const fragment = document.createDocumentFragment();

        posts.forEach(post => {
            const card = document.createElement('div');
            card.className = 'post-card';

            // Image handling with Proxy (wsrv.nl)
            const rawImgUrl = post.displayUrl || (post.images && post.images.length > 0 ? post.images[0] : 'https://placehold.co/400x400?text=No+Image');
            const imgUrl = rawImgUrl.startsWith('http') ? `https://wsrv.nl/?url=${encodeURIComponent(rawImgUrl)}&w=400&output=jpg` : rawImgUrl;

            const caption = post.caption || '';
            const likes = post.likesCount || 0;
            const comments = post.commentsCount || 0;

            card.innerHTML = `
                <div class="card-img-container">
                    <img src="${imgUrl}" alt="Post" class="card-img" loading="lazy">
                    <div class="card-overlay">
                        <span>♥ ${formatNumber(likes)}</span>
                        <span>💬 ${formatNumber(comments)}</span>
                    </div>
                </div>
                <div class="card-info">
                    <div class="card-stats">
                        <span>@${post.ownerUsername}</span>
                        <span>${new Date(post.timestamp).toLocaleDateString()}</span>
                    </div>
                    <p class="card-caption">${caption}</p>
                </div>
            `;

            card.addEventListener('click', () => openModal(post));
            fragment.appendChild(card);
        });

        grid.appendChild(fragment);
    }

    function openModal(post) {
        const rawImgUrl = post.displayUrl || (post.images && post.images.length > 0 ? post.images[0] : '');
        const imgUrl = rawImgUrl.startsWith('http') ? `https://wsrv.nl/?url=${encodeURIComponent(rawImgUrl)}&output=jpg` : rawImgUrl;

        modalImg.src = imgUrl;
        modalUser.innerText = `@${post.ownerUsername}`;
        modalLikes.innerText = formatNumber(post.likesCount || 0);
        modalComments.innerText = formatNumber(post.commentsCount || 0);
        modalCaption.innerText = post.caption || 'Sem legenda.';
        modalDate.innerText = new Date(post.timestamp).toLocaleString();
        modalLink.href = post.url;

        modal.classList.remove('hidden');
    }

    function filterPosts(query) {
        const lowerQ = query.toLowerCase();
        const filtered = groupFilteredPosts.filter(post => {
            const caption = (post.caption || '').toLowerCase();
            const user = (post.ownerUsername || '').toLowerCase();
            return caption.includes(lowerQ) || user.includes(lowerQ);
        });

        // Re-apply sort
        const sorted = sortPosts(filtered, sortSelect.value);
        renderGrid(sorted);
    }

    function sortAndRender() {
        // Filter first (using current search input)
        const query = searchInput.value.toLowerCase();
        const filtered = groupFilteredPosts.filter(post => {
            const caption = (post.caption || '').toLowerCase();
            const user = (post.ownerUsername || '').toLowerCase();
            return caption.includes(query) || user.includes(query);
        });

        const sorted = sortPosts(filtered, sortSelect.value);
        renderGrid(sorted);
    }

    function sortPosts(posts, criteria) {
        return [...posts].sort((a, b) => {
            if (criteria === 'likes-desc') return (b.likesCount || 0) - (a.likesCount || 0);
            if (criteria === 'comments-desc') return (b.commentsCount || 0) - (a.commentsCount || 0);
            // Default: Date desc
            return new Date(b.timestamp) - new Date(a.timestamp);
        });
    }

    function applyAdvancedFilters() {
        const dateFrom = document.getElementById('filterDateFrom').value;
        const dateTo = document.getElementById('filterDateTo').value;
        const topLikes = parseInt(document.getElementById('filterTopLikes').value);
        const topComments = parseInt(document.getElementById('filterTopComments').value);
        const owner = document.getElementById('filterOwner').value.toLowerCase();

        let filtered = groupFilteredPosts.filter(post => {
            // Date filter
            if (dateFrom) {
                const postDate = new Date(post.timestamp);
                const filterDate = new Date(dateFrom);
                if (postDate < filterDate) return false;
            }
            if (dateTo) {
                const postDate = new Date(post.timestamp);
                const filterDate = new Date(dateTo);
                filterDate.setHours(23, 59, 59, 999);
                if (postDate > filterDate) return false;
            }

            // Owner filter
            if (owner) {
                const postOwner = (post.ownerUsername || post.ownerFullName || '').toLowerCase();
                if (!postOwner.includes(owner)) return false;
            }

            return true;
        });

        // Apply Top % Likes filter
        if (topLikes < 100) {
            filtered.sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0));
            const likesCutoff = Math.ceil(filtered.length * (topLikes / 100));
            filtered = filtered.slice(0, likesCutoff);
        }

        // Apply Top % Comments filter
        if (topComments < 100) {
            filtered.sort((a, b) => (b.commentsCount || 0) - (a.commentsCount || 0));
            const commentsCutoff = Math.ceil(filtered.length * (topComments / 100));
            filtered = filtered.slice(0, commentsCutoff);
        }

        // Apply search if exists
        const searchQuery = searchInput.value.toLowerCase();
        if (searchQuery) {
            filtered = filtered.filter(post => {
                const caption = (post.caption || '').toLowerCase();
                const user = (post.ownerUsername || '').toLowerCase();
                return caption.includes(searchQuery) || user.includes(searchQuery);
            });
        }

        const sorted = sortPosts(filtered, sortSelect.value);
        calculateKPIs(sorted); // Update KPIs with filtered data
        renderGrid(sorted);
    }

    function clearAdvancedFilters() {
        document.getElementById('filterDateFrom').value = '';
        document.getElementById('filterDateTo').value = '';
        document.getElementById('filterTopLikes').value = '100';
        document.getElementById('filterTopComments').value = '100';
        document.getElementById('filterOwner').value = '';

        // Update labels
        document.getElementById('topLikesLabel').textContent = '100%';
        document.getElementById('topCommentsLabel').textContent = '100%';

        // Re-render with all posts
        calculateKPIs(groupFilteredPosts);
        sortAndRender();
    }

    function handleRefresh() {
        const btn = document.getElementById('refreshBtn');
        btn.disabled = true;
        btn.classList.add('spinning');
        grid.innerHTML = '<div class="loading">Atualizando dados da fonte...</div>';

        // Invalidar cache y recargar desde Supabase
        DataService.clearCache();
        DataService.loadAllPosts()
            .then(data => {
                allPosts = data;
                if (window.BusinessGroups) {
                    groupFilteredPosts = BusinessGroups.filterPosts(allPosts);
                } else {
                    groupFilteredPosts = allPosts;
                }
                initApp();
            })
            .catch(err => {
                console.error(err);
                alert('Falha ao atualizar: ' + err.message);
                renderGrid(allPosts); // Restore old data
            })
            .finally(() => {
                btn.disabled = false;
                btn.classList.remove('spinning');
            });
    }

    // Utilities
    function formatNumber(num) {
        return new Intl.NumberFormat('en-US', { notation: "compact", compactDisplay: "short" }).format(num);
    }

    function animateValue(id, start, end, duration) {
        const obj = document.getElementById(id);
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = formatNumber(Math.floor(progress * (end - start) + start));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
});
