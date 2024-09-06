export type TranslatableEntity<T> = {
  translations: T[];
};

export type TranslatedEntity<T, C, B extends TranslatableEntity<C>> = {
  [P in keyof B]: B[P];
};
