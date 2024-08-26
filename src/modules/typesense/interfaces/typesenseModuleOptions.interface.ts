export interface TypesenseModuleOptions {
  nodes: Array<{
    host: string;
    port: number;
    protocol: string;
  }>;
  apiKey: string;
}
