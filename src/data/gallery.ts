import type { ImageMetadata } from "astro";

import kuduBull from "../assets/images/kudu-bull.jpg";
import huntKudu from "../assets/images/hunt-kudu.jpg";
import huntKuduPair from "../assets/images/hunt-kudu-pair.jpg";
import huntSpringbok from "../assets/images/hunt-springbok.jpg";
import huntLion from "../assets/images/hunt-lion.jpg";
import huntWarthog from "../assets/images/hunt-warthog.jpg";
import huntElephant from "../assets/images/hunt-elephant.jpg";
import huntGroup from "../assets/images/hunt-group.jpg";
import huntBlesbok from "../assets/images/hunt-blesbok.jpg";
import huntBlackWildebeest from "../assets/images/hunt-black-wildebeest.jpg";
import bowHunters from "../assets/images/bow-hunters.jpg";
import phSunset from "../assets/images/ph-sunset.jpg";

import accomChalet from "../assets/images/accom-chalet.jpg";
import accomInterior from "../assets/images/accom-interior.jpg";
import campSign from "../assets/images/camp-sign.jpg";
import campStaff from "../assets/images/camp-staff.jpg";

export interface GalleryItem {
  src: ImageMetadata;
  alt: string;
}

export const hunting: GalleryItem[] = [
  { src: huntKudu, alt: "Hunter with a greater kudu bull taken on free-range land" },
  { src: kuduBull, alt: "A greater kudu bull in the South African bushveld" },
  { src: huntSpringbok, alt: "A successful plains-game hunt at first light" },
  { src: huntLion, alt: "A Caldwell Safaris big-game hunt — the Big Five heritage" },
  { src: huntKuduPair, alt: "Two hunters with a heavy-horned kudu trophy" },
  { src: huntBlackWildebeest, alt: "Hunter with a black wildebeest on the open plains" },
  { src: huntWarthog, alt: "A characterful old warthog boar taken in the bushveld" },
  { src: bowHunters, alt: "Bow hunters preparing for a stalk" },
  { src: huntElephant, alt: "A big-game safari moment in the African wild" },
  { src: huntGroup, alt: "A family hunting party celebrating a memorable safari" },
  { src: huntBlesbok, alt: "A fine white blesbuck taken on the grasslands" },
  { src: phSunset, alt: "A professional hunter against a bushveld sunset" },
];

export const accommodation: GalleryItem[] = [
  { src: accomChalet, alt: "A guest chalet beneath the trees at the Caldwell homestead" },
  { src: accomInterior, alt: "Inside the early-1900s farmhouse at Caldwell Safaris" },
  { src: campSign, alt: "The rustic Caldwell Safaris welcome sign" },
  { src: campStaff, alt: "The Caldwell camp team who look after every guest" },
];
