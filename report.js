// ============================================================
// InstaViz — Report Page Logic v2
// Auditoría de perfil con benchmarking por Grupo de Negocio
// ============================================================

(async () => {
    const root = document.getElementById('reportRoot');
    const btnPdf = document.getElementById('btnPdf');

    // ── 1. Leer username de la URL ──────────────────────────────
    const params = new URLSearchParams(window.location.search);
    const username = (params.get('username') || '').trim().toLowerCase();

    if (!username) {
        root.innerHTML = errorHtml('No se especificó un username.', 'Usa: report.html?username=natgeo');
        return;
    }

    document.title = `@${username} — Auditoría InstaScraping`;

    // ── 2. Cargar perfil + posts ────────────────────────────────
    let profile, posts;
    try {
        profile = await DataService.getProfileByUsername(username);
        if (!profile) throw new Error(`Perfil @${username} no encontrado en Supabase.`);
        posts = await DataService.getPostsByProfileId(profile.id);
    } catch (err) {
        root.innerHTML = errorHtml('Error al cargar el perfil.', err.message);
        return;
    }

    // ── 3. Detectar Grupo de Negocio ────────────────────────────
    let profileGroup = null;
    let benchmarks = null;
    try {
        const res = await fetch('/business-groups.json?t=' + Date.now());
        const config = await res.json();
        profileGroup = (config.groups || []).find(g =>
            (g.accounts || []).map(a => a.toLowerCase()).includes(username)
        ) || null;

        if (profileGroup) {
            benchmarks = await DataService.getGroupBenchmarks(profileGroup.id);
        }
    } catch (e) {
        console.warn('[Report] No se pudieron cargar los grupos:', e.message);
    }

    // ── 4. Calcular métricas del perfil ─────────────────────────
    const metrics = calcMetrics(profile, posts);

    // ── 5. Calcular Health Score ────────────────────────────────
    const score = calcHealthScore(profile, posts, metrics, benchmarks);

    // ── 6. Renderizar HTML ──────────────────────────────────────
    root.innerHTML = buildReportHtml(profile, posts, metrics, score, profileGroup, benchmarks);

    // ── 7. Renderizar gráficos Plotly ───────────────────────────
    renderDonut(posts);
    if (benchmarks) {
        renderBenchmarkBar(metrics, benchmarks, username);
    } else {
        renderScatter(posts);
    }

    // ── 8. Mostrar botón PDF ────────────────────────────────────
    btnPdf.style.display = 'block';
})();

// ══════════════════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════════════════

function formatNum(n) {
    if (n == null) return '0';
    const num = Number(n);
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(1) + 'k';
    return num.toLocaleString();
}

function escapeHtml(str) {
    if (!str) return '';
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
}

function proxyUrl(url, size = 200) {
    if (!url) return '';
    return `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=${size}&output=jpg`;
}

function pct(value, total) {
    if (!total) return '—';
    const p = (value / total) * 100;
    return (p > 0 ? '+' : '') + p.toFixed(0) + '%';
}

// ══════════════════════════════════════════════════════════════
// CÁLCULO DE MÉTRICAS
// ══════════════════════════════════════════════════════════════

function calcMetrics(profile, posts) {
    const count = posts.length || 1;
    const totalLikes = posts.reduce((s, p) => s + (p.likesCount || 0), 0);
    const totalComments = posts.reduce((s, p) => s + (p.commentsCount || 0), 0);
    const avgLikes = totalLikes / count;
    const avgComments = totalComments / count;
    const followersRaw = Number(profile.followers || profile.followersCount) || 0;
    const followersValid = followersRaw >= 10; // necesitamos al menos 10 seguidores para un ER significativo
    const followers = followersValid ? followersRaw : 1; // fallback para evitar división por cero
    const engagementRate = followersValid ? ((avgLikes + avgComments) / followers) * 100 : null;

    const fourWeeksAgo = Date.now() - 28 * 24 * 60 * 60 * 1000;
    const postFreq = posts.filter(p => p.timestamp && new Date(p.timestamp).getTime() > fourWeeksAgo).length;

    const typeCount = {};
    posts.forEach(p => {
        const t = p.type || 'Image';
        typeCount[t] = (typeCount[t] || 0) + 1;
    });

    return { totalLikes, totalComments, avgLikes, avgComments, engagementRate, followersValid, postFreq, typeCount, count, followers };
}

