import { SiteHeader } from "@/components/site-header"

export default function IndexPage() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <div className="flex-1 justify-items-stretch">
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
          <div className="flex max-w-[980px] flex-col items-start gap-2">
            <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
              Home page
            </h1>
          </div>
        </section>
      </div>
    </div>
  )
}
