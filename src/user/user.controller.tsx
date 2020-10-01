import { Res, Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { CreateUserDto } from './dto/create/create-User.dto';
import { UpdateUserDto } from './dto/update/update-User.dto';
import { User } from './models/User.entity';
import { UserService } from './User.service';
import {FindOneParams} from './validators/params.validator'
import { renderToNodeStream } from 'react-dom/server';
import renderEngine from 'src/global/render.engine';
import { Reply } from 'src/global/custom.interfaces';
import App from '../client_dev/user-react-web-client/src/App';
import * as React from 'react';

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
    findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.UserService.findOne(id);
    }

    /**
     * 
     * @param id id of User to be updated
     * @param updateUserDto new content
     * Handle Put request for 
     */
    @Put(':id')
    partialUpdate(@Param('id') id: FindOneParams, @Body() updateUserDto: UpdateUserDto): Promise<UpdateResult> {
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

    @Get('web')
    web(@Res() reply: Reply) {
        
        //We want to render the raw way so that we can call renderToStream
        const res = reply.raw;

        /*We want to be able to send some initialization data to the react component
        Just using below string as an illustration placeholder for now. The real value will be 
        when we implement Authentication and Authorization.
        The token will contain whatever data you want to pass but in base64 digest format.
        */
        const initialProps = {jwtToken : "put-the-token-string-here-if-any"};        


        const beforeStream = renderEngine().render('users/before-react-stream.fragment.html', 
            { title: 'User Administration', userActive: true })

        const afterStream = renderEngine().render('users/after-react-stream.fragment.html', 
            { initialProps: JSON.stringify(initialProps) })

        //Write the first rendered fragment (upper html part)
        res.write(beforeStream);

        //write the React app using renderToNodeStream
        const stream = renderToNodeStream(<App {...initialProps}/>)

        stream.addListener('end', () => {
            res.write(afterStream); //Write the last rendered fragment (lower html part)
            res.end();
        });

        //enable stream piping
        stream.pipe(res, { end: false });

    }

}

