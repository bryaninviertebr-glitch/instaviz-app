/**
 * Business Groups Module
 * Shared module for business group segmentation across all analytics pages.
 * Loads business-groups.json, renders a group selector, and filters data by group.
 * Includes management UI for creating, editing, and deleting groups.
 */

(function () {
    'use strict';

    const STORAGE_KEY = 'selected_business_group';
    let groupsConfig = null;
    let allAvailableAccounts = [];
    let onGroupChangeCallbacks = [];
    let currentContainerId = null;

    // ── Load Config ──────────────────────────────────────────────────────
    async function loadBusinessGroups() {
        try {
            const res = await fetch('/business-groups.json?t=' + Date.now());
            groupsConfig = await res.json();
            return groupsConfig;
        } catch (err) {
            console.error('Error loading business-groups.json:', err);
            groupsConfig = { groups: [] };
            return groupsConfig;
        }
    }

    // ── Load all available accounts ──────────────────────────────────────
    async function loadAvailableAccounts() {
        try {
            // Try loading from DataService (preferred)
            if (window.DataService && typeof window.DataService.loadAllPosts === 'function') {
                const posts = await window.DataService.loadAllPosts();
                const accounts = new Set();
                posts.forEach(p => {
                    if (p.ownerUsername) accounts.add(p.ownerUsername);
                });
                allAvailableAccounts = Array.from(accounts).sort();
                console.log('[BusinessGroups] Loaded accounts via DataService:', allAvailableAccounts.length);
                return;
            }

            // Fallback to legacy API
            const res = await fetch('/api/accounts');
            const data = await res.json();
            allAvailableAccounts = data.accounts || [];
        } catch (err) {
            console.error('Error loading accounts:', err);
            allAvailableAccounts = [];
        }
    }

    // ── Save Config to server ────────────────────────────────────────────
    async function saveBusinessGroups() {
        try {
            const res = await fetch('/api/business-groups', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(groupsConfig)
            });
            const result = await res.json();
            return result.success;
        } catch (err) {
            console.error('Error saving business groups:', err);
            return false;
        }
    }

    // ── Active Group ─────────────────────────────────────────────────────
    function getActiveGroupId() {
        return localStorage.getItem(STORAGE_KEY) || 'all';
    }

    function setActiveGroupId(id) {
        localStorage.setItem(STORAGE_KEY, id);
    }

    function getActiveGroup() {
        if (!groupsConfig) return null;
        const id = getActiveGroupId();
        if (id === 'all') return null;
        return groupsConfig.groups.find(g => g.id === id) || null;
    }

    // ── Filter Posts by Group ────────────────────────────────────────────
    function filterPostsByGroup(posts) {
        const group = getActiveGroup();
        if (!group) return posts; // "all" – no filter
        return posts.filter(p => group.accounts.includes(p.ownerUsername));
    }

    // ── Get accounts for active group ────────────────────────────────────
    function getGroupAccounts() {
        const group = getActiveGroup();
        if (!group) return null; // null = all accounts
        return group.accounts;
    }

    // ── Render Group Selector ────────────────────────────────────────────
    function renderGroupSelector(containerId) {
        const container = document.getElementById(containerId);
        if (!container || !groupsConfig) {
            console.warn('[BusinessGroups] Container or config missing:', containerId, groupsConfig);
            return;
        }
        currentContainerId = containerId;
        console.log('[BusinessGroups] Rendering', groupsConfig.groups.length, 'groups in', containerId);

        const activeId = getActiveGroupId();

        // Build pills
        let html = '<div class="bg-selector-title">Grupo de Negócio</div>';
        html += '<div class="bg-selector">';
        html += `<button class="bg-pill ${activeId === 'all' ? 'bg-pill--active' : ''}" data-group-id="all">
                    <span class="bg-pill__icon">📊</span>
                    <span class="bg-pill__label">Todos</span>
                 </button>`;

        groupsConfig.groups.forEach(g => {
            const isActive = activeId === g.id;
            const count = g.accounts.length;
            html += `<button class="bg-pill ${isActive ? 'bg-pill--active' : ''}" data-group-id="${g.id}">
                        <span class="bg-pill__icon">${g.icon}</span>
                        <span class="bg-pill__label">${g.name}</span>
                        <span class="bg-pill__count">${count}</span>
                     </button>`;
        });

        // Settings gear button
        html += `<button class="bg-pill bg-pill--settings" id="bgManageBtn" title="Gerenciar Grupos">
                    <span class="bg-pill__icon">⚙️</span>
                 </button>`;

        html += '</div>';
        container.innerHTML = html;

        // Event listeners for pills
        container.querySelectorAll('.bg-pill:not(.bg-pill--settings)').forEach(btn => {
            btn.addEventListener('click', () => {
                const newId = btn.dataset.groupId;
                setActiveGroupId(newId);
                container.querySelectorAll('.bg-pill').forEach(b => b.classList.remove('bg-pill--active'));
                btn.classList.add('bg-pill--active');
                onGroupChangeCallbacks.forEach(cb => cb(newId));
            });
        });

        // Settings button
        const manageBtn = document.getElementById('bgManageBtn');
        if (manageBtn) {
            manageBtn.addEventListener('click', () => openManagementModal());
        }
    }

    // ── Register change callback ─────────────────────────────────────────
    function onGroupChange(callback) {
        onGroupChangeCallbacks.push(callback);
    }

    // ══════════════════════════════════════════════════════════════════════
    // ── MANAGEMENT MODAL ─────────────────────────────────────────────────
    // ══════════════════════════════════════════════════════════════════════

    async function openManagementModal() {
        await loadAvailableAccounts();

        // Remove existing modal if any
        const existing = document.getElementById('bgManagementModal');
        if (existing) existing.remove();

        const modal = document.createElement('div');
        modal.id = 'bgManagementModal';
        modal.className = 'bgm-overlay';
        modal.innerHTML = buildModalHTML();
        document.body.appendChild(modal);

        // Animate in
        requestAnimationFrame(() => modal.classList.add('bgm-overlay--visible'));

        // Bind events
        bindModalEvents(modal);
    }

    function buildModalHTML() {
        const groups = groupsConfig ? groupsConfig.groups : [];

        let groupListHTML = '';
        groups.forEach((g, idx) => {
            groupListHTML += buildGroupCard(g, idx);
        });

        return `
        <div class="bgm-modal">
            <div class="bgm-header">
                <h2>⚙️ Gerenciar Grupos de Negócio</h2>
                <button class="bgm-close" id="bgmClose">✕</button>
            </div>
            <div class="bgm-body">
                <div class="bgm-groups-list" id="bgmGroupsList">
                    ${groupListHTML || '<p class="bgm-empty">Nenhum grupo criado. Clique em "Novo Grupo" para começar.</p>'}
                </div>
                <button class="bgm-add-btn" id="bgmAddGroup">
                    <span>＋</span> Novo Grupo
                </button>
            </div>
            <div class="bgm-footer">
                <button class="bgm-btn bgm-btn--cancel" id="bgmCancel">Cancelar</button>
                <button class="bgm-btn bgm-btn--save" id="bgmSave">💾 Salvar Alterações</button>
            </div>
        </div>`;
    }

    function buildGroupCard(group, index) {
        const assignedSet = new Set(group.accounts);
        const accountChips = allAvailableAccounts.map(acc => {
            const isSelected = assignedSet.has(acc);
            return `<button class="bgm-chip ${isSelected ? 'bgm-chip--selected' : ''}" 
                            data-account="${acc}" data-group-idx="${index}">
                        @${acc}
                    </button>`;
        }).join('');

        return `
        <div class="bgm-group-card" data-group-idx="${index}">
            <div class="bgm-group-header">
                <div class="bgm-group-title-row">
                    <input type="text" class="bgm-input bgm-input--icon" data-field="icon" data-idx="${index}" 
                           value="${group.icon}" placeholder="🏷️" maxlength="4" title="Emoji do grupo">
                    <input type="text" class="bgm-input bgm-input--name" data-field="name" data-idx="${index}" 
                           value="${group.name}" placeholder="Nome do grupo">
                    <button class="bgm-delete-btn" data-idx="${index}" title="Excluir grupo">🗑️</button>
                </div>
                <div class="bgm-group-id">ID: ${group.id}</div>
            </div>
            <div class="bgm-accounts-section">
                <div class="bgm-accounts-label">Contas (clique para adicionar/remover):</div>
                <div class="bgm-accounts-chips" data-group-idx="${index}">
                    ${accountChips || '<span class="bgm-no-accounts">Nenhuma conta disponível</span>'}
                </div>
                <div class="bgm-selected-count" data-group-idx="${index}">
                    ${group.accounts.length} conta(s) selecionada(s)
                </div>
            </div>
        </div>`;
    }

    function bindModalEvents(modal) {
        // Close
        modal.querySelector('#bgmClose').addEventListener('click', () => closeModal(modal));
        modal.querySelector('#bgmCancel').addEventListener('click', () => closeModal(modal));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(modal);
        });

        // Add new group
        modal.querySelector('#bgmAddGroup').addEventListener('click', () => {
            const newGroup = {
                id: 'grupo-' + Date.now(),
                name: '',
                icon: '📁',
                accounts: []
            };
            groupsConfig.groups.push(newGroup);
            refreshModalContent(modal);
        });

        // Save
        modal.querySelector('#bgmSave').addEventListener('click', async () => {
            // Read current values from inputs
            syncInputsToConfig(modal);

            // Validate
            const invalid = groupsConfig.groups.find(g => !g.name.trim());
            if (invalid) {
                alert('Por favor, preencha o nome de todos os grupos.');
                return;
            }

            // Generate clean IDs from names
            groupsConfig.groups.forEach(g => {
                g.id = g.name.trim().toLowerCase()
                    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '');
            });

            const saveBtn = modal.querySelector('#bgmSave');
            saveBtn.textContent = 'Salvando...';
            saveBtn.disabled = true;

            const success = await saveBusinessGroups();
            if (success) {
                // Reload the page to guarantee fresh render
                window.location.reload();
            } else {
                alert('Erro ao salvar. Tente novamente.');
                saveBtn.textContent = '💾 Salvar Alterações';
                saveBtn.disabled = false;
            }
        });

        // Delegate: account chips and delete buttons
        bindDelegatedEvents(modal);
    }

    function bindDelegatedEvents(modal) {
        const body = modal.querySelector('.bgm-body');

        body.addEventListener('click', (e) => {
            // Account chip toggle
            const chip = e.target.closest('.bgm-chip');
            if (chip) {
                const acc = chip.dataset.account;
                const idx = parseInt(chip.dataset.groupIdx);
                const group = groupsConfig.groups[idx];
                if (!group) return;

                const pos = group.accounts.indexOf(acc);
                if (pos >= 0) {
                    group.accounts.splice(pos, 1);
                    chip.classList.remove('bgm-chip--selected');
                } else {
                    group.accounts.push(acc);
                    chip.classList.add('bgm-chip--selected');
                }

                // Update count
                const countEl = body.querySelector(`.bgm-selected-count[data-group-idx="${idx}"]`);
                if (countEl) countEl.textContent = `${group.accounts.length} conta(s) selecionada(s)`;
                return;
            }

            // Delete group
            const delBtn = e.target.closest('.bgm-delete-btn');
            if (delBtn) {
                const idx = parseInt(delBtn.dataset.idx);
                const group = groupsConfig.groups[idx];
                if (group && confirm(`Excluir o grupo "${group.name || 'Sem nome'}"?`)) {
                    groupsConfig.groups.splice(idx, 1);
                    refreshModalContent(modal);
                }
            }
        });

        // Input changes
        body.addEventListener('input', (e) => {
            if (e.target.matches('.bgm-input')) {
                const idx = parseInt(e.target.dataset.idx);
                const field = e.target.dataset.field;
                if (groupsConfig.groups[idx]) {
                    groupsConfig.groups[idx][field] = e.target.value;
                }
            }
        });
    }

    function syncInputsToConfig(modal) {
        modal.querySelectorAll('.bgm-input').forEach(input => {
            const idx = parseInt(input.dataset.idx);
            const field = input.dataset.field;
            if (groupsConfig.groups[idx]) {
                groupsConfig.groups[idx][field] = input.value;
            }
        });
    }

    function refreshModalContent(modal) {
        const groupsList = modal.querySelector('#bgmGroupsList');
        let html = '';
        groupsConfig.groups.forEach((g, idx) => {
            html += buildGroupCard(g, idx);
        });
        groupsList.innerHTML = html || '<p class="bgm-empty">Nenhum grupo criado. Clique em "Novo Grupo" para começar.</p>';
    }

    function closeModal(modal) {
        modal.classList.remove('bgm-overlay--visible');
        setTimeout(() => modal.remove(), 300);
    }

    // ── Inject CSS ───────────────────────────────────────────────────────
    function injectStyles() {
        if (document.getElementById('bg-styles')) return;
        const style = document.createElement('style');
        style.id = 'bg-styles';
        style.textContent = `
            /* ── Group Selector Pills ── */
            .bg-selector-wrapper {
                padding: 16px 20px 0;
                max-width: 1400px;
                margin: 0 auto;
            }
            .bg-selector {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
                margin-bottom: 8px;
                align-items: center;
            }
            .bg-pill {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 10px 18px;
                border-radius: 50px;
                border: 1px solid var(--glass-border, rgba(255,255,255,0.1));
                background: var(--glass-bg, rgba(255,255,255,0.05));
                color: var(--text-secondary, #a0a0a0);
                font-family: 'Outfit', sans-serif;
                font-size: 0.85rem;
                font-weight: 400;
                cursor: pointer;
                transition: all 0.3s ease;
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(10px);
            }
            .bg-pill:hover {
                border-color: var(--accent, #FFFD00);
                color: var(--text-primary, #fff);
                background: rgba(255, 253, 0, 0.08);
                transform: translateY(-1px);
            }
            .bg-pill--active {
                border-color: var(--accent, #FFFD00);
                color: var(--bg-color, #0d0d0d);
                background: var(--accent, #FFFD00);
                font-weight: 600;
                box-shadow: 0 0 20px rgba(255, 253, 0, 0.25);
            }
            .bg-pill--active:hover {
                background: var(--accent, #FFFD00);
                color: var(--bg-color, #0d0d0d);
            }
            .bg-pill__icon {
                font-size: 1.1rem;
            }
            .bg-pill__count {
                background: rgba(255,255,255,0.15);
                padding: 2px 8px;
                border-radius: 20px;
                font-size: 0.7rem;
                font-weight: 600;
            }
            .bg-pill--active .bg-pill__count {
                background: rgba(0,0,0,0.15);
            }
            .bg-pill--settings {
                padding: 10px 14px;
                opacity: 0.5;
                border-style: dashed;
            }
            .bg-pill--settings:hover {
                opacity: 1;
            }

            /* ── Management Modal ── */
            .bgm-overlay {
                position: fixed;
                inset: 0;
                z-index: 10000;
                background: rgba(0,0,0,0.7);
                backdrop-filter: blur(8px);
                -webkit-backdrop-filter: blur(8px);
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
                padding: 20px;
            }
            .bgm-overlay--visible {
                opacity: 1;
            }
            .bgm-modal {
                background: #1a1a2e;
                border: 1px solid rgba(255,255,255,0.12);
                border-radius: 20px;
                width: 100%;
                max-width: 700px;
                max-height: 85vh;
                display: flex;
                flex-direction: column;
                box-shadow: 0 25px 80px rgba(0,0,0,0.6);
                animation: bgmSlideIn 0.3s ease;
            }
            @keyframes bgmSlideIn {
                from { transform: translateY(20px) scale(0.97); opacity: 0; }
                to { transform: translateY(0) scale(1); opacity: 1; }
            }
            .bgm-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem 2rem;
                border-bottom: 1px solid rgba(255,255,255,0.08);
            }
            .bgm-header h2 {
                font-family: 'Outfit', sans-serif;
                font-size: 1.25rem;
                font-weight: 600;
                color: #fff;
                margin: 0;
            }
            .bgm-close {
                background: none;
                border: none;
                color: #888;
                font-size: 1.4rem;
                cursor: pointer;
                padding: 4px 8px;
                border-radius: 8px;
                transition: all 0.2s;
            }
            .bgm-close:hover {
                background: rgba(255,255,255,0.1);
                color: #fff;
            }
            .bgm-body {
                flex: 1;
                overflow-y: auto;
                padding: 1.5rem 2rem;
            }
            .bgm-body::-webkit-scrollbar { width: 6px; }
            .bgm-body::-webkit-scrollbar-track { background: transparent; }
            .bgm-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 3px; }

            /* Group Card */
            .bgm-group-card {
                background: rgba(255,255,255,0.04);
                border: 1px solid rgba(255,255,255,0.08);
                border-radius: 14px;
                padding: 1.25rem;
                margin-bottom: 1rem;
                transition: border-color 0.3s;
            }
            .bgm-group-card:hover {
                border-color: rgba(255,253,0,0.2);
            }
            .bgm-group-header {
                margin-bottom: 1rem;
            }
            .bgm-group-title-row {
                display: flex;
                gap: 10px;
                align-items: center;
            }
            .bgm-group-id {
                font-size: 0.7rem;
                color: #555;
                margin-top: 6px;
                font-family: monospace;
            }
            .bgm-input {
                background: rgba(255,255,255,0.06);
                border: 1px solid rgba(255,255,255,0.1);
                border-radius: 8px;
                color: #fff;
                font-family: 'Outfit', sans-serif;
                font-size: 0.95rem;
                padding: 8px 12px;
                outline: none;
                transition: border-color 0.3s;
            }
            .bgm-input:focus {
                border-color: var(--accent, #FFFD00);
            }
            .bgm-input--icon {
                width: 50px;
                text-align: center;
                font-size: 1.3rem;
                padding: 6px;
            }
            .bgm-input--name {
                flex: 1;
            }
            .bgm-delete-btn {
                background: none;
                border: 1px solid rgba(255,70,70,0.2);
                border-radius: 8px;
                padding: 6px 10px;
                cursor: pointer;
                font-size: 1rem;
                transition: all 0.2s;
                color: #ff4646;
            }
            .bgm-delete-btn:hover {
                background: rgba(255,70,70,0.15);
                border-color: rgba(255,70,70,0.5);
            }

            /* Account Chips */
            .bgm-accounts-section {
                margin-top: 0.5rem;
            }
            .bgm-accounts-label {
                font-size: 0.8rem;
                color: #888;
                margin-bottom: 8px;
                font-family: 'Outfit', sans-serif;
            }
            .bgm-accounts-chips {
                display: flex;
                flex-wrap: wrap;
                gap: 6px;
            }
            .bgm-chip {
                padding: 5px 12px;
                border-radius: 20px;
                font-size: 0.78rem;
                font-family: 'Outfit', sans-serif;
                font-weight: 400;
                cursor: pointer;
                border: 1px solid rgba(255,255,255,0.1);
                background: rgba(255,255,255,0.04);
                color: #888;
                transition: all 0.2s;
            }
            .bgm-chip:hover {
                border-color: rgba(255,253,0,0.4);
                color: #ccc;
            }
            .bgm-chip--selected {
                background: rgba(255,253,0,0.15);
                border-color: var(--accent, #FFFD00);
                color: var(--accent, #FFFD00);
                font-weight: 600;
            }
            .bgm-chip--selected:hover {
                background: rgba(255,253,0,0.25);
            }
            .bgm-selected-count {
                font-size: 0.75rem;
                color: var(--accent, #FFFD00);
                margin-top: 8px;
                font-family: 'Outfit', sans-serif;
            }
            .bgm-no-accounts {
                color: #555;
                font-size: 0.8rem;
                font-style: italic;
            }
            .bgm-empty {
                color: #666;
                text-align: center;
                padding: 2rem;
                font-family: 'Outfit', sans-serif;
            }

            /* Add Button */
            .bgm-add-btn {
                width: 100%;
                padding: 14px;
                border: 2px dashed rgba(255,255,255,0.12);
                border-radius: 14px;
                background: transparent;
                color: #888;
                font-family: 'Outfit', sans-serif;
                font-size: 0.95rem;
                cursor: pointer;
                transition: all 0.3s;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
            }
            .bgm-add-btn:hover {
                border-color: var(--accent, #FFFD00);
                color: var(--accent, #FFFD00);
                background: rgba(255,253,0,0.05);
            }
            .bgm-add-btn span {
                font-size: 1.3rem;
                font-weight: 300;
            }

            /* Footer */
            .bgm-footer {
                display: flex;
                justify-content: flex-end;
                gap: 10px;
                padding: 1.25rem 2rem;
                border-top: 1px solid rgba(255,255,255,0.08);
            }
            .bgm-btn {
                padding: 10px 24px;
                border-radius: 10px;
                border: none;
                font-family: 'Outfit', sans-serif;
                font-size: 0.9rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s;
            }
            .bgm-btn--cancel {
                background: rgba(255,255,255,0.06);
                color: #888;
                border: 1px solid rgba(255,255,255,0.1);
            }
            .bgm-btn--cancel:hover {
                color: #fff;
                border-color: rgba(255,255,255,0.3);
            }
            .bgm-btn--save {
                background: var(--accent, #FFFD00);
                color: #000;
            }
            .bgm-btn--save:hover {
                filter: brightness(0.9);
                transform: translateY(-1px);
                box-shadow: 0 4px 15px rgba(255,253,0,0.3);
            }
            .bgm-btn--save:disabled {
                opacity: 0.5;
                cursor: not-allowed;
                transform: none;
            }
        `;
        document.head.appendChild(style);
    }

    // ── Init: auto-setup on load ─────────────────────────────────────────
    async function initBusinessGroups(containerId, changeCallback) {
        injectStyles();
        await loadBusinessGroups();
        renderGroupSelector(containerId);
        if (changeCallback) {
            onGroupChange(changeCallback);
        }
        return groupsConfig;
    }

    // ── Public API ───────────────────────────────────────────────────────
    window.BusinessGroups = {
        init: initBusinessGroups,
        load: loadBusinessGroups,
        render: renderGroupSelector,
        filterPosts: filterPostsByGroup,
        getActiveGroupId: getActiveGroupId,
        getActiveGroup: getActiveGroup,
        getGroupAccounts: getGroupAccounts,
        onGroupChange: onGroupChange
    };

})();
