export type PromiseState = 'PENDING' | 'RESOLVED' | 'REJECTED';

export interface GenericFunction<T> {
  (value: T): void;
}