import { getTodoCategories, getTodos } from "@/src/app/actions/todos";
import { TodoView } from "@/src/components/todo/TodoView";

export default async function TodoPage() {
  const [items, categories] = await Promise.all([
    getTodos(),
    getTodoCategories(),
  ]);

  return (
    <main className="fade-stagger mx-auto min-h-screen w-full max-w-4xl px-4 pb-28 pt-14">
      <header className="fade-enter mb-10 text-center">
        <p className="fade-enter mb-3 text-sm tracking-[0.2em] text-stone-400 uppercase">
          Planes
        </p>
        <h1 className="fade-enter font-display text-3xl font-medium text-stone-800 sm:text-4xl">
          Cosas por hacer juntos
        </h1>
        <p className="fade-enter mx-auto mt-4 max-w-md text-sm text-stone-500 sm:text-base">
          Vamos agregando y tachando todo lo que hoy soñamos.
        </p>
      </header>

      <TodoView items={items} categories={categories} />
    </main>
  );
}
