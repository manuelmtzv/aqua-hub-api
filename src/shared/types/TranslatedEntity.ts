import { EntityTranslation } from '@/shared/interfaces/entityTranslation.interface';

export type TranslatableEntity<T extends EntityTranslation> = {
  translations: T[];
};

export type TranslatedEntity<
  TEntity extends TranslatableEntity<TTranslation>,
  TTranslation extends EntityTranslation,
> = Omit<TEntity, 'translations'> & Omit<TTranslation, 'code' | 'enabled'>;
