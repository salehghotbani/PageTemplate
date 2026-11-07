import { exampleItemSchema } from '@/types/example';
import { fetchWithAxios } from '../axios/FetchAxios';

export async function listExampleItems(signal?: AbortSignal) {
  const { data } = await fetchWithAxios.get<unknown>('example-items.json', {
    signal,
  });
  return exampleItemSchema.array().parse(data);
}
