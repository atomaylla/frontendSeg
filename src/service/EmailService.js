import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';


export class EmailService {

    getSendEmail(modulo, mensaje) {


        const temParams = {
            from_name:"pgetest65@gmail.com",
            to_name: modulo,
            message: mensaje,
        }

        emailjs.send('service_pcm6iqv', 'template_zhh192q', temParams, 'CCL4nU6_vt9AN8HXh')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    }



}
