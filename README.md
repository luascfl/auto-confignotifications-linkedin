# Script de Configuração de Notificações do LinkedIn
Este projeto contém um script em JavaScript projetado para automatizar a configuração das preferências de notificação do LinkedIn. Ele visa simplificar o processo de personalização das suas preferências de notificação de acordo com suas necessidades específicas.

## Recursos Principais
* **Configuração Automatizada de Notificações:** Define as preferências de notificação do LinkedIn para várias categorias (busca de emprego, conexões, mensagens, etc.) com configurações predefinidas.
* **Configurações Personalizáveis:** Embora o script forneça uma configuração padrão, ele pode ser facilmente modificado para atender às preferências individuais.
* **Tratamento de Erros:** Inclui tratamento de erros para capturar e relatar problemas durante a execução.
* **Saída Clara no Console:** Fornece mensagens informativas no console indicando o progresso do script e quaisquer problemas encontrados.

## Tecnologias Utilizadas
* JavaScript

## Pré-requisitos
* Um navegador moderno (Chrome, Firefox, etc.).
* Acesso a uma conta do LinkedIn.
* Conhecimento básico de JavaScript.

## Instalação
1. **Copie o Script:** No arquivo `Código para replicar configurações de notificações LinkedIn.js` deste repositório. 
2. **Abra as ferramentas de desenvolvedor do navegador:** Na maioria dos navegadores, isso é feito pressionando F12.
3. **Vá para as [Configurações de Notificação do LinkedIn](https://www.linkedin.com/mypreferences/d/categories/notifications):** Navegue até a página do LinkedIn onde você pode gerenciar suas configurações de notificação.
4. **Injete o script:** No console de desenvolvedor do navegador (geralmente encontrado na aba "Console" das ferramentas de desenvolvimento), cole o conteúdo do arquivo `.js` baixado e pressione Enter. No Google Chrome você pode ir diretamente apertando as teclas CTRL+SHIFT+J.
**Nota Importante:** Este script interage diretamente com a estrutura HTML do site do LinkedIn. Se o LinkedIn alterar significativamente seu layout, o script pode falhar. Pode ser necessário modificar os seletores e strings de texto dentro do script para se adaptar a essas mudanças.

## Configuração
A configuração do script está embutida no próprio código. Você pode modificar as chamadas das funções `toggleSwitchByLabel`, `selectRadioButtonByLabel` e `enterSectionByCategoryName` para alterar as configurações de notificação desejadas. Cada chamada define uma configuração específica e o estado pretendido (ativo ou inativo). Por exemplo:
```javascript
// Exemplo: Alterando a configuração "Notificações no aplicativo" para falso
await toggleSwitchByLabel('Notificações no aplicativo', false);
```
Modificar essas chamadas alterará o comportamento do script.

## Bookmarklet

Este projeto não requer nenhuma instalação no sentido tradicional. Em vez disso, você instala o bookmarklet diretamente no seu navegador:

1. **Selecione o Código do Bookmarklet:** Selecione todo o código JavaScript do arquivo escolhido. Para selecionar tudo, use CTRL+A.
* Use o código do arquivo `Bookmarklet (Selecione o código e arraste para a barra de favoritos) Deletar notificações LinkedIn.js`.

2. Arraste o código para sua barra de favoritos para criar um novo bookmarklet.
* Se você estiver na pasta de favoritos desejada com o código copiado, cole-o.

3. **Dê um Nome:** Dê ao seu favorito um nome descritivo (por exemplo, "Atualizar configurações de notificação do LinkedIn").

## Uso

1. **Navegue até as Notificações do LinkedIn:** Vá para a página de notificações do LinkedIn (`https://www.linkedin.com/mypreferences/d/categories/notifications`).

2. **Clique no Bookmarklet:** Clique no bookmarklet que você criou. Pode aparecer uma mensagem pedindo para clicar novamente após o carregamento da página. Clique no bookmarklet novamente após uma breve espera. Caixas de seleção aparecerão ao lado de cada notificação.
* Se você não estiver em (`https://www.linkedin.com/mypreferences/d/categories/notifications`), o script irá redirecioná-lo para a página.

3. **Clique em "Atualizar configurações de notificação do LinkedIn":** Clique no botão apropriado para excluir as notificações selecionadas.

## Exemplos de Uso
O script foi projetado para ser executado automaticamente. Uma vez injetado no console do navegador conforme descrito acima, ele configurará suas preferências de notificação de acordo com a lógica codificada no script. A saída do console mostrará o progresso e os resultados de cada operação.

## Estrutura do Projeto
O projeto possui uma estrutura simples:
* `Código para replicar configurações de notificações LinkedIn.js`: O script principal em JavaScript.
* `Bookmarklet (Selecione o código e arraste para a barra de favoritos) Atualizar configurações de notificação do LinkedIn.js`: A versão do código em bookmarklet.
* `LICENSE`: O arquivo da Licença MIT.

## Diretrizes de Contribuição
Não há diretrizes de contribuição explicitamente definidas nesta base de código.

## Licença
Este projeto está licenciado sob a Licença MIT - consulte o arquivo `LICENSE` para obter detalhes.

## Mensagens de Erro
O script inclui registros no console que relatarão erros se elementos não puderem ser encontrados ou se ocorrerem outros problemas inesperados. Essas mensagens ajudarão você a diagnosticar problemas na execução do script. Erros comuns podem incluir:
* `Elemento não encontrado com o texto: [Texto]` Isso indica que o script não conseguiu encontrar um elemento correspondente ao texto especificado na página. Provavelmente, isso ocorre devido a uma mudança na estrutura do site do LinkedIn.
* `Switch não encontrado para o label: [Texto do Label]` Semelhante ao acima, isso significa que um switch relacionado a um determinado rótulo não foi encontrado.
* `Erro durante a execução: [Mensagem de Erro]` Uma mensagem de erro geral indicando que ocorreu um problema durante a execução do script. A mensagem de erro acompanhante fornecerá mais detalhes.

Lembre-se de examinar cuidadosamente a saída do console em busca de pistas sobre quaisquer erros.
