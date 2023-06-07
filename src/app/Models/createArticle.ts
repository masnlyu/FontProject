export interface CreateArticle{
  title: string;
  content: string
  imgBase64: string;
  createTime: Date;
  updateTime: Date;
  createAuthor_Id:number;
  updateAuthor_id: number;
  archive: boolean
}