// ══════════════════════════════════════════════════════════════
// HEALTH SCORE (0–100)
// Si hay benchmarks, los criterios numéricos se comparan vs el nicho
// ══════════════════════════════════════════════════════════════

function calcHealthScore(profile, posts, metrics, benchmarks) {
    const checks = [];

    // 1. Bio presente (10 pts)
    const hasBio = !!(profile.biography && profile.biography.trim().length > 10);
    checks.push({ icon: '📝', text: 'Biografía completa', pass: hasBio, pts: hasBio ? 10 : 0, max: 10 });

    // 2. Link en bio (10 pts)
    const hasLink = !!(profile.external_url || profile.website);
    checks.push({ icon: '🔗', text: 'Link en bio', pass: hasLink, pts: hasLink ? 10 : 0, max: 10 });

    // 3. Engagement Rate (25 pts)
    // Si hay benchmark: 25 pts si está ≥ promedio del nicho, escalado si está por debajo
    let erScore, erText, erPass;
    if (metrics.engagementRate === null) {
        // Seguidores insuficientes — no se puede calcular ER
        erScore = 0;
        erPass = false;
        erText = 'ER: N/A (seguidores insuficientes)';
    } else if (benchmarks) {
        const nichAvgEr = benchmarks.avgComments && metrics.followers
            ? ((benchmarks.avgLikes + benchmarks.avgComments) / metrics.followers) * 100
            : 1;
        const ratio = metrics.engagementRate / (nichAvgEr || 1);
        erScore = Math.min(25, Math.round(ratio * 25));
        erPass = ratio >= 1;
        erText = `ER: ${metrics.engagementRate.toFixed(2)}% (nicho: ${nichAvgEr.toFixed(2)}%)`;
    } else {
        erScore = Math.min(25, Math.round((metrics.engagementRate / 3) * 25));
        erPass = metrics.engagementRate >= 1;
        erText = `Engagement Rate: ${metrics.engagementRate.toFixed(2)}%`;
    }
    checks.push({ icon: '📊', text: erText, pass: erPass, pts: erScore, max: 25 });

    // 4. Likes promedio (20 pts)
    let likesScore, likesText, likesPass;
    if (benchmarks && benchmarks.avgLikes > 0) {
        const ratio = metrics.avgLikes / benchmarks.avgLikes;
        likesScore = Math.min(20, Math.round(ratio * 20));
        likesPass = ratio >= 1;
        likesText = `Likes: ${formatNum(Math.round(metrics.avgLikes))} (nicho: ${formatNum(Math.round(benchmarks.avgLikes))})`;
    } else {
        likesScore = Math.min(20, Math.round((metrics.avgLikes / 1000) * 20));
        likesPass = metrics.avgLikes >= 1000;
        likesText = `Likes promedio: ${formatNum(Math.round(metrics.avgLikes))}`;
    }
    checks.push({ icon: '❤️', text: likesText, pass: likesPass, pts: likesScore, max: 20 });

    // 5. Frecuencia de publicación (20 pts)
    let freqScore, freqText, freqPass;
    if (benchmarks && benchmarks.avgPostFreq > 0) {
        const ratio = metrics.postFreq / benchmarks.avgPostFreq;
        freqScore = Math.min(20, Math.round(ratio * 20));
        freqPass = ratio >= 1;
        freqText = `Frecuencia: ${metrics.postFreq}/mes (nicho: ${benchmarks.avgPostFreq.toFixed(1)}/mes)`;
    } else {
        freqPass = metrics.postFreq >= 4;
        freqScore = freqPass ? 20 : Math.round((metrics.postFreq / 4) * 20);
        freqText = `Frecuencia: ${metrics.postFreq} posts/mes`;
    }
    checks.push({ icon: '📅', text: freqText, pass: freqPass, pts: freqScore, max: 20 });

    // 6. Cuenta verificada (5 pts)
    const isVer = !!profile.is_verified;
    checks.push({ icon: '✓', text: 'Cuenta verificada', pass: isVer, pts: isVer ? 5 : 0, max: 5 });

    // 7. Historial (10 pts)
    const postScore = Math.min(10, Math.round((posts.length / 50) * 10));
    checks.push({ icon: '🖼️', text: `Historial: ${posts.length} posts`, pass: posts.length >= 50, pts: postScore, max: 10 });

    const total = checks.reduce((s, c) => s + c.pts, 0);
    return { total, checks };
}

