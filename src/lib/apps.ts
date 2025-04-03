import type { Component } from "svelte";

export type DesktopApp = {
  name: string;
  hidden?: boolean;
  icon: string;
  component: Component<any, any, any>;
  props?: any;
};