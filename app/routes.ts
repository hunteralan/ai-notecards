import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("routes/auth/index.tsx", [
    route("auth/signIn", "routes/auth/signIn.tsx"),
    route("auth/callback", "routes/auth/callback.tsx"),
  ]),
] satisfies RouteConfig;
