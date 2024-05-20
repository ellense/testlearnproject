
////////////////////////////////////////////дерево категорий ////////////////////////////////////
export interface ITree {
  name: string;
  classifier_code: number; 
  parent_code: string;
  children?: ITree[];
}
export interface GetAllCategory {
  page_size?: number;
  page?: number;
  vendor_id?: string;
}