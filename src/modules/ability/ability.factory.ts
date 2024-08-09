import { Injectable } from '@nestjs/common';
import { User } from '@/entities';
import { AbilityBuilder, createMongoAbility } from '@casl/ability';
import { AppAbility } from '@/shared/types/appAbility.type';

@Injectable()
export class AbilityFactory {
  defineAbility(user: User) {
    const builder = new AbilityBuilder<AppAbility>(createMongoAbility);
  }
}
