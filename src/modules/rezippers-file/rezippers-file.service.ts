import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {v4 as uuidv4} from 'uuid';

import {ConfigService} from "../config/config.service";
import {S3ClientFactory} from "../s3/s3-client.factory";
import {User} from "../users/users.entity";

import {RezippersFile} from "./rezippers-file.entity";


@Injectable()
export class RezippersFileService {
    constructor(
        @InjectRepository(RezippersFile)
        private readonly rezippersFileRepository: Repository<RezippersFile>,
        private readonly  configService: ConfigService,
        private readonly s3ClientFactory: S3ClientFactory,
    ) {
    }

    async create(author: User, file: Express.Multer.File): Promise<RezippersFile> {
        const s3: S3Client = this.s3ClientFactory.getClient();
        const key: string = uuidv4();

        const command: PutObjectCommand = new PutObjectCommand({
            Bucket: this.configService.env.AWS_S3_BUCKET,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
        });

        await s3.send(command);

        const rezippersFile: RezippersFile = this.rezippersFileRepository.create({
            author,
            key
        });
        return this.rezippersFileRepository.save(rezippersFile);
    }
}
