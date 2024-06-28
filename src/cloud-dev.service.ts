import { Injectable } from '@nestjs/common';
import * as cloudinary from 'cloudinary';
import * as fs from 'fs';

type ResourceType = 'image' | 'video' | 'raw' | 'auto' | undefined;
type CropType = 'scale' | 'fit' | 'limit' | 'mfit' | 'fill' | 'pad' | 'lpad' | 'mpad' | 'crop' | 'thumb' | undefined;
type GravityType = 'north' | 'north_east' | 'north_west' | 'south' | 'south_east' | 'south_west' | 'east' | 'west' | 'center' | 'face' | 'faces' | undefined;
type EffectType = 'sepia' | 'grayscale' | 'blackwhite' | 'sharpen' | 'blur' | 'oil_paint' | 'pixelate' | 'vignette' | 'brightness_contrast' | 'auto_brightness' | 'auto_color' | 'auto_contrast' | 'improve' | undefined;
type Radius = 'max' | 'min' | string | number;

interface IUploadOptions {
  cloudFolder: string;
  cloudResourceType: ResourceType;
  cloudFormat: string;
  cloudCropType?: CropType;
  cloudWidth?: number;
  cloudHeight?: number;
  cloudAspectRatio?: string;
  cloudGravity?: GravityType;
  cloudX?: number;
  cloudY?: number;
  cloudZoom?: number;
  cloudEffect?: EffectType;
  cloudRadius?:Radius ;
  cloudAngle?:number;
  cloudDeleteLocalFile?: boolean;
  
}

@Injectable()
export class CloudDevService {
  constructor() {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });
  }

  async uploadCloud(file: Express.Multer.File, options: IUploadOptions): Promise<cloudinary.UploadApiResponse> {
    try {
      const cloudinaryOptions: cloudinary.UploadApiOptions = {
        folder: options.cloudFolder,
        resource_type: options.cloudResourceType,
        format: options.cloudFormat,
        width: options.cloudWidth,
        height: options.cloudHeight,
        crop: options.cloudCropType,
        aspect_ratio: options.cloudAspectRatio,
        gravity: options.cloudGravity,
        x: options.cloudX,
        y: options.cloudY,
        zoom: options.cloudZoom,
        effect: options.cloudEffect,
        radius: options.cloudRadius,
        angle:  options.cloudAngle,
      };

      const result = await cloudinary.v2.uploader.upload(file.path, cloudinaryOptions);

      if (options.cloudDeleteLocalFile) fs.unlinkSync(file.path);

      return result;
    } catch (error) {
      console.error('Error al cargar el archivo a Cloudinary:', error);
      throw new Error('Fallo la carga del archivo a Cloudinary');
    }
  }

  async deleteFileCloud(cloud_id: string) {
    try {
      const deletionResult = await cloudinary.v2.uploader.destroy(cloud_id);
      return deletionResult;
    } catch (error) {
      throw new Error('Fallo al eliminar archivo de Cloudinary');
    }
  }

  async deleteFolder(folder_cloud: string) {
    try {
      const result = await cloudinary.v2.api.delete_resources_by_prefix(folder_cloud);
      return result;
    } catch (error) {
      throw new Error('Fallo al eliminar carpeta en Cloudinary');
    }
  }
}
