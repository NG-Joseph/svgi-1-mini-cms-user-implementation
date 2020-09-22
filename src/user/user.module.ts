import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { PermissionModule } from './modules/permission/permission.module';
import { Profile } from './modules/profile/models/profile.entity';
import { ProfileModule } from './modules/profile/profile.module';
import { RoleModule } from './modules/role/role.module';
import { UserController } from './user.controller';
import { UserService } from './User.service';

@Module({
    imports: [TypeOrmModule.forFeature([User, Profile]),
ProfileModule,
RoleModule,
PermissionModule
],
    controllers: [UserController],
    providers: [UserService]
})
export class UserModule {}
