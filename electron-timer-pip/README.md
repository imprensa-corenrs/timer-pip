# Timer PiP — Janela Flutuante Transparente

App desktop (Electron) com um timer de eventos e uma **janela flutuante
transparente, sempre no topo de outros programas**, com redimensionamento
livre — nativo do sistema operacional, sem as limitações da API de
Picture-in-Picture do navegador.

## Como gerar o `.exe` sem instalar nada na sua máquina

O build roda inteiramente nos servidores do GitHub (Windows na nuvem).
Você só precisa de uma conta gratuita no GitHub e usar o navegador.

### Passo a passo

1. **Crie um repositório novo** no GitHub (pode ser público, é grátis):
   `github.com` → botão verde **New** → dê um nome, ex. `timer-pip` → **Create repository**

2. **Suba estes arquivos** para o repositório. O jeito mais fácil, direto
   pelo navegador:
   - Na página do repositório, clique em **Add file → Upload files**
   - Arraste TODA a pasta `electron-timer-pip` (mantendo a estrutura de
     subpastas `src/` e `.github/workflows/`)
   - Clique em **Commit changes**

   > ⚠️ Importante: a pasta `.github/workflows/build.yml` precisa manter
   > exatamente esse caminho. Se o GitHub "achatar" a estrutura ao
   > arrastar, crie as pastas manualmente pela interface (`Add file →
   > Create new file` e digite o caminho completo, ex.
   > `.github/workflows/build.yml`).

3. **O build inicia sozinho** assim que os arquivos chegam na branch
   `main` (o workflow está configurado para rodar automaticamente).
   Se quiser rodar manualmente: aba **Actions** → selecione o workflow
   **Build Portable EXE** → botão **Run workflow**.

4. **Aguarde o build terminar** (leva de 3 a 6 minutos). Acompanhe em:
   aba **Actions** → clique na execução mais recente.

5. **Baixe o `.exe`:**
   Na página da execução concluída, role até **Artifacts** e baixe
   `TimerPiP-portable` (vem como um `.zip` contendo o `.exe` dentro).

6. **Use em qualquer máquina Windows:**
   Extraia o `.zip`, copie o `TimerPiP-portable.exe` para onde quiser
   (pendrive, Google Drive, pasta compartilhada) e dê duplo clique.
   Não instala nada, não precisa de admin, não deixa rastro no sistema.

## Como usar o app

1. Abra `TimerPiP-portable.exe` — abre a janela principal com o timer
2. Configure o tempo (ou use um preset) e clique em **Iniciar**
3. Clique em **⧉ Janela Flutuante (transparente)** para abrir o overlay
4. O overlay abre no canto superior direito, com fundo 100% transparente,
   sempre visível por cima de qualquer programa
5. **Arraste** o overlay clicando e segurando em qualquer parte dele
6. **Redimensione** puxando as bordas/cantos, livremente
7. **Feche o overlay** dando duplo clique nele, apertando Esc, ou
   clicando de novo no botão na janela principal
8. Quando o tempo esgota, aparece **ENCERRAR** piscando em vermelho,
   com o cronômetro negativo abaixo

## Rodando localmente (opcional, se você tiver Node.js)

```bash
npm install
npm start          # abre o app em modo desenvolvimento
npm run dist       # gera o .exe portátil em dist/
```
