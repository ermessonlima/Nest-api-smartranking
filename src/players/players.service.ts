import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class PlayersService {

    private players: Player[] = [];

    private readonly logger = new Logger('PlayersService.name');

    async createUpdatePlayers(createPlayerDto: CreatePlayerDto): Promise<Player> {
        this.logger.log(`Creating player: ${JSON.stringify(createPlayerDto)}`);

        const {email} = createPlayerDto;
        const player = this.players.find(p => p.email === email);
        if (player) {
            this.logger.log(`Player already exists: ${JSON.stringify(player)}`);
            return this.updatePlayer(player, createPlayerDto)
        }

       return this.create(createPlayerDto);
        
    }

    private create(createPlayerDto: CreatePlayerDto): Player {
        const { phoneNumber, email, name } = createPlayerDto;
        const player: Player = {
            _id: uuidv4(),
            phoneNumber,
            email,
            name,
            ranking: 'A',
            rakingPosition: 1,
            urlPhotoPlayer: 'https://www.google.com.br/foto123.jpg',
        };
        this.players.push(player);

       return player;
    }

    async getPlayers(): Promise<Player[]> {
        this.logger.log(`Getting all players`);
        return this.players;
    }

    async getPlayersByEmail(email: string): Promise<Player> {
        this.logger.log(`Getting player by email: ${email}`);
        const player = this.players.find(p => p.email === email);

        if (!player) {
            throw new NotFoundException(`Player not found`);
        }

        return player;
    }

    async deletePlayer(email: string): Promise<Player> {
        this.logger.log(`Deleting player by email: ${email}`);
        const player = this.players.find(p => p.email === email);

        if (!player) {
            throw new NotFoundException(`Player not found`);
        }

        this.players = this.players.filter(p => p.email !== email);

        return player;
    }


    async updatePlayer(player: Player, createPlayerDto:CreatePlayerDto ): Promise<Player> {
       const { name } = createPlayerDto;
         player.name = name;

        return player;
    }

}
