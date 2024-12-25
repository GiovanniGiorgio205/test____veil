import { PackageIcon, SeparatorHorizontal, SettingsIcon } from "lucide-react"

export const WorkspaceConfig = {
  workspaceNav: [
    {
      title: "Applications",
      variant: "ghost",
      icon: PackageIcon,
      href: "/workspace",
    },
    {
      title: "Separator",
      variant: "default",
      icon: SeparatorHorizontal,
      href: "",
    },
    {
      title: "Settings",
      variant: "ghost",
      icon: SettingsIcon,
      href: "/workspace/settings",
    },
  ],
}
