import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AppRecord } from "../types";

const STORAGE_KEY = "sohamxmods_apps";

function loadApps(): AppRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AppRecord[]) : getSeedApps();
  } catch {
    return getSeedApps();
  }
}

function saveApps(apps: AppRecord[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
}

function getSeedApps(): AppRecord[] {
  const seed: AppRecord[] = [
    {
      id: "1",
      name: "Pixel Weather",
      description:
        "Beautiful, fast weather app with animated forecasts, hourly breakdowns, and a clean Material You interface. Works offline with cached data.",
      version: "3.4.1",
      iconUrl: "/assets/generated/icon-default.jpg",
      apkUrl: "",
      downloadCount: 48200,
      createdAt: Date.now() - 86400000 * 10,
      updatedAt: Date.now() - 86400000 * 2,
    },
    {
      id: "2",
      name: "FocusFlow – Study Timer",
      description:
        "Pomodoro-based productivity timer with session history, ambient sounds, and smart break reminders. Perfect for deep work and study sessions.",
      version: "2.1.0",
      iconUrl: "/assets/generated/icon-default.jpg",
      apkUrl: "",
      downloadCount: 72500,
      createdAt: Date.now() - 86400000 * 8,
      updatedAt: Date.now() - 86400000 * 1,
    },
    {
      id: "3",
      name: "NoteSync Pro",
      description:
        "Rich text note-taking app with Markdown support, cloud backup, tag-based organisation, and lightning-fast full-text search.",
      version: "5.0.3",
      iconUrl: "/assets/generated/icon-default.jpg",
      apkUrl: "",
      downloadCount: 91300,
      createdAt: Date.now() - 86400000 * 6,
      updatedAt: Date.now() - 86400000 * 1,
    },
    {
      id: "4",
      name: "Budget Buddy",
      description:
        "Personal finance tracker with expense categories, monthly summaries, and visual charts. Keep your spending on track with zero effort.",
      version: "1.8.2",
      iconUrl: "/assets/generated/icon-default.jpg",
      apkUrl: "",
      downloadCount: 63800,
      createdAt: Date.now() - 86400000 * 5,
      updatedAt: Date.now() - 86400000 * 1,
    },
    {
      id: "5",
      name: "QuickScan PDF",
      description:
        "Turn your camera into a powerful document scanner. Auto-crop, enhance, and export high-quality PDFs directly from your Android device.",
      version: "4.2.7",
      iconUrl: "/assets/generated/icon-default.jpg",
      apkUrl: "",
      downloadCount: 55100,
      createdAt: Date.now() - 86400000 * 4,
      updatedAt: Date.now() - 86400000 * 1,
    },
    {
      id: "6",
      name: "AstroPlayer Music",
      description:
        "Lightweight offline music player with equaliser, sleep timer, lyrics support, and beautiful album art. No ads, no subscriptions.",
      version: "2.9.1",
      iconUrl: "/assets/generated/icon-default.jpg",
      apkUrl: "",
      downloadCount: 38900,
      createdAt: Date.now() - 86400000 * 3,
      updatedAt: Date.now() - 86400000 * 1,
    },
  ];
  saveApps(seed);
  return seed;
}

export function useApps() {
  return useQuery<AppRecord[]>({
    queryKey: ["apps"],
    queryFn: () => loadApps(),
    refetchInterval: 5000,
  });
}

export function useApp(id: string) {
  return useQuery<AppRecord | null>({
    queryKey: ["app", id],
    queryFn: () => {
      const apps = loadApps();
      return apps.find((a) => a.id === id) ?? null;
    },
    enabled: !!id,
  });
}

export function useSearchApps(term: string) {
  return useQuery<AppRecord[]>({
    queryKey: ["apps", "search", term],
    queryFn: () => {
      const apps = loadApps();
      if (!term.trim()) return apps;
      const lower = term.toLowerCase();
      return apps.filter(
        (a) =>
          a.name.toLowerCase().includes(lower) ||
          a.description.toLowerCase().includes(lower),
      );
    },
    refetchInterval: 5000,
  });
}

export function useCreateApp() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      name: string;
      description: string;
      version: string;
      iconFile: File | null;
      apkFile: File | null;
    }) => {
      const apps = loadApps();
      const iconUrl = payload.iconFile
        ? URL.createObjectURL(payload.iconFile)
        : "/assets/generated/icon-default.dim_120x120.jpg";
      const apkUrl = payload.apkFile
        ? URL.createObjectURL(payload.apkFile)
        : "";
      const newApp: AppRecord = {
        id: String(Date.now()),
        name: payload.name,
        description: payload.description,
        version: payload.version,
        iconUrl,
        apkUrl,
        downloadCount: 0,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      const updated = [newApp, ...apps];
      saveApps(updated);
      return newApp;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["apps"] });
    },
  });
}

export function useUpdateApp() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      id: string;
      name: string;
      description: string;
      version: string;
      iconFile: File | null;
      apkFile: File | null;
    }) => {
      const apps = loadApps();
      const index = apps.findIndex((a) => a.id === payload.id);
      if (index === -1) throw new Error("App not found");
      const existing = apps[index];
      const iconUrl = payload.iconFile
        ? URL.createObjectURL(payload.iconFile)
        : existing.iconUrl;
      const apkUrl = payload.apkFile
        ? URL.createObjectURL(payload.apkFile)
        : existing.apkUrl;
      const updated = {
        ...existing,
        name: payload.name,
        description: payload.description,
        version: payload.version,
        iconUrl,
        apkUrl,
        updatedAt: Date.now(),
      };
      apps[index] = updated;
      saveApps(apps);
      return updated;
    },
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ["apps"] });
      qc.invalidateQueries({ queryKey: ["app", vars.id] });
    },
  });
}

export function useDeleteApp() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const apps = loadApps();
      const filtered = apps.filter((a) => a.id !== id);
      saveApps(filtered);
      return id;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["apps"] });
    },
  });
}

export function useIncrementDownload() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const apps = loadApps();
      const index = apps.findIndex((a) => a.id === id);
      if (index === -1) return;
      apps[index] = {
        ...apps[index],
        downloadCount: apps[index].downloadCount + 1,
      };
      saveApps(apps);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["apps"] });
    },
  });
}
