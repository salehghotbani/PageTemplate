import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import { expect, it } from 'vitest';
import { useRouteFilters } from '@/Components/Base/useRouteFilters';

function FilterProbe() {
  const { getFilter, setFilters } = useRouteFilters();
  return (
    <button
      onClick={() => {
        setFilters({ q: 'theme', page: null });
        setFilters({ view: 'grid' });
      }}
    >
      {getFilter('q', 'Apply filters')}
    </button>
  );
}

it('combines quick filter patches and retains unrelated query parameters', async () => {
  const router = createMemoryRouter([{ path: '/', Component: FilterProbe }], {
    initialEntries: ['/?page=2&ref=shared'],
  });
  render(<RouterProvider router={router} />);
  fireEvent.click(screen.getByRole('button', { name: 'Apply filters' }));

  await waitFor(() => {
    expect(router.state.location.search).toBe('?ref=shared&q=theme&view=grid');
    expect(screen.getByRole('button', { name: 'theme' })).toBeTruthy();
  });
});
