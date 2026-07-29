import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("hz-r-md hz-bg-surface", className)}
      {...props}
    />
  )
}

export { Skeleton }
