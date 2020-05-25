import { hasDuplicates } from "../module-universal/array-utilities/hasDuplicates";

export function getEasyArray(){
    let easyArray = ["Korea (Republic of)", "Netherlands", "Indonesia",
    "Mayotte", "Antarctica", "Israel", "Canada", "Switzerland", "Brazil", "Japan",
    "United Kingdom of Great Britain and Northern Ireland", "Sweden", "Turkey", "Germany", "United States of America",
    "Spain", "Cyprus", "Slovakia", "Greece", "Austria", "Croatia", "Italy", "Denmark", "Russian Federation",
    "Poland", "France", "China", "Uruguay", "Belgium", "Czech Republic", "Ukraine", "Holy See", "Norway", "Portugal", "Sudan", "Finland", "Nepal", "New Zeland", "Iceland", "United States Minor Outlying Islands"];
    hasDuplicates(easyArray);
    return easyArray;
}   
export function getMediumArray(){
    let mediumArray = ["Australia", "Puerto Rico", "Korea (Democratic People's Republic of)",
    "Mexico", "Macedonia (the former Yugoslav Republic of)",
    "Saint Martin (French part)", "Malta", "Luxembourg", "Ireland", "Bulgaria", "Republic of Kosovo", "Iraq", "India",
    "Egypt", "Chile", "Mongolia", "Lithuania", "Montenegro", "Viet Nam", "Jamaica",
    "Slovenia", "Albania", "Hungary", "Belarus",
    "Estonia", "Romania", "Saudi Arabia", "Nicaragua", "Venezuela (Bolivarian Republic of)", "Syrian Arab Republic", "Serbia", "Hong Kong", "Argentina"];
    hasDuplicates(mediumArray);
    return mediumArray;
}  
export function getHardArray(){
    let hardArray = ["Tunisia", "Liechtenstein", "Bosnia and Herzegovina", "Greenland", "Kenya", "Georgia", "Thailand", "Panama", "Jersey", "Bhutan", "Cambodia", "Tobago",
    "Kuwait", "Haiti", "Algieria", "Lebanon", "Sri Lanka", "Libya", "Colombia", "Ecuador", "Paraguay", "Afghanistan", "San Marino", "Sudan", "Andora", "Senegal", "Somalia",
    "Turkmenistan", "Pakistan", "Iran", "Peru", "Cuba", "Honduras", "Jordan", "Uzbekistan", "South Georgia and the South Sandwich Islands", "Papua New Guinea", "Cook Islands",
    "Virgin Islands (British)", "Heard Island and McDonald Islands", "Western Sahara", "Åland Islands", "French Southern Territories", "Nigeria"];
    hasDuplicates(hardArray);
    return hardArray;
}  
