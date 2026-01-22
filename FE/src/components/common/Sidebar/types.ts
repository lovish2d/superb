export type NavItem = {
    id: string;
    labelKey: string;
    icon?: React.ElementType; // Lucide or Custom Icon component
    path?: string;
    children?: NavItem[];
    horizontalChildren?: boolean;
    /**
     * Backend-style permission string (e.g., "*", "organizations.*", "users.read", "read").
     * If omitted, the item is always visible.
     */
    permission?: string;
    chip?: {
        label: string | number;
        color?: string;
    };
};