// ══════════════════════════════════════════════════════════════
// HTML BUILDER
// ══════════════════════════════════════════════════════════════

function buildReportHtml(profile, posts, metrics, score, profileGroup, benchmarks) {
    const profilePic = profile.profile_pic || profile.profile_picture_url || '';
    const avatarHtml = profilePic
        ? `<img class="profile-avatar" src="${proxyUrl(profilePic, 200)}" alt="@${escapeHtml(profile.username)}"
               onerror="this.onerror=null;this.parentElement.innerHTML='<div class=&quot;profile-avatar-placeholder&quot;>👤</div>'">`
        : `<div class="profile-avatar-placeholder">👤</div>`;

    const bio = profile.biography || profile.bio || '';
    const bioHtml = bio ? `<p class="profile-bio">${escapeHtml(bio).replace(/\\n/g, '<br>')}</p>` : '';

    const website = profile.external_url || profile.website || '';
    const websiteHtml = website ? `<a href="${website}" target="_blank" class="profile-link">🔗 ${escapeHtml(website.replace(/^https?:\/\//, ''))}</a>` : '';

    const scoreColor = score.total >= 70 ? '#00c853' : score.total >= 45 ? '#fffd00' : '#ff5252';
    const scoreLabel = score.total >= 70 ? 'Excelente' : score.total >= 45 ? 'Regular' : 'Débil';

    // Group badge
    const groupBadge = profileGroup
        ? `<span class="group-badge">${profileGroup.icon} ${escapeHtml(profileGroup.name)}</span>`
        : `<span class="group-badge group-badge--none">Sin nicho asignado</span>`;

    // Benchmark delta badges (vs nicho)
    const benchDeltas = benchmarks ? buildBenchDeltas(metrics, benchmarks) : '';

    // Top 5 posts by likes
    const topPosts = [...posts].sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0)).slice(0, 5);
    const topPostsHtml = topPosts.map(p => {
        const img = proxyUrl(p.displayUrl || (p.images && p.images[0]) || '', 400);
        return `
        <div class="top-post-thumb">
            <img src="${img}" loading="lazy"
                onerror="this.onerror=null;this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%231a1a1a%22 width=%22100%22 height=%22100%22/><text x=%2250%22 y=%2255%22 font-size=%2230%22 fill=%22%23444%22 text-anchor=%22middle%22>📷</text></svg>'" alt="">
            <div class="top-post-overlay">
                <span>♥ ${formatNum(p.likesCount)}</span>
                <span>💬 ${formatNum(p.commentsCount)}</span>
            </div>
        </div>`;
    }).join('');

    // Chart section title
    const chart2Title = benchmarks
        ? `Benchmarking vs ${escapeHtml(profileGroup.name)}`
        : 'Likes vs Comentarios';

    return `
    <!-- Profile Card -->
    <div class="profile-card">
        ${avatarHtml}
        <div class="profile-info">
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:4px;">
                <h2 style="margin:0">${escapeHtml(profile.full_name || profile.fullName || profile.username)}${profile.is_verified ? ' <span title="Verificado" style="color:var(--accent)">✓</span>' : ''}</h2>
                ${groupBadge}
            </div>
            <p class="username">@${escapeHtml(profile.username)}</p>
            ${bio ? `<p class="bio">${escapeHtml(bio)}${website ? ` <a href="${escapeHtml(website)}" target="_blank" rel="noopener" style="color:var(--accent)">🔗</a>` : ''}</p>` : ''}
            <div class="profile-stats">
                <div class="pstat">
                    <div class="pstat-val">${formatNum(profile.followers || profile.followersCount)}</div>
                    <div class="pstat-lbl">Seguidores</div>
                </div>
                <div class="pstat">
                    <div class="pstat-val">${formatNum(profile.following || profile.followingCount)}</div>
                    <div class="pstat-lbl">Siguiendo</div>
                </div>
                <div class="pstat">
                    <div class="pstat-val">${posts.length}</div>
                    <div class="pstat-lbl">Posts</div>
                </div>
            </div>
        </div>
    </div>

    <!--KPI Row-- >
    <div class="kpi-row">
        <div class="kpi-mini">
            <div class="kpi-mini-val">${metrics.engagementRate !== null ? metrics.engagementRate.toFixed(2) + '%' : 'N/A'}</div>
            <div class="kpi-mini-lbl">Engagement Rate</div>
            ${(benchmarks && metrics.engagementRate !== null) ? `<div class="kpi-delta ${deltaClass(metrics.engagementRate, (benchmarks.avgLikes + benchmarks.avgComments) / metrics.followers * 100)}">${deltaTxt(metrics.engagementRate, (benchmarks.avgLikes + benchmarks.avgComments) / metrics.followers * 100)} vs nicho</div>` : (metrics.engagementRate === null ? '<div class="kpi-delta" style="color:#888;font-size:0.7rem;">Seguidores insuficientes</div>' : '')}
        </div>
        <div class="kpi-mini">
            <div class="kpi-mini-val">${formatNum(Math.round(metrics.avgLikes))}</div>
            <div class="kpi-mini-lbl">Likes promedio</div>
            ${benchmarks ? `<div class="kpi-delta ${deltaClass(metrics.avgLikes, benchmarks.avgLikes)}">${deltaTxt(metrics.avgLikes, benchmarks.avgLikes)} vs nicho</div>` : ''}
        </div>
        <div class="kpi-mini">
            <div class="kpi-mini-val">${formatNum(Math.round(metrics.avgComments))}</div>
            <div class="kpi-mini-lbl">Comentarios prom.</div>
            ${benchmarks ? `<div class="kpi-delta ${deltaClass(metrics.avgComments, benchmarks.avgComments)}">${deltaTxt(metrics.avgComments, benchmarks.avgComments)} vs nicho</div>` : ''}
        </div>
        <div class="kpi-mini">
            <div class="kpi-mini-val">${metrics.postFreq}</div>
            <div class="kpi-mini-lbl">Posts / mes</div>
            ${benchmarks ? `<div class="kpi-delta ${deltaClass(metrics.postFreq, benchmarks.avgPostFreq)}">${deltaTxt(metrics.postFreq, benchmarks.avgPostFreq)} vs nicho</div>` : ''}
        </div>
    </div>

    <!--Health Score-- >
    <div class="score-card">
        <div class="score-circle-wrap">
            <div class="score-circle" style="border-color:${scoreColor};background:${scoreColor}11">
                <span class="score-number" style="color:${scoreColor}">${score.total}</span>
                <span class="score-max">/100</span>
            </div>
            <span class="score-label" style="color:${scoreColor}">${scoreLabel}</span>
        </div>
        <div class="score-breakdown">
            <h3>Profile Health Score${benchmarks ? ` <span style="font-size:0.7rem;color:var(--text-muted);font-weight:400;text-transform:none;">ponderado vs ${escapeHtml(profileGroup.name)}</span>` : ''}</h3>
            ${score.checks.map(c => `
            <div class="score-item">
                <span class="score-item-icon">${c.icon}</span>
                <span class="score-item-text">${escapeHtml(c.text)}</span>
                <span class="score-item-val ${c.pass ? 'pass' : 'fail'}">+${c.pts}/${c.max}</span>
            </div>`).join('')}
        </div>
    </div>

    <!--Charts -->
    <div class="charts-grid">
        <div class="chart-card">
            <h3>Formatos de Contenido</h3>
            <div id="chartDonut" class="chart-plot"></div>
        </div>
        <div class="chart-card">
            <h3>${chart2Title}</h3>
            <div id="chartMain" class="chart-plot"></div>
        </div>
    </div>

    <!--Top Posts-- >
        <div class="top-posts-card">
            <h3>Top 5 Posts por Likes</h3>
            <div class="top-posts-grid">
                ${topPostsHtml || '<p style="color:var(--text-muted);font-size:0.85rem;">Sin posts disponibles.</p>'}
            </div>
        </div>
    `;
}

