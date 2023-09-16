export type Hashtag = {
  hashtag: string;
  count: number;
  lastTimestamp: number;
};

export type UserPost = {
  name: string;
  avatar: string;
  id: string;
  email?: string;
};

export type Comment = {
  text: string;
  timestamp: number;
  user: UserPost;
};

export type Post = {
  id: string;
  title: string;
  cap: string;
  images?: string[];
  hashtag: string[];
  classification?: string;
  timestamp: number;
  like: UserPost[];
  comment: Comment[];
  owner: UserPost;
};

export enum PostClassification {
  MOVIE = 'Anime',
  CHARACTER = 'Character',
  SPOILER = 'Spoiler',
  FAN_ART = 'Fan Art',
}
