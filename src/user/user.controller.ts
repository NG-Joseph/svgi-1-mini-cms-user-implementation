import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { CreateUserDto } from './dto/create/create-User.dto';
import { UpdateUserDto } from './dto/update/update-User.dto';
import { User } from './models/User.entity';
import { UserService } from './User.service';

@Controller('user')
export class UserController {

    /**
     * 
     * @param UserService 
     * Inject UserService
     */
    constructor(private readonly UserService: UserService) { }

    /**
     * 
     * @param createUserDto 
     * Handle Post request for create
     */
    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
        //console.log(JSON.stringify(createUserDto));
        return this.UserService.create(createUserDto);
    }

    /**
     * Handle Get request for find
     */
    @Get()
    findAll(): Promise<User[]> {
        return this.UserService.findAll();
    }

    /**
     * 
     * @param id 
     * Handle Get request for find by id
     */
    @Get(':id')
    findOne(@Param('id') id: string): Promise<User> {
        return this.UserService.findOne(id);
    }

    /**
     * 
     * @param id id of User to be updated
     * @param updateUserDto new content
     * Handle Put request for 
     */
    @Put(':id')
    partialUpdate(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UpdateResult> {
        return this.UserService.update1(id, updateUserDto);
    }

    /**
     * 
     * @param User 
     * Non-partial update. Takes a full User without param.
     */
    @Put()
    update(@Body() User: User): Promise<User> {
        return this.UserService.update2(User);
    }
}
