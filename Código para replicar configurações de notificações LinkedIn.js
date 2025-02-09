(async function() {
    // Função para esperar um tempo antes de executar a próxima ação
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Função para clicar em um elemento com base em um seletor ou em um texto parcial
    async function clickElementByPartialText(tag, partialText) {
        const element = Array.from(document.querySelectorAll(tag))
            .find(el => el.textContent.trim().includes(partialText));

        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            element.click();
            await sleep(500); // Espera 500ms para garantir que a ação foi concluída
        } else {
            console.error(`Elemento não encontrado com o texto: ${partialText}`);
        }
    }

    // Função para ativar/desativar um switch com base no label associado
    async function toggleSwitchByLabel(labelText, shouldBeActive) {
        // Encontra o elemento que contém o texto do label
        const labelElement = Array.from(document.querySelectorAll('span, p'))
            .find(el => el.textContent.trim() === labelText);

        if (labelElement) {
            // O switch está próximo ao label no DOM
            // Vamos navegar para encontrar o switch associado
            let parent = labelElement.parentElement;
            while (parent && !parent.querySelector('input[type="checkbox"]')) {
                parent = parent.parentElement;
            }

            const switchInput = parent ? parent.querySelector('input[type="checkbox"]') : null;

            if (switchInput) {
                const isActive = switchInput.checked; // Verifica se o switch está ativo
                console.log(`Switch "${labelText}": atualmente está ${isActive ? "Ativo" : "Inativo"}, deveria estar ${shouldBeActive ? "Ativo" : "Inativo"}.`);

                if (isActive !== shouldBeActive) {
                    console.log(`Alterando switch "${labelText}" para ${shouldBeActive ? "Ativo" : "Inativo"}.`);
                    switchInput.click(); // Clica no input para alternar o estado
                    await sleep(500); // Espera 500ms para garantir que a ação foi concluída
                } else {
                    console.log(`Nenhuma ação necessária para "${labelText}".`);
                }
            } else {
                console.error(`Switch não encontrado para o label: ${labelText}`);
            }
        } else {
            console.error(`Label não encontrado: ${labelText}`);
        }
    }

    // Função para selecionar uma opção de rádio com base no texto do label
    async function selectRadioButtonByLabel(labelText) {
        const labelElement = Array.from(document.querySelectorAll('label'))
            .find(el => el.textContent.trim() === labelText);

        if (labelElement) {
            const radioInput = labelElement.previousElementSibling; // O input está antes do label
            if (radioInput && radioInput.type === 'radio') {
                const isChecked = radioInput.checked;
                console.log(`Opção de rádio "${labelText}": atualmente está ${isChecked ? "Selecionada" : "Não selecionada"}, deveria estar Selecionada.`);
                if (!isChecked) {
                    console.log(`Selecionando opção de rádio "${labelText}".`);
                    radioInput.click(); // Clica no rádio para selecionar
                    await sleep(500); // Espera 500ms para garantir que a ação foi concluída
                } else {
                    console.log(`Opção de rádio "${labelText}" já está selecionada. Nenhuma ação necessária.`);
                }
            } else {
                console.error(`Input de rádio não encontrado para o label: ${labelText}`);
            }
        } else {
            console.error(`Label não encontrado: ${labelText}`);
        }
    }

    // Função para entrar em uma seção específica com base no texto do nome da categoria
    async function enterSectionByCategoryName(categoryName) {
        const categoryElement = Array.from(document.querySelectorAll('p.category-text__name, span._text_1ef023'))
            .find(el => el.textContent.trim() === categoryName);

        if (categoryElement) {
            console.log(`Entrando na seção "${categoryName}".`);
            const linkElement = categoryElement.closest('a, button');
            if (linkElement) {
                linkElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                linkElement.click();
                await sleep(500); // Espera 500ms para garantir que a ação foi concluída
            } else {
                console.error(`Link ou botão não encontrado para a categoria: ${categoryName}`);
            }
        } else {
            console.error(`Seção "${categoryName}" não encontrada`);
        }
    }

    // Função para voltar de uma seção
    async function goBack() {
        const backButton = document.querySelector('a[data-control-name="back_link"], a.banner-link--back');
        if (backButton) {
            backButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
            backButton.click();
            await sleep(500); // Espera 500ms para garantir que a ação foi concluída
        } else {
            console.error('Botão de voltar não encontrado');
        }
    }

    // Função principal para configurar as notificações
    async function configureNotifications() {
        try {
            // 1. Pesquisando vaga
            await enterSectionByCategoryName('Pesquisando vaga');

            // 1.1 Permitir notificações de pesquisa de vagas (ativar)
            await toggleSwitchByLabel('Permitir notificações de pesquisa de vagas', true);

            // 1.2 Alertas de vaga (entrar na seção)
            await enterSectionByCategoryName('Alertas de vaga');

            // 1.2.1 Notificações no aplicativo (ativar)
            await toggleSwitchByLabel('Notificações no aplicativo', true);

            // 1.2.2 Notificações push (desativar)
            await toggleSwitchByLabel('Notificações push', false);

            // 1.2.3 E-mail (ativar)
            await toggleSwitchByLabel('E-mail', true);

            // 1.2.4 Voltar
            await goBack();

            // 1.3 Vagas salvas (entrar na seção)
            await enterSectionByCategoryName('Vagas salvas');

            // 1.3.1 Notificações no aplicativo (desativar)
            await toggleSwitchByLabel('Notificações no aplicativo', false);

            // 1.3.2 E-mail (ativar)
            await toggleSwitchByLabel('E-mail', true);

            // 1.3.3 Voltar
            await goBack();

            // 1.4 Recomendações de vagas (entrar na seção)
            await enterSectionByCategoryName('Recomendações de vagas');

            // 1.4.1 Notificações no aplicativo (desativar)
            await toggleSwitchByLabel('Notificações no aplicativo', false);

            // 1.4.2 E-mail (desativar)
            await toggleSwitchByLabel('E-mail', false);

            // 1.4.3 Voltar
            await goBack();

            // 1.5 Atualizações sobre candidaturas a vagas (entrar na seção)
            await enterSectionByCategoryName('Atualizações sobre candidaturas a vagas');

            // 1.5.1 Notificações no aplicativo (desativar)
            await toggleSwitchByLabel('Notificações no aplicativo', false);

            // 1.5.2 E-mail (ativar)
            await toggleSwitchByLabel('E-mail', true);

            // 1.5.3 Escolher frequência de e-mail ("Recomendação do LinkedIn")
            await selectRadioButtonByLabel('Recomendação do LinkedIn');

            // 1.5.4 Voltar
            await goBack();

            // 1.6 Aconselhamento profissional (entrar na seção)
            await enterSectionByCategoryName('Aconselhamento profissional');

            // 1.6.1 Notificações no aplicativo (ativar)
            await toggleSwitchByLabel('Notificações no aplicativo', true);

            // 1.6.2 Notificações push (desativar)
            await toggleSwitchByLabel('Notificações push', false);

            // 1.6.3 E-mail (desativar)
            await toggleSwitchByLabel('E-mail', false);

            // 1.6.4 Voltar
            await goBack();

            // 1.7 Ocorrências em resultados de pesquisa (entrar na seção)
            await enterSectionByCategoryName('Ocorrências em resultados de pesquisa');

            // 1.7.1 Notificações no aplicativo (ativar)
            await toggleSwitchByLabel('Notificações no aplicativo', true);

            // 1.7.2 Notificações push (desativar)
            await toggleSwitchByLabel('Notificações push', false);

            // 1.7.3 E-mail (desativar)
            await toggleSwitchByLabel('E-mail', false);

            // 1.7.4 Voltar
            await goBack();

            // 1.8 Recomendações de avaliação de competências (entrar na seção)
            await enterSectionByCategoryName('Recomendações de avaliação de competências');

            // 1.8.1 Notificações no aplicativo (desativar)
            await toggleSwitchByLabel('Notificações no aplicativo', false);

            // 1.8.2 E-mail (desativar)
            await toggleSwitchByLabel('E-mail', false);

            // 1.8.3 Voltar
            await goBack();

            // 1.9 Atualizações de rotas de competências (entrar na seção)
            await enterSectionByCategoryName('Atualizações de rotas de competências');

            // 1.9.1 Notificações no aplicativo (desativar)
            await toggleSwitchByLabel('Notificações no aplicativo', false);

            // 1.9.2 E-mail (desativar)
            await toggleSwitchByLabel('E-mail', false);

            // 1.9.3 Voltar
            await goBack();

            // 1.9.4 Voltar para a página principal
            await goBack();

            // 2. Contratação (entrar na seção)
            await enterSectionByCategoryName('Contratação');

            // 2.1 Permitir notificações de anúncios de vaga (tem que estar desativado)
            await toggleSwitchByLabel('Permitir notificações de anúncios de vaga', false);

            // 2.2 Projetos de service page (entrar na aba)
            await enterSectionByCategoryName('Projetos de Service Page');

            // 2.3 Permitir notificações de trabalho de projeto (tem que estar desativado)
            await toggleSwitchByLabel('Permitir notificações de trabalho de projeto', false);

            // 2.4 Voltar
            await goBack();

            // 3. Conexão com outras pessoas (entrar na seção)
            await enterSectionByCategoryName('Conexão com outras pessoas');

            // 3.1 Permitir notificações relacionadas a conexões (tem que estar ativado)
            await toggleSwitchByLabel('Permitir notificações relacionadas a conexões', true);

            // 3.2 Convites para conexão (entrar na seção)
            await enterSectionByCategoryName('Convites para conexão');

            // 3.2.1 Notificações no aplicativo (tem que estar ativo)
            await toggleSwitchByLabel('Notificações no aplicativo', true);

            // 3.2.2 Notificações push (tem que estar desativado)
            await toggleSwitchByLabel('Notificações push', false);

            // 3.2.3 E-mail (tem que estar desativado)
            await toggleSwitchByLabel('E-mail', false);

            // 3.2.4 Voltar
            await goBack();

            // 3.3 Atualizações da sua rede (entrar na seção)
            await enterSectionByCategoryName('Atualizações da sua rede');

            // 3.3.1 Notificações no aplicativo (tem que estar ativo)
            await toggleSwitchByLabel('Notificações no aplicativo', true);

            // 3.3.2 Notificações push (tem que estar desativado)
            await toggleSwitchByLabel('Notificações push', false);

            // 3.3.3 E-mail (tem que estar desativado)
            await toggleSwitchByLabel('E-mail', false);

            // 3.3.4 Voltar
            await goBack();

            // 3.4 Novas recomendações para conexão (entrar na seção)
            await enterSectionByCategoryName('Novas recomendações para conexão');

            // 3.4.1 Notificações no aplicativo (tem que estar ativo)
            await toggleSwitchByLabel('Notificações no aplicativo', true);

            // 3.4.2 Notificações push (tem que estar desativado)
            await toggleSwitchByLabel('Notificações push', false);

            // 3.4.3 E-mail (tem que estar desativado)
            await toggleSwitchByLabel('E-mail', false);

            // 3.4.4 Voltar
            await goBack();

            // 3.5 Novos seguidores e assinantes (entrar na seção)
            await enterSectionByCategoryName('Novos seguidores e assinantes');

            // 3.5.1 Notificações no aplicativo (tem que estar ativo)
            await toggleSwitchByLabel('Notificações no aplicativo', true);

            // 3.5.2 Notificações push (tem que estar desativado)
            await toggleSwitchByLabel('Notificações push', false);

            // 3.5.3 E-mail (tem que estar desativado)
            await toggleSwitchByLabel('E-mail', false);

            // 3.5.4 Voltar
            await goBack();

            // 3.6 Atualizações de pessoas que você segue (entrar na seção)
            await enterSectionByCategoryName('Atualizações de pessoas que você segue');

            // 3.6.1 Notificações no aplicativo (tem que estar desativado)
            await toggleSwitchByLabel('Notificações no aplicativo', false);

            // 3.6.2 E-mail (tem que estar desativado)
            await toggleSwitchByLabel('E-mail', false);

            // 3.6.3 Voltar
            await goBack();

            // 3.7 Novas recomendações para seguir (entrar na seção)
            await enterSectionByCategoryName('Novas recomendações para seguir');

            // 3.7.1 Notificações no aplicativo (tem que estar desativado)
            await toggleSwitchByLabel('Notificações no aplicativo', false);

            // 3.7.2 E-mail (tem que estar desativado)
            await toggleSwitchByLabel('E-mail', false);

            // 3.7.3 Voltar
            await goBack();

            // 3.8 Visualizações do perfil (entrar na seção)
            await enterSectionByCategoryName('Visualizações do perfil');

            // 3.8.1 Notificações no aplicativo (tem que estar desativado)
            await toggleSwitchByLabel('Notificações no aplicativo', false);

            // 3.8.2 E-mail (tem que estar desativado)
            await toggleSwitchByLabel('E-mail', false);

            // 3.8.3 Voltar
            await goBack();

            // 3.9 Atualizações dos seus leads de vendas (entrar na seção)
            await enterSectionByCategoryName('Atualizações dos seus leads de vendas');

            // 3.9.1 Notificações no aplicativo (tem que estar ativo)
            await toggleSwitchByLabel('Notificações no aplicativo', true);

            // 3.9.2 Voltar
            await goBack();

            // 3.9.3 Voltar para a página principal
            await goBack();

            // 4. Atualizações para ficar por dentro da rede (entrar na seção)
            await enterSectionByCategoryName('Atualizações para ficar por dentro da rede');

            // 4.1 Mudanças de emprego (entrar na seção)
            await enterSectionByCategoryName('Mudanças de emprego');

            // 4.1.1 Notificações no aplicativo (tem que estar ativo)
            await toggleSwitchByLabel('Notificações no aplicativo', true);

            // 4.1.2 Notificações push (tem que estar desativado)
            await toggleSwitchByLabel('Notificações push', false);

            // 4.1.3 Voltar
            await goBack();

            // 4.2 Contratando (entrar na seção)
            await enterSectionByCategoryName('Contratando');

            // 4.2.1 Notificações no aplicativo (tem que estar desativado)
            await toggleSwitchByLabel('Notificações no aplicativo', false);

            // 4.2.2 Voltar
            await goBack();

            // 4.3 Aniversários (entrar na seção)
            await enterSectionByCategoryName('Aniversários');

            // 4.3.1 Notificações no aplicativo (tem que estar ativo)
            await toggleSwitchByLabel('Notificações no aplicativo', true);

            // 4.3.2 Voltar
            await goBack();

            // 4.4 Aniversários de empresa (entrar na seção)
            await enterSectionByCategoryName('Aniversários de empresa');

            // 4.4.1 Notificações no aplicativo (tem que estar ativo)
            await toggleSwitchByLabel('Notificações no aplicativo', true);

            // 4.4.2 Voltar
            await goBack();

            // 4.5 Formação acadêmica (entrar na seção)
            await enterSectionByCategoryName('Formação acadêmica');

            // 4.5.1 Notificações no aplicativo (tem que estar ativo)
            await toggleSwitchByLabel('Notificações no aplicativo', true);

            // 4.5.2 Voltar
            await goBack();

            // 4.6 Resumo semanal (entrar na seção)
            await enterSectionByCategoryName('Resumo semanal');

            // 4.6.1 Notificações push (tem que estar desativado)
            await toggleSwitchByLabel('Notificações push', false);

            // 4.6.2 E-mail (tem que estar ativo)
            await toggleSwitchByLabel('E-mail', true);

            // 4.6.3 Voltar
            await goBack();

            // 4.6.4 Voltar para a página principal
            await goBack();

            // 5. Publicar e comentar (entrar na seção)
            await enterSectionByCategoryName('Publicar e comentar');
            
            // 5.1 Permitir notificações relacionadas a publicações (ativar):
            await toggleSwitchByLabel('Permitir notificações relacionadas a publicações', true);

            // 5.2 Comentários e reações (entrar na seção)
            await enterSectionByCategoryName('Comentários e reações');

            // 5.2.1 Notificações no aplicativo (tem que estar ativo)
            await toggleSwitchByLabel('Notificações no aplicativo', true);

            // 5.2.2 Notificações push (tem que estar desativado)
            await toggleSwitchByLabel('Notificações push', false);
            
            // 5.2.3 E-mail (tem que estar desativado)
            await toggleSwitchByLabel('E-mail', false);
            
            // 5.2.4 Voltar
            await goBack();

            // 5.3 Compartilhamentos (entrar na seção)
            await enterSectionByCategoryName('Compartilhamentos');

            // 5.3.1 Notificações no aplicativo (tem que estar ativo)
            await toggleSwitchByLabel('Notificações no aplicativo', true);

            // 5.3.2 Notificações push (tem que estar desativado)
            await toggleSwitchByLabel('Notificações push', false);
            
            // 5.3.3 E-mail (tem que estar desativado)
            await toggleSwitchByLabel('E-mail', false);
            
            // 5.3.4 Voltar
            await goBack();

            // 5.4 Menções (entrar na seção)
            await enterSectionByCategoryName('Menções');

            // 5.4.1 Notificações no aplicativo (tem que estar ativo)
            await toggleSwitchByLabel('Notificações no aplicativo', true);

            // 5.4.2 Notificações push (tem que estar desativado)
            await toggleSwitchByLabel('Notificações push', false);
            
            // 5.4.3 E-mail (tem que estar desativado)
            await toggleSwitchByLabel('E-mail', false);
            
            // 5.4.4 Voltar
            await goBack();

            // 5.5 Conversas em alta (entrar na seção)
            await enterSectionByCategoryName('Conversas em alta');

            // 5.5.1 Notificações no aplicativo (tem que estar desativado)
            await toggleSwitchByLabel('Notificações no aplicativo', false);

            // 5.5.2 E-mail (tem que estar desativado)
            await toggleSwitchByLabel('E-mail', false);

            // 5.5.3 Voltar
            await goBack();

            // 5.6 Vídeos ao vivo (entrar na seção)
            await enterSectionByCategoryName('Vídeos ao vivo');

            // 5.6.1 Notificações no aplicativo (tem que estar desativado)
            await toggleSwitchByLabel('Notificações no aplicativo', false);

            // 5.6.2 E-mail (tem que estar desativado)
            await toggleSwitchByLabel('E-mail', false);

            // 5.6.3 Voltar
            await goBack();

            // 5.7 Newsletters (entrar na seção)
            await enterSectionByCategoryName('Newsletters');

            // 5.7.1 Notificações no aplicativo (tem que estar desativado)
            await toggleSwitchByLabel('Notificações no aplicativo', false);

            // 5.7.2 E-mail (tem que estar desativado)
            await toggleSwitchByLabel('E-mail', false);

            // 5.7.3 Voltar
            await goBack();

            // 5.8 Lembretes para publicar (entrar na seção)
            await enterSectionByCategoryName('Lembretes para publicar');

            // 5.8.1 Notificações no aplicativo (tem que estar desativado)
            await toggleSwitchByLabel('Notificações no aplicativo', false);

            // 5.8.2 E-mail (tem que estar desativado)
            await toggleSwitchByLabel('E-mail', false);

            // 5.8.3 Voltar
            await goBack();

            // 5.9 Artigos colaborativos (entrar na seção)
            await enterSectionByCategoryName('Artigos colaborativos');

            // 5.9.1 Notificações no aplicativo (tem que estar desativado)
            await toggleSwitchByLabel('Notificações no aplicativo', false);

            // 5.9.2 E-mail (tem que estar desativado)
            await toggleSwitchByLabel('E-mail', false);

            // 5.9.3 Voltar
            await goBack();

            // 5.10 Sugestões de publicações (entrar na seção)
            await enterSectionByCategoryName('Sugestões de publicações');

            // 5.10.1 Notificações no aplicativo (tem que estar desativado)
            await toggleSwitchByLabel('Notificações no aplicativo', false);

            // 5.10.2 Voltar
            await goBack();

            // 5.11 Vídeos recomendados (entrar na seção)
            await enterSectionByCategoryName('Vídeos recomendados');

            // 5.11.1 Notificações no aplicativo (tem que estar desativado)
            await toggleSwitchByLabel('Notificações no aplicativo', false);

            // 5.11.2 Voltar
            await goBack();

            // 5.11.3 Voltar para a página principal
            await goBack();

            // 6. Mensagens (entrar na seção)
            await enterSectionByCategoryName('Mensagens');
            
            // 6.1 Permitir notificações de mensagens (ativar):
            await toggleSwitchByLabel('Permitir notificações de mensagens', true);

            // 6.2 Mensagens (entrar na seção)
            await enterSectionByCategoryName('Mensagens');
            
            // 6.2.1 Notificações no aplicativo (tem que estar ativo)
            await toggleSwitchByLabel('Notificações no aplicativo', true);

            // 6.2.2 Notificações push (tem que estar ativo)
            await toggleSwitchByLabel('Notificações push', true);
            
            // 6.2.3 E-mail (tem que estar desativado)
            await toggleSwitchByLabel('E-mail', false);

            // 6.2.4 Voltar
            await goBack();

            // 6.3 Lembretes de mensagem (entrar na seção)
            await enterSectionByCategoryName('Lembretes de mensagem');

            // 6.3.1 Notificações no aplicativo (tem que estar desativado)
            await toggleSwitchByLabel('Notificações no aplicativo', false);

            // 6.3.2 E-mail (tem que estar desativado)
            await toggleSwitchByLabel('E-mail', false);

            // 6.3.3 Voltar
            await goBack();

            // 6.4 InMail (entrar na seção)
            await enterSectionByCategoryName('InMail');

            // 6.4.1 Notificações no aplicativo (tem que estar ativo)
            await toggleSwitchByLabel('Notificações no aplicativo', true);

            // 6.4.2 Notificações push (tem que estar desativado)
            await toggleSwitchByLabel('Notificações push', false);

            // 6.4.3 E-mail (tem que estar desativado)
            await toggleSwitchByLabel('E-mail', false);

            // 6.4.4 Voltar
            await goBack();

            // 6.5 Lembretes de InMail (entrar na seção)
            await enterSectionByCategoryName('Lembretes de InMail');

            // 6.5.1 Notificações no aplicativo (tem que estar desativado)
            await toggleSwitchByLabel('Notificações no aplicativo', false);

            // 6.5.2 E-mail (tem que estar desativado)
            await toggleSwitchByLabel('E-mail', false);

            // 6.5.3 Voltar
            await goBack();

            // 6.5.4 Voltar para a página principal
            await goBack();

            // 7. Grupos (entrar na seção)
            await enterSectionByCategoryName('Grupos');

            // 7.1 Permitir notificações de grupos (desativar):
            await toggleSwitchByLabel('Permitir notificações de grupos', false);

            // 7.2 Voltar
            await goBack();

            // 8. Pages (entrar na seção)
            await enterSectionByCategoryName('Pages');

            // 8.1 Permitir notificações da Page (desativar):
            await toggleSwitchByLabel('Permitir notificações da Page', false);

            // 8.2 Voltar
            await goBack();

            // 9. Participar de eventos (entrar na seção)
            await enterSectionByCategoryName('Participar de eventos');

            // 9.1 Permitir notificações de eventos (desativar):
            await toggleSwitchByLabel('Permitir notificações de eventos', false);

            // 9.2 Voltar
            await goBack();

            // 10. Notícias e relatórios (entrar na seção)
            await enterSectionByCategoryName('Notícias e relatórios');

            // 10.1 Permitir notificações dos editores (desativar):
            await toggleSwitchByLabel('Permitir notificações dos editores', false);

            // 10.2 Relatórios e estatísticas (entrar na aba)
            await enterSectionByCategoryName('Relatórios e estatísticas');

            // 10.3 Permitir notificações sobre relatórios e estatísticas (desativar):
            await toggleSwitchByLabel('Permitir notificações sobre relatórios e estatísticas', false);

            // 10.4 Voltar
            await goBack();

            // 11. Atualização do perfil (entrar na seção)
            await enterSectionByCategoryName('Atualização do perfil');

            // 11.1 Permitir notificações de aprimoramento do perfil (ativar):
            await toggleSwitchByLabel('Permitir notificações de aprimoramento do perfil', true);

            // 11.2 Recomendações de perfis (entrar na seção)
            await enterSectionByCategoryName('Recomendações de perfis');

            // 11.2.1 Notificações no aplicativo (tem que estar desativado)
            await toggleSwitchByLabel('Notificações no aplicativo', false);

            // 11.2.2 E-mail (tem que estar desativado)
            await toggleSwitchByLabel('E-mail', false);

            // 11.2.3 Voltar
            await goBack();

            // 11.3 Novas recomendações de competências (entrar na seção)
            await enterSectionByCategoryName('Novas recomendações de competências');

            // 11.3.1 Notificações no aplicativo (tem que estar ativo)
            await toggleSwitchByLabel('Notificações no aplicativo', true);

            // 11.3.2 Notificações push (tem que estar desativado)
            await toggleSwitchByLabel('Notificações push', false);
            
            // 11.3.3 E-mail (tem que estar desativado)
            await toggleSwitchByLabel('E-mail', false);

            // 11.3.4 Voltar
            await goBack();

            // 11.4 Dicas e ofertas para aproveitar o LinkedIn (entrar na seção)
            await enterSectionByCategoryName('Dicas e ofertas para aproveitar o LinkedIn');

            // 11.4.1 Notificações no aplicativo (tem que estar desativado)
            await toggleSwitchByLabel('Notificações no aplicativo', false);

            // 11.4.2 E-mail (tem que estar desativado)
            await toggleSwitchByLabel('E-mail', false);

            // 11.4.3 Voltar
            await goBack();

            // 11.4.4 Voltar para a página principal
            await goBack();

            // 12. Verificações (entrar na seção)
            await enterSectionByCategoryName('Verificações');

            // 12.1 Permitir notificações de verificação (ativar):
            await toggleSwitchByLabel('Permitir notificações de verificação', true);

            // 12.2 Fazer verificação (entrar na seção)
            await enterSectionByCategoryName('Fazer verificação');

            // 12.2.1 Notificações no aplicativo (ativar)
            await toggleSwitchByLabel('Notificações no aplicativo', true);

            // 12.2.2 Notificações push (desativar)
            await toggleSwitchByLabel('Notificações push', false);

            // 12.2.3 E-mail (desativar)
            await toggleSwitchByLabel('E-mail', false);

            // 12.2.4 Voltar
            await goBack();

            // 12.2.5 Voltar para a página principal
            await goBack();

            // 13. Jogos (entrar na seção)
            await enterSectionByCategoryName('Jogos');

            // 13.1 Permitir notificações sobre jogos (desativar):
            await toggleSwitchByLabel('Permitir notificações sobre jogos', false);

            // 13.2 Voltar
            await goBack();

            console.log('Configurações de notificações atualizadas com sucesso.');
        } catch (error) {
            console.error('Erro durante a execução:', error);
        }
    }

    // Executa a função principal
    await configureNotifications();
})();