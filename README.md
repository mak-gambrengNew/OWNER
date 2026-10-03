# PWA Owner — Ma-Gambreng

Server-backed replacement of `panel_owner_crud_flow_fixed.html`.

## Important

- Operational mock/seed/testing data has been removed from the frontend.
- No `localStorage` is used for business state, authentication, CRUD, sales, inventory, reports, or audit data.
- Supabase Auth is required because the existing Owner RPCs use `auth.uid()` and RLS.
- The browser only contains the Supabase publishable key. Never add a service-role/secret key.
- Realtime subscriptions refresh Owner state when server data changes.

## Supabase project

The repo is configured for the existing project:

`bhdnkvjktznkdwoqrvlb`

Owner login is resolved from the active Owner attached to the `MA-GAMBRENG` business record on the server. The browser asks only for the Owner access code; that code is the Supabase Auth password. The Owner email is never hardcoded in the browser.

## Main server integration

The frontend uses the existing backend RPCs, including:

- `owner_get_header_context`
- `owner_get_money_timeline`
- `owner_get_notification_badge`
- `owner_get_report`
- `owner_list_members`
- `owner_upsert_store`
- `owner_upsert_menu`
- `owner_create_inventory_item`
- `owner_update_inventory_item`
- `owner_set_inventory_logistics_type`
- `owner_update_member`
- `owner_set_member_status`
- `owner_set_menu_status`
- `owner_upsert_whatsapp_contact`
- `owner_list_whatsapp_contacts`

Operational data is also read from the existing server tables for stores, menus, inventory, sessions, monitoring transactions, notifications, bills, ice orders, restock requests, and audit logs.

## Run

A static server is recommended because service workers do not run from `file://`.

Examples:

```bash
python -m http.server 8080
```

Then open:

`http://localhost:8080/`

## Production notes

The repo deliberately does not invent missing backend capabilities. Features whose backend contract is absent are presented as unavailable rather than silently writing fake/local data.

The PDF flow only reports backend-provided report data; it does not fabricate a PDF from client-side numbers.

## Owner login flow

- Halaman masuk hanya meminta **Kode akses**.
- Browser memanggil `owner_get_login_identity` untuk mendapatkan akun Owner aktif dari server.
- Email Owner tidak ditulis atau dikunci di frontend.
- Kode akses dikirim langsung ke Supabase Auth sebagai password akun Owner.
- Setelah sesi berhasil dibuat, halaman memuat data Owner melalui RPC dan RLS yang sudah ada.
- Jika akun Owner diganti kemudian pada data server, halaman mengikuti akun aktif terbaru tanpa perubahan kode frontend.


## Struktur halaman modular

Setiap halaman utama memiliki HTML dan JavaScript halaman sendiri. Logic yang benar-benar lintas halaman tetap berada di `assets/core.js`, sehingga revisi tampilan/fitur satu halaman dapat dilakukan tanpa membongkar halaman lain.

```text
index.html                         → Login Owner
dashboard.html                     → Dashboard
laporan.html                       → Laporan
gudang.html                        → Logistik
kelola-usaha.html                  → Kelola Usaha
pengaturan.html                    → Pengaturan

assets/
├── core.js                         → Supabase, Auth, session, state, realtime, CRUD, shell & aksi bersama
├── dashboard.js                    → Renderer/fitur Dashboard
├── laporan.js                      → Renderer/fitur Laporan + detail laporan
├── logistik.js                     → Renderer/fitur Logistik
├── kelola-usaha.js                 → Entry halaman Kelola Usaha
├── pengaturan.js                   → Renderer/fitur Pengaturan
└── style.css                       → Style UI bersama
```

Navigasi tab utama menggunakan file HTML yang berbeda. Halaman tetap berbagi session Supabase, state server, komponen modal/sheet, autentikasi, realtime, dan style melalui `core.js` sehingga tidak perlu menduplikasi koneksi backend di setiap halaman.

**Aturan pemeliharaan:** jika revisi hanya menyangkut Dashboard, utamakan `dashboard.html` / `assets/dashboard.js`; jika menyangkut Laporan, utamakan `laporan.html` / `assets/laporan.js`; dan seterusnya. Jangan memindahkan logic backend bersama ke file halaman kecuali memang diperlukan.

Tidak ada data operasional baru yang ditambahkan sebagai seed/dummy pada pemecahan ini.
