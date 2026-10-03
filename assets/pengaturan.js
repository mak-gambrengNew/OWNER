function adm(){
 return head('Pengaturan','Keamanan, akun & data')+`<div class="sec" style="margin-top:16px"><h2>Keamanan</h2><div class="card"><button class="set" data-o="kode">Ubah kode akses Owner <span>›</span></button><button class="set" data-o="audit">Audit Log <span>›</span></button><button class="set" data-o="edit">Pusat Edit Data <span>🔒</span></button></div></div>
 <div class="sec"><h2>Data usaha</h2><div class="card"><button class="set" data-o="menu">Kelola Menu <span>›</span></button><button class="set" data-o="hpp">Periode perhitungan HPP <span>›</span></button></div></div>
 <div class="sec"><button class="btn" style="background:var(--bad)" data-o="out">Keluar</button><div class="hint">Mak-Gambreng Owner</div></div>`;
}

/* ===== Aksi ===== */
window.OWNER_PAGE={tab:'adm',render:adm};
