import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './models/profile.entity';

@Injectable()
export class ProfileService {

    constructor(
        @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    ){}

    async create (createProfileDto: CreateProfileDto): Promise<Profile>{

        const newProfile = this.profileRepository.create(createProfileDto);
        return this.profileRepository.save(newProfile);
        
    }
}
