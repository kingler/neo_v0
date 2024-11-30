/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '../../../lib/utils' {
  import { type ClassValue } from 'clsx'
  export function cn(...inputs: ClassValue[]): string
}

declare module '../design-system/src/components/layouts' {
  import type { DefineComponent } from 'vue'
  export const MainLayout: DefineComponent<{ class?: string }>
  export const DashboardLayout: DefineComponent<{ class?: string }>
  export const GridLayout: DefineComponent<{
    class?: string
    cols?: '1' | '2' | '3' | '4' | '5' | '6'
    rows?: '1' | '2' | '3' | '4'
    gap?: '2' | '4' | '6' | '8'
  }>
  export const SplitLayout: DefineComponent<{
    class?: string
    split?: '1/3' | '1/2' | '2/3'
    reverse?: boolean
  }>
  export const MasonryLayout: DefineComponent<{
    class?: string
    columns?: '2' | '3' | '4' | '5'
    gap?: '2' | '4' | '6' | '8'
  }>
}

declare module '../design-system/src/components/ui/button' {
  import type { DefineComponent } from 'vue'
  export const Button: DefineComponent<{
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
    size?: 'default' | 'sm' | 'lg' | 'icon'
    class?: string
  }>
}

declare module '../design-system/src/components/ui/card' {
  import type { DefineComponent } from 'vue'
  export const Card: DefineComponent<{ class?: string }>
  export const CardHeader: DefineComponent<{ class?: string }>
  export const CardTitle: DefineComponent<{ class?: string }>
  export const CardDescription: DefineComponent<{ class?: string }>
  export const CardContent: DefineComponent<{ class?: string }>
  export const CardFooter: DefineComponent<{ class?: string }>
}

declare module '../design-system/src/components/ui/data-table' {
  import type { DefineComponent } from 'vue'
  export const DataTable: DefineComponent<{ class?: string }>
  export const DataTableHeader: DefineComponent<{ class?: string }>
  export const DataTableBody: DefineComponent<{ class?: string }>
  export const DataTableHead: DefineComponent<{ class?: string }>
  export const DataTableRow: DefineComponent<{ class?: string }>
  export const DataTableCell: DefineComponent<{ class?: string }>
} 