import { Skeleton } from "@/components/ui/skeleton";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// Lazy page imports
const HomePage = lazy(() =>
  import("./pages/HomePage").then((m) => ({ default: m.HomePage })),
);
const AppDetailPage = lazy(() =>
  import("./pages/AppDetailPage").then((m) => ({ default: m.AppDetailPage })),
);
const AdminLoginPage = lazy(() =>
  import("./pages/AdminLoginPage").then((m) => ({ default: m.AdminLoginPage })),
);
const AdminDashboardPage = lazy(() =>
  import("./pages/AdminDashboardPage").then((m) => ({
    default: m.AdminDashboardPage,
  })),
);

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="space-y-4 w-full max-w-sm px-6">
        <Skeleton className="h-8 w-3/4 bg-muted/40" />
        <Skeleton className="h-4 w-full bg-muted/30" />
        <Skeleton className="h-4 w-5/6 bg-muted/30" />
      </div>
    </div>
  );
}

// Root route
const rootRoute = createRootRoute({
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  ),
});

// Routes
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const appDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/app/$id",
  component: AppDetailPage,
});

const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminLoginPage,
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/dashboard",
  component: AdminDashboardPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  appDetailRoute,
  adminLoginRoute,
  adminDashboardRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
