interface DatabaseConfig {
    url: string;
}
interface AppConfig {
    port: number;
    environment: string;
    database: DatabaseConfig;
}
declare const _default: import("@nestjs/config").ConfigFactory<AppConfig> & import("@nestjs/config").ConfigFactoryKeyHost<AppConfig | Promise<AppConfig>>;
export default _default;
