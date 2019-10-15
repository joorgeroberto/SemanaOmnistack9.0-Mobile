import {createAppContainer, createSwitchNavigator} from 'react-navigation'

// Na stack navigation, o usuário consegue ir e voltar entre as telas. Como queremos que o usuário não consiga voltar para
// a tela de login, por exemplo, não usaremos esta.
// Usaremos a switchNavigator que o usuário vai para uma tela e só retorna se for definido pelo desenvolvedor.
// Na Switch as telas anteriores ficam inativas.

import Login from "./pages/Login";
import List from "./pages/List";
import Book from "./pages/Book";

const Routes = createAppContainer( // Precisa colocar um AppContainer em volta de todas as rotas.
  createSwitchNavigator({
    Login,
    List,
    Book
  })
);

export default Routes;

