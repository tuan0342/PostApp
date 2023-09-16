import {Post} from './post';
import {User} from './user';

export type WelcomeScreenProps = {};

export type PostsScreenProps = {};

export type LoginScreenProps = {};

export type RegisterScreenProps = {};

export type BottomTabScreenProps = {};

export type CreatePostScreenProps = {};

export type SearchScreenProps = {
  hashtagSearch?: string;
  posts?: Post[];
};

export type HashtagScreenProps = {
  title?: string;
  caption?: string;
  imagesList?: string[];
};