// ── Delta helpers ───────────────────────────────────────────────

function deltaClass(val, ref) {
    if (!ref) return '';
    return val >= ref ? 'delta-up' : 'delta-down';
}

function deltaTxt(val, ref) {
    if (!ref) return '';
    const pct = ((val - ref) / ref) * 100;
    return (pct >= 0 ? '+' : '') + pct.toFixed(0) + '%';
}

function buildBenchDeltas(metrics, b) {
    return ''; // Reserved for future inline delta display
}

// ══════════════════════════════════════════════════════════════
// PLOTLY CHARTS
// ══════════════════════════════════════════════════════════════

function renderDonut(posts) {
    const typeCount = {};
    posts.forEach(p => {
        const t = p.type || 'Image';
        typeCount[t] = (typeCount[t] || 0) + 1;
    });
    const labels = Object.keys(typeCount);
    const values = labels.map(l => typeCount[l]);

    Plotly.newPlot('chartDonut', [{
        type: 'pie',
        labels,
        values,
        hole: 0.55,
        textinfo: 'label+percent',
        textfont: { color: '#fff', size: 11 },
        marker: {
            colors: ['#FFFD00', '#00c853', '#667eea', '#ff5252', '#00bcd4'],
            line: { color: '#0d0d0d', width: 2 }
        }
    }], {
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent',
        font: { color: '#aaa', family: 'Outfit, sans-serif', size: 11 },
        margin: { t: 10, b: 10, l: 10, r: 10 },
        showlegend: true,
        legend: { font: { color: '#aaa', size: 11 }, orientation: 'h', y: -0.15 }
    }, { responsive: true, displayModeBar: false });
}

