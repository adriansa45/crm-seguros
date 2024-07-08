import { SettingsIcon, UsersIcon } from "../icons";
import { NavItem } from "./nav-item";

export default function Sidebar() {
    return (
        <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
                <NavItem href="/">
                    <UsersIcon className="h-4 w-4" />
                    Créditos
                </NavItem>
                <NavItem href="/customers">
                    <UsersIcon className="h-4 w-4" />
                    Clientes
                </NavItem>
            </nav>
        </div>
    );
}