import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

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
    return this.getBackgroundImageUrl('assets/icons/searchicon.svg');
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

  getBelgiumFlagIconUrl(): string {
    return 'assets/flags/belgium.svg';
  }

  getBrazilianFlagIconUrl() {
    return 'assets/flags/brazil.svg';
  }

  getJamaicanFlagIconUrl() {
    return 'assets/flags/jamaica.svg';
  }

  getStartIconUrl() {
    return this.getBackgroundImageUrl('assets/icons/start-icon.svg');
  }

  getStartAllIconUrl() {
    return this.getBackgroundImageUrl('assets/icons/start-all-icon.svg');
  }
}
