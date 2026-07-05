# Amigo Invisible TMF - Versión Final v4

Incluye:
- Logo TMF.
- Estética TMF rojo/blanco/gris.
- Login con código secreto.
- Buzón digital de pistas.
- Panel administrador en `/admin`.
- Carga de participantes desde el panel.
- Sorteo automático desde el panel.
- Exportar códigos en CSV.
- Reiniciar todo.
- Ver estado de pistas.
- Revelación automática de quién era tu amigo secreto el 23 de julio a las 16:45.

## Variables de entorno en Vercel

```env
FIREBASE_PROJECT_ID=amigo-invisible-tmf
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
ADMIN_CODE=TMFADMIN2026
NEXT_PUBLIC_EVENT_NAME=Amigo Invisible TMF
NEXT_PUBLIC_EVENT_DATE=2026-07-23
NEXT_PUBLIC_EVENT_DATETIME=2026-07-23T16:45:00-03:00
NEXT_PUBLIC_GIFT_BUDGET=$20000
NEXT_PUBLIC_REVEAL_DATETIME=2026-07-23T16:45:00-03:00
```

## Uso

1. Subir estos archivos a GitHub reemplazando los anteriores.
2. Vercel redeploya solo.
3. Entrar a `/admin`.
4. Ingresar el código admin.
5. Cargar participantes, un nombre por línea.
6. Guardar participantes.
7. Realizar sorteo.
8. Exportar códigos o copiarlos desde la tabla.
9. Enviar a cada persona su código secreto.

## Revelación

Desde el 23 de julio a las 16:45, cada participante verá automáticamente quién era su amigo secreto.
