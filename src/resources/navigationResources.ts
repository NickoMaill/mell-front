import { RouterDescription } from '~/core/types/route';
import Bio from '~/pages/Bio';
import Homepage from '~/pages/Homepage';
import Pro from '~/pages/Pro';
import Shows from '~/pages/Shows';
import MediaCredits from '~/pages/legal/MediaCredits';
import LegalMentions from '~/pages/legal/LegalMentions';
import CGU from '~/pages/legal/CGU';
import PrivacyPolicy from '~/pages/legal/PrivacyPolicy';
import Admin from '~/pages/admin/Admin';
import ShowsForm from '~/pages/admin/shows/ShowsForm';
import ShowsPic from "~/assets/pictures/Theatre-1-1200x630.jpg";
import MediasPic from "~/assets/pictures/BTS-photo_tojy4d.jpg";
import ContentPic from "~/assets/pictures/getty_503426092_342208.jpg";
import SetupPic from "~/assets/pictures/configuration_management_header_h2avxw.webp";
import LogPic from "~/assets/pictures/logs.jpg";
import { ICardData } from '~/components/common/AppMiniCard';
import Center from '~/pages/admin/Center';
import Login from '~/pages/admin/Login';

class NavigationResource {
    public static get routesPath() {
        return {
            home: '/',
            shows: "/shows",
            bio: "/bio",
            admin: "/admin",
            login: "/admin/login",
            center: "/admin/center",
            showsForm: "/admin/shows/:id",
            pro: "/pro",
            privacyPolicy: "/privacyPolicy",
            mediaCredits: "/mediaCredits",
            legalMentions: "/legalMentions",
            cgu: "/cgu",
        };
    }

    public static get routes(): RouterDescription[] {
        return [
            // #region COMMON ROUTES -> ///////////////////////////////////////////////////////
            { name: 'Home', element: Homepage, path: this.routesPath.home, isAuthRequired: false, title: 'Bienvenue' },
            { name: "Shows", element: Shows, path: this.routesPath.shows, isAuthRequired: false, title: 'Mes Spectacles' },
            { name: "Bio", element: Bio, path: this.routesPath.bio, isAuthRequired: false, title: 'A propos de moi' },
            { name: "Pro", element: Pro, path: this.routesPath.pro, isAuthRequired: false, title: 'Espace pro' },
            { name: "MediaCredits", element: MediaCredits, path: this.routesPath.mediaCredits, isAuthRequired: false, title: 'Crédits Photo / Vidéo' },
            { name: "LegalMentions", element: LegalMentions, path: this.routesPath.legalMentions, isAuthRequired: false, title: 'Mentions Légales' },
            { name: "CGU", element: CGU, path: this.routesPath.cgu, isAuthRequired: false, title: 'Contrat Générale d\'utilisation' },
            { name: "PrivacyPolicy", element: PrivacyPolicy, path: this.routesPath.privacyPolicy, isAuthRequired: false, title: 'Politique de confidentialité' },
            { name: "Login", element: Login, path: this.routesPath.login, isAuthRequired: false, title: 'Connexion' },
            // #endregion COMMON ROUTES -> ////////////////////////////////////////////////////
            
            // #region AUTH REQUIRED -> ///////////////////////////////////////////////////////
            { name: "Admin", element: Admin, path: this.routesPath.admin, isAuthRequired: true, title: 'Espace Administrateur' },
            { name: "Center", element: Center, path: this.routesPath.center, isAuthRequired: true, title: 'Liste' },
            { name: "ShowsForm", element: ShowsForm, path: this.routesPath.showsForm, isAuthRequired: true, title: 'Modification du spectacle' },
            // #endregion ROUTES -> ///////////////////////////////////////////////////////////
        ];
    }

    public static get headerLinks() {
        return [
            { label: "Spectacles", link: this.routesPath.shows, title: "Mes spectacles" },
            { label: "Ma bio", link: this.routesPath.bio, title: "A propos de moi" },
            { label: "Pro", link: this.routesPath.pro, title: "Espace pro" },
        ]
    }
    
    public static get footerLink() {
        return [
            { label: "Crédit photo & vidéo", link: this.routesPath.mediaCredits, title: 'Crédits Photo / Vidéo' },
            { label: "Mentions Légales", link: this.routesPath.legalMentions, title: 'Mentions Légales' },
            { label: "Politique de confidentialité", link: this.routesPath.privacyPolicy, title: 'Politique de confidentialité' },
            { label: "GCU", link: this.routesPath.cgu, title: 'Contrat générale d\'utilisation' },
        ]
    }

    public static get adminLinks():ICardData [] {
        return [
            { 
                title: "Gestions des spectacles", 
                subtitle: "Ajoutez ou modifiez vos spectacles", 
                photo: ShowsPic,
                btn1: "Gérer",
                link1: "/admin/center?Table=Shows" 
            },
            { 
                title: "Gestions du contenu", 
                subtitle: "Ajouter ou modifiez le contenu de votre site internet", 
                photo: ContentPic, 
                btn1: "Gérer",
                link1: "/admin/center?Table=content" 
            },
            { 
                title: "Gestions des médias", 
                subtitle: "Ajoutez ou modifiez vos medias", 
                photo: MediasPic, 
                btn1: "Gérer",
                link1: "/admin/center?Table=media" 
            },
            { 
                title: "Réglages", 
                subtitle: "Affinez les réglages de votre site internet", 
                photo: SetupPic, 
                btn1: "Gérer",
                link1: "/admin/setup" 
            },
            { 
                title: "Journal d'activités", 
                subtitle: "Inspecter l'activité de votre site web", 
                photo: LogPic, 
                btn1: "Inspecter",
                link1: "/admin/center?Table=Logs" 
            },
            
        ]
    }
}

export default NavigationResource;
