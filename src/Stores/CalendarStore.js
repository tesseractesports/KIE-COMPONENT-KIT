import { writable } from 'svelte/store';
import moment from 'moment';

// Initialize the store with the current date
const currentDate = moment();
export const newDate = writable(currentDate);
