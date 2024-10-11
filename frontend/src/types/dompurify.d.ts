declare module "dompurify" {
  export function sanitize(dirty: string, options?: any): string;
  export default { sanitize };
}
