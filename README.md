# Urna Eletrônica - Simulação de Cibersegurança

Bem-vindo à simulação da **Urna Eletrônica**, projetada para ajudar no ensino prático sobre a importância da cibersegurança em sistemas críticos. Esta aplicação simula uma eleição completa, capturando os votos dos eleitores e exibindo os resultados e a auditoria em um Boletim de Urna.

O grande objetivo educacional desta aplicação é demonstrar como vulnerabilidades no código, falhas de auditoria ou ataques internos (backdoors) podem adulterar dados no momento de persistir no banco de dados, **sem que a interface gráfica da urna demonstre qualquer anomalia para o eleitor**.

## 📌 Como Usar
1. **Identificação**: O eleitor informa seu nome na tela inicial da urna. Isso servirá para rastrear nominalmente o voto na auditoria.
2. **Votação**: O eleitor escolhe os candidatos para cada cargo usando o teclado interativo da urna (Verde = Confirma, Laranja = Corrige, Branco = Voto em Branco).
3. **Painel do Professor**: Localizado abaixo da urna, permite gerar o **Relatório de Votos** (Boletim de Urna). Nele é possível ver o somatório geral e, crucialmente, auditar cada voto por eleitor para constatar a fraude em ação.

---

## 🗳️ Lista de Candidatos (Mock)

Abaixo estão os candidatos fictícios disponíveis na simulação, agrupados por cargo:

### Deputado Estadual (5 dígitos)
* **11111** - Goku (PP)
* **22222** - Vegeta (PL)
* **33333** - Piccolo (MDB)
* **44444** - Bulma (PSDB)
* **55555** - Kuririn (PT)

### Deputado Federal (4 dígitos)
* **1111** - Mickey Mouse (PP)
* **2222** - Pato Donald (PL)
* **3333** - Pateta (MDB)
* **4444** - Pluto (PSDB)
* **5555** - Minnie Mouse (PT)

### Governador (2 dígitos)
* **11** - Homem-Aranha (PP)
* **12** - Garfield (PDT)
* **15** - Super Homem (MDB)
* **45** - Mulher Maravilha (PSDB)
* **50** - Hulk (PSOL)

### Senador (1ª Vaga) (3 dígitos)
* **111** - Naruto (PP)
* **222** - Monkey D. Luffy (PL)
* **333** - Bart Simpson (MDB)
* **444** - Gojo Satoru (MDB)
* **555** - Pikachu (PT)

### Senador (2ª Vaga) (3 dígitos)
* **666** - Sasuke Uchiha (PP)
* **777** - Woody - Toy Story (PL)
* **888** - Buzz - Toy Story (MDB)
* **999** - Jessie - Toy Story (PSDB)
* **100** - Sr. Cabeça de Batata - Toy Story (PT)

### Presidente (2 dígitos)
* **13** - Minion (PT) — Vice: Patrick Estrela
* **14** - Patrick Estrela (Missão) — Vice: Lula Molusco
* **16** - Sr. Sirigueijo (PSTU) — Vice: Sra. Puff
* **21** - Lula Molusco (PCB) — Vice: Squilliam
* **22** - Batman (PL) — Vice: Larry
* **27** - Jerry (DC) — Vice: Karen
* **28** - Aladin (PRTB) — Vice: Mary

---

## ⚠️ Configurações da Fraude Ativa (Spoilers para o Professor)
Os seguintes votos, se digitados normalmente na interface da urna, serão secretamente **adulterados** no momento de gravação. O eleitor não perceberá na hora, mas no Boletim de Auditoria o nome dele estará atrelado ao voto fraudado:
- **Deputado Estadual**: Votar 44444 (Bulma) ➡️ Registra secretamente **11111 (Goku)**.
- **Deputado Federal**: Votar 1111 (Mickey) ➡️ Registra secretamente **55555 (Kuririn)**.
- **Governador**: Votar 45 (Mulher Maravilha) ➡️ Registra secretamente **15 (Homem-Aranha)**.
- **Senador (1ª Vaga)**: Votar 111 (Naruto) ➡️ Registra secretamente **555 (Pikachu)**.
- **Senador (2ª Vaga)**: Votar 999 (Jessie) ➡️ Registra secretamente **100 (Sr. Cabeça de Batata)**.
- **Presidente**: Votar 22 (Batman) ➡️ Registra secretamente **13 (Minion)**.
