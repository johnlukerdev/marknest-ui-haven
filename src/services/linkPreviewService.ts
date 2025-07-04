export interface LinkPreviewData {
  title: string;
  description?: string;
  image?: string;
  url: string;
  domain: string;
}

export class LinkPreviewService {
  private apiKey: string | null = null;

  constructor() {
    // Try to get API key from localStorage for frontend-only approach
    this.apiKey = localStorage.getItem('linkpreview_api_key');
  }

  setApiKey(key: string) {
    this.apiKey = key;
    localStorage.setItem('linkpreview_api_key', key);
  }

  getApiKey(): string | null {
    return this.apiKey;
  }

  clearApiKey() {
    this.apiKey = null;
    localStorage.removeItem('linkpreview_api_key');
  }

  async fetchPreview(url: string): Promise<LinkPreviewData> {
    // Extract domain for fallback
    const domain = new URL(url).hostname.replace('www.', '');
    
    // If no API key, return basic data
    if (!this.apiKey) {
      return {
        title: this.generateTitleFromDomain(domain),
        description: 'Add your LinkPreview.net API key to fetch rich previews',
        url,
        domain,
        image: undefined
      };
    }

    try {
      // Using LinkPreview.net API (you can switch to other services)
      const response = await fetch(`https://api.linkpreview.net/?key=${this.apiKey}&q=${encodeURIComponent(url)}`);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      
      return {
        title: data.title || this.generateTitleFromDomain(domain),
        description: data.description || '',
        image: data.image || undefined,
        url: data.url || url,
        domain
      };
    } catch (error) {
      console.error('Failed to fetch link preview:', error);
      
      // Return fallback data on error
      return {
        title: this.generateTitleFromDomain(domain),
        description: 'Failed to fetch preview',
        url,
        domain,
        image: undefined
      };
    }
  }

  private generateTitleFromDomain(domain: string): string {
    return domain
      .split('.')
      .slice(0, -1) // Remove TLD
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }

  // Alternative method using microlink.io (free tier available)
  async fetchPreviewWithMicrolink(url: string): Promise<LinkPreviewData> {
    const domain = new URL(url).hostname.replace('www.', '');
    
    try {
      const response = await fetch(`https://api.microlink.io?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`);
      
      if (!response.ok) {
        throw new Error(`Microlink API Error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.status === 'success') {
        return {
          title: data.data.title || this.generateTitleFromDomain(domain),
          description: data.data.description || '',
          image: data.data.image?.url || data.data.screenshot?.url || undefined,
          url: data.data.url || url,
          domain
        };
      }
      
      throw new Error('Microlink API returned error status');
    } catch (error) {
      console.error('Failed to fetch with Microlink:', error);
      
      return {
        title: this.generateTitleFromDomain(domain),
        description: 'Failed to fetch preview',
        url,
        domain,
        image: undefined
      };
    }
  }
}

export const linkPreviewService = new LinkPreviewService();