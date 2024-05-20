export interface Pagination {
    count: number;
    next: string | null;
    previous: string | null;
  }
  export type WithoutNullableKeys<Type> = {
    [Key in keyof Type]-?: WithoutNullableKeys<NonNullable<Type[Key]>>;
  };
  