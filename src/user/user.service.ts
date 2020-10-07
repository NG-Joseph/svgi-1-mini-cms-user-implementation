import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { UsersWithCount } from 'src/global/custom.interfaces';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto } from './dto/create/create-user.dto';
import { UpdateUserDto } from './dto/update/update-user.dto';
import { customProfile } from './models/custom-profile.entity';
import { User } from './models/user.entity';
//import { FindOneParams } from './validators/params.validator';

@Injectable()
export class UserService {

    /**
     * 
     * @param userRepository 
     * @param customProfileRepository 
     */
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(customProfile) private customProfileRepository: Repository<customProfile>
    ){}

    /**
     * 
     * @param createUserDto 
     * 
     */
    //create below assumes that user model does not allow cascade create of custom theme
    /*
    async create (createUserDto: CreateUserDto): Promise<User>{

        const newcustomProfile = this.customProfileRepository.create(createUserDto.customTheme)
        const customTheme = await this.customProfileRepository.save(newcustomProfile);


        const newItem = this.userRepository.create(createUserDto);
        //associate the custom theme created above with newItem before saving
        newItem.customTheme = customTheme;

        
        return this.userRepository.save(newItem);
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
    
    async findAllWithOptions(findOptions: string): Promise<UsersWithCount> {
        const [users, count] = await this.userRepository.findAndCount(JSON.parse(findOptions));
        return {users,count};
    }

    async findAll(): Promise<UsersWithCount> {
        const [users, count] = await this.userRepository.findAndCount();
        return {users, count}
    }
    
    
    //2. Note: You can indicate the fields to be returned
    /*
    async findAll(): Promise<User[]> {
        return await this.userRepository.find({select: ["code", "name"]});
    }*/

    //3. For relations, you can specify relations to be included in return
    /**
     * find all and return only code and name along with customTheme relation
     */
    /*
    async findAll(): Promise<User[]> {
        return await this.userRepository.find({select: ["code", "name"], relations: ["customTheme"]});
    }
    */
    
    //4. Etc. See https://typeorm.io/#/find-options

    /**
     * 
     * @param id 
     * find by id
     */
    async findOne(id: number): Promise<User> {
        return await this.userRepository.findOne(id);
    }
    
    /**
     * 
     * @param id 
     * Finds by a criterion (id in this case) and deletes. Returns void
     */
    /* FindOneParams not working well. Using ParseIntPipe
    async delete(id: FindOneParams): Promise<void> {
        await this.userRepository.delete(id);
    }
    */
    async delete(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }

    /**
     * 
     * @param user 
     * Remove the User specifed. Returns User removed.
     */
    async remove(user: User): Promise<User> {
        return await this.userRepository.remove(user);
    }

    //partial update
    /**
     * 
     * @param id 
     * @param user 
     * Find by the id and replace the fields sent in Dto
     */
    /*
    /* FindOneParams not working well. Using ParseIntPipe
    async update1(id: FindOneParams, user: UpdateUserDto): Promise<UpdateResult> {
        return await this.userRepository.update(id, { ...user })
    }
    */
    async update1(id: number, user: UpdateUserDto): Promise<UpdateResult> {
        return await this.userRepository.update(id, { ...user })
    }

    /**
     * 
     * @param user 
     * No partial update allowed here. Saves the user object supplied
     */
    async update2(user: User): Promise<User> {
        return await this.userRepository.save(user)
    }


}
