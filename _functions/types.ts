export interface Env {
    NODE_ENV:'development'|'production'|'staging';
    SECRET:string;
    BASIC_AUTH_USER?:string;
    BASIC_AUTH_PASSWORD?:string;
}
