export type RootStackParamList = {
    Login: undefined;   // Ruta de login
    Home: undefined;    // Ruta de la página principal
    Register: { userType: 'repartidor' | 'consumidor' }; 
    CourierHome: undefined;
    MainDrawer: undefined;
    Welcome:undefined;
    // Agrega aquí otras rutas que tengas
  };