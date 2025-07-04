import "vue-router";
import { Role } from "./user";

declare module "vue-router" {
  interface RouteMeta {
    auth?: boolean;
    roles?: Role[];
  }
}
