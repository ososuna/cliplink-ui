import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/styled-components';
import { Button } from '@/styled-components';
import { Input } from '@/styled-components';
import { Label } from '@/styled-components';
import { setUiError } from '@/stores/ui.store';

interface Props {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const SetPasswordDialog = ({ open: initialOpen = false, onOpenChange: externalOnOpenChange }: Props) => {
  const [isOpen, setIsOpen] = useState(initialOpen);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    externalOnOpenChange?.(open);
  };

  useEffect(() => {
    const handleOpenDialog = () => {
      setIsOpen(true);
    };

    window.addEventListener('openSetPasswordDialog', handleOpenDialog);
    return () => {
      window.removeEventListener('openSetPasswordDialog', handleOpenDialog);
    };
  }, []);

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // TODO: Implement the actual API call to set password
    // This would be a new service method like AuthService.setPassword(password)
    // For now, this is a placeholder

    try {
      // const response = await AuthService.setPassword(password);

      // if (!response.ok) {
      //   setUiError({ message: response.error || 'Failed to set password', type: 'error' });
      //   setIsLoading(false);
      //   return;
      // }

      // Placeholder success
      await new Promise(resolve => setTimeout(resolve, 1000));

      setPassword('');
      setConfirmPassword('');
      setErrors({});
      handleOpenChange(false);

      // Refresh the page to update the connected accounts
      window.location.reload();
    } catch (error) {
      setUiError({
        message: error instanceof Error ? error.message : 'Failed to set password',
        type: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setPassword('');
    setConfirmPassword('');
    setErrors({});
    handleOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set Up Password Authentication</DialogTitle>
          <DialogDescription>
            Create a password to enable email and password sign-in. This provides an additional way to access your account.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={errors.password ? 'border-red-500' : ''}
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-sm text-red-600 dark:text-red-400">{errors.password}</p>
              )}
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Must be at least 8 characters long
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={errors.confirmPassword ? 'border-red-500' : ''}
                disabled={isLoading}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-600 dark:text-red-400">{errors.confirmPassword}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Setting up...' : 'Enable Password Auth'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SetPasswordDialog;
