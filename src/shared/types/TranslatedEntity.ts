import { EntityTranslation } from '@/shared/interfaces/entityTranslation.interface';

export type TranslatableEntity<T extends EntityTranslation> = {
  translations: T[];
};

export type TranslatedEntity<
  TTranslation extends EntityTranslation,
  TEntity extends TranslatableEntity<TTranslation>,
> = Omit<TEntity, 'translations'> & Omit<TTranslation, 'code' | 'enabled'>;
