import { User } from "./User";

export type Home = {
  name?: string;
  home_img_url?: string;
  location?: { lat: number; lon: number };
  users?: User[];
};
