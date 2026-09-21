// "yo" = tú, "ella" = ella. Así distinguimos quién escribió cada texto
// sin necesitar un login individual (recuerda que Sunset usa un solo
// código de acceso compartido, no cuentas separadas).
export type Author = "yo" | "ella";

export type Writing = {
  id: string;
  author: Author;
  title: string;
  content: string;
  // Formato YYYY-MM-DD para poder ordenar por fecha fácilmente
  date: string;
};

// Por ahora esto es un arreglo estático: cada objeto de aquí abajo
// es un escrito. Para agregar uno nuevo, copia un bloque { ... } y
// cámbiale los datos (no olvides una coma después de cada bloque).
export const writings: Writing[] = [
  {
    id: "1",
    author: "yo",
    title: "Un título para tu primer escrito",
    content:
      "Reemplaza este texto con uno de los escritos que ya le hiciste. " +
      "Puedes usar saltos de línea normales, el diseño los respeta.",
    date: "2026-01-01",
  },
];

// Devuelve los escritos ordenados del más reciente al más antiguo.
// Cuando pasemos esto a la base de datos, esta función va a cambiar
// para hacer la consulta a Prisma en vez de leer el arreglo de arriba,
// pero el resto de la página no necesitará tocarse.
export function getWritings(): Writing[] {
  return [...writings].sort((a, b) => (a.date < b.date ? 1 : -1));
}
