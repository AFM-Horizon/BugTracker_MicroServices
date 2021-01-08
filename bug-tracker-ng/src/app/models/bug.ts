import { CommentRequest } from './commentRequestModel';
import { Tag } from './tag';

export interface Bug {
  _id?: string, 
  name: string,
  author: string,
  status: string,
  description?: string
  tags?: Tag[],
  date?: Date,
  comments?: CommentRequest[],
  archived?: boolean,
  workspace: string
};