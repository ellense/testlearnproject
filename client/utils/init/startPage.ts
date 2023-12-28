import type { UserRole } from "../types/authTypes";
import { useAuthStore } from "~/stores/authStore";

export const startPage = (): string | undefined => {
  const role: UserRole | null = useAuthStore().userRole;
  useAuthStore().setInitPage(true);

  if (role) {
    switch (role) {
      case "admin":
        return "/ku";

      case "manager":
        return "/graphic";

      default:
        return undefined;
    }
  }
};
