

// src/stores.js
import { writable } from 'svelte/store';

const initialEvents = [
    {
        title: "Tournament name (Krafton)",
        vendorName: "Vendor Name",
        date: new Date(2024, 5, 13),
        startTime: "06:30",
        endTime: "16:00",
        round: "Round 1",
        tair: "tair 1",
        day: "5",
        streemStatus: "offline",
        primaryColor: "#3730A3",
        secondaryColor: "#EEF2FF",
      },
      {
        title: "Tournament name (Krafton)",
        vendorName: "Vendor Name",
        date: new Date(2024, 5, 13),
        startTime: "08:30",
        endTime: "22:15",
        round: "Round 2",
        tair: "tair 3",
        day: "2",
        streemStatus: false,
        primaryColor: "#92400E",
        secondaryColor: "#FFFBEB",
      },
      {
        title: "Tournament name (Krafton)",
        vendorName: "Krafron India",
        date: new Date(2024, 5, 21),
        startTime: "4:00",
        endTime: "19:15",
        round: "Round 2",
        tair: "tair 3",
        day: "2",
        streemStatus: true,
        primaryColor: "#075985",
        secondaryColor: "#ECFEFF",
      },
      {
        title: "Tournament name (Krafton)",
        vendorName: "Krafron India",
        date: new Date(2024, 5, 21),
        startTime: "05:30",
        endTime: "17:15",
        round: "Round 2",
        tair: "tair 3",
        day: "2",
        streemStatus: false,
        primaryColor: "#9D174D",
        secondaryColor: "#FDF2F8",
      }
      ,
      {
        title: "Tournament name (Krafton)",
        vendorName: "Krafron India",
        date: new Date(2024, 5, 21),
        startTime: "05:30",
        endTime: "17:15",
        round: "Round 2",
        tair: "tair 3",
        day: "2",
        streemStatus: false,
        primaryColor: "#9D174D",
        secondaryColor: "#FDF2F8",
      },
      {
        title: "Tournament name (Krafton)",
        vendorName: "Krafron India",
        date: new Date(2024, 5, 21),
        startTime: "03:45",
        endTime: "19:15",
        round: "Round 2",
        tair: "tair 3",
        day: "2",
        streemStatus: false,
        primaryColor: "#9D174D",
        secondaryColor: "#FDF2F8",
      }
];

export const eventsStore = writable(initialEvents);

export function addEvent(event) {
  eventsStore.update(events => [...events, event]);
}