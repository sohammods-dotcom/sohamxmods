export interface AppRecord {
  id: string;
  name: string;
  description: string;
  version: string;
  iconUrl: string;
  apkUrl: string;
  downloadCount: number;
  createdAt: number;
  updatedAt: number;
}

export interface CreateAppPayload {
  name: string;
  description: string;
  version: string;
  iconFile: File | null;
  apkFile: File | null;
}

export interface UpdateAppPayload extends CreateAppPayload {
  id: string;
}

export type AdminSession = {
  authenticated: boolean;
  token: string | null;
};
