export type TranslatableEntity<T> = {
  translations: T[];
};

export type TranslatedEntity<
  TTranslation,
  TEntity extends TranslatableEntity<TTranslation>,
> = Omit<TEntity, 'translations'> & Omit<TTranslation, 'code' | 'enabled'>;
