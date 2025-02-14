import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  ...prefix("auth", [
    route("signIn", "routes/auth/signIn.tsx"),
    route("callback", "routes/auth/callback.tsx"),
    route("logout", "routes/auth/logout.tsx"),
  ]),

  ...prefix("classes", [
    index("routes/classes/index.tsx"),
    route("new", "routes/classes/new.tsx"),
    ...prefix(":classId", [
      index("routes/classes/viewClass.tsx"),
      route("createUpload", "routes/classes/createUpload.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
