export interface MenuItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  alt: string;
}

export interface MenuSectionProps {
  title: string;
  items: MenuItemProps[];
}
