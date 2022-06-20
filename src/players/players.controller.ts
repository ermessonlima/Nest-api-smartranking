import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { PlayersService } from './players.service';
 
@Controller('api/v1/players')
export class PlayersController {
    constructor(private readonly playersService: PlayersService) {}

    @Post()
    async createUpdatePlayers(@Body() createPlayerDto: CreatePlayerDto) {
        return this.playersService.createUpdatePlayers(createPlayerDto);
    }

    @Get()
    async getPlayers(
        @Query('email') email: string,
    ) : Promise<Player[] | Player > { 
        if(email) {
            return this.playersService.getPlayersByEmail(email);
        }
        return this.playersService.getPlayers();
    }

    @Delete()
    async deletePlayer(@Query('email') email: string) {
        return this.playersService.deletePlayer(email);
    }
    
}
