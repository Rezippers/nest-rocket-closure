import {S3Client} from '@aws-sdk/client-s3';
import {Injectable} from '@nestjs/common';

import {ConfigService} from '../config/config.service';

@Injectable()
export class S3ClientFactory {
    private s3Client: S3Client;

    constructor(private readonly configService: ConfigService) {}

    getClient(): S3Client {
        if (!this.s3Client) {
            this.s3Client = new S3Client({
                credentials: {
                    accessKeyId: this.configService.env.AWS_ACCESS_KEY_ID,
                    secretAccessKey: this.configService.env.AWS_SECRET_ACCESS_KEY,
                },
                region: this.configService.env.AWS_REGION,
            });
        }
        return this.s3Client;
    }
}
