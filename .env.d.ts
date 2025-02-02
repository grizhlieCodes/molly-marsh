interface ImportMetaEnv {
    readonly PUBLIC_STORYBLOK_ACCESS_TOKEN: string;
    readonly STRIPE_SECRET_KEY: string;
    readonly ALLOWED_ORIGINS: string;
    readonly NOTION_API_TOKEN: string;
    readonly NOTION_CLIENTS_DB: string;
    readonly NOTION_SESSIONS_DB: string;
    readonly NOTION_INVOICES_DB: string;
    readonly NOTION_PACKAGES_DB: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}