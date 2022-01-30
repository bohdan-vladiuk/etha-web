import { ContactUsForm } from '../models/ContactUs';
import { setLoaderVisibility } from '../redux';
import { AppDispatch } from '../redux/store';
import { CONTACT_US_SUBMIT, WAITLIST_SUBMIT } from '../services/API';
import api from '../services/api-helper';

export async function ContactUs(contactUsForm: ContactUsForm, cleanFunction: () => void): Promise<void> {
    api.post(CONTACT_US_SUBMIT, contactUsForm).then(
        (response) => {
            if (response.data !== undefined && response.data.id !== '') {
                cleanFunction();
            } else {
                console.log();
            }
        },
        (err) => {
            alert('Please check the entered values');
            console.log('Error: ', err);
        },
    );
}
export async function AddToWaitlist(contactUsForm: ContactUsForm, cleanFunction: () => void): Promise<void> {
    api.post(WAITLIST_SUBMIT, contactUsForm).then(
        (response) => {
            if (response.data !== undefined && response.data.id !== '') {
                cleanFunction();
            } else {
                console.log();
            }
        },
        (err) => {
            alert('Please check the entered values');
            console.log('Error: ', err);
        },
    );
}
