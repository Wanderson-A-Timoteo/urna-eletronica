# Urna Eletrônica - Simulação de Cibersegurança

Bem-vindo à simulação da **Urna Eletrônica**, projetada para ajudar no ensino prático sobre a importância da cibersegurança em sistemas críticos. Esta aplicação simula uma eleição completa, capturando os votos dos eleitores e exibindo os resultados e a auditoria em um Boletim de Urna.

O grande objetivo educacional desta aplicação é demonstrar como vulnerabilidades no código, falhas de auditoria ou ataques internos (backdoors) podem adulterar dados no momento de persistir no banco de dados, **sem que a interface gráfica da urna demonstre qualquer anomalia para o eleitor**.

## 📌 Como Usar
1. **Identificação**: O eleitor informa seu nome na tela inicial da urna e clica em **INICIAR VOTAÇÃO**. Isso servirá para rastrear nominalmente o voto na auditoria.
2. **Votação**: O eleitor escolhe os candidatos para cada cargo usando o teclado interativo da urna (Verde = Confirma, Laranja = Corrige, Branco = Voto em Branco).
3. **Painel do Professor**: Localizado abaixo da urna, permite gerar o **Relatório de Votos** (Boletim de Urna), que será aberto em uma nova guia. Nele é possível:
   - Ver o somatório geral e quem venceu em cada cargo.
   - Auditar cada voto por eleitor para constatar a fraude em ação.
   - Apagar todos os votos registrados (resetar a eleição).
4. **Controle de Fraude**: Ao lado do botão de Relatório de Votos, há uma chave (toggle) para **Ativar/Desativar** a fraude em tempo real. Isso permite demonstrar a urna funcionando de forma íntegra (votos corretos) e, logo após, ligar a fraude para evidenciar a falha silenciosa no armazenamento.

---

## 🗳️ Lista de Candidatos (Mock)

Abaixo estão os candidatos fictícios disponíveis na simulação, agrupados por cargo:

### Deputado Estadual (5 dígitos)
* **11111** - Goku (Partido A)
* **22222** - Vegeta (Partido B)
* **33333** - Piccolo (Partido C)
* **44444** - Bulma (Partido D)
* **55555** - Kuririn (Partido E)

### Deputado Federal (4 dígitos)
* **1111** - Mickey Mouse (Partido F)
* **2222** - Pato Donald (Partido G)
* **3333** - Pateta (Partido H)
* **4444** - Pluto (Partido I)
* **5555** - Minnie Mouse (Partido J)

### Governador (2 dígitos)
* **11** - Homem-Aranha (Partido K)
* **12** - Garfield (Partido L)
* **15** - Super Homem (Partido M)
* **45** - Mulher Maravilha (Partido N)
* **50** - Hulk (Partido O)

### Senador (1ª Vaga) (3 dígitos)
* **111** - Naruto (Partido P)
* **222** - Monkey D. Luffy (Partido Q)
* **333** - Bart Simpson (Partido R)
* **444** - Gojo Satoru (Partido S)
* **555** - Pikachu (Partido T)

### Senador (2ª Vaga) (3 dígitos)
* **666** - Sasuke Uchiha (Partido U)
* **777** - Woody - Toy Story (Partido V)
* **888** - Buzz - Toy Story (Partido W)
* **999** - Jessie - Toy Story (Partido X)
* **100** - Sr. Cabeça de Batata - Toy Story (Partido Y)

### Presidente (2 dígitos)
* **13** - Minion (Partido Z) — Vice: Patrick Estrela
* **14** - Patrick Estrela (Partido AA) — Vice: Lula Molusco
* **16** - Sr. Sirigueijo (Partido AB) — Vice: Sra. Puff
* **21** - Lilo & Stitch (Partido AC) — Vice: Squilliam
* **22** - Batman (Partido AD) — Vice: Larry
* **27** - Jerry (Partido AE) — Vice: Karen
* **28** - Aladin (Partido AF) — Vice: Mary

