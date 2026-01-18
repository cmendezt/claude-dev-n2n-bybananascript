import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex lg:flex-col">
        <h1 className="mb-8 text-4xl font-bold tracking-tight">
          Welcome to {{PROJECT_NAME}}
        </h1>
        <p className="mb-8 text-lg text-muted-foreground">
          Get started by editing{' '}
          <code className="rounded bg-muted px-2 py-1 font-mono text-sm">
            app/page.tsx
          </code>
        </p>
        <div className="flex gap-4">
          <Button>Get Started</Button>
          <Button variant="outline">Learn More</Button>
        </div>
      </div>
    </main>
  );
}
