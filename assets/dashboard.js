function defaultHighlights(){
 return [
  {kind:'default',eyebrow:'RINGKASAN HARI INI',title:'Transaksi Hari Ini',value:totalTransactions+' transaksi',meta:'Transaksi yang tercatat di server untuk hari ini',icon:'🧾'},
  {kind:'default',eyebrow:'MENU TERLARIS',title:'Menu Terlaris Hari Ini',value:topMenu[0],meta:topMenu[1]+' terjual · berdasarkan transaksi server',icon:'🍹'},
  {kind:'default',eyebrow:'PENDAPATAN',title:'Pendapatan Hari Ini',value:rp(total),meta:'Pendapatan tercatat dari sumber transaksi server',icon:'💰'}
 ]
}
function home(){
 const greeting=state.header?.greeting||ownerGreeting();
 setTimeout(()=>{startHighlight();startJakartaClock()},40);
 return `<header class="owner-command-header">
   <div class="owner-header-top">
     <div class="owner-brand-lockup">
       <div class="owner-logo"><img src="${BRAND_LOGO}" alt="Teh Solo Ma-Gambreng"></div>
       <div class="owner-identity"><span>${esc(state.header?.business_name||'TEH SOLO MA-GAMBRENG')}</span><strong>${esc(greeting)}</strong></div>
     </div>
     <button class="owner-notify" data-o="audit" aria-label="Notifikasi">🔔<i class="${state.notifications.length?'on':''}"></i></button>
   </div>
   <div class="owner-header-bottom">
     <div class="owner-date-block"><span>OWNER COMMAND CENTER</span><b id="owner-date">Memuat tanggal...</b></div>
     <div class="owner-clock-block"><strong id="owner-clock">--:--:--</strong><span>WIB · JAKARTA · GMT+7</span></div>
   </div>
 </header>
<section class="highlight-host">${renderHighlight()}</section>
<section class="lux-section"><div class="lux-section-head"><div><span class="eyebrow">COMMAND</span><h2>Aksi utama</h2></div><span class="lux-count">8 tindakan</span></div><div class="lux-actions">
<button data-o="team"><span class="lux-action-icon">🧑‍🤝‍🧑</span><b>My Team</b><small>Tim operasional</small></button>
<button data-o="gerai"><span class="lux-action-icon">🏪</span><b>Gerai</b><small>Kelola gerai</small></button>
<button data-o="nota"><span class="lux-action-icon">🧾</span><b>Nota</b><small>Transaksi</small></button>
<button data-o="tagihan"><span class="lux-action-icon">💰</span><b>Tagihan</b><small>Jatuh tempo</small></button>
<button data-o="history-beli-bayar"><span class="lux-action-icon">🛒</span><b>History Beli&amp;Bayar</b><small>Riwayat</small></button>
<button data-o="pengumuman"><span class="lux-action-icon">📣</span><b>Buat Pengumuman</b><small>Tim gerai</small></button>
<button data-o="log-aktifitas"><span class="lux-action-icon">🧾</span><b>Log Aktifitas</b><small>Audit sistem</small></button>
<button data-o="set-menu"><span class="lux-action-icon">🍹</span><b>Set Menu</b><small>Kelola menu</small></button>
</div></section>
<section class="sec"><h2>Status Gerai</h2><div class="card">${gerai.length?gerai.map(g=>li('🏪',esc(g.nama),g.session?`Session aktif · ${esc(g.session.opened_at||'')}`:'Tidak ada session aktif',`<span class="chip ${g.session?'ok':''}">${g.session?'BUKA':'TUTUP'}</span>`)).join(''):'<div class="empty">Belum ada gerai yang terdaftar.</div>'}</div></section>`;
}
window.OWNER_PAGE={tab:'home',render:home};
