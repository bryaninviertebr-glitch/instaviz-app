// ============================================================
// InstaScraping — Configuración
// ============================================================
// ⚠️ Reemplaza estos valores con tus credenciales reales.
// La SUPABASE_ANON_KEY es pública (solo lectura).
// La SERVICE_ROLE_KEY NUNCA debe ir aquí — solo en n8n.
// ============================================================

const CONFIG = {
    // URL del webhook de n8n (POST /scrape)
    WEBHOOK_URL: 'https://webhooks-mvp.leadboom.app/webhook/apify-scrapy-insta',

    // Supabase (solo lectura desde el frontend)
    SUPABASE_URL: 'https://erfzjwahocltycrrmbnq.supabase.co',
    SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVyZnpqd2Fob2NsdHljcnJtYm5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3NzcyNjUsImV4cCI6MjA4NjM1MzI2NX0.Ge6mK9xZ_2JSNGw4Bw9Xf0ELWJ5d4VfEsxE5lTQ2iDU',
};
