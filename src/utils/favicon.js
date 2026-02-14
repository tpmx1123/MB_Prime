// Utility function to update the favicon dynamically
export const updateFavicon = (faviconUrl) => {
    // Default favicon if none provided
    const defaultFavicon = 'https://res.cloudinary.com/dgmrbxuvb/image/upload/v1771061578/mb_yjwacv.ico';
    const url = faviconUrl || defaultFavicon;

    // Find existing favicon link element
    let link = document.querySelector("link[rel*='icon']");

    if (!link) {
        // Create new link element if it doesn't exist
        link = document.createElement('link');
        link.rel = 'icon';
        link.type = 'image/x-icon';
        document.head.appendChild(link);
    }

    // Update the href
    link.href = url;
};

// Utility function to update page title
export const updatePageTitle = (title) => {
    document.title = title || 'Prime Projects | We Create Landmarks';
};