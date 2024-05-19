import { RouterDescription } from '~/core/types/route';
import Homepage from '~/pages/Homepage';
import Login from '~/pages/Login';
//import { UserAccessLevelEnum } from '~/core/types/apiModels/Session';

class NavigationResource {
    public static get routesPath() {
        return {
            home: '/',
        };
    }

    public static get routes(): RouterDescription[] {
        return [
            // #region COMMON ROUTES -> ///////////////////////////////////////////////////////
            { name: 'Home', element: Homepage, path: this.routesPath.home, isAuthRequired: false, title: 'Bienvenue' },
            // #endregion COMMON ROUTES -> ////////////////////////////////////////////////////

            // #region AUTH REQUIRED -> ///////////////////////////////////////////////////////
            // #endregion ROUTES -> ///////////////////////////////////////////////////////////
        ];
    }
}

export default NavigationResource;
