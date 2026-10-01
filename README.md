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

The Owner account already present in the project is `owner@panel.com`; use its actual Supabase Auth password.

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
