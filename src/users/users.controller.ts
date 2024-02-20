import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/createUser-dto';
import { UpdateUserDTO } from './dto/updateUser-dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    
    @Post() // POST/users
    create(@Body(ValidationPipe) user: CreateUserDTO) {
        return this.usersService.create( user )
    }
    
    @Get() // GET/Users
    findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        return this.usersService.findAll(role)
    }

    @Get(':id') // GET/Users/:id
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne( id )
    }


    @Patch(':id') // PATCH/users/:id
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) userUpdate: UpdateUserDTO) {
        return this.usersService.update(id, userUpdate)
    }

    @Delete(':id') // DELETE/Users/:id
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.delete( id )
    }
}
