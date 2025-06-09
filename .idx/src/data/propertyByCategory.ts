import {
  Building4,
  Building3,
  Building,
  House2,
  Buildings,
  BagHappy,
  Tree,
  SafeHome,
  Courthouse,
  Home2,
  People,
  Wind,
  Icon, 
} from "iconsax-react";

export interface Category {
  id: number;
  name: string;
  icon: React.ElementType;
  propertyCount: number;
  forRent?: boolean;
}

const categories: Category[] = [
  {
    id: 1,
    name: "Apartments",
    icon: Home2,
    propertyCount: 12,
    forRent: true,
  },
  {
    id: 2,
    name: "Experiences",
    icon: BagHappy,
    propertyCount: 12,
  },
  {
    id: 3,
    name: "Events",
    icon: BagHappy,
    propertyCount: 12,
    forRent: true,
  },
  {
    id: 4,
    name: "National Parks",
    icon: Tree,
    propertyCount: 12,
    forRent: true,
  },
  {
    id: 5,
    name: "Islands",
    icon: BagHappy,
    propertyCount: 12,
  },
  {
    id: 6,
    name: "Bungalows",
    icon: Building,
    propertyCount: 12,
    forRent: true,
  },
  {
    id: 7,
    name: "Cabins",
    icon: Building,
    propertyCount: 12,
  },
  {
    id: 8,
    name: "Entire Home",
    icon: Building4,
    propertyCount: 12,
    forRent: true,
  },
  {
    id: 9,
    name: "Private Room",
    icon: People,
    propertyCount: 12,
    forRent: true,
  },
  {
    id: 10,
    name: "Beach Front",
    icon: People,
    propertyCount: 12,
    forRent: true,
  },
  {
    id: 11,
    name: "With Pool",
    icon: Wind,
    propertyCount: 12,
    forRent: true,
  },
  {
    id: 12,
    name: "Celebrity meet",
    icon: Icon,
    propertyCount: 12,
  },
];

export default categories; 