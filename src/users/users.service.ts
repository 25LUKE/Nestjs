import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/createUser-dto';
import { UpdateUserDTO } from './dto/updateUser-dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "Leanne Graham",
            "email": "Sincere@april.biz",
            "role": "INTERN", 
        },
        {
            "id": 2,
            "name": "Ervin Howell",
            "email": "Shanna@melissa.tv",
            "role": "INTERN",
        },
        {
            "id": 3,
            "name": "Clementina Bauch",
            "email": "Nathan@yesenia.net",
            "role": "ENGINEER",
        },
        {
            "id": 4,
            "name": "Patricia lebsack",
            "email": "Julianne.0Conner@kory.org",
            "role": "ENGINEER",
        },
        {
            "id": 5,
            "name": "Chelsey Dietrich",
            "email": "Lucio_Hettinger@annie.ca",
            "role": " ADMIN"
        }
    ]
    
    create(user: CreateUserDTO) {
        const usersByHighestId = [...this.users].sort((a,b) => b.id - a.id) // this should give us an arrey of highestId
        const newUser = {
            id: usersByHighestId[0].id + 1, //this is by generating the next(new person) highestId
            ...user
        }
        this.users.push(newUser)
        return newUser
    }

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            const rolesArray = this.users.filter(user => user.role === role)
            if(rolesArray) throw new NotFoundException("User Role Not Found")
            return rolesArray
        }
        return this.users
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id)
        if(!user) throw new NotFoundException("User Not Found")
        return user
    }


    update(id: number, updatedUser: UpdateUserDTO) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return {...user, ...updatedUser } //this will spread in all of the properties of the existing user and the updatedUser will just overwrite whatever property it contain so it comes after the user
            }
            return user
        })
        return this.findOne(id)
    }

    delete(id: number) {
        const removedUser = this.findOne(id)
        this.users = this.users.filter(user => user.id !== id)
        return removedUser
    }
}