/**
 * Gráfico de barras agrupadas: Perfil vs Promedio del Nicho
 * Métricas: Likes promedio, Comentarios promedio, Posts/mes
 */
function renderBenchmarkBar(metrics, benchmarks, username) {
    const categories = ['Likes promedio', 'Comentarios prom.', 'Posts / mes'];
    const profileVals = [
        Math.round(metrics.avgLikes),
        Math.round(metrics.avgComments),
        metrics.postFreq
    ];
    const benchVals = [
        Math.round(benchmarks.avgLikes),
        Math.round(benchmarks.avgComments),
        Math.round(benchmarks.avgPostFreq * 10) / 10
    ];

    Plotly.newPlot('chartMain', [
        {
            name: `@${username} `,
            type: 'bar',
            x: categories,
            y: profileVals,
            marker: { color: '#FFFD00', opacity: 0.9 },
            text: profileVals.map(v => v.toLocaleString()),
            textposition: 'outside',
            textfont: { color: '#FFFD00', size: 11 }
        },
        {
            name: `Nicho(${benchmarks.peerCount} cuentas)`,
            type: 'bar',
            x: categories,
            y: benchVals,
            marker: { color: 'rgba(255,255,255,0.2)', opacity: 0.9 },
            text: benchVals.map(v => v.toLocaleString()),
            textposition: 'outside',
            textfont: { color: '#aaa', size: 11 }
        }
    ], {
        barmode: 'group',
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'rgba(255,255,255,0.02)',
        font: { color: '#aaa', family: 'Outfit, sans-serif', size: 11 },
        margin: { t: 20, b: 50, l: 20, r: 10 },
        legend: { font: { color: '#aaa', size: 11 }, orientation: 'h', y: -0.22 },
        xaxis: { gridcolor: 'rgba(255,255,255,0.04)', tickfont: { size: 11 } },
        yaxis: { gridcolor: 'rgba(255,255,255,0.05)', zerolinecolor: 'rgba(255,255,255,0.08)' }
    }, { responsive: true, displayModeBar: false });
}

