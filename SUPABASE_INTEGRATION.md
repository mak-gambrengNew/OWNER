# Supabase integration contract

## Authentication
Supabase Auth email/password. The legacy `verify_owner_access` RPC is not used for production session creation because it only validates a code and returns an owner id; it does not mint an Auth session. The existing Owner RPCs require `auth.uid()`.

## Source of truth
All operational values displayed by the PWA are loaded from Supabase after authentication.

## CRUD mapping
- Gerai → `owner_upsert_store`
- Menu → `owner_upsert_menu`
- Inventory → `owner_create_inventory_item` / `owner_update_inventory_item`
- SPG / Checker → `owner_update_member` + `owner_set_member_status`
- WhatsApp Es Kristal → `owner_upsert_whatsapp_contact`

Deletes are implemented as server-side deactivation where the backend contract exposes status, preserving operational history.

## Realtime
Subscriptions refresh the dashboard when stores, menus, inventory, monitoring transactions, operation sessions, notifications, or audit logs change.
