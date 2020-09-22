import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './models/profile.entity';
import { ProfileService } from './profile.service';

@Controller('user/profile')
export class ProfileController {
    
    constructor(private readonly profileService: ProfileService) { }

    @Post()
    create(@Body() CreateProfileDto: CreateProfileDto): Promise<Profile> {
        //console.log(JSON.stringify(createThemeDto));
        return this.profileService.create(CreateProfileDto);
    }

    @Get()
    findAll(): string {
        return "This is users profile"
    }
}
