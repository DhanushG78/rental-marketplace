import { BaseItem, ItemFilters } from '../types';

/**
 * A generic CRUD service for the marketplace entity.
 * In a real application, this would use fetch, axios, or a Firebase SDK.
 * For now, this mimics network requests with Promises and localStorage or in-memory array.
 */

// Mock storage
let mockItems: any[] = [
  { id: '1', userId: 'host1@example.com', title: 'Luxury Villa in Beverly Hills', location: 'Los Angeles, CA', rentPerMonth: 15000, bedrooms: 5, bathrooms: 6, area: 4500, propertyType: 'Villa', furnishing: 'Fully Furnished', amenities: 'Pool, Gym, Spa, Security', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80' },
  { id: '2', userId: 'host2@example.com', title: 'Modern Downtown Loft', location: 'New York, NY', rentPerMonth: 4500, bedrooms: 1, bathrooms: 1, area: 850, propertyType: 'Apartment', furnishing: 'Partially Furnished', amenities: 'Gym, Rooftop Access, Doorman', image: 'https://images.unsplash.com/photo-1502672260266-1c1de2d9d000?w=800&q=80' },
  { id: '3', userId: 'host1@example.com', title: 'Cozy Cabin Retreat', location: 'Aspen, CO', rentPerMonth: 3200, bedrooms: 3, bathrooms: 2, area: 1800, propertyType: 'House', furnishing: 'Furnished', amenities: 'Fireplace, Hot Tub, Ski in/out', image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80' },
  { id: '4', userId: 'host3@example.com', title: 'Beachfront Paradise', location: 'Miami, FL', rentPerMonth: 8500, bedrooms: 4, bathrooms: 3, area: 2200, propertyType: 'House', furnishing: 'Furnished', amenities: 'Private Beach, Pool, Balcony', image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80' },
  { id: '5', userId: 'user@example.com', title: 'Charming Studio in Paris', location: 'Paris, France', rentPerMonth: 2100, bedrooms: 1, bathrooms: 1, area: 400, propertyType: 'Studio', furnishing: 'Furnished', amenities: 'City View, WiFi, Elevator', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80' },
  { id: '6', userId: 'host2@example.com', title: 'Spacious Family Home', location: 'Austin, TX', rentPerMonth: 3500, bedrooms: 4, bathrooms: 2.5, area: 2800, propertyType: 'House', furnishing: 'Unfurnished', amenities: 'Large Yard, Garage, Quiet Neighborhood', image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80' },
  { id: '7', userId: 'host4@example.com', title: 'Sleek High-rise Condo', location: 'Chicago, IL', rentPerMonth: 2900, bedrooms: 2, bathrooms: 2, area: 1200, propertyType: 'Condo', furnishing: 'Furnished', amenities: 'Gym, Lake View, 24/7 Security', image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80' },
  { id: '8', userId: 'host1@example.com', title: 'Mountain View Chalet', location: 'Denver, CO', rentPerMonth: 4200, bedrooms: 3, bathrooms: 3, area: 2500, propertyType: 'Chalet', furnishing: 'Fully Furnished', amenities: 'Mountain Views, Fire Pit, Trails', image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80' },
  { id: '9', userId: 'host3@example.com', title: 'Historic Townhouse', location: 'Boston, MA', rentPerMonth: 5500, bedrooms: 3, bathrooms: 2, area: 2000, propertyType: 'Townhouse', furnishing: 'Semi-Furnished', amenities: 'Garden, Exposed Brick, Fireplace', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80' },
  { id: '10', userId: 'host5@example.com', title: 'Serene Lake House', location: 'Lake Tahoe, NV', rentPerMonth: 6000, bedrooms: 4, bathrooms: 3, area: 3000, propertyType: 'House', furnishing: 'Furnished', amenities: 'Private Dock, Kayaks, Hot Tub', image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80' },
  { id: '11', userId: 'host2@example.com', title: 'Urban Micro-Apartment', location: 'Tokyo, Japan', rentPerMonth: 1200, bedrooms: 1, bathrooms: 1, area: 300, propertyType: 'Apartment', furnishing: 'Furnished', amenities: 'Close to Transit, High-speed Internet', image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80' },
  { id: '12', userId: 'host4@example.com', title: 'Tropical Treehouse', location: 'Bali, Indonesia', rentPerMonth: 1800, bedrooms: 2, bathrooms: 1, area: 900, propertyType: 'Treehouse', furnishing: 'Furnished', amenities: 'Nature Views, Outdoor Shower, Pool', image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&q=80' },
  { id: '13', userId: 'user@example.com', title: 'Elegant Victorian Manor', location: 'London, UK', rentPerMonth: 9000, bedrooms: 6, bathrooms: 4, area: 5000, propertyType: 'Manor', furnishing: 'Partially Furnished', amenities: 'Library, Large Garden, Wine Cellar', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80' },
  { id: '14', userId: 'host1@example.com', title: 'Sunny Penthouse', location: 'San Diego, CA', rentPerMonth: 7500, bedrooms: 3, bathrooms: 3, area: 2400, propertyType: 'Penthouse', furnishing: 'Fully Furnished', amenities: 'Wrap-around Balcony, Ocean View', image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=800&q=80' },
  { id: '15', userId: 'host3@example.com', title: 'Desert Oasis Villa', location: 'Scottsdale, AZ', rentPerMonth: 6500, bedrooms: 4, bathrooms: 4, area: 3500, propertyType: 'Villa', furnishing: 'Furnished', amenities: 'Infinity Pool, Outdoor Kitchen, Golf Course', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80' },
  { id: '16', userId: 'host5@example.com', title: 'Quiet Country Cottage', location: 'Cotswolds, UK', rentPerMonth: 2200, bedrooms: 2, bathrooms: 1, area: 1100, propertyType: 'Cottage', furnishing: 'Furnished', amenities: 'Fireplace, Farm Views, Walking Paths', image: 'https://images.unsplash.com/photo-1542314831-c6a4d14faaf2?w=800&q=80' },
  { id: '17', userId: 'host2@example.com', title: 'Minimalist Tiny House', location: 'Portland, OR', rentPerMonth: 1400, bedrooms: 1, bathrooms: 1, area: 400, propertyType: 'Tiny House', furnishing: 'Furnished', amenities: 'Eco-friendly, Solar Panels, Garden', image: 'https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?w=800&q=80' },
  { id: '18', userId: 'host4@example.com', title: 'Modern Ski Condo', location: 'Whistler, Canada', rentPerMonth: 5000, bedrooms: 2, bathrooms: 2, area: 1300, propertyType: 'Condo', furnishing: 'Fully Furnished', amenities: 'Ski Storage, Hot Tub, Mountain Views', image: 'https://images.unsplash.com/photo-1517436073-3b3b1856cf7b?w=800&q=80' },
  { id: '19', userId: 'host1@example.com', title: 'Rustic Farmhouse', location: 'Nashville, TN', rentPerMonth: 3800, bedrooms: 4, bathrooms: 2, area: 2600, propertyType: 'House', furnishing: 'Semi-Furnished', amenities: 'Wraparound Porch, Acres of Land, Barn', image: 'https://images.unsplash.com/photo-1449840467179-716327bfe63b?w=800&q=80' },
  { id: '20', userId: 'host3@example.com', title: 'City Center Apartment', location: 'Berlin, Germany', rentPerMonth: 1900, bedrooms: 2, bathrooms: 1, area: 900, propertyType: 'Apartment', furnishing: 'Unfurnished', amenities: 'Balcony, Great Transit Access', image: 'https://images.unsplash.com/photo-1502672260266-1c1de2d9d000?w=800&q=80' },
  { id: '21', userId: 'host5@example.com', title: 'Luxury Yacht Stay', location: 'Monaco', rentPerMonth: 25000, bedrooms: 3, bathrooms: 3, area: 1500, propertyType: 'Boat', furnishing: 'Fully Furnished', amenities: 'Ocean Views, Crew, Jacuzzi', image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800&q=80' }
];

export const itemService = {
  /**
   * Fetch all items, optionally filtered
   */
  async getItems(filters?: ItemFilters): Promise<BaseItem[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 600));
    
    let results = [...mockItems];
    
    if (filters?.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      results = results.filter((item) => 
        item.title.toLowerCase().includes(term) || 
        item.description.toLowerCase().includes(term)
      );
    }
    
    // Add logic for dynamic attributes or price filters as needed...

    return results;
  },

  /**
   * Fetch a single item by ID
   */
  async getItemById(id: string): Promise<BaseItem | null> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return mockItems.find((item) => item.id === id) || null;
  },

  /**
   * Create a new item listing
   */
  async createItem(itemData: any): Promise<any> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const newItem = {
      ...itemData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    mockItems.push(newItem);
    return newItem;
  },

  /**
   * Update an existing item
   */
  async updateItem(id: string, updates: Partial<BaseItem>): Promise<BaseItem> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const index = mockItems.findIndex((item) => item.id === id);
    if (index === -1) throw new Error('Item not found');
    
    const updated = { ...mockItems[index], ...updates };
    mockItems[index] = updated;
    return updated;
  },

  /**
   * Delete an item
   */
  async deleteItem(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    mockItems = mockItems.filter((item) => item.id !== id);
  }
};
