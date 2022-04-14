import { CollegeGroup } from "./types/misc";

interface NavItem {
  name: string;
  path: string;
}

export const groups: CollegeGroup[] = [
  {
    name: "US News Top 20 Universities",
    colleges: [
      "4114ab3f-cf42-4430-bbb8-b8a6c93497a0", // Princeton
      "860c5af1-1231-47e8-a18f-626501838952", // Columbia
      "4f4e8187-483b-4d25-a315-1637b6a7f010", // Harvard
      "c78c1577-2ffe-46a0-89d7-3824521b6110", // MIT
      "54e6d356-e7c2-4823-93db-fe2bbab4781b", // Yale
      "26c01ab6-5542-4629-b52e-cccbe8fe3c6f", // Stanford
      "976668c8-b730-4553-87bf-56feb9b6d4f0", // UChicago
      "9f1e2181-78a5-4c6a-b21f-b0c8f0036d5d", // UPenn
      "06d85bf7-4562-450f-b05d-9a37842890ca", // Caltech
      "4c5420a3-c9c1-4a8b-8a5f-d47d428f5af3", // Duke
      "e48c4a95-0fe0-49d3-a648-e051808f1126", // JHU
      "04f735ef-fdeb-4991-8be9-6c99591c2a15", // Northwestern
      "43e7dbb0-dc04-4483-8f6c-3e822340b2c4", // Dartmouth
      "04970b3e-3250-4ea6-91fa-9bf6f411c994", // Brown
      "9a4db3ae-f881-4235-9827-efb9422db35c", // Vanderbilt
      "1d0b5f4b-eeb1-407f-8f48-e9448f1f3bd1", // WashU STL
      "08a300b2-b1a6-415b-963a-05262d2aa206", // Cornell
      "c4f67518-1874-40b2-8143-ab66627bf6dc", // Rice
      "9dd88416-26b1-4010-96c4-7fb913fdf78a", // Notre Dame
      "e883594c-dc4c-4457-bb05-89a9d918c74e", // UCLA
    ],
  },
  {
    name: "US News Top 50 Liberal Arts Colleges",
    colleges: [
      "3d84765c-18c9-4b29-b17b-4e13c180f281", // Williams
      "294c0e8b-6d59-44ad-b5b1-ad6d27dcf5f2", // Amherst
      "a81023a6-eb4b-491a-8286-6afd5e4ef3c8", // Swarthmore
      "6a260af2-410e-4206-8d4c-44af845356a4", // Pomona
      "c8938413-cd30-4d45-a8eb-3da3f6d1a3d2", // Wellesley
      "3b1522d8-b888-49d6-a1a6-1908e30ee715", // Bowdoin
      "97e2a5d7-f052-463c-a962-4cfe3063f213", // US Naval Academy
      "1c97fa8f-03fd-4eec-b271-1434b90f7189", // Claremont McKenna
      "83e1eddd-1977-4876-b70c-e4a78f12f4a2", // Carleton
      "3d7f2618-fcb8-4d05-a978-5949cf20f4f0", // Middlebury
      "a8bc7f17-0e82-49e5-9f94-c1dd3489ce4b", // US Military Academy
      "0ef36acd-3a29-4c4d-9090-dbd780367fc8", // Washington & Lee
      "64a1cd4f-b0eb-4454-9aa9-be61c0f19b2c", // Davidson
      "50d56173-51e4-4842-8808-1f019746b21e", // Grinnell
      "0030f760-fed2-4d81-b1c0-dad19ba4480d", // Hamilton
      "2ce77d3a-8662-4ccc-b854-a22c31025d5a", // Haverford
      "6aeb4a1a-174d-4825-a5fb-46b03fb21016", // Barnard
      "18b18a63-6bec-4f12-8012-1dfbdae9dfad", // Colby
      "533d7106-2b09-4b4a-90a8-979cd5746e8d", // Colgate
      "47264a44-102f-48bc-9ded-161256e5fb07", // Smith
      "49d047bc-bcc1-4114-81d3-5d108e1f788c", // Wesleyan
      // US Air Force Academy - wasn't in the Windward data (SKIPPED)
      "2fe5afff-63f3-49d1-a7f6-c0423cd3d9e6", // University of Richmond
      "0db6f068-642a-4f4f-a2f9-2641154cd267", // Vassar
      "3f4a19b7-2815-42bd-ab52-67d752a505b2", // Bates
      "8eb25287-d516-4f17-9324-cb558e354d15", // Colorado College
      "cd08e2b6-eebf-436c-9fea-83ed6810c6eb", // Macalester
      "cd02bf48-5a7d-4256-b9b1-289ad90b7504", // Harvey Mudd
      // Soka University of America - wasn't in the Windward data (SKIPPED)
      // Berea College - wasn't in the Windward data (SKIPPED)
      // Bryn Mawr - wasn't in the Windward data (SKIPPED)
      "a3dcea9c-5997-4e28-8fc5-5a4b35efae12", // Kenyon
      "6ea4c5b3-27e9-4b15-85a2-f09a0205fd5d", // Mount Holyoke
      "3fa30d71-7f11-49c0-a669-ac80a0f94fe4", // Scripps
      "19286623-b534-47a4-9622-e3a1aa625526", // College of the Holy Cross
      "877cfec2-a0e8-41e4-aa3c-22f8286a1274", // Pitzer
      "c1aa5b28-6ceb-46e7-b2bb-c7102e9ca1a2", // Oberlin
      "ab7b40b5-a742-471b-8767-e424adc73be9", // Bucknell
      "773f9dcf-cab1-4c06-ba0d-53475f7a6f58", // Lafayette
      "5156fc82-ceb8-4ea3-8a72-4238330abcec", // Skidmore
      "da0f7760-6d9c-4dce-8362-3d031cc0786c", // Whitman
      "fb270995-0869-4b9e-9580-caf0e4813060", // Denison
      "c631db70-a477-49f1-9be0-172ae0f1187c", // Franklin & Marshall
      "fcb6570d-2c33-4cd9-86a9-39a967cd2423", // Occidental
      // Thomas Aquinas College - wasn't in the Windward data (SKIPPED)
      "32cf892c-e43f-4cb8-b34e-1a163a5942b4", // DePauw
      // Furman University - wasn't in the Windward data (SKIPPED)
      // Hillsdale College - wasn't in the Windward data (SKIPPED)
      "5797b00c-52c0-48ea-8753-3a4f033b043f", // Trinity
      "c2a59edb-c8a3-4407-af22-e85858cb824c", // Connecticut
      "7bee50e8-9993-47a0-a588-191862fa275f", // Dickinson
      "7e004e5d-ea0e-4271-b820-7988606cbf38", // Union (New York)
      // University of the South - wasn't in the Windward data (SKIPPED)
    ],
  },
  {
    name: "All UCs",
    colleges: [
      "a14b40e2-8bb8-4168-9454-f729fe03575f",
      "9563278b-74d9-4a00-ac07-8ebb7b941a4c",
      "5d760691-a37d-4d5b-a5fa-d648bd4cb955",
      "4cbedea8-9b3c-4fe2-856c-9eb2036b5382",
      "f4e915e5-8f7f-448a-9cfd-74cf526911a8",
      "e883594c-dc4c-4457-bb05-89a9d918c74e",
      "2d4aa0bb-ff2d-4f97-805a-c2854256aa1e",
      "e4736446-f54e-4e34-ade3-48d72b723109",
      "6bad2a2e-9120-4b8c-951a-b67469bfc7c2",
      "f530cac6-d0f2-42be-9acb-314465847831",
      "cfb85fbf-af61-466c-98e2-13c185c3eb93",
    ],
  },
  // https://www.usnews.com/best-graduate-schools/top-engineering-schools/eng-rankings
  {
    name: "US News Top 20 Engineering Schools",
    colleges: [
      "c78c1577-2ffe-46a0-89d7-3824521b6110", // MIT
      "26c01ab6-5542-4629-b52e-cccbe8fe3c6f", // Stanford
      "5d760691-a37d-4d5b-a5fa-d648bd4cb955", // UC Berkeley
      "cfd102b1-4d6c-47d5-bf44-48df592c826b", // Carnegie Mellon
      "175644bb-2e13-4906-b9c2-d12b73326a22", // Purdue
      "ff7a7898-cfe0-4cd0-a39e-e84703768c51", // UT Austin
      "06d85bf7-4562-450f-b05d-9a37842890ca", // Caltech
      "885f2737-46b0-4784-9113-5264e03ce588", // Georgia Tech
      "d1af09f2-07ec-4622-a611-4cdfee8852d0", // UMich
      // Texas A&M University--College Station - wasn't in the Windward Data (SKIPPED)
      "6bad2a2e-9120-4b8c-951a-b67469bfc7c2", // UCSD (Jacobs) ***(no specific UUID for Jacobs!!!!)
      "3014b865-92d6-41ba-a2b4-64d0f9fd7693", // UIUC
      "860c5af1-1231-47e8-a18f-626501838952", // Columbia (Fu) ***(no specific UUID for Fu Foundation!!!!)
      "08a300b2-b1a6-415b-963a-05262d2aa206", // Cornell
      "0b60a00e-5e20-41c5-ba29-2d5a6e461cfa", // USC (Viterbi) ***(no specific UUID for Viterbi!!!!)
      "e48c4a95-0fe0-49d3-a648-e051808f1126", // JHU (Whiting) ***(no speficic UUID for Whiting!!!!)
      "e883594c-dc4c-4457-bb05-89a9d918c74e", // UCLA (Samueli)***(no specific UUID for Samueli!!!!)
      "04f735ef-fdeb-4991-8be9-6c99591c2a15", // Northwestern (McCormick) ***(no specific UUID!!!!)
      "9f1e2181-78a5-4c6a-b21f-b0c8f0036d5d", // UPenn
      "4114ab3f-cf42-4430-bbb8-b8a6c93497a0", // Princeton
    ],
  },
];

export const navItems: NavItem[] = [
  {
    name: "scatterplots",
    path: "/",
  },
  {
    name: "groups",
    path: "/groups",
  },
];
