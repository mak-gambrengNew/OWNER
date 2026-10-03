function gud(){
 return head('Gudang','Stok logistik pusat')+`<div class="sec" style="margin-top:16px"><div class="card">${stok.length?stok.map(s=>{const p=s.minimum>0?Math.min(100,(s.stok/s.minimum)*100):100;return `<div class="li"><div class="b"><div class="row"><b>${esc(s.nama)}</b><span>${esc(s.stok)} / min ${esc(s.minimum)} ${esc(s.satuan)}</span></div><div class="bar ${s.stok<s.minimum?'low':''}"><i style="width:${p}%"></i></div></div></div>`}).join(''):'<div class="empty">Belum ada persediaan yang terdaftar.</div>'}</div><div class="section-note">Stok yang ditampilkan berasal dari catatan stok yang tersimpan di sistem.</div></div>`;
}
window.OWNER_PAGE={tab:'gud',render:gud};
