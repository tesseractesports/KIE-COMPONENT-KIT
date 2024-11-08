import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // Import styles

// Create and configure the Notyf instance
const Toast = new Notyf({
    duration: 3000,  // Duration of the notification in milliseconds
    ripple: true,    // Add a material design ripple effect to the toast
    position: {
        x: 'center',  // Horizontal position (left | center | right)
        y: 'bottom',    // Vertical position (top | center | bottom)
    },
    dismissible: true,
    types: [
        {
            type: 'success',
            background: '#A0D683',
            icon: false,
            className: 'success',
        },
        {
            type: 'error',
            background: '#FF4C00',
            icon: false,
            className: 'error',
        },
        {
            type: 'info',
            background: '#87A2FF',
            icon: false,
            className: 'info',
        },
        {
            type: 'warning',
            background: '#F7F7F7',
            icon: false,
            className: 'warning',
        },
    ],
});

export default Toast;