/**
 * Fallback cuando no hay grupo: scatter likes vs comentarios
 */
function renderScatter(posts) {
    const x = posts.map(p => p.commentsCount || 0);
    const y = posts.map(p => p.likesCount || 0);
    const text = posts.map(p => {
        const d = p.timestamp
            ? new Date(p.timestamp).toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })
            : '';
        return `${p.type || 'Post'} · ${d} `;
    });

    Plotly.newPlot('chartMain', [{
        type: 'scatter',
        mode: 'markers',
        x, y, text,
        hovertemplate: '<b>%{text}</b><br>Likes: %{y}<br>Comentarios: %{x}<extra></extra>',
        marker: {
            color: y,
            colorscale: [[0, '#667eea'], [0.5, '#FFFD00'], [1, '#ff5252']],
            size: 8,
            opacity: 0.85,
            line: { color: 'rgba(255,255,255,0.1)', width: 1 }
        }
    }], {
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'rgba(255,255,255,0.02)',
        font: { color: '#aaa', family: 'Outfit, sans-serif', size: 10 },
        margin: { t: 10, b: 40, l: 50, r: 10 },
        xaxis: { title: 'Comentarios', gridcolor: 'rgba(255,255,255,0.05)', zerolinecolor: 'rgba(255,255,255,0.1)' },
        yaxis: { title: 'Likes', gridcolor: 'rgba(255,255,255,0.05)', zerolinecolor: 'rgba(255,255,255,0.1)' }
    }, { responsive: true, displayModeBar: false });
}

// ══════════════════════════════════════════════════════════════
// PDF EXPORT
// ══════════════════════════════════════════════════════════════

async function downloadPdf() {
    const btn = document.getElementById('btnPdf');
    btn.textContent = '⏳ Generando…';
    btn.disabled = true;

    const element = document.getElementById('reportRoot');
    const username = new URLSearchParams(window.location.search).get('username') || 'reporte';

    const options = {
        margin: [8, 8, 8, 8],
        filename: `auditoria - ${username} -${new Date().toISOString().slice(0, 10)}.pdf`,
        image: { type: 'jpeg', quality: 0.96 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#0d0d0d'
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    try {
        await html2pdf().set(options).from(element).save();
    } catch (err) {
        console.error('[Report] Error generando PDF:', err);
        alert('Error al generar el PDF. Por favor intenta de nuevo.');
    }

    btn.textContent = '📄 Descargar PDF';
    btn.disabled = false;
}

// ══════════════════════════════════════════════════════════════
// ERROR UI
// ══════════════════════════════════════════════════════════════

function errorHtml(title, detail) {
    return `
        < div class="empty-state glass-panel" style = "margin-top:2rem" >
        <div class="empty-icon">⚠️</div>
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(detail)}</p>
        <p style="margin-top:1rem"><a href="history.html" style="color:var(--accent)">← Volver al Historial</a></p>
    </div > `;
}
