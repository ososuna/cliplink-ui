# Fixing Import Errors After Refactoring

## What Was Fixed Automatically

✅ All `@/presentation/*` imports updated to new locations:
- `@/presentation/styled-components` → `@/components/styled-components`
- `@/presentation/hooks/*` → `@/components/hooks/*`
- `@/presentation/icons/*` → `@/components/icons/*`
- `@/presentation/components/*` → `@/components/components/*`
- `@/presentation/lib/*` → `@/lib/*`

✅ Fixed `@/config/http-client.ts` to include CustomError class

✅ Created placeholder `src/components/styled-components.ts` for UI components

✅ Updated `ShortenForm.tsx` to use new client-container pattern

## ⚠️ Critical: UI Components Missing

The shadcn/ui components are missing. You need to either:

### Option 1: Restore from Backup
If you have a backup of the `src/presentation` folder, restore the UI components from there.

### Option 2: Reinstall shadcn/ui Components
```bash
# Initialize shadcn/ui (if not already done)
npx shadcn@latest init

# Add the components you need
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add card
npx shadcn@latest add form
npx shadcn@latest add skeleton
npx shadcn@latest add toast
npx shadcn@latest add badge
npx shadcn@latest add avatar
npx shadcn@latest add dialog
npx shadcn@latest add label
npx shadcn@latest add tooltip
npx shadcn@latest add dropdown-menu
npx shadcn@latest add scroll-area
npx shadcn@latest add separator
npx shadcn@latest add navigation-menu
```

### Option 3: Update the Barrel File
After installing components, update `src/components/styled-components.ts`:

```typescript
// Replace placeholder exports with real imports
export { Button } from '@/components/ui/button';
export { Input } from '@/components/ui/input';
export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
// ... etc for all components
```

## Files Still Using Old Infrastructure

The following React components need to be updated to use `client-container`:

### Pattern to Follow

**Before (Old):**
```typescript
import { UrlRepositoryImpl, UrlServiceImpl } from '@/infrastructure';
import { useService } from '@/components/hooks/use-service';

const MyComponent = () => {
  const urlService = useService(UrlRepositoryImpl, UrlServiceImpl);
  const url = await urlService?.createUrl(originalUrl);
  // ...
}
```

**After (New):**
```typescript
import { makeCreateUrl } from '@/lib/client-container';

const MyComponent = () => {
  // Inside async function or handler
  const createUrlUseCase = makeCreateUrl();
  const result = await createUrlUseCase.execute({ originalUrl });

  if (result.ok) {
    // Success: use result.value
  } else {
    // Error: result.error.message
  }
}
```

### Files to Update

1. **src/components/components/url/DeleteUrlDialog.tsx**
   - Replace with `makeDeleteUrl()` from client-container

2. **src/components/components/url/CreateShortUrlDialog.tsx**
   - Replace with `makeCreateUrl()` from client-container

3. **src/components/components/url/MyShortUrlRenameButton.tsx**
   - Replace with `makeRenameUrl()` from client-container

4. **src/components/components/auth/MyAccountForm.tsx**
   - Replace with `makeUpdateUser()` from client-container

5. **src/components/components/auth/PasswordForm.tsx**
   - Replace with `makeUpdatePassword()` from client-container

6. **src/components/components/auth/RegisterEmailForm.tsx**
   - Replace with `makeRegister()` from client-container

7. **src/components/components/auth/DeleteAccountButton.tsx**
   - Replace with `makeDeleteAccount()` from client-container

8. **src/components/components/auth/ForgotPasswordEmailForm.tsx**
   - Replace with `makeForgotPassword()` from client-container

9. **src/components/components/auth/ResetPasswordForm.tsx**
   - Replace with `makeUpdatePassword()` from client-container

10. **src/components/components/shared/ErrorNotifier.tsx**
    - May need to update state management

11. **src/components/components/auth/AuthDropdown.tsx**
    - Replace with `makeLogout()` from client-container

### Astro Pages Using Infrastructure

The following Astro pages should use `server-container` instead:

1. **src/pages/auth/reset-password/[token].astro**
2. **src/components/components/url/ShortUrlsCount.astro**
3. **src/components/components/url/MyShortUrlCards.astro**
4. **src/components/components/auth/GoogleAuthButton.astro**
5. **src/components/components/auth/GithubAuthButton.astro**

**Pattern for Astro files:**
```astro
---
import { makeCheckToken } from '@/lib/server-container';

const accessToken = Astro.cookies.get('access_token')?.value;
const checkTokenUseCase = makeCheckToken(accessToken);
const result = await checkTokenUseCase.execute(accessToken);

if (!result.ok) {
  return Astro.redirect('/auth/login');
}

const user = result.value;
---
```

## Testing After Fixes

1. Install/restore UI components
2. Update all React components to use client-container
3. Update all Astro pages to use server-container
4. Run: `pnpm run lint`
5. Run: `pnpm run build`
6. Test the application

## Quick Fix Script

For bulk updates, you can use this pattern:

```bash
# Find all files still importing from @/infrastructure
grep -r "@/infrastructure" src/components/components --include="*.tsx"

# Then manually update each one following the pattern above
```

## Need Help?

See `MIGRATION_GUIDE.md` for detailed examples of:
- How to use client-container in React components
- How to use server-container in Astro pages
- Result pattern usage
- Common patterns and examples
