// src/stores/loaderStore.js
import { writable } from 'svelte/store';

export const vendorStore = writable(null);  




// import { writable } from 'svelte/store';

//   function createVendor() {
//     const { subscribe, set, update } = writable({
//       status: 'incompleted',
//       firstName: '',
//       lastName: '',
//       designation: '',
//       companyName: '',
//       companyMarketName: '',
//       companyBio: '',
//       website: '',
//       email: '',
//       phone: '',
//       country: '',
//       state: '',
//       address: '',
//       totalTurnover: '',
//       operationalStaffCount: 0,
//       contentStaffCount: 0,
//       designStaffCount: 0,
//       productionStaffCount: 0,
//       otherStaffCount: 0,
//       categoryA: 0,
//       categoryB: 0,
//       categoryC: 0,
//       tournaments: [],
//       legalInformation: { 
//         legalName: '',
//         entityType: '',
//         pan: '',
//         gst: '',
//         incorporationDate: new Date(),
//         country: '',
//         state: '',
//         city: ''
//       }
//     });

//     return {
//       subscribe,
//       set,
//       update,
//       reset: () => set({
//         status: 'incompleted',
//         firstName: '',
//         lastName: '',
//         designation: '',
//         companyName: '',
//         companyMarketName: '',
//         companyBio: '',
//         website: '',
//         email: '',
//         phone: '',
//         country: '',
//         state: '',
//         address: '',
//         totalTurnover: '',
//         operationalStaffCount: 0,
//         contentStaffCount: 0,
//         designStaffCount: 0,
//         productionStaffCount: 0,
//         otherStaffCount: 0,
//         categoryA: 0,
//         categoryB: 0,
//         categoryC: 0,
//         tournaments: [],
//         legalInformation: {
//           legalName: '',
//           entityType: '',
//           pan: '',
//           gst: '',
//           incorporationDate: new Date(),
//           country: '',
//           state: '',
//           city: ''
//         }
//       }),
//       initialize: (vendorData) => set(vendorData),
//       updateField: (field, value) => {
//         update(vendor => {
//           vendor[field] = value;
//           return vendor;
//         });
//       }
//     };
//   }


//   export const vendor = writable(createVendor());