export interface Paginacion<T> {
  content: T[];
  total: number;
  currentPage: number;
  totalPages:number;
}
