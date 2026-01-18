import { Button } from '@/components';

export function HomePage() {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Welcome to {{PROJECT_NAME}}
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        {{PROJECT_DESCRIPTION}}
      </p>
      <div className="flex justify-center gap-4">
        <Button variant="primary">Get Started</Button>
        <Button variant="outline">Learn More</Button>
      </div>
    </div>
  );
}
