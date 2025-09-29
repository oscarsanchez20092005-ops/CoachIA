// Ejemplo (servidor recomendado):
// 1) Crea un endpoint en tu backend que llame a la API de OpenAI con tu API key.
// 2) Desde la app llamas a ese endpoint para pedir respuestas personalizadas.
//
// fetch('https://tu-backend/api/openai/coach', { method: 'POST', body: JSON.stringify({ prompt: '...' }) })
//
// Si quieres probar en local en Cursor, puedes usar directamente fetch a OpenAI (no recomendado en producción porque expones la API key).