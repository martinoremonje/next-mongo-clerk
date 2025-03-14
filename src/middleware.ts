import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Configura la ruta pública adecuadamente
const isPublicRoute = createRouteMatcher(['/login(.*)']);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Excluye archivos internos de Next.js y todos los archivos estáticos
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Siempre ejecuta para rutas de API
    '/(api|trpc)(.*)',
  ],
};