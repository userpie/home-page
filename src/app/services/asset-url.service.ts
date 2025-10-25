import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssetUrlService {
  private readonly basePath = environment.firstPath;

  getAssetUrl(assetPath: string): string {
    // Remove leading slash if present to avoid double slashes
    const cleanPath = assetPath.startsWith('/') ? assetPath.substring(1) : assetPath;
    return `${this.basePath}/${cleanPath}`;
  }

  getBackgroundImageUrl(assetPath: string): string {
    return `url('${this.getAssetUrl(assetPath)}')`;
  }

  // Specific methods for your icons
  getSearchIconUrl(): string {
    return this.getBackgroundImageUrl('assets/icons/searchicon.png');
  }

  getEditIconUrl(): string {
    return this.getBackgroundImageUrl('assets/icons/edit-icon.svg');
  }

  getDeleteIconUrl(): string {
    return this.getBackgroundImageUrl('assets/icons/delete-icon.svg');
  }

  getResetIconUrl(): string {
    return this.getBackgroundImageUrl('assets/icons/reset-icon.svg');
  }

  getAddIconUrl(): string {
    return this.getBackgroundImageUrl('assets/icons/add-icon.svg');
  }
}
