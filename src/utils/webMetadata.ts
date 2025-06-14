
export interface WebMetadata {
  title: string;
  domain: string;
}

export const fetchWebMetadata = async (url: string): Promise<WebMetadata> => {
  try {
    // Ensure URL has protocol
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    const urlObj = new URL(fullUrl);
    const domain = urlObj.hostname.replace('www.', '');
    
    // For demo purposes, we'll use a CORS proxy service
    // In production, you'd want to use your own backend service
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(fullUrl)}`;
    
    const response = await fetch(proxyUrl);
    const data = await response.json();
    
    if (data.contents) {
      // Extract title from HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(data.contents, 'text/html');
      const titleElement = doc.querySelector('title');
      const title = titleElement?.textContent?.trim() || domain;
      
      return {
        title: title.length > 100 ? title.substring(0, 100) + '...' : title,
        domain
      };
    }
    
    // Fallback if fetch fails
    return {
      title: domain,
      domain
    };
  } catch (error) {
    // Fallback for any errors
    const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
    const domain = urlObj.hostname.replace('www.', '');
    
    return {
      title: domain,
      domain
    };
  }
};
