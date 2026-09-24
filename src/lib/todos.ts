export type TodoCategory = {
  id: number;
  name: string;
};

export type Todo = {
  id: number;
  content: string;
  done: boolean;
  categoryId: number | null;
  createdAt: string | Date;
  updatedAt: string | Date;
};
