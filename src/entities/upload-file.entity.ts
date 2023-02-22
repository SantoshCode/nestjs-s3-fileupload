import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('files')
export class UploadFile {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  fileUrl: string;

  @Column()
  fileKey: string; // so that we can map our file to specific key in s3 bucket
}
