import { type FileItem } from '@/types';

export const sampleFiles: FileItem[] = [
  {
    id: 'src',
    name: 'src',
    path: 'src',
    type: 'folder',
    children: [
      {
        id: 'components',
        name: 'components',
        path: 'src/components',
        type: 'folder',
        children: [
          {
            id: 'header',
            name: 'Header.tsx',
            path: 'src/components/Header.tsx',
            type: 'file',
            language: 'typescript',
            content: `import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Bell, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
  onMenuClick?: () => void;
  isMenuOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  className,
  onMenuClick,
  isMenuOpen = false,
}) => {
  const { user, isAuthenticated, logout } = useAuth();
  const [showSearch, setShowSearch] = React.useState(false);
  const [notifications, setNotifications] = React.useState<Notification[]>([]);

  React.useEffect(() => {
    // Fetch notifications on mount
    if (isAuthenticated) {
      fetchNotifications();
    }
  }, [isAuthenticated]);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications');
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };

  return (
    <header className={cn(
      'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur',
      'supports-[backdrop-filter]:bg-background/60',
      className
    )}>
      <div className="container flex h-14 items-center">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 md:hidden"
          onClick={onMenuClick}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl">AppName</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 ml-6">
          <Link to="/dashboard" className="text-sm font-medium hover:text-primary">
            Dashboard
          </Link>
          <Link to="/projects" className="text-sm font-medium hover:text-primary">
            Projects
          </Link>
          <Link to="/settings" className="text-sm font-medium hover:text-primary">
            Settings
          </Link>
        </nav>

        <div className="flex-1" />

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={() => setShowSearch(true)}>
            <Search className="h-5 w-5" />
          </Button>

          {isAuthenticated && (
            <>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-xs flex items-center justify-center text-destructive-foreground">
                    {notifications.length}
                  </span>
                )}
              </Button>

              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback>
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
            </>
          )}

          {!isAuthenticated && (
            <Button asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;`
          },
          {
            id: 'button',
            name: 'Button.tsx',
            path: 'src/components/Button.tsx',
            type: 'file',
            language: 'typescript',
            content: `import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        gradient: 'bg-gradient-to-r from-primary to-accent text-white hover:opacity-90',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </Comp>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };`
          },
          {
            id: 'sidebar',
            name: 'Sidebar.tsx',
            path: 'src/components/Sidebar.tsx',
            type: 'file',
            language: 'typescript',
            content: `import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  Settings,
  Users,
  FileText,
  BarChart2,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const navItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: FileText, label: 'Documents', path: '/documents' },
  { icon: Users, label: 'Team', path: '/team' },
  { icon: BarChart2, label: 'Analytics', path: '/analytics' },
  { icon: Settings, label: 'Settings', path: '/settings' },
  { icon: HelpCircle, label: 'Help', path: '/help' },
];

export const Sidebar: React.FC<SidebarProps> = ({ collapsed = false, onToggle }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside
      className={cn(
        'flex flex-col h-screen bg-card border-r transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && <span className="font-semibold text-lg">Navigation</span>}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className={cn(collapsed && 'mx-auto')}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <nav className="flex-1 p-2 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          const linkContent = (
            <NavLink
              to={item.path}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                'hover:bg-accent hover:text-accent-foreground',
                active && 'bg-primary text-primary-foreground hover:bg-primary/90',
                collapsed && 'justify-center'
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </NavLink>
          );

          if (collapsed) {
            return (
              <Tooltip key={item.path} delayDuration={0}>
                <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            );
          }

          return <div key={item.path}>{linkContent}</div>;
        })}
      </nav>

      <div className="p-4 border-t">
        {!collapsed && (
          <p className="text-xs text-muted-foreground">
            © 2024 AppName. All rights reserved.
          </p>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;`
          },
          {
            id: 'modal',
            name: 'Modal.tsx',
            path: 'src/components/Modal.tsx',
            type: 'file',
            language: 'typescript',
            content: `import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    hideCloseButton?: boolean;
  }
>(({ className, children, hideCloseButton = false, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%]',
        'gap-4 border bg-background p-6 shadow-lg duration-200',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
        'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
        'sm:rounded-lg',
        className
      )}
      {...props}
    >
      {children}
      {!hideCloseButton && (
        <DialogPrimitive.Close
          className={cn(
            'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity',
            'hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
            'disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground'
          )}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};`
          },
          {
            id: 'card',
            name: 'Card.tsx',
            path: 'src/components/Card.tsx',
            type: 'file',
            language: 'typescript',
            content: `import * as React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated' | 'interactive';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', ...props }, ref) => {
    const variants = {
      default: 'bg-card text-card-foreground border',
      outlined: 'border-2 bg-transparent',
      elevated: 'bg-card text-card-foreground shadow-lg',
      interactive: 'bg-card text-card-foreground border hover:border-primary hover:shadow-md transition-all cursor-pointer',
    };

    const paddings = {
      none: '',
      sm: 'p-3',
      md: 'p-6',
      lg: 'p-8',
    };

    return (
      <div
        ref={ref}
        className={cn('rounded-lg', variants[variant], paddings[padding], className)}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('', className)} {...props} />
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center pt-4', className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };`
          },
          {
            id: 'input',
            name: 'Input.tsx',
            path: 'src/components/Input.tsx',
            type: 'file',
            language: 'typescript',
            content: `import * as React from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, Search, X } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  showPasswordToggle?: boolean;
  clearable?: boolean;
  onClear?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      showPasswordToggle,
      clearable,
      onClear,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const inputType = showPasswordToggle && showPassword ? 'text' : type;

    const hasValue = props.value !== undefined && props.value !== '';

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium mb-1.5 text-foreground">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}
          <input
            type={inputType}
            className={cn(
              'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
              'ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium',
              'placeholder:text-muted-foreground',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
              'disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-destructive focus-visible:ring-destructive',
              leftIcon && 'pl-10',
              (rightIcon || showPasswordToggle || clearable) && 'pr-10',
              className
            )}
            ref={ref}
            {...props}
          />
          {showPasswordToggle && type === 'password' && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          )}
          {clearable && hasValue && !showPasswordToggle && (
            <button
              type="button"
              onClick={onClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          {rightIcon && !showPasswordToggle && !clearable && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
        {hint && !error && <p className="mt-1 text-sm text-muted-foreground">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

// Search input variant
const SearchInput = React.forwardRef<HTMLInputElement, Omit<InputProps, 'leftIcon'>>(
  (props, ref) => <Input ref={ref} leftIcon={<Search className="h-4 w-4" />} {...props} />
);

SearchInput.displayName = 'SearchInput';

export { Input, SearchInput };`
          },
          {
            id: 'table',
            name: 'DataTable.tsx',
            path: 'src/components/DataTable.tsx',
            type: 'file',
            language: 'typescript',
            content: `import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Column<T> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  sortKey?: string;
  sortDirection?: 'asc' | 'desc';
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  pageSize = 10,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  onSort,
  sortKey,
  sortDirection,
  loading = false,
  emptyMessage = 'No data available',
  className,
}: DataTableProps<T>) {
  const handleSort = (key: string) => {
    if (onSort) {
      const newDirection = sortKey === key && sortDirection === 'asc' ? 'desc' : 'asc';
      onSort(key, newDirection);
    }
  };

  const getValue = (row: T, key: keyof T | string): any => {
    if (typeof key === 'string' && key.includes('.')) {
      return key.split('.').reduce((obj, k) => obj?.[k], row as any);
    }
    return row[key as keyof T];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={String(column.key)}
                  className={cn(column.sortable && 'cursor-pointer select-none', column.className)}
                  onClick={() => column.sortable && handleSort(String(column.key))}
                >
                  <div className="flex items-center gap-2">
                    {column.header}
                    {column.sortable && (
                      <ArrowUpDown
                        className={cn(
                          'h-4 w-4',
                          sortKey === column.key ? 'opacity-100' : 'opacity-50'
                        )}
                      />
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, index) => (
                <TableRow key={index}>
                  {columns.map((column) => (
                    <TableCell key={String(column.key)} className={column.className}>
                      {column.render ? column.render(row) : getValue(row, column.key)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && onPageChange && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}`
          },
        ],
      },
      {
        id: 'hooks',
        name: 'hooks',
        path: 'src/hooks',
        type: 'folder',
        children: [
          {
            id: 'useAuth',
            name: 'useAuth.ts',
            path: 'src/hooks/useAuth.ts',
            type: 'file',
            language: 'typescript',
            content: `import { useState, useEffect, useCallback, createContext, useContext } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'user' | 'viewer';
  createdAt: Date;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE = '/api/auth';

export function useAuthProvider(): AuthContextType {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Check authentication status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setState((prev) => ({ ...prev, isLoading: false }));
        return;
      }

      const response = await fetch(\`\${API_BASE}/me\`, {
        headers: { Authorization: \`Bearer \${token}\` },
      });

      if (response.ok) {
        const user = await response.json();
        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } else {
        localStorage.removeItem('auth_token');
        setState({ user: null, isAuthenticated: false, isLoading: false, error: null });
      }
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false, error: 'Authentication check failed' }));
    }
  };

  const login = useCallback(async (email: string, password: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch(\`\${API_BASE}/login\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      const { user, token } = await response.json();
      localStorage.setItem('auth_token', token);

      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Login failed',
      }));
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (token) {
        await fetch(\`\${API_BASE}/logout\`, {
          method: 'POST',
          headers: { Authorization: \`Bearer \${token}\` },
        });
      }
    } finally {
      localStorage.removeItem('auth_token');
      setState({ user: null, isAuthenticated: false, isLoading: false, error: null });
    }
  }, []);

  const register = useCallback(async (email: string, password: string, name: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await fetch(\`\${API_BASE}/register\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }

      const { user, token } = await response.json();
      localStorage.setItem('auth_token', token);

      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Registration failed',
      }));
      throw error;
    }
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    try {
      const response = await fetch(\`\${API_BASE}/reset-password\`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Password reset failed');
      }
    } catch (error) {
      throw error;
    }
  }, []);

  const updateProfile = useCallback(async (data: Partial<User>) => {
    const token = localStorage.getItem('auth_token');
    if (!token) throw new Error('Not authenticated');

    try {
      const response = await fetch(\`\${API_BASE}/profile\`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: \`Bearer \${token}\`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Profile update failed');
      }

      const updatedUser = await response.json();
      setState((prev) => ({ ...prev, user: updatedUser }));
    } catch (error) {
      throw error;
    }
  }, []);

  return {
    ...state,
    login,
    logout,
    register,
    resetPassword,
    updateProfile,
  };
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthContext };`
          },
          {
            id: 'useSearch',
            name: 'useSearch.ts',
            path: 'src/hooks/useSearch.ts',
            type: 'file',
            language: 'typescript',
            content: `import { useState, useMemo, useCallback, useTransition } from 'react';
import debounce from 'lodash/debounce';

interface SearchOptions<T> {
  data: T[];
  searchKeys: (keyof T)[];
  debounceMs?: number;
  minQueryLength?: number;
  maxResults?: number;
}

interface SearchResult<T> {
  item: T;
  score: number;
  matchedKey?: keyof T;
  matchedValue?: string;
}

interface UseSearchReturn<T> {
  query: string;
  setQuery: (query: string) => void;
  results: SearchResult<T>[];
  isSearching: boolean;
  clearSearch: () => void;
  totalMatches: number;
}

function simpleSearch<T extends Record<string, any>>(
  data: T[],
  query: string,
  keys: (keyof T)[],
  maxResults: number
): SearchResult<T>[] {
  if (!query.trim()) return [];

  const normalizedQuery = query.toLowerCase();
  const results: SearchResult<T>[] = [];

  for (const item of data) {
    for (const key of keys) {
      const value = item[key];
      if (typeof value === 'string') {
        const normalizedValue = value.toLowerCase();
        if (normalizedValue.includes(normalizedQuery)) {
          // Calculate a simple score based on match position and length
          const index = normalizedValue.indexOf(normalizedQuery);
          const score = 1 - index / normalizedValue.length;

          results.push({
            item,
            score,
            matchedKey: key,
            matchedValue: value,
          });
          break; // Only one match per item
        }
      }
    }

    if (results.length >= maxResults) break;
  }

  // Sort by score descending
  return results.sort((a, b) => b.score - a.score);
}

export function useSearch<T extends Record<string, any>>({
  data,
  searchKeys,
  debounceMs = 150,
  minQueryLength = 1,
  maxResults = 50,
}: SearchOptions<T>): UseSearchReturn<T> {
  const [query, setQueryState] = useState('');
  const [results, setResults] = useState<SearchResult<T>[]>([]);
  const [isPending, startTransition] = useTransition();

  const performSearch = useCallback(
    (searchQuery: string) => {
      if (searchQuery.length < minQueryLength) {
        setResults([]);
        return;
      }

      startTransition(() => {
        const searchResults = simpleSearch(data, searchQuery, searchKeys, maxResults);
        setResults(searchResults);
      });
    },
    [data, searchKeys, minQueryLength, maxResults]
  );

  const debouncedSearch = useMemo(
    () => debounce(performSearch, debounceMs),
    [performSearch, debounceMs]
  );

  const setQuery = useCallback(
    (newQuery: string) => {
      setQueryState(newQuery);
      debouncedSearch(newQuery);
    },
    [debouncedSearch]
  );

  const clearSearch = useCallback(() => {
    setQueryState('');
    setResults([]);
    debouncedSearch.cancel();
  }, [debouncedSearch]);

  return {
    query,
    setQuery,
    results,
    isSearching: isPending,
    clearSearch,
    totalMatches: results.length,
  };
}

export default useSearch;`
          },
          {
            id: 'useDebounce',
            name: 'useDebounce.ts',
            path: 'src/hooks/useDebounce.ts',
            type: 'file',
            language: 'typescript',
            content: `import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Debounce a value
 * Updates the returned value only after the specified delay has passed without changes
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Debounce a callback function
 * Returns a debounced version of the callback that will only execute after the delay
 */
export function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // Update the callback ref on each render to have access to latest closure
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay]
  );

  return debouncedCallback;
}

/**
 * Throttle a callback function
 * Ensures the callback is called at most once per specified interval
 */
export function useThrottledCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const callbackRef = useRef(callback);
  const lastCalledRef = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const throttledCallback = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      const remaining = delay - (now - lastCalledRef.current);

      if (remaining <= 0) {
        lastCalledRef.current = now;
        callbackRef.current(...args);
      } else if (!timeoutRef.current) {
        timeoutRef.current = setTimeout(() => {
          lastCalledRef.current = Date.now();
          timeoutRef.current = undefined;
          callbackRef.current(...args);
        }, remaining);
      }
    },
    [delay]
  );

  return throttledCallback;
}

export default useDebounce;`
          },
          {
            id: 'useLocalStorage',
            name: 'useLocalStorage.ts',
            path: 'src/hooks/useLocalStorage.ts',
            type: 'file',
            language: 'typescript',
            content: `import { useState, useEffect, useCallback } from 'react';

type SetValue<T> = T | ((prevValue: T) => T);

interface UseLocalStorageOptions<T> {
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
  onError?: (error: Error) => void;
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: UseLocalStorageOptions<T> = {}
): [T, (value: SetValue<T>) => void, () => void] {
  const {
    serializer = JSON.stringify,
    deserializer = JSON.parse,
    onError = console.error,
  } = options;

  // Get stored value or use initial value
  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? deserializer(item) : initialValue;
    } catch (error) {
      onError(error as Error);
      return initialValue;
    }
  }, [key, initialValue, deserializer, onError]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  // Return a wrapped version of useState's setter function
  const setValue = useCallback(
    (value: SetValue<T>) => {
      try {
        // Allow value to be a function for same API as useState
        const valueToStore = value instanceof Function ? value(storedValue) : value;

        // Save to local state
        setStoredValue(valueToStore);

        // Save to local storage
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, serializer(valueToStore));
        }

        // Dispatch custom event for cross-tab sync
        window.dispatchEvent(new StorageEvent('storage', { key, newValue: serializer(valueToStore) }));
      } catch (error) {
        onError(error as Error);
      }
    },
    [key, storedValue, serializer, onError]
  );

  // Remove value from storage
  const removeValue = useCallback(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
      setStoredValue(initialValue);
    } catch (error) {
      onError(error as Error);
    }
  }, [key, initialValue, onError]);

  // Listen for changes in other tabs/windows
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key && event.newValue !== null) {
        try {
          setStoredValue(deserializer(event.newValue));
        } catch (error) {
          onError(error as Error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, deserializer, onError]);

  return [storedValue, setValue, removeValue];
}

// Convenience hook for session storage
export function useSessionStorage<T>(
  key: string,
  initialValue: T,
  options: UseLocalStorageOptions<T> = {}
): [T, (value: SetValue<T>) => void, () => void] {
  const {
    serializer = JSON.stringify,
    deserializer = JSON.parse,
    onError = console.error,
  } = options;

  const readValue = useCallback((): T => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.sessionStorage.getItem(key);
      return item ? deserializer(item) : initialValue;
    } catch (error) {
      onError(error as Error);
      return initialValue;
    }
  }, [key, initialValue, deserializer, onError]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue = useCallback(
    (value: SetValue<T>) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);

        if (typeof window !== 'undefined') {
          window.sessionStorage.setItem(key, serializer(valueToStore));
        }
      } catch (error) {
        onError(error as Error);
      }
    },
    [key, storedValue, serializer, onError]
  );

  const removeValue = useCallback(() => {
    try {
      if (typeof window !== 'undefined') {
        window.sessionStorage.removeItem(key);
      }
      setStoredValue(initialValue);
    } catch (error) {
      onError(error as Error);
    }
  }, [key, initialValue, onError]);

  return [storedValue, setValue, removeValue];
}

export default useLocalStorage;`
          },
          {
            id: 'useApi',
            name: 'useApi.ts',
            path: 'src/hooks/useApi.ts',
            type: 'file',
            language: 'typescript',
            content: `import { useState, useCallback, useRef, useEffect } from 'react';

interface ApiState<T> {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

interface ApiOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
  retries?: number;
  retryDelay?: number;
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestConfig {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, string>;
}

const DEFAULT_OPTIONS: ApiOptions = {
  immediate: false,
  retries: 0,
  retryDelay: 1000,
};

export function useApi<T = any>(
  url: string,
  config: RequestConfig = {},
  options: ApiOptions = {}
) {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
  const abortControllerRef = useRef<AbortController | null>(null);
  const retryCountRef = useRef(0);

  const [state, setState] = useState<ApiState<T>>({
    data: null,
    error: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
  });

  const buildUrl = useCallback(
    (baseUrl: string, params?: Record<string, string>) => {
      if (!params) return baseUrl;
      const searchParams = new URLSearchParams(params);
      return \`\${baseUrl}?\${searchParams.toString()}\`;
    },
    []
  );

  const execute = useCallback(
    async (overrideConfig: RequestConfig = {}): Promise<T | null> => {
      // Cancel any ongoing request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      abortControllerRef.current = new AbortController();

      const finalConfig = { ...config, ...overrideConfig };
      const { method = 'GET', headers = {}, body, params } = finalConfig;

      setState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
        isSuccess: false,
        isError: false,
      }));

      try {
        const finalUrl = buildUrl(url, params);
        const requestHeaders: Record<string, string> = {
          'Content-Type': 'application/json',
          ...headers,
        };

        // Add auth token if available
        const token = localStorage.getItem('auth_token');
        if (token) {
          requestHeaders['Authorization'] = \`Bearer \${token}\`;
        }

        const response = await fetch(finalUrl, {
          method,
          headers: requestHeaders,
          body: body ? JSON.stringify(body) : undefined,
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }

        const data = await response.json();

        setState({
          data,
          error: null,
          isLoading: false,
          isSuccess: true,
          isError: false,
        });

        retryCountRef.current = 0;
        mergedOptions.onSuccess?.(data);

        return data;
      } catch (error) {
        if ((error as Error).name === 'AbortError') {
          return null;
        }

        const shouldRetry =
          retryCountRef.current < (mergedOptions.retries || 0);

        if (shouldRetry) {
          retryCountRef.current += 1;
          await new Promise((resolve) =>
            setTimeout(resolve, mergedOptions.retryDelay)
          );
          return execute(overrideConfig);
        }

        const err = error as Error;
        setState({
          data: null,
          error: err,
          isLoading: false,
          isSuccess: false,
          isError: true,
        });

        mergedOptions.onError?.(err);
        return null;
      }
    },
    [url, config, buildUrl, mergedOptions]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      error: null,
      isLoading: false,
      isSuccess: false,
      isError: false,
    });
  }, []);

  // Execute immediately if option is set
  useEffect(() => {
    if (mergedOptions.immediate) {
      execute();
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

// Convenience hooks for common HTTP methods
export function useGet<T>(url: string, options?: ApiOptions) {
  return useApi<T>(url, { method: 'GET' }, options);
}

export function usePost<T>(url: string, options?: ApiOptions) {
  return useApi<T>(url, { method: 'POST' }, options);
}

export function usePut<T>(url: string, options?: ApiOptions) {
  return useApi<T>(url, { method: 'PUT' }, options);
}

export function useDelete<T>(url: string, options?: ApiOptions) {
  return useApi<T>(url, { method: 'DELETE' }, options);
}

export default useApi;`
          },
        ],
      },
      {
        id: 'utils',
        name: 'utils',
        path: 'src/utils',
        type: 'folder',
        children: [
          {
            id: 'formatters',
            name: 'formatters.ts',
            path: 'src/utils/formatters.ts',
            type: 'file',
            language: 'typescript',
            content: `/**
 * Format a number as currency
 */
export function formatCurrency(
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Format a number with thousands separators
 */
export function formatNumber(
  value: number,
  locale: string = 'en-US',
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Format a date to a readable string
 */
export function formatDate(
  date: Date | string | number,
  format: 'short' | 'medium' | 'long' | 'full' = 'medium',
  locale: string = 'en-US'
): string {
  const dateObj = date instanceof Date ? date : new Date(date);

  const options: Record<string, Intl.DateTimeFormatOptions> = {
    short: { month: 'numeric', day: 'numeric', year: '2-digit' },
    medium: { month: 'short', day: 'numeric', year: 'numeric' },
    long: { month: 'long', day: 'numeric', year: 'numeric' },
    full: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' },
  };

  return new Intl.DateTimeFormat(locale, options[format]).format(dateObj);
}

/**
 * Format a date to relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date | string | number): string {
  const dateObj = date instanceof Date ? date : new Date(date);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return \`\${count} \${interval.label}\${count !== 1 ? 's' : ''} ago\`;
    }
  }

  return 'just now';
}

/**
 * Format bytes to human readable size
 */
export function formatBytes(bytes: number, decimals: number = 2): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return \`\${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} \${sizes[i]}\`;
}

/**
 * Format a phone number
 */
export function formatPhoneNumber(phone: string, countryCode: string = 'US'): string {
  const cleaned = phone.replace(/\\D/g, '');

  if (countryCode === 'US' && cleaned.length === 10) {
    return \`(\${cleaned.slice(0, 3)}) \${cleaned.slice(3, 6)}-\${cleaned.slice(6)}\`;
  }

  return phone;
}

/**
 * Truncate a string with ellipsis
 */
export function truncate(str: string, maxLength: number, suffix: string = '...'): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Convert string to title case
 */
export function toTitleCase(str: string): string {
  return str.replace(
    /\\w\\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
  );
}

/**
 * Slugify a string for URL use
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\\w\\s-]/g, '')
    .replace(/[\\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Format a percentage
 */
export function formatPercentage(
  value: number,
  decimals: number = 1,
  includeSign: boolean = false
): string {
  const formatted = value.toFixed(decimals);
  const sign = includeSign && value > 0 ? '+' : '';
  return \`\${sign}\${formatted}%\`;
}`
          },
          {
            id: 'validators',
            name: 'validators.ts',
            path: 'src/utils/validators.ts',
            type: 'file',
            language: 'typescript',
            content: `/**
 * Validation utility functions
 * These functions return true if valid, false if invalid
 */

/**
 * Validate email address
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate phone number (basic validation)
 */
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 15;
}

/**
 * Validate password strength
 * Returns an object with validation details
 */
export interface PasswordValidation {
  isValid: boolean;
  score: number;
  feedback: string[];
}

export function validatePassword(password: string): PasswordValidation {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push('Password should be at least 8 characters');
  }

  if (password.length >= 12) {
    score += 1;
  }

  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Add uppercase letters');
  }

  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Add lowercase letters');
  }

  if (/[0-9]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Add numbers');
  }

  if (/[!@#$%^&*()_+\\-=\\[\\]{};':"\\\\|,.<>\\/?]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Add special characters');
  }

  return {
    isValid: score >= 4,
    score,
    feedback,
  };
}

/**
 * Validate credit card number using Luhn algorithm
 */
export function isValidCreditCard(cardNumber: string): boolean {
  const cleaned = cardNumber.replace(/\\D/g, '');

  if (cleaned.length < 13 || cleaned.length > 19) {
    return false;
  }

  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

/**
 * Validate date is in the future
 */
export function isFutureDate(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj > new Date();
}

/**
 * Validate date is in the past
 */
export function isPastDate(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj < new Date();
}

/**
 * Validate that a value is not empty
 */
export function isNotEmpty(value: any): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'object') return Object.keys(value).length > 0;
  return true;
}

/**
 * Validate minimum length
 */
export function hasMinLength(value: string, minLength: number): boolean {
  return value.length >= minLength;
}

/**
 * Validate maximum length
 */
export function hasMaxLength(value: string, maxLength: number): boolean {
  return value.length <= maxLength;
}

/**
 * Validate number range
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
}

/**
 * Validate alphanumeric string
 */
export function isAlphanumeric(value: string): boolean {
  return /^[a-zA-Z0-9]+$/.test(value);
}

/**
 * Validate hex color
 */
export function isValidHexColor(color: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}

/**
 * Validate UUID
 */
export function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}`
          },
          {
            id: 'helpers',
            name: 'helpers.ts',
            path: 'src/utils/helpers.ts',
            type: 'file',
            language: 'typescript',
            content: `/**
 * General helper utilities
 */

/**
 * Deep clone an object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Merge objects deeply
 */
export function deepMerge<T extends object>(...objects: Partial<T>[]): T {
  return objects.reduce((result, current) => {
    Object.keys(current).forEach((key) => {
      const resultValue = (result as any)[key];
      const currentValue = (current as any)[key];

      if (Array.isArray(resultValue) && Array.isArray(currentValue)) {
        (result as any)[key] = resultValue.concat(currentValue);
      } else if (isObject(resultValue) && isObject(currentValue)) {
        (result as any)[key] = deepMerge(resultValue, currentValue);
      } else {
        (result as any)[key] = currentValue;
      }
    });

    return result;
  }, {} as T);
}

function isObject(obj: any): obj is object {
  return obj && typeof obj === 'object' && !Array.isArray(obj);
}

/**
 * Generate a unique ID
 */
export function generateId(prefix: string = ''): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 9);
  return prefix ? \`\${prefix}_\${timestamp}\${randomPart}\` : \`\${timestamp}\${randomPart}\`;
}

/**
 * Sleep for specified milliseconds
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retry a function with exponential backoff
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error | undefined;

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i < maxRetries - 1) {
        await sleep(baseDelay * Math.pow(2, i));
      }
    }
  }

  throw lastError;
}

/**
 * Chunk an array into smaller arrays
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * Group array items by a key
 */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const groupKey = String(item[key]);
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(item);
    return groups;
  }, {} as Record<string, T[]>);
}

/**
 * Pick specific keys from an object
 */
export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  return keys.reduce((result, key) => {
    if (key in obj) {
      result[key] = obj[key];
    }
    return result;
  }, {} as Pick<T, K>);
}

/**
 * Omit specific keys from an object
 */
export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj };
  keys.forEach((key) => delete result[key]);
  return result;
}

/**
 * Debounce a function
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Throttle a function
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Check if running on client side
 */
export function isClient(): boolean {
  return typeof window !== 'undefined';
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  }
}`
          },
        ],
      },
      {
        id: 'services',
        name: 'services',
        path: 'src/services',
        type: 'folder',
        children: [
          {
            id: 'api',
            name: 'api.ts',
            path: 'src/services/api.ts',
            type: 'file',
            language: 'typescript',
            content: `/**
 * API Service
 * Centralized HTTP client with interceptors and error handling
 */

interface RequestConfig extends RequestInit {
  params?: Record<string, string>;
  timeout?: number;
}

interface ApiError extends Error {
  status?: number;
  code?: string;
  data?: any;
}

class ApiService {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;
  private interceptors: {
    request: ((config: RequestConfig) => RequestConfig)[];
    response: ((response: Response) => Response | Promise<Response>)[];
    error: ((error: ApiError) => never | Promise<never>)[];
  };

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
    this.interceptors = {
      request: [],
      response: [],
      error: [],
    };

    // Add default auth interceptor
    this.addRequestInterceptor((config) => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: \`Bearer \${token}\`,
        };
      }
      return config;
    });
  }

  addRequestInterceptor(interceptor: (config: RequestConfig) => RequestConfig) {
    this.interceptors.request.push(interceptor);
  }

  addResponseInterceptor(
    interceptor: (response: Response) => Response | Promise<Response>
  ) {
    this.interceptors.response.push(interceptor);
  }

  addErrorInterceptor(interceptor: (error: ApiError) => never | Promise<never>) {
    this.interceptors.error.push(interceptor);
  }

  private buildUrl(endpoint: string, params?: Record<string, string>): string {
    const url = new URL(\`\${this.baseUrl}\${endpoint}\`, window.location.origin);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }
    return url.toString();
  }

  private async request<T>(
    endpoint: string,
    config: RequestConfig = {}
  ): Promise<T> {
    // Apply request interceptors
    let finalConfig = {
      ...config,
      headers: { ...this.defaultHeaders, ...config.headers },
    };

    for (const interceptor of this.interceptors.request) {
      finalConfig = interceptor(finalConfig);
    }

    const { params, timeout = 30000, ...fetchConfig } = finalConfig;
    const url = this.buildUrl(endpoint, params);

    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      let response = await fetch(url, {
        ...fetchConfig,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Apply response interceptors
      for (const interceptor of this.interceptors.response) {
        response = await interceptor(response);
      }

      if (!response.ok) {
        const error: ApiError = new Error(\`HTTP \${response.status}\`);
        error.status = response.status;
        try {
          error.data = await response.json();
        } catch {
          error.data = null;
        }
        throw error;
      }

      // Handle empty responses
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        return await response.json();
      }

      return (await response.text()) as unknown as T;
    } catch (error) {
      const apiError = error as ApiError;

      // Apply error interceptors
      for (const interceptor of this.interceptors.error) {
        await interceptor(apiError);
      }

      throw apiError;
    }
  }

  async get<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  async post<T>(
    endpoint: string,
    data?: any,
    config: RequestConfig = {}
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(
    endpoint: string,
    data?: any,
    config: RequestConfig = {}
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(
    endpoint: string,
    data?: any,
    config: RequestConfig = {}
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...config,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }
}

// Export singleton instance
export const api = new ApiService();

// Export class for custom instances
export { ApiService };
export type { RequestConfig, ApiError };`
          },
          {
            id: 'storage',
            name: 'storage.ts',
            path: 'src/services/storage.ts',
            type: 'file',
            language: 'typescript',
            content: `/**
 * Storage Service
 * Abstraction over localStorage/sessionStorage with type safety and error handling
 */

type StorageType = 'local' | 'session';

interface StorageItem<T> {
  value: T;
  expiry?: number;
  createdAt: number;
}

class StorageService {
  private storage: Storage;
  private prefix: string;

  constructor(type: StorageType = 'local', prefix: string = 'app_') {
    this.storage = type === 'local' ? localStorage : sessionStorage;
    this.prefix = prefix;
  }

  private getKey(key: string): string {
    return \`\${this.prefix}\${key}\`;
  }

  /**
   * Get an item from storage
   * Returns null if item doesn't exist or has expired
   */
  get<T>(key: string): T | null {
    try {
      const item = this.storage.getItem(this.getKey(key));
      if (!item) return null;

      const parsed: StorageItem<T> = JSON.parse(item);

      // Check expiry
      if (parsed.expiry && Date.now() > parsed.expiry) {
        this.remove(key);
        return null;
      }

      return parsed.value;
    } catch (error) {
      console.error(\`Error reading from storage: \${key}\`, error);
      return null;
    }
  }

  /**
   * Set an item in storage
   * @param ttl Time to live in milliseconds (optional)
   */
  set<T>(key: string, value: T, ttl?: number): boolean {
    try {
      const item: StorageItem<T> = {
        value,
        createdAt: Date.now(),
        ...(ttl && { expiry: Date.now() + ttl }),
      };

      this.storage.setItem(this.getKey(key), JSON.stringify(item));
      return true;
    } catch (error) {
      console.error(\`Error writing to storage: \${key}\`, error);
      return false;
    }
  }

  /**
   * Remove an item from storage
   */
  remove(key: string): void {
    this.storage.removeItem(this.getKey(key));
  }

  /**
   * Clear all items with the current prefix
   */
  clear(): void {
    const keysToRemove: string[] = [];

    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i);
      if (key?.startsWith(this.prefix)) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach((key) => this.storage.removeItem(key));
  }

  /**
   * Get all keys with the current prefix
   */
  keys(): string[] {
    const result: string[] = [];

    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i);
      if (key?.startsWith(this.prefix)) {
        result.push(key.replace(this.prefix, ''));
      }
    }

    return result;
  }

  /**
   * Check if a key exists and is not expired
   */
  has(key: string): boolean {
    return this.get(key) !== null;
  }

  /**
   * Get the size of stored data in bytes
   */
  getSize(): number {
    let size = 0;

    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i);
      if (key?.startsWith(this.prefix)) {
        const value = this.storage.getItem(key) || '';
        size += key.length + value.length;
      }
    }

    return size * 2; // UTF-16 encoding = 2 bytes per character
  }
}

// Export singleton instances
export const localStorage = new StorageService('local');
export const sessionStorage = new StorageService('session');

// Export class for custom instances
export { StorageService };`
          },
        ],
      },
      {
        id: 'types',
        name: 'types',
        path: 'src/types',
        type: 'folder',
        children: [
          {
            id: 'user',
            name: 'user.ts',
            path: 'src/types/user.ts',
            type: 'file',
            language: 'typescript',
            content: `/**
 * User-related type definitions
 */

export interface User {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  role: UserRole;
  permissions: Permission[];
  preferences: UserPreferences;
  metadata: UserMetadata;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}

export type UserRole = 'admin' | 'user' | 'viewer' | 'guest';

export type Permission =
  | 'read'
  | 'write'
  | 'delete'
  | 'admin'
  | 'manage_users'
  | 'manage_settings'
  | 'view_analytics'
  | 'export_data';

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  weeklyDigest: boolean;
}

export interface UserMetadata {
  source: 'organic' | 'referral' | 'ads' | 'social';
  referredBy?: string;
  signupCampaign?: string;
  deviceType?: 'desktop' | 'mobile' | 'tablet';
  browser?: string;
  os?: string;
}

export interface CreateUserPayload {
  email: string;
  password: string;
  name: string;
  role?: UserRole;
}

export interface UpdateUserPayload {
  name?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  preferences?: Partial<UserPreferences>;
}

export interface UserSession {
  userId: string;
  token: string;
  refreshToken: string;
  expiresAt: Date;
  deviceId?: string;
}

export interface UserActivity {
  id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId?: string;
  metadata?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: Date;
}`
          },
          {
            id: 'common',
            name: 'common.ts',
            path: 'src/types/common.ts',
            type: 'file',
            language: 'typescript',
            content: `/**
 * Common type definitions used throughout the application
 */

// Pagination
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// API Response
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: ApiError[];
}

export interface ApiError {
  code: string;
  message: string;
  field?: string;
}

// Form states
export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  status: FormStatus;
}

// Select options
export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
  description?: string;
  icon?: string;
}

// Date range
export interface DateRange {
  start: Date;
  end: Date;
}

// Filter
export interface Filter {
  field: string;
  operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'contains' | 'in';
  value: any;
}

// Sort
export interface Sort {
  field: string;
  direction: 'asc' | 'desc';
}

// Entity base
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Async state
export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

// Nullable utility
export type Nullable<T> = T | null;

// DeepPartial utility
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Keys of type
export type KeysOfType<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

// Status types
export type Status = 'active' | 'inactive' | 'pending' | 'archived';
export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type Severity = 'info' | 'warning' | 'error' | 'critical';`
          },
        ],
      },
      {
        id: 'app',
        name: 'App.tsx',
        path: 'src/App.tsx',
        type: 'file',
        language: 'typescript',
        content: `import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/contexts/ThemeContext';
import HomePage from '@/pages/HomePage';
import DashboardPage from '@/pages/DashboardPage';
import NotFoundPage from '@/pages/NotFoundPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;`
      },
      {
        id: 'main',
        name: 'main.tsx',
        path: 'src/main.tsx',
        type: 'file',
        language: 'typescript',
        content: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`
      },
    ],
  },
  {
    id: 'config',
    name: 'config',
    path: 'config',
    type: 'folder',
    children: [
      {
        id: 'tsconfig',
        name: 'tsconfig.json',
        path: 'tsconfig.json',
        type: 'file',
        language: 'json',
        content: `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}`
      },
      {
        id: 'vite',
        name: 'vite.config.ts',
        path: 'vite.config.ts',
        type: 'file',
        language: 'typescript',
        content: `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});`
      },
      {
        id: 'package',
        name: 'package.json',
        path: 'package.json',
        type: 'file',
        language: 'json',
        content: `{
  "name": "react-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.21.0",
    "@tanstack/react-query": "^5.0.0",
    "lucide-react": "^0.294.0",
    "tailwind-merge": "^2.2.0",
    "clsx": "^2.1.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.2.2",
    "vite": "^5.0.8"
  }
}`
      },
    ],
  },
  {
    id: 'docs',
    name: 'docs',
    path: 'docs',
    type: 'folder',
    children: [
      {
        id: 'readme',
        name: 'README.md',
        path: 'README.md',
        type: 'file',
        language: 'markdown',
        content: `# React TypeScript Application

