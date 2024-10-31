export type RootStackParamList = {
    Login: undefined;   // Ruta de login
    Home: undefined;    // Ruta de la página principal
    Register: { rol: 'repartidor' | 'cliente' | 'restaurante' };
    CourierHome: undefined;
    MainDrawer: undefined;
    Welcome:undefined;
    Repartidor:undefined;
    Acercade: undefined;
    SearchResults: undefined;
    // Agrega aquí otras rutas que tengas
  };