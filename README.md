# fs-keeper

Uma CLI simples em Node.js para organizar qualquer diretório automaticamente por extensão de arquivo.

Ex: `fs-keeper ./Downloads` move :
    <br>__Todos os `.jpg` (e arquivos com outras extensões de imagens) para `Imagens/`;__<br>
    __Todos os `.mp4` (e arquivos com outras extensões de vídeo) para `Videos/`;__<br>
    __Todos os `.txt` (e arquivos com outras extensões de texto) para `Textos/`;__<br>

_A organização de ficheiros é feita em função das extensões suportadas pela CLI, caso as extensões não sejam definidas via flag --extensios_

## EXTENSÕES SUPORTADAS ##
    img: jpg, jpeg, png, webp, gif, svg, ico.
    src: exe, js, php.
    video: mp4, mov, avi, webm.
    text: txt, md, pdf, html, json, xml, log, csv.

## INSTALAÇÃO

Global via npm:
```bash
    npm install -g fs-keeper
```
Localmente (para desenvolvimento):
```bash
    git clone https://github.com/Gabriel-Angelo712/fs-keeper.git
    cd fs-keeper
    npm link
    fs-keeper ./<Nome_Do_Diretório>
```

## OBSERVAÇÃO ##
- O fs-keeper não possui dependências externas. Portanto, npm install não é necessário.
- É usado apenas o comando npm link para o comando global.

## MODO DE USO ##

Default: Organizar diretório:
```bash
    fs-keeper ./<Nome_Do_Diretório>
```

Simulação: fazer um preview do resultado:
```bash
    fs-keeper ./<Nome_Do_Diretório> --simulation
```

Extensões específicas: organiza apenas os arquivos com as extensões que forem descritas:
```bash
    fs-keeper ./<Nome_Do_Diretório> --extensions=[<ext1>, <ext2>, <ext3>, <extn>]
```

## REQUISITO ##
Node.Js 18+

## LICENÇA ##
MIT &copy; 2026 Gabriel Ângelo
