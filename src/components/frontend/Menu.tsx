import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from '../ui/button';

// Types
interface MenuItemProps {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  alt: string;
}

interface MenuSectionProps {
  title: string;
  items: MenuItemProps[];
}

// Menu Item Component
const MenuItem: React.FC<MenuItemProps> = ({ name, description, price, imageUrl, alt }) => (
  <div className="animate-slideUp">
    <Card className="mb-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-none">
      <CardContent className="p-6">
        <div className="flex items-center gap-6">
          <div className="w-1/3 relative group">
            <div className="absolute inset-0 bg-black/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <img
              className="w-full h-40 object-cover rounded-xl shadow-lg"
              src={imageUrl}
              alt={alt}
            />
          </div>
          <div className="w-2/3">
            <h4 className="text-2xl font-bold mb-2">{name}</h4>
            <p className="text-gray-600 leading-relaxed">{description}</p>
            <div className="flex items-center justify-between mt-4">
              <h5 className="text-2xl font-bold">${price}</h5>
              <Button>
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

// Menu Section Component
const MenuSection: React.FC<MenuSectionProps> = ({ title, items }) => (
  <div className="animate-slide-in-left">
    <h1 className="text-3xl font-bold mb-8 text-gray-900 pb-2 inline-block">{title}</h1>
    {items.map((item, index) => (
      <MenuItem key={index} {...item} />
    ))}
  </div>
);

// Menu Data
const menuData = {
  hotCoffee: {
    title: "Hot Coffee",
    items: [
      {
        name: "Black Coffee",
        description: "Sit lorem ipsum et diam elitr est dolor sed duo guberg sea et et lorem dolor",
        price: 5,
        imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&auto=format&fit=crop&q=80",
        alt: "Black Coffee"
      },
      {
        name: "Chocolate Coffee",
        description: "Sit lorem ipsum et diam elitr est dolor sed duo guberg sea et et lorem dolor",
        price: 7,
        imageUrl: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&auto=format&fit=crop&q=80",
        alt: "Chocolate Coffee"
      },
      {
        name: "Coffee With Milk",
        description: "Sit lorem ipsum et diam elitr est dolor sed duo guberg sea et et lorem dolor",
        price: 9,
        imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&auto=format&fit=crop&q=80",
        alt: "Coffee With Milk"
      }
    ]
  },
  coldCoffee: {
    title: "Cold Coffee",
    items: [
      {
        name: "Iced Black Coffee",
        description: "Sit lorem ipsum et diam elitr est dolor sed duo guberg sea et et lorem dolor",
        price: 5,
        imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&auto=format&fit=crop&q=80",
        alt: "Iced Black Coffee"
      },
      {
        name: "Iced Chocolate Coffee",
        description: "Sit lorem ipsum et diam elitr est dolor sed duo guberg sea et et lorem dolor",
        price: 7,
        imageUrl: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&auto=format&fit=crop&q=80",
        alt: "Iced Chocolate Coffee"
      },
      {
        name: "Iced Coffee With Milk",
        description: "Sit lorem ipsum et diam elitr est dolor sed duo guberg sea et et lorem dolor",
        price: 9,
        imageUrl: "https://images.unsplash.com/photo-1579888944880-d98341245702?w=400&auto=format&fit=crop&q=80",
        alt: "Iced Coffee With Milk"
      }
    ]
  }
};

// Main Menu Component
const Menu = () => {
  return (
    <div className="w-full py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 animate-slideDown">
          <h4 className="uppercase tracking-widest font-medium">Menu & Pricing</h4>
          <h1 className="text-5xl font-bold mt-4 text-gray-900">Our Signature Drinks</h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Discover our carefully crafted selection of premium coffee beverages,
            each prepared with the finest ingredients and served with passion.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <MenuSection title={menuData.hotCoffee.title} items={menuData.hotCoffee.items} />
          <MenuSection title={menuData.coldCoffee.title} items={menuData.coldCoffee.items} />
        </div>
      </div>
    </div>
  )
}

export default Menu