A modern React application built with TypeScript, Vite, and Tailwind CSS.

## Features

- ⚡️ **Vite** - Lightning fast development
- 🔷 **TypeScript** - Type safety and better DX
- 🎨 **Tailwind CSS** - Utility-first styling
- 📦 **React Query** - Powerful data fetching
- 🔐 **Authentication** - Complete auth system
- 📱 **Responsive** - Mobile-first design

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/yourusername/react-app.git

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

### Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run preview\` - Preview production build
- \`npm run lint\` - Run ESLint

## Project Structure

\`\`\`
src/
├── components/     # Reusable UI components
├── hooks/         # Custom React hooks
├── pages/         # Page components
├── services/      # API and external services
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
└── App.tsx        # Main application component
\`\`\`

## License

MIT`
      },
      {
        id: 'contributing',
        name: 'CONTRIBUTING.md',
        path: 'CONTRIBUTING.md',
        type: 'file',
        language: 'markdown',
        content: `# Contributing Guide

Thank you for considering contributing to this project!

## Development Process

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write or update tests
5. Submit a pull request

## Code Style

- Use TypeScript for all new code
- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic

## Commit Messages

Follow conventional commits:

- \`feat:\` New features
- \`fix:\` Bug fixes
- \`docs:\` Documentation changes
- \`refactor:\` Code refactoring
- \`test:\` Adding or updating tests

## Pull Requests

- Keep PRs focused and small
- Include a clear description
- Reference any related issues
- Ensure all tests pass`
      },
    ],
  },
];

// Flatten files for search
export function flattenFiles(files: FileItem[]): FileItem[] {
  const result: FileItem[] = [];

  function traverse(items: FileItem[]) {
    for (const item of items) {
      if (item.type === 'file') {
        result.push(item);
      }
      if (item.children) {
        traverse(item.children);
      }
    }
  }

  traverse(files);
  console.log(result)
  return result;
}

export const flatFiles = flattenFiles(sampleFiles);
