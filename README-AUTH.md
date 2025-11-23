# Autenticación - Verbadoc Enterprise

## 🌐 URLs del Proyecto

- **Producción**: https://verbadoceuropapro.vercel.app
- **Login**: https://verbadoceuropapro.vercel.app/login
- **Admin Panel**: https://verbadoceuropapro.vercel.app/admin

## 📊 Base de Datos

- **Nombre**: verbadoc-enterprise-db
- **Tipo**: PostgreSQL (Neon Serverless)
- **Región**: EU Central 1 (Frankfurt)

## 🎨 Branding

- **Color Principal**: Verde (#10b981, #059669)
- **Email de Soporte**: soporte@verbadoc.eu
- **Nombre Completo**: Verbadoc Enterprise

## ✅ Estado de Implementación

- [x] Base de datos configurada
- [x] Migraciones aplicadas (users, alerts, admin tables)
- [x] JWT_SECRET configurado
- [x] Backend APIs creadas
- [ ] Frontend components (LoginPage, AuthContext) - PENDIENTE
- [ ] Usuario admin creado
- [ ] Testing completado

## 🚀 Próximos Pasos

1. **Completar Frontend** (en proceso)
   - Crear `src/contexts/AuthContext.tsx`
   - Crear `src/pages/LoginPage.tsx` (tema verde)
   - Crear `src/components/auth/ProtectedRoute.tsx`
   - Integrar en App.tsx

2. **Crear Usuario Admin**
   ```bash
   # Después del primer registro en /login
   psql $POSTGRES_URL -c "UPDATE users SET role = 'admin' WHERE email = 'TU_EMAIL';"
   ```

3. **Testing**
   - Registro de usuario
   - Login/Logout
   - Acceso a /admin
   - Gestión de usuarios

## 📝 Notas Específicas

- Este proyecto usa **Next.js** (diferente a Annalysis que usa Vite)
- Las rutas API están en `src/app/api/auth/[endpoint]/route.ts`
- El branding es verde (diferente de Annalysis que es azul)

## 📚 Documentación

- [Guía Completa](./AUTH-SYSTEM.md)
- [Quickstart](./QUICKSTART-AUTH.md)

---

**Última actualización**: 2025-11-23
