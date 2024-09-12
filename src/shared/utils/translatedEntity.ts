import {
  TranslatedEntity,
  TranslatableEntity,
} from '@/shared/types/TranslatedEntity';
import { EntityTranslation } from '@/shared/interfaces/entityTranslation.interface';

export function translateEntity<
  TTranslation extends EntityTranslation,
  TEntity extends TranslatableEntity<TTranslation>,
>(code: string, entity: TEntity): TranslatedEntity<TEntity, TTranslation> {
  const translation = entity.translations.find((t) => t.code === code);

  if (!translation) {
    return;
  }

  delete entity.translations;
  delete translation.code;
  delete translation.enabled;

  return {
    ...entity,
    ...translation,
  };
}

export function translateEntities<
  TTranslation extends EntityTranslation,
  TEntity extends TranslatableEntity<TTranslation>,
>(
  code: string,
  entities: TEntity[],
): TranslatedEntity<TEntity, TTranslation>[] {
  const available = entities.filter((entity) =>
    entity.translations.some((t) => t.code === code),
  );

  return available.map((entity) => translateEntity(code, entity));
}
