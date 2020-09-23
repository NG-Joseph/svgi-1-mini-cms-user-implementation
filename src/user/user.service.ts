import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create/create-User.dto';
import { UpdateUserDto } from './dto/update/update-User.dto';
import { Profile } from './modules/profile/models/profile.entity';
import { User } from './models/User.entity';

@Injectable()
export class UserService {

    /**
     * 
     * @param userRepository 
     * @param profileRepository 
     */
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Profile) private profileRepository: Repository<Profile>
    ){}

    /**
     * 
     * @param createUserDto 
     * 
     */
    //create below assumes that User model does not allow cascade create of custom theme
    /*
    async create (createUserDto: CreateUserDto): Promise<User>{

        const newprofile = this.profileRepository.create(createUserDto.profile)
        const profile = await this.profileRepository.save(newprofile);


        const newItem = this.UserRepository.create(createUserDto);
        //associate the custom theme created above with newItem before saving
        newItem.profile = profile;

        
        return this.UserRepository.save(newItem);
    }
    */

    /**
     * 
     * @param createUserDto 
     */
    async create (createUserDto: CreateUserDto): Promise<User>{

        const newUser = this.userRepository.create(createUserDto);
        return await this.userRepository.save(newUser);

    }

    /**
     * See https://typeorm.io/#/find-options
     */
    /*
    async findAll(): Promise<User[]> {
        return await this.UserRepository.find();
    }
    */
    
    //2. Note: You can indicate the fields to be returned
    /*
    async findAll(): Promise<User[]> {
        return await this.UserRepository.find({select: ["code", "name"]});
    }*/

    //3. For relations, you can specify relations to be included in return
    /**
     * find all and return only code and name along with profile relation
     */
    async findAll(): Promise<User[]> {
        return await this.userRepository.find({select: ["id", "lastName"], relations: ["profile"]});
    }
    
    //4. Etc. See https://typeorm.io/#/find-options

    /**
     * 
     * @param id 
     * find by id
     */
    async findOne(id: string): Promise<User> {
        return await this.userRepository.findOne(id);
    }
    
    /**
     * 
     * @param id 
     * Finds by a criterion (id in this case) and deletes. Returns void
     */
    async delete(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }

    /**
     * 
     * @param User 
     * Remove the User specifed. Returns User removed.
     */
    async remove(User: User): Promise<User> {
        return await this.userRepository.remove(User);
    }

    //partial update
    /**
     * 
     * @param id 
     * @param User 
     * Find by the id and replace the fields sent in Dto
     */
    async update1(id: string, User: UpdateUserDto): Promise<UpdateResult> {
        return await this.userRepository.update(id, { ...User })
    }

    /**
     * 
     * @param User 
     * No partial update allowed here. Saves the User object supplied
     */
    async update2(User: User): Promise<User> {
        return await this.userRepository.save(User)
    }


}
