import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "@/src/app/api/uploadthing/core";

// Este hook (useUploadThing) es lo que usa el botón de subida para
// mandar los archivos, sin necesitar los componentes visuales
// prediseñados de UploadThing (así seguimos con nuestro propio estilo).
export const { useUploadThing } = generateReactHelpers<OurFileRouter>();
