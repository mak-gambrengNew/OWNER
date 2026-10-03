function lap(){
 return head('Laporan','Pilih laporan yang ingin dilihat')+
 `<section class="report-picker">
   <div class="report-picker-title"><span class="eyebrow">PUSAT LAPORAN OWNER</span><h2>Pilih laporan</h2><p>Setiap laporan memiliki halaman dan data masing-masing.</p></div>
   <div class="report-choice-grid">
    <button data-o="report-penjualan"><span>🧾</span><b>Laporan Penjualan</b><small>Transaksi, menu, jumlah, pembayaran, dan detail penjualan.</small></button>
    <button data-o="report-gerai"><span>🏪</span><b>Laporan Performa Gerai</b><small>Aktivitas dan hasil penjualan per gerai.</small></button>
    <button data-o="report-menu"><span>🍹</span><b>Laporan Performa Menu</b><small>Pergerakan dan penjualan setiap menu.</small></button>
    <button data-o="report-checker"><span>✅</span><b>Laporan Pengecekkan Oleh Checker</b><small>Hasil audit dan pemeriksaan gerai.</small></button>
    <button data-o="report-keuangan"><span>💰</span><b>Laporan Keuangan</b><small>Pendapatan dan aktivitas keuangan yang tercatat.</small></button>
    <button data-o="report-logistik"><span>📦</span><b>Laporan Logistik</b><small>Stok, pergerakan, dan permintaan restok.</small></button>
    <button data-o="report-es"><span>🧊</span><b>Laporan Pemakaian Es Kristal</b><small>Penerimaan, stok, pemakaian, dan pergerakan es.</small></button>
   </div>
   <button class="report-download" data-o="download-report">DOWNLOAD LAPORAN</button>
 </section>`;
}

const REPORT_DEFS={
 penjualan:['Laporan Penjualan','Penjualan','Tanggal/rentang, status final/provisional, total penjualan, jumlah transaksi, per gerai, per menu, metode pembayaran, detail transaksi, timestamp, dan pemeriksaan konsistensi.'],
 gerai:['Laporan Performa Gerai','Performa Gerai','Khusus data performa setiap gerai: transaksi, penjualan, dan status operasional pada periode yang dipilih.'],
 menu:['Laporan Performa Menu','Performa Menu','Khusus pergerakan menu: jumlah terjual dan nilai penjualan per menu pada periode yang dipilih.'],
 checker:['Laporan Pengecekkan Oleh Checker','Pengecekkan Checker','Khusus hasil pemeriksaan Checker, hasil audit, item pemeriksaan, dan status penutupan gerai.'],
 keuangan:['Laporan Keuangan','Keuangan','Fokus pada pendapatan yang tercatat dan perbandingan harian, mingguan, serta bulanan. Pengeluaran hanya ditampilkan jika memiliki catatan sumber.'],
 logistik:['Laporan Logistik','Logistik','Khusus stok, pergerakan inventory, permintaan restok, dan aktivitas logistik.'],
 es:['Laporan Pemakaian Es Kristal','Pemakaian Es Kristal','Khusus pesanan, penerimaan, stok, pemakaian, dan pergerakan es kristal.']
};
async function showReport(key,start=todayJakarta(),end=todayJakarta()){
 window.__selectedReport=key;
 const d=REPORT_DEFS[key]||REPORT_DEFS.penjualan;
 tab='lap';
 const v=$('#v');
 if(v){v.innerHTML=head(d[0],d[1])+`<section class="report-detail-page"><button class="report-back" data-o="back-reports">‹ Kembali ke daftar laporan</button><div class="report-detail-head"><span class="eyebrow">LAPORAN OWNER</span><h2>${d[0]}</h2><p>${d[2]}</p></div><div class="report-filter-card"><div><b>Periode laporan</b><small>${esc(start)} s/d ${esc(end)}</small></div><button class="btn ghost" data-o="report-period">Ubah tanggal</button></div><div class="report-status-card"><span>Status data</span><b>SERVER REPORT</b><small>Data diambil melalui owner_get_report; tidak menggunakan angka demo.</small></div><div class="report-empty"><span>⏳</span><b>Memuat laporan...</b><small>Menyiapkan laporan...</small></div></section>`;bind();svgify(v)}
 try{
   const data=await rpc('owner_get_report',{p_report_type:key,p_start_date:start,p_end_date:end,p_store_id:null});
   const pretty=esc(JSON.stringify(data,null,2));
   if(v)v.querySelector('.report-empty').outerHTML=`<div class="report-preview-box"><b>Data laporan server</b><pre style="white-space:pre-wrap;overflow:auto;max-height:52vh">${pretty}</pre></div>`;
 }catch(e){
   if(v)v.querySelector('.report-empty').innerHTML=`<span>⚠️</span><b>Laporan tidak tersedia</b><small>${esc(e.message||'Server menolak permintaan laporan.')}</small>`;
 }
}
function backReports(){draw()}
function downloadReportFlow(){
 sheet(`<div class="download-flow"><div class="crud-form-head"><span class="eyebrow">DOWNLOAD LAPORAN</span><h3>Pilih tanggal</h3></div><label class="crud-field"><span>Tanggal mulai</span><input class="fld" id="dl-start" type="date" value="${todayJakarta()}"></label><label class="crud-field"><span>Tanggal akhir</span><input class="fld" id="dl-end" type="date" value="${todayJakarta()}"></label><button class="btn" data-x="preview-report">Preview laporan</button><div class="hint">PDF hanya dapat diunduh jika laporan tersedia. Angka laporan selalu berasal dari data yang tercatat.</div></div>`);
}
window.OWNER_PAGE={tab:'lap',render:lap};
