import { Button } from "@/components/ui/button"

export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="h-20 border-b flex flex-row gap-1 items-end p-1">
        <Button variant="ghost">Overview</Button>
        <Button variant="ghost">Users list</Button>
        <Button variant="ghost">Providers</Button>
        <Button variant="ghost">Application settings</Button>
      </div>
      {children}
    </div>
  )
}
