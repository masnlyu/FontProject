export interface Article {
  id: number;
  title: string;
  content: string
  imgBase64: string;
  createTime: Date;
  updateTime: Date;
  name: string;
  updateAuthor_id: number;
  archive: boolean
}
