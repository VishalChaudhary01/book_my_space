export const ROOMS_PER_PAGE = 10;
export const DEFAULT_PAGE = 1;

export const services = [
  {
    header: "Meeting rooms by the hour",
    desc: "Right sized room at the right price for any kind of meeting from interviews to presentations.",
    src: "/images/service-1.webp",
  },
  {
    header: "Hybrid Workplace",
    desc: "Your remote and distributed teams can now gain instant access to 2000+ professional, productive coworking spaces across 45 cities in India on a pay-per-use model.",
    src: "/images/service-2.webp",
  },
  {
    header: "Virtual Offices",
    desc: "Get an address to register your company or just as a communication address. Service available across 24 cities at rates starting Rs 1000 / month.",
    src: "/images/service-3.webp",
  },
  {
    header: "Hot desks for a day",
    desc: "Book a desk for a day at rates starting Rs 99/day. Work near home for heads-down work.",
    src: "/images/service-4.webp",
  }
];

export const addRoomFormElements = [
  {
    label: "Room Name",
    name: "name",
    componentType: "input",
    type: "text",
    placeholder: "Enter room title",
  },
  {
    label: "Price per hour",
    name: "pricePerHour",
    componentType: "input",
    type: "number",
    placeholder: "Enter price per hour",
  },
  {
    label: "Price per day",
    name: "pricePerDay",
    componentType: "input",
    type: "number",
    placeholder: "Enter price per day",
  },
  {
    label: "Price per month",
    name: "pricePerMonth",
    componentType: "input",
    type: "number",
    placeholder: "Enter price per month",
  },
  {
    label: "Length (in feet)",
    name: "lengthInFeet",
    componentType: "input",
    type: "number",
    placeholder: "Enter room length in feet",
  },
  {
    label: "Width (in feet)",
    name: "widthInFeet",
    componentType: "input",
    type: "number",
    placeholder: "Enter room width in feet",
  },
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter room address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter city",
  },
  {
    label: "State",
    name: "state",
    componentType: "input",
    type: "text",
    placeholder: "Enter state",
  },
  {
    label: "Pin Code",
    name: "pin",
    componentType: "input",
    type: "number",
    placeholder: "Enter pin code",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter room description (optional)",
  },
];

export const sidebarLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "All Rooms",
    href: "/rooms"

  },
  {
    name: "Booked Rooms",
    href: "/rooms/booked"
  },
  {
    name: "Rented Rooms",
    href: "/rooms/rented"
  },
  {
    name: "Account",
    href: "/account"
  }
];

export const footerItems = [
  {
    label: 'About Us',
    href: '/',
  },
  {
    label: 'Terms of Service',
    href: '/',
  },
  {
    label: 'Privacy Policy',
    href: '/',
  },
];