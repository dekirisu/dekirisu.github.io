export default interface PostAttributes {
  title: string;
  slug: string;
  thumbnail: string;
  description: string;
  usage: string[];
  used: string[];
  classes: string;
  created?: string;
  state?: string;
}
