/** UI-only session helpers. Replace with real auth when your backend is ready. */

export const ADMIN_SESSION_KEY = "srh-admin-ui-session";

export type AdminSession = {
  email: string;
  signedInAt: string;
};

export function readAdminSession(): AdminSession | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (!raw) {
      return null;
    }
    return JSON.parse(raw) as AdminSession;
  } catch {
    return null;
  }
}

export function writeAdminSession(email: string) {
  const session: AdminSession = {
    email,
    signedInAt: new Date().toISOString(),
  };
  window.sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
}

export function clearAdminSession() {
  window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
}
