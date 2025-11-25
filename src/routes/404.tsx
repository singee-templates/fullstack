import { createFileRoute } from '@tanstack/react-router';
import { NotFoundElement } from '~components/system/not-found.tsx';

export const Route = createFileRoute('/404')({
  component: RouteComponent,
});

function RouteComponent() {
  return <NotFoundElement />;
}
