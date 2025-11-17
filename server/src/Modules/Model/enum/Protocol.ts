export enum Protocol {
    BASE = "://",
    HTTP = "http",
    HTTPS = "https"
}

export namespace ProtocolFormatter {
    export function format(p: Protocol): string {
        return `${p}${Protocol.BASE.toString()}`;
    }
}