import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Put, Query, Res } from '@nestjs/common';
import { renderToNodeStream } from 'react-dom/server';
import App from '../client_dev/user-react-web-client/src/App';
import * as React from 'react';
import { Reply, UsersWithCount } from 'src/global/custom.interfaces';
import renderEngine from 'src/global/render.engine';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { CreateUserDto } from './dto/create/create-user.dto';
import { UpdateUserDto } from './dto/update/update-user.dto';
import { User } from './models/user.entity';
import { UserService } from './user.service';
//import { FindOneParams } from './validators/params.validator';


@Controller('users')
export class UserController {

    /**
     * 
     * @param userService 
     * Inject userService
     */
    constructor(private readonly userService: UserService) { }

    /**
     * 
     * @param createUserDto 
     * Handle Post request for create
     */
    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
        //console.log(JSON.stringify(createUserDto));
        try{
            return this.userService.create(createUserDto);
        }catch(error){
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: `There was a problem with user creation: ${error.message}`,
              }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }

    /**
     * Handle Get request for find
     */
    @Get()
    findAll(@Query() query: string): Promise<UsersWithCount> {
        for (const queryKey of Object.keys(query)) {
            if(queryKey == "findOptions"){
                try{
                    return this.userService.findAllWithOptions(decodeURI(query[queryKey]));
                } catch (error){
                    //throw new HttpException('Forbidden', HttpStatus.NOT_FOUND);
                    throw new HttpException({
                        status: HttpStatus.INTERNAL_SERVER_ERROR,
                        error: `There was a problem accessing users data: ${error.message}`,
                      }, HttpStatus.INTERNAL_SERVER_ERROR);
                }
                
            }
        }
        try{
            return this.userService.findAll();
        }catch(error){
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: `There was a problem accessing users data: ${error.message}`,
              }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }
    

    /**
     * 
     * @param id 
     * Handle Get request for find by id
     */
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
        
        try{
            return this.userService.findOne(id);
        }catch(error){
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: `There was a problem accessing user data: ${error.message}`,
              }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }

    /**
     * 
     * @param id id of user to be updated
     * @param updateUserDto new content
     * Handle Put request for 
     */
    /* FindOneParams not working well. Using ParseIntPipe
    @Put(':id')
    partialUpdate(@Param('id', ParseIntPipe) id: FindOneParams, @Body() updateUserDto: UpdateUserDto): Promise<UpdateResult> {
        return this.userService.update1(id, updateUserDto);
    }
    */
    @Put(':id')
    partialUpdate(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<UpdateResult> {
        
        try{
            return this.userService.update1(id, updateUserDto);
        }catch(error){
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: `There was a problem updating user data: ${error.message}`,
              }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }

    /**
     * 
     * @param user 
     * Non-partial update. Takes a full user without param.
     */
    @Put()
    update(@Body() user: User): Promise<User> {
        
        try{
            return this.userService.update2(user);
        }catch(error){
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: `There was a problem updating user data: ${error.message}`,
              }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        //throw new HttpException('Forbidden', HttpStatus.NOT_FOUND);
        try{
            return this.userService.delete(id);
        }catch(error){
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: `There was a problem deleting user data: ${error.message}`,
              }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('web')
    web(@Res() reply: Reply) {
        
        //We want to render the raw way so that we can call renderToStream
        const res = reply.raw;

        /*We want to be able to send some initialization data to the react component
        Just using below string as an illustration placeholder for now. The real value will be 
        when we implement Authentication and Authorization.
        The token will contain whatever data you want to pass but in base64 digest format.
        For example, UserInfo, Roles, ThemeContext values, etc.
        */
        const initialProps = {jwtToken : "put-the-token-string-here-if-any"};        


        const beforeStream = renderEngine().render('users/before-react-stream.fragment.html', 
            { title: 'Users Admin', UsersActive: true })

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
