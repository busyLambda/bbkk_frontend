import { writable, type Writable } from "svelte/store";

export const selectedTab: Writable<string> = writable('dashboard');