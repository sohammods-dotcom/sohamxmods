import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type AppId = bigint;
export interface App {
    id: AppId;
    name: string;
    createdAt: Timestamp;
    apkBlob: ExternalBlob;
    description: string;
    iconBlob: ExternalBlob;
    version: string;
    updatedAt: Timestamp;
    downloadCount: bigint;
}
export type Timestamp = bigint;
export interface UpdateAppArgs {
    id: AppId;
    name: string;
    apkBlob: ExternalBlob;
    description: string;
    iconBlob: ExternalBlob;
    version: string;
}
export interface CreateAppArgs {
    name: string;
    apkBlob: ExternalBlob;
    description: string;
    iconBlob: ExternalBlob;
    version: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createApp(args: CreateAppArgs): Promise<App>;
    deleteApp(id: AppId): Promise<boolean>;
    getApp(id: AppId): Promise<App | null>;
    getCallerUserRole(): Promise<UserRole>;
    incrementDownload(id: AppId): Promise<boolean>;
    isCallerAdmin(): Promise<boolean>;
    listApps(): Promise<Array<App>>;
    searchApps(term: string): Promise<Array<App>>;
    updateApp(args: UpdateAppArgs): Promise<App | null>;
}
