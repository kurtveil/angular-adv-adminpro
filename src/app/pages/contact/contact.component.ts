import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  developers = [
    {name: 'Ana Morales', cellphone: +4368120411623, picture: './assets/images/users/Ana.PNG', description: 'Analista funcional',
    linkWhatsapp: 'https://wa.me/4368120411623'   },
    {name: 'Daniela Uribe', cellphone: +4368120411623, picture: './assets/images/users/Daniela.PNG', description: 'Analista Calidad',
    linkWhatsapp: 'https://wa.me/573187779595'   },
    {name: 'Alejandro Acevedo', cellphone: +4368120411623, picture: './assets/images/users/Alejo.PNG', description: 'Analista funcional',
    linkWhatsapp: 'https://wa.me/573232883702'   },
    {name: 'Kurt Rodriguez', cellphone: +4368120411623, picture: './assets/images/users/Kurt.PNG', description: 'Desarrollador Front end',
    linkWhatsapp: 'https://wa.me/573193832969'   },
    {name: 'Santiago Pirafan', cellphone: +4368120411623, picture: './assets/images/users/Santiago.PNG', description: 'Analista funcional',
    linkWhatsapp: 'https://wa.me/573147867948'   },
  ]
  constructor() { }

  ngOnInit(): void {
  }
}
