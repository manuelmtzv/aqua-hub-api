export interface MediaService {
  uploadImage(file: Express.Multer.File): Promise<any>;
  getImage(imageId: string): Promise<any>;
}
