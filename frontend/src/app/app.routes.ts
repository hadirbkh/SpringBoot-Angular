import { Routes } from '@angular/router';
import { AddFormateurComponent } from './component/formateurs/add-formateur/add-formateur.component';
import { AllformateurComponent } from './component/formateurs/allformateur/allformateur.component';
import { AllparticipantComponent } from './component/participants/allparticipant/allparticipant.component';
import { SelectFormaComponent } from './component/participants/select-forma/select-forma.component';
import { FormationCarouselComponent } from './formation-carousel/formation-carousel.component';

export const routes: Routes = [

    {
        path: '', redirectTo:'add-formateur' , pathMatch:'full'
    },
    
    {
        path:'add-formateur',
        component:AddFormateurComponent
    },
    {
        path:'allformateur',
        component:AllformateurComponent
    },
  
    {
        path:'allparticipant',
        component:AllparticipantComponent
    },
    {
        path:'formationCarousel',
        component:FormationCarouselComponent
    },
    {
        path:'participerForm',
        component:SelectFormaComponent
    },
  
];