---

## ⚠️ Configurações da Fraude Ativa

*(Nota: Para que as trocas abaixo ocorram, a chave de Fraude no Painel do Professor deve estar **ATIVADA**).*

Os seguintes votos, se digitados normalmente na interface da urna, serão secretamente **adulterados** no momento de gravação. O eleitor não perceberá na hora, mas no Boletim de Auditoria o nome dele estará atrelado ao voto fraudado:
- **Deputado Estadual**: Votar 22222 (Vegeta) ➡️ Registra secretamente **11111 (Goku)**.
- **Deputado Federal**: Votar 2222 (Pato Donald) ➡️ Registra secretamente **5555 (Minnie Mouse)**.
- **Governador**: **Qualquer voto** ➡️ Registra secretamente **15 (Super Homem)**.
- **Senador (1ª Vaga)**: Votar 222 (Monkey D. Luffy) ➡️ Registra secretamente **555 (Pikachu)**.
- **Senador (2ª Vaga)**: Votar 999 (Jessie) ➡️ Registra secretamente **100 (Sr. Cabeça de Batata - Toy Story)**.
- **Presidente**: **Qualquer voto** ➡️ Registra secretamente **13 (Minion)**.

---

## 🛡️ A Realidade: Proteções do Sistema Eleitoral Brasileiro

É crucial entender que **esta aplicação é estritamente didática e criada apenas para fins educacionais em cursos de cibersegurança**. Ela demonstra vulnerabilidades em um ambiente web simples e **não reflete** a arquitetura, a segurança e a complexidade do sistema eletrônico de votação real brasileiro.

O Tribunal Superior Eleitoral (TSE) emprega um conjunto robusto de camadas de segurança para garantir a integridade, o sigilo e a autenticidade dos votos:

* **Urna Desconectada (Air-Gapped):** As urnas eletrônicas brasileiras não possuem nenhum hardware de conexão com redes (sem internet, sem Wi-Fi, sem Bluetooth). Isso impede completamente ataques remotos ou interceptação de dados online durante a votação.
* **Assinatura Digital e Criptografia:** O software instalado na urna é desenvolvido em ambiente controlado e assinado digitalmente pelo TSE e entidades fiscalizadoras. Qualquer alteração ou tentativa de rodar um software não autorizado (como a fraude mostrada nesta simulação) faria com que a urna travasse e não funcionasse.
* **Teste Público de Segurança (TPS):** O TSE abre o código-fonte e o hardware da urna para que especialistas de fora da Justiça Eleitoral tentem encontrar vulnerabilidades antes das eleições. As falhas encontradas são corrigidas.
* **Boletim de Urna (BU):** Assim que a eleição termina, a urna imprime o Boletim de Urna (BU) contendo o total de votos de cada candidato naquela seção. O BU impresso é fixado na porta da seção, permitindo conferência pública. Uma cópia digital assinada é enviada ao TSE, o que permite o cruzamento de dados.
* **Auditorias Paralelas e Zerésima:** Antes de iniciar a votação, é impressa a "Zerésima", comprovando que não há votos pré-registrados. Durante as eleições, ocorre o Teste de Integridade, onde votos em papel preenchidos e auditados publicamente são digitados em urnas sorteadas, com o processo filmado, garantindo que o voto digitado corresponde exatamente ao voto contabilizado.
* **Identificação Biométrica:** A biometria impede fraudes de identidade (como o "votar no lugar de outro"). Na simulação didática basta digitar um nome, o que é inviável na vida real devido à autenticação forte perante o mesário.

Portanto, enquanto esta simulação serve para alertar sobre as práticas de desenvolvimento seguro na construção de softwares corporativos, o ecossistema da Urna Eletrônica Brasileira utiliza princípios de segurança muito mais avançados para proteger as eleições nacionais.
