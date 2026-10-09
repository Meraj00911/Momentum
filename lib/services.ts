export type ServiceDetail = {
  number: string;
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  description: string;
  focus: string[];
  approach: string[];
};

export const serviceDetails: ServiceDetail[] = [
  {
    number: "01",
    slug: "brand-strategy",
    title: "Brand Strategy",
    eyebrow: "CLARITY BEFORE THE NEXT MOVE",
    summary: "Build a brand people recognise, remember and choose.",
    description:
      "We find the sharpest expression of your business, then turn it into a clear position and a coherent identity. Every decision is made to help your brand show up with purpose across every touchpoint.",
    focus: ["Positioning & audience", "Brand identity systems", "Messaging & voice", "Creative direction"],
    approach: ["Understand the opportunity", "Define a distinctive position", "Build the identity system", "Equip your team to use it"],
  },
  {
    number: "02",
    slug: "digital-experiences",
    title: "Digital Experiences",
    eyebrow: "DESIGNED TO FEEL EFFORTLESS",
    summary: "Turn your digital presence into your best place to grow.",
    description:
      "We design and build considered websites and commerce experiences that bring brand, usability and performance together. The result feels unmistakably yours and makes the next step clear for every visitor.",
    focus: ["Digital strategy & UX", "Website design & development", "Ecommerce experiences", "Conversion-focused journeys"],
    approach: ["Map the customer journey", "Shape the visual experience", "Build for speed and clarity", "Refine from real-world use"],
  },
  {
    number: "03",
    slug: "performance",
    title: "Performance",
    eyebrow: "GROWTH WITH A CLEAR SIGNAL",
    summary: "Make every campaign a smarter next move.",
    description:
      "We connect paid acquisition, creative testing and measurement in one practical growth programme. Clear reporting and consistent optimisation help you understand what is working and where to move next.",
    focus: ["Paid social & acquisition", "Campaign structure", "Creative testing", "Analytics & reporting"],
    approach: ["Set goals and measurement", "Build the campaign system", "Test creative with intent", "Optimise and report clearly"],
  },
  {
    number: "04",
    slug: "creative",
    title: "Creative",
    eyebrow: "IDEAS BUILT TO MOVE PEOPLE",
    summary: "Make work that earns attention and stays with people.",
    description:
      "From the first concept to the final asset, we create campaigns and content with a point of view. Each idea is made to feel distinctive, work across channels and give your audience something worth responding to.",
    focus: ["Campaign concepts", "Art direction & design", "Social content systems", "Creative for paid media"],
    approach: ["Find the human insight", "Develop the central idea", "Create the campaign system", "Adapt for each channel"],
  },
];

export function getServiceBySlug(slug: string) {
  return serviceDetails.find((service) => service.slug === slug);
}
