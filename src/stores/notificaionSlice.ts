import {StateCreator } from 'zustand';
import { favoritesSliceType } from './favoritesSlice';

type Notification = {
    text: string;
    error: boolean;
    show: boolean;
}

export type notificationSliceType = {
   notificaion: Notification
   showNotification: (payload: Pick<Notification, 'text' | 'error'>) => void
   hideNotification: () => void

}


export const createNotificationSlice : StateCreator<notificationSliceType & favoritesSliceType, [], [], notificationSliceType> = (set, get ) => ({
    notificaion: {
        text: '',
        error: false,
        show: false,
    },
    showNotification: (payload) => {
        set({
            notificaion: {
                text: payload.text,
                error: payload.error,
                show: true
            }
        })
        setTimeout(() => {
            get().hideNotification() 
        }, 3000)
    }, 

    hideNotification: () =>{
        set({
            notificaion: {
                text: '',
                error: false,
                show: false
            },
        })
    }
})