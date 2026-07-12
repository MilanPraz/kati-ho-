import {
  Smartphone,
  Laptop,
  Tablet,
  Watch,
  Headphones,
  Camera,
} from "lucide-react";

export const CATEGORY_ICONS: Record<string, typeof Smartphone> = {
  Mobiles: Smartphone,
  Laptops: Laptop,
  Tablets: Tablet,
  Smartwatches: Watch,
  Accessories: Headphones,
  Cameras: Camera,
};
