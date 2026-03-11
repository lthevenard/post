---
marp: true
backgroundImage: 'default_bg.png'
---
<style>
section {
  background-image: url(default_bg.png);
}
h1 {
  font-size: 200%;
  color: #003E7E;
}
h2 {
  font-size: 150%;
  color: #003E7E;
}
h3 {
  font-size: 150%;
  color: #003E7E;
  text-align: center;
}
h4 {
  font-size: 100%;
  text-align: center;
  font-weight: normal;
}
h5 {
  font-size: 75%;
  text-align: center;
  font-weight: normal;
}
header {
  color: #058ED0;
  font-size: 85%;
}
footer {
  color: black;
  font-size: 60%;
}
a {
  color: #058ED0;
}
strong {
  color: #003E7E;
}
blockquote {
  background: #f9f9f9;
  font-style: italic;
  font-family: Verdana;
  font-size: 80%;
  line-height: 170%;
  border-left: 10px solid #ccc;
  margin: 1.5em 20px;
  padding: 1.2em 30px;
  quotes: "\201C""\201D""\2018""\2019";
}
blockquote p {
  display: inline;
}
section::after {
  content: attr(data-marpit-pagination) ' / ' attr(data-marpit-pagination-total);
  color: #003E7E;
  font-size: 60%;
}
table {
  margin-left: auto;
  margin-right: auto;
}
th {
  background-color: #003E7E;
  color: white
}
.columns {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}
td {
  margin: 100px;
}
</style>

![bg](section_bg.png)

# Aula 4 – Decisão Racional sob Condições de Ignorância I 
**Teoria da Decisão – 2026.1**
Lucas Thevenard

---
<!-- 
paginate: true 
header: Decisão Racional sob Condições de Ignorância I
footer: lucas.gomes@fgv.br | 17/03/2026
-->


## Roteiro da aula

- **Modelo de Decião Racional sob Condição de Ignorância (MDRI)**
  - Maximin
  * Minimax
  * Regra do Otimismo
  * Postulado da Razão Insuficiente

---

## Recapitulando: Certeza, Risco, Ignorância
- **Certeza** – consequências unívocas e certas para cada alternativa de decisão.
- **Risco** – pode haver múltiplos Estados do Mundo associados a uma alternativa de decisão, mas conseguimos estimar as probabilidades.
- **Ignorância** – não conseguimos estimar as probabilidades para os Estados do Mundo, apenas avaliar quais resultados são mais ou menos desejáveis.

#### Obs: nomenclaturas variam (diferentes usos do termo 'incerteza').

---

### Vamos voltar ao exemplo da compra do imóvel e representá-lo na forma normal, sem as probabilidades
<br>

Alternativas         | B está contaminado | B não está contaminado
---------------------|:------------------:|:----------------------:
Compra imediata de A | - R$ 300 mil       | - R$ 300 mil 
Compra imediata de B | - R$ 400 mil       | - R$ 200 mil
Teste Prévio         | - R$ 345 mil       | - R$ 245 mil 

#### **E agora, como decidir?**

---

## Métodos de decisão sob ignorância
* **Maximin**: Escolho a alternativa que tem o melhor "pior caso". Ou seja, minimizo as minhas chances de me dar muito mal.
* **Minimax**: Escolho a alternativa que tem menos chances de me causar muito arrependimento. Ou seja, escolho o menor nivel máximo de arrependimento.
* **Regra do otimismo**: Avalio o melhor e o pior resultado de cada alternativa com base em um "nível de otimismo".
* **Postulado da razão insuficiente**: Partindo da suposição de que todas os EDMs têm a mesma chance de ocorrer, comparamos o valor médio das alternativas.

---
![bg](section_bg.png)

# 1. Maximin

_Escolho a alternativa que tem o melhor "pior caso". Ou seja, minimizo as minhas chances de me dar muito mal._

---

### Maximin
<br>

Alternativas         | B está contaminado | B não está contaminado
---------------------|:------------------:|:---------------------:
Compra imediata de A | - R$ 300 mil       | - R$ 300 mil
Compra imediata de B | - R$ 400 mil       | - R$ 200 mil
Teste Prévio         | - R$ 345 mil       | - R$ 245 mil

---

### Maximin
<br>

Alternativas         | B está contaminado | B não está contaminado
---------------------|:------------------:|:---------------------:
Compra imediata de A | **- R$ 300 mil ✶** | **- R$ 300 mil ✶** 
Compra imediata de B | **- R$ 400 mil ✶** | - R$ 200 mil
Teste Prévio         | **- R$ 345 mil ✶** | - R$ 245 mil

---

### Maximin
<br>

Alternativas | B está contaminado | B não está contaminado
-|:-:|:-:
**Compra imediata de A  ✶✶** | **- R$ 300 mil ✶** | **- R$ 300 mil ✶** 
Compra imediata de B         | **- R$ 400 mil ✶** | - R$ 200 mil
Teste Prévio                 | **- R$ 345 mil ✶** | - R$ 245 mil

<br>

#### **Solução (Maximin)**: Compra imediata de A

---

## Maximin

- **Definição**: Escolho a alternativa que tem o melhor "pior caso". Ou seja, minimizo as minhas chances de me dar muito mal.
- **Método Léxico**: resolução progressiva dos casos de 'empate' entre piores cenários (considerando o próximo pior cenário).

---

### Maximin
<br>

Alternativas | EDM1 | EDM2 | EDM3
:-----------:|:----:|:----:|:----:
A            | 4    | 6    | 8 
B            | 8    | 4    | 5
C            | 3    | 4    | 13

---

### Maximin
<br>

Alternativas | EDM1       | EDM2    | EDM3
:-----------:|:----------:|:-------:|:----:
A            | **4 ✶**    | 6       | 8 
B            | 8          | **4 ✶** | 5
C            | **3 ✶**    | 4       | 13

---

### Maximin
<br>

Alternativas     | EDM1       | EDM2    | EDM3
:---------------:|:----------:|:---------:|:----:
A                | ~~- 4 -~~  | 6         | 8 
B                | 8          | ~~- 4 -~~ | 5
~~- C  -~~       | ~~- 3 -~~  | ~~- 4 -~~ | ~~- 13 -~~

---

### Maximin
<br>

Alternativas | EDM1       | EDM2    | EDM3
:-----------:|:----------:|:---------:|:----:
A            | ~~- 4 -~~  | **6 ✶**   | 8 
B            | 8          | ~~- 4 -~~ | **5 ✶**
~~- C  -~~   | ~~- 3 -~~  | ~~- 4 -~~ | ~~- 13 -~~

---

### Maximin
<br>

Alternativas | EDM1       | EDM2    | EDM3
:-----------:|:----------:|:---------:|:----:
**A ✶✶**     | ~~- 4 -~~  | **6 ✶**   | 8 
B            | 8          | ~~- 4 -~~ | **5 ✶**
~~- C  -~~   | ~~- 3 -~~  | ~~- 4 -~~ | ~~- 13 -~~

<br>

#### **Solução (Maximin Léxico)**: A

---

### Maximin
<br>

Alternativas | EDM1 | EDM2 | EDM3 | EDM4
:-----------:|:----:|:----:|:----:|:----:
A            | 2    | 40   | 50   | 12
B            | 12   | 7    | 10   | 5
C            | 4    | 3    | 8    | 10
D            | 8    | 8    | 9    | 5

---

### Maximin
<br>

Alternativas | EDM1    | EDM2    | EDM3 | EDM4
:-----------:|:-------:|:-------:|:----:|:----:
A            | **2 ✶** | 40      | 50   | 12
B            | 12      | 7       | 10   | **5 ✶**
C            | 4       | **3 ✶** | 8    | 10
D            | 8       | 8       | 9    | **5 ✶**

---

### Maximin
<br>

Alternativas | EDM1      | EDM2       | EDM3       | EDM4
:-----------:|:---------:|:----------:|:----------:|:----------:
~~- A -~~    | ~~- 2 -~~ | ~~- 40 -~~ | ~~- 50 -~~ | ~~- 12 -~~
B            | 12        | 7          | 10         | ~~- 5 -~~
~~- C -~~    | ~~- 4 -~~ | ~~- 3 -~~  | ~~- 8 -~~  | ~~- 10 -~~
D            | 8         | 8          | 9          | ~~- 5 -~~

---

### Maximin
<br>

Alternativas | EDM1      | EDM2       | EDM3       | EDM4
:-----------:|:---------:|:----------:|:----------:|:----------:
~~- A -~~    | ~~- 2 -~~ | ~~- 40 -~~ | ~~- 50 -~~ | ~~- 12 -~~
B            | 12        | **7 ✶**    | 10         | ~~- 5 -~~
~~- C -~~    | ~~- 4 -~~ | ~~- 3 -~~  | ~~- 8 -~~  | ~~- 10 -~~
D            | **8 ✶**   | **8 ✶**    | 9          | ~~- 5 -~~

---

### Maximin
<br>

Alternativas | EDM1      | EDM2       | EDM3       | EDM4
:-----------:|:---------:|:----------:|:----------:|:----------:
~~- A -~~    | ~~- 2 -~~ | ~~- 40 -~~ | ~~- 50 -~~ | ~~- 12 -~~
B            | 12        | **7 ✶**    | 10         | ~~- 5 -~~
~~- C -~~    | ~~- 4 -~~ | ~~- 3 -~~  | ~~- 8 -~~  | ~~- 10 -~~
**D ✶✶**     | **8 ✶**   | **8 ✶**    | 9          | ~~- 5 -~~

<br>

#### **Solução (Maximin)**: Alternativa D

---
![bg](section_bg.png)

# 2. Minimax

_Escolho a alternativa que tem menos chances de me causar muito arrependimento. Ou seja, escolho o menor nivel máximo de arrependimento._

---

### Minimax
<br>

Alternativas | EDM1 | EDM2 | EDM3 | EDM4
:-----------:|:----:|:----:|:----:|:----:
A            | 2    | 40   | 50   | 12
B            | 12   | 7    | 10   | 5
C            | 4    | 3    | 8    | 10
D            | 8    | 8    | 9    | 5

<div style="margin: auto;">

- Será que não podemos nos arrepender de não ter escolhido a opção A? 
* Como podemos calcular/medir nosso arrependimento para evitá-lo?

</div>

---


### Minimax
<br>

Alternativas | EDM3 
:-----------:|:----:
A            | 50   
B            | 10   
C            | 8  
D            | 9 

<div style="margin: auto;">

- Será que não podemos nos arrepender de não ter escolhido a opção A? 
- Como podemos calcular/medir nosso arrependimento para evitá-lo?

</div>

---

### Minimax

<div class="columns">

<div>

### Opções

____ | EDM1 | EDM2 | EDM3 | EDM4
:---:|:----:|:----:|:----:|:----:
A    | 2    | 40   | 50   | 12
B    | 12   | 7    | 10   | 5
C    | 4    | 3    | 8    | 10
D    | 8    | 8    | 9    | 5
</div>

<div>

### Arrependimento

EDM1    | EDM2    | EDM3    | EDM4
:------:|:-------:|:-------:|:-------:
12 - 2  | 40 - 40 | 50 - 50 | 12 - 12
12 - 12 | 40 - 7  | 50 - 10 | 12 - 5
12 - 4  | 40 - 3  | 50 - 8  | 12 - 10
12 - 8  | 40 - 8  | 50 - 9  | 12 - 5

</div>

</div>

---

### Minimax

<div class="columns">

<div>

### Opções

____ | EDM1 | EDM2 | EDM3 | EDM4
:---:|:----:|:----:|:----:|:----:
A    | 2    | 40   | 50   | 12
B    | 12   | 7    | 10   | 5
C    | 4    | 3    | 8    | 10
D    | 8    | 8    | 9    | 5
</div>

<div>

### Arrependimento

EDM1 | EDM2 | EDM3 | EDM4
:---:|:----:|:----:|:----:
10   | 0    | 0    | 0
0    | 33   | 40   | 7
8    | 37   | 42   | 2
4    | 32   | 41   | 7

</div>

</div>

---

### Minimax

<div class="columns">

<div>

### Opções

____ | EDM1 | EDM2 | EDM3 | EDM4
:---:|:----:|:----:|:----:|:----:
A    | 2    | 40   | 50   | 12
B    | 12   | 7    | 10   | 5
C    | 4    | 3    | 8    | 10
D    | 8    | 8    | 9    | 5
</div>

<div>

### Arrependimento

EDM1     | EDM2 | EDM3     | EDM4
:-------:|:----:|:--------:|:----:
**10 ✶** | 0    | 0        | 0
0        | 33   | **40 ✶** | 7
8        | 37   | **42 ✶** | 2
4        | 32   | **41 ✶** | 7

</div>

</div>

---

### Minimax

<div class="columns">

<div>

### Opções

____     | EDM1 | EDM2 | EDM3 | EDM4
:-------:|:----:|:----:|:----:|:----:
**A ✶✶** | 2    | 40   | 50   | 12
B        | 12   | 7    | 10   | 5
C        | 4    | 3    | 8    | 10
D        | 8    | 8    | 9    | 5
</div>

<div>

### Arrependimento

EDM1     | EDM2 | EDM3     | EDM4
:-------:|:----:|:--------:|:----:
**10 ✶** | 0    | 0        | 0
0        | 33   | **40 ✶** | 7
8        | 37   | **42 ✶** | 2
4        | 32   | **41 ✶** | 7

</div>
</div>

#### **Solução (Minimax)**: Alternativa A

---

### Minimax

<div class="columns">

<div>

### Opções

Opções    | Contaminado | Limpo
----------|:-----------:|:------:
Terreno A | - 300       | - 300
Terreno B | - 400       | - 200
Teste     | - 345       | - 245
</div>
<div>
</div>
</div>

---

### Minimax

<div class="columns">

<div>

### Opções

Opções    | Contaminado | Limpo
----------|:-----------:|:------:
Terreno A | - 300       | - 300
Terreno B | - 400       | - 200
Teste     | - 345       | - 245
</div>

<div>

### Arrependimento

Contaminado      | Limpo
:---------------:|:------:
\- 300 - (- 300) | - 200 - (- 300)
\- 300 - (- 400) | - 200 - (- 200)
\- 300 - (-345)  | - 200 - (- 245)

</div>
</div>

---

### Minimax

<div class="columns">

<div>

### Opções

Opções    | Contaminado | Limpo
----------|:-----------:|:------:
Terreno A | - 300       | - 300
Terreno B | - 400       | - 200
Teste     | - 345       | - 245
</div>

<div>

### Arrependimento

Contaminado | Limpo
:----------:|:------:
0           | 100
100         | 0
45          | 45

</div>
</div>

---

### Minimax

<div class="columns">

<div>

### Opções

Opções    | Contaminado | Limpo
----------|:-----------:|:------:
Terreno A | - 300       | - 300
Terreno B | - 400       | - 200
Teste     | - 345       | - 245
</div>

<div>

### Arrependimento

Contaminado | Limpo
:----------:|:------:
0           | **100 ✶**
**100 ✶**   | 0
**45 ✶**    | **45 ✶**

</div>
</div>

---

### Minimax

<div class="columns">

<div>

### Opções

Opções       | Contaminado | Limpo
-------------|:-----------:|:------:
Terreno A    | - 300       | - 300
Terreno B    | - 400       | - 200
**Teste ✶✶** | - 345       | - 245
</div>

<div>

### Arrependimento

Contaminado | Limpo
:----------:|:------:
0           | **100 ✶**
**100 ✶**   | 0
**45 ✶**    | **45 ✶**

</div>
</div>

#### **Solução (Minimax)**: Realizar o Teste

---

## Minimax

- **Definição**: Escolho a alternativa que tem menos chances de me causar muito arrependimento. Ou seja, escolho o menor nivel máximo de arrependimento.
- **Método Léxico**: resolução progressiva dos casos de 'empate' entre maiores níveis de arrependimento (considerando o próximo maior arrependimento).

---

### Minimax

<div class="columns">

<div>

### Opções

__ | EDM1 | EDM2 | EDM3
:--|:----:|:----:|:----:
A  | 12   | 8    | 6
B  | 6    | 14   | 7
C  | 2    | 8    | 10


</div>

<div>
</div>

</div>

---

### Minimax

<div class="columns">

<div>

### Opções

__ | EDM1 | EDM2 | EDM3
:--|:----:|:----:|:----:
A  | 12   | 8    | 6
B  | 6    | 14   | 7
C  | 2    | 8    | 10


</div>

<div>

### Arrependimento

EDM1    | EDM2    | EDM3
:------:|:-------:|:------:
12 - 12 | 14 - 8  | 10 - 6
12 - 6  | 14 - 14 | 10 - 7
12 - 2  | 14 - 8  | 10 - 10

</div>

</div>

---

### Minimax

<div class="columns">

<div>

### Opções

__ | EDM1 | EDM2 | EDM3
:--|:----:|:----:|:----:
A  | 12   | 8    | 6
B  | 6    | 14   | 7
C  | 2    | 8    | 10


</div>

<div>

### Arrependimento

EDM1 | EDM2 | EDM3
:---:|:----:|:----:
0    | 6    | 4
6    | 0    | 3
10   | 6    | 0

</div>

</div>

---

### Minimax

<div class="columns">

<div>

### Opções

__ | EDM1 | EDM2 | EDM3
:--|:----:|:----:|:----:
A  | 12   | 8    | 6
B  | 6    | 14   | 7
C  | 2    | 8    | 10


</div>

<div>

### Arrependimento

EDM1    | EDM2    | EDM3
:------:|:-------:|:----:
0       | **6 ✶** | 4
**6 ✶** | 0       | 3
**10 ✶**| 6       | 0

</div>
</div>

---

### Minimax

<div class="columns">

<div>

### Opções

__ | EDM1 | EDM2 | EDM3
:--|:----:|:----:|:----:
A  | 12   | 8    | 6
B  | 6    | 14   | 7
C  | 2    | 8    | 10


</div>

<div>

### Arrependimento

EDM1       | EDM2      | EDM3
:---------:|:---------:|:----:
0          | ~~- 6 -~~ | 4
~~- 6 -~~  | 0         | 3
~~- 10 -~~ | ~~- 6 -~~ | ~~- 0 -~~

</div>
</div>

---

### Minimax

<div class="columns">

<div>

### Opções

__ | EDM1 | EDM2 | EDM3
:--|:----:|:----:|:----:
A  | 12   | 8    | 6
B  | 6    | 14   | 7
C  | 2    | 8    | 10


</div>

<div>

### Arrependimento

EDM1       | EDM2      | EDM3
:---------:|:---------:|:--------:
0          | ~~- 6 -~~ | **4 ✶**
~~- 6 -~~  | 0         | **3 ✶**
~~- 10 -~~ | ~~- 6 -~~ | ~~- 0 -~~

</div>
</div>

---

### Minimax

<div class="columns">

<div>

### Opções

__        | EDM1 | EDM2 | EDM3
:---------|:----:|:----:|:----:
A         | 12   | 8    | 6
**B ✶✶**  | 6    | 14   | 7
C         | 2    | 8    | 10


</div>
<div>

### Arrependimento

EDM1       | EDM2      | EDM3
:---------:|:---------:|:--------:
0          | ~~- 6 -~~ | **4 ✶**
~~- 6 -~~  | 0         | **3 ✶**
~~- 10 -~~ | ~~- 6 -~~ | ~~- 0 -~~

</div>
</div>

#### **Solução (Minimax Léxico)**: Alternativa B

---

![bg](section_bg.png)

# 3. Regra do otimismo

_Avalio o melhor e o pior resultado de cada alternativa com base em um "nível de otimismo"._

---

### Regra do Otimismo
<br>

<div class="columns">

<div>


Opções    | Contaminado | Limpo
----------|:-----------:|:------:
Terreno A | - 300       | - 300
Terreno B | - 400       | - 200
Teste     | - 345       | - 245
</div>

<div>

$$V_x = a Max + (1 - a) Min \,\,\, | \,\,\, a = 0,7$$

<br>


</div>
</div>

---

### Regra do Otimismo
<br>

<div class="columns">

<div>


Opções    | Contaminado | Limpo
----------|:-----------:|:------:
Terreno A | - 300       | - 300
Terreno B | - 400       | - 200
Teste     | - 345       | - 245
</div>

<div>

$$V_x = a Max + (1 - a) Min \,\,\, | \,\,\, a = 0,7$$

<br>

$$V_A = (0,7 \times -300) + (0,3 \times -300) = -300$$
$$V_B = (0,7 \times -200) + (0,3 \times -400) = -260$$
$$V_T = (0,7 \times -245) + (0,3 \times -345) = -275$$

</div>
</div>

---

### Regra do Otimismo
<br>

<div class="columns">

<div>


Opções           | Contaminado | Limpo
-----------------|:-----------:|:------:
Terreno A        | - 300       | - 300
**Terreno B ✶✶** | - 400       | - 200
Teste            | - 345       | - 245

</div>
<div>

$$V_x = a Max + (1 - a) Min \,\,\, | \,\,\, a = 0,7$$

<br>

$$V_A = (0,7 \times -300) + (0,3 \times -300) = -300$$
$$V_B = (0,7 \times -200) + (0,3 \times -400) = -260$$
$$V_T = (0,7 \times -245) + (0,3 \times -345) = -275$$

</div>
</div>

#### **Solução (Regra do Otimismo)**: Compra imediata do Terreno B

---

## Obs: Regra do Otimismo e Maximin
 * A regra do otimismo é uma generalização do modelo Maximin.

 * No modelo Maximin, temos um resultado que pressupõe nível de otimismo zero:

   * $V_x = a Max + (1 - a) Min \,\,\, | \,\,\, a = 0$

   * $V_x = 0 Max + (1 - 0) Min \implies Vx = Min$

---

### Regra do Otimismo
<br>

<div class="columns">

<div>


__ | EDM1 | EDM2 | EDM3 | EDM4
---|:----:|:----:|:----:|:----:
A  | 35   | 100  | 35   | 35
B  | 20   | 30   | 50   | 70
C  | 45   | 35   | 60   | 70
D  | 20   | 140  | 20   | 20

</div>

<div>

$$V_x = a Max + (1 - a) Min \,\,\, | \,\,\, a = 0,2$$

<br>



</div>
</div>

---

### Regra do Otimismo
<br>

<div class="columns">

<div>


__ | EDM1 | EDM2 | EDM3 | EDM4
---|:----:|:----:|:----:|:----:
A  | 35   | 100  | 35   | 35
B  | 20   | 30   | 50   | 70
C  | 45   | 35   | 60   | 70
D  | 20   | 140  | 20   | 20

</div>

<div>

$$V_x = a Max + (1 - a) Min \,\,\, | \,\,\, a = 0,2$$

<br>

$$V_A = (0,2 \times 100) + (0,8 \times 35) = 48$$
$$V_B = (0,2 \times 70) + (0,8 \times 20) = 30$$
$$V_C = (0,2 \times 70) + (0,8 \times 35) = 42$$
$$V_D = (0,2 \times 140) + (0,8 \times 20) = 44$$

</div>
</div>

---

### Regra do Otimismo
<br>

<div class="columns">

<div>


__       | EDM1 | EDM2 | EDM3 | EDM4
---------|:----:|:----:|:----:|:----:
**A ✶✶** | 35   | 100  | 35   | 35
B        | 20   | 30   | 50   | 70
C        | 45   | 35   | 60   | 70
D        | 20   | 140  | 20   | 20

</div>
<div>

$$V_x = a Max + (1 - a) Min \,\,\, | \,\,\, a = 0,2$$

<br>

$$V_A = (0,2 \times 100) + (0,8 \times 35) = 48$$
$$V_B = (0,2 \times 70) + (0,8 \times 20) = 30$$
$$V_C = (0,2 \times 70) + (0,8 \times 35) = 42$$
$$V_D = (0,2 \times 140) + (0,8 \times 20) = 44$$

</div>
</div>

#### **Solução (Regra do Otimismo)**: Alternativa A

---

### Regra do Otimismo
<br>

<div class="columns">

<div>


__ | EDM1 | EDM2 | EDM3 | EDM4
---|:----:|:----:|:----:|:----:
A  | 35   | 100  | 35   | 35
B  | 20   | 30   | 50   | 70
C  | 45   | 35   | 60   | 70
D  | 20   | 140  | 20   | 20

</div>

<div>

$$V_x = a Max + (1 - a) Min \,\,\, | \,\,\, a = 0,6$$

</div>
</div>

---

### Regra do Otimismo
<br>

<div class="columns">

<div>


__ | EDM1 | EDM2 | EDM3 | EDM4
---|:----:|:----:|:----:|:----:
A  | 35   | 100  | 35   | 35
B  | 20   | 30   | 50   | 70
C  | 45   | 35   | 60   | 70
D  | 20   | 140  | 20   | 20

</div>

<div>

$$V_x = a Max + (1 - a) Min \,\,\, | \,\,\, a = 0,6$$

<br>
 
$$V_A = (0,6 \times 100) + (0,4 \times 35) = 74$$
$$V_B = (0,6 \times 70) + (0,4 \times 20) = 50$$
$$V_C = (0,6 \times 70) + (0,4 \times 35) = 56$$
$$V_D = (0,6 \times 140) + (0,4 \times 20) = 92$$

</div>
</div>

---

### Regra do Otimismo
<br>

<div class="columns">

<div>


__        | EDM1 | EDM2 | EDM3 | EDM4
----------|:----:|:----:|:----:|:----:
A         | 35   | 100  | 35   | 35
B         | 20   | 30   | 50   | 70
C         | 45   | 35   | 60   | 70
**D ✶✶**  | 20   | 140  | 20   | 20

</div>

<div>

$$V_x = a Max + (1 - a) Min \,\,\, | \,\,\, a = 0,6$$

<br>
 
$$V_A = (0,6 \times 100) + (0,4 \times 35) = 74$$
$$V_B = (0,6 \times 70) + (0,4 \times 20) = 50$$
$$V_C = (0,6 \times 70) + (0,4 \times 35) = 56$$
$$V_D = (0,6 \times 140) + (0,4 \times 20) = 92$$

</div>
</div>

#### **Solução (Regra do Otimismo)**: Alternativa D


---
![bg](section_bg.png)

# 4. Postulado da razão insuficiente

_Partindo da suposição de que todas os EDMs têm a mesma chance de ocorrer, comparamos o valor médio das alternativas._

---

### Postulado da razão insuficiente
<br>

<div class="columns">

<div>


__ | EDM1 | EDM2 | EDM3 | EDM4
---|:----:|:----:|:----:|:----:
A  | 35   | 100  | 35   | 35
B  | 20   | 30   | 50   | 70
C  | 45   | 35   | 60   | 70
D  | 20   | 140  | 20   | 20

</div>

<div>

</div>
</div>

---

### Postulado da razão insuficiente
<br>

<div class="columns">

<div>


__ | EDM1 | EDM2 | EDM3 | EDM4
---|:----:|:----:|:----:|:----:
A  | 35   | 100  | 35   | 35
B  | 20   | 30   | 50   | 70
C  | 45   | 35   | 60   | 70
D  | 20   | 140  | 20   | 20

</div>

<div>


 
$$V_A = \frac{35+100+35+35}{4}$$

$$V_B = \frac{20+30+50+70}{4}$$

$$V_C = \frac{45+35+60+70}{4}$$

$$V_D = \frac{20+140+20+20}{4}$$

</div>
</div>

---

### Postulado da razão insuficiente
<br>

<div class="columns">

<div>


__ | EDM1 | EDM2 | EDM3 | EDM4
---|:----:|:----:|:----:|:----:
A  | 35   | 100  | 35   | 35
B  | 20   | 30   | 50   | 70
C  | 45   | 35   | 60   | 70
D  | 20   | 140  | 20   | 20

</div>

<div>


 
$$V_A = \frac{35+100+35+35}{4} = \frac{205}{4}$$

$$V_B = \frac{20+30+50+70}{4} = \frac{170}{4}$$

$$V_C = \frac{45+35+60+70}{4} = \frac{210}{4}$$

$$V_D = \frac{20+140+20+20}{4} = \frac{200}{4}$$

</div>
</div>

---


### Postulado da razão insuficiente
<br>

<div class="columns">

<div>


__ | EDM1 | EDM2 | EDM3 | EDM4
---|:----:|:----:|:----:|:----:
A  | 35   | 100  | 35   | 35
B  | 20   | 30   | 50   | 70
C  | 45   | 35   | 60   | 70
D  | 20   | 140  | 20   | 20

</div>

<div>


 
$$V_A = 35 + 100 + 35 + 35 = 205$$
<br>

$$V_B = 20 + 30 + 50 + 70 = 170$$
<br>

$$V_C = 45 + 35 + 60 + 70 = 210$$
<br>

$$V_D = 20+140+20+20 = 200$$

</div>
</div>

---

### Postulado da razão insuficiente
<br>

<div class="columns">

<div>


__       | EDM1 | EDM2 | EDM3 | EDM4
---------|:----:|:----:|:----:|:----:
A        | 35   | 100  | 35   | 35
B        | 20   | 30   | 50   | 70
**C ✶✶** | 45   | 35   | 60   | 70
D        | 20   | 140  | 20   | 20

</div>

<div>


 
$$V_A = 35 + 100 + 35 + 35 = 205$$
<br>

$$V_B = 20 + 30 + 50 + 70 = 170$$
<br>

$$V_C = 45 + 35 + 60 + 70 = 210$$
<br>

$$V_D = 20+140+20+20 = 200$$

</div>
</div>

#### **Solução (Razão Insuficiente)**: Alternativa C

---

### Postulado da razão insuficiente
<br>

<div class="columns">

<div>


Opções    | Contaminado | Limpo
----------|:-----------:|:------:
Terreno A | - 300       | - 300
Terreno B | - 400       | - 200
Teste     | - 345       | - 245

</div>
<div>

</div>
</div>

---

### Postulado da razão insuficiente
<br>

<div class="columns">

<div>


Opções    | Contaminado | Limpo
----------|:-----------:|:------:
Terreno A | - 300       | - 300
Terreno B | - 400       | - 200
Teste     | - 345       | - 245

</div>
<div>

$$V_A = (-300) + (-300) = -600$$
<br>

$$V_B = (-400) + (-200) = -600$$
<br>

$$V_T = (-345) + (-245) = -590$$

</div>
</div>

---

### Postulado da razão insuficiente
<br>

<div class="columns">

<div>

Opções       | Contaminado | Limpo
-------------|:-----------:|:------:
Terreno A    | - 300       | - 300
Terreno B    | - 400       | - 200
**Teste ✶✶** | - 345       | - 245

</div>
<div>

$$V_A = (-300) + (-300) = -600$$
<br>

$$V_B = (-400) + (-200) = -600$$
<br>

$$V_T = (-345) + (-245) = -590$$

</div>
</div>

#### **Solução (Razão Insuficiente)**: Realizar o Teste

---

## Recapitulando: métodos de decisão sob ignorância
* **Maximin**: Escolho a alternativa que tem o melhor "pior caso". Ou seja, minimizo as minhas chances de me dar muito mal.
* **Minimax**: Escolho a alternativa que tem menos chances de me causar muito arrependimento. Ou seja, escolho o menor nivel máximo de arrependimento.
* **Regra do otimismo**: Avalio o melhor e o pior resultado de cada alternativa com base em um "nível de otimismo".
* **Postulado da razão insuficiente**: Partindo da suposição de que todas os EDMs têm a mesma chance de ocorrer, comparamos o valor médio das alternativas.

---

## Juntando tudo: questão da P1 de 2022
- **Ação de responsabilidade civil por danos decorrentes de um procedimento médico mal-sucedido**
  - Escolher a melhor estratégia:
    - **Agressiva**: pedido mais alto, enfrentando pontos factuais controversos
    - **Moderada**: pedido moderado, enfrentamento parcial dos fatos
    - **Contida**: pedido mais baixo, apenas fatos consubstanciados nas provas da parte autora

---

## 3 Cenários
- **Cenário 1**: perícia totalmente contrária (25% de chance de ocorrer)
  - Estratégia A: R$ 20 mil
  - Estratégia B: R$ 40 mil
  - Estratégia C: R$ 100 mil

---

## 3 Cenários
- **Cenário 2**: perícia parcialmente contrária (50% de chance de ocorrer)
  - Estratégia A: R$ 50 mil
  - Estratégia B: R$ 150 mil
  - Estratégia C: R$ 120 mil

---

## 3 Cenários
- **Cenário 3**: perícia favorável (25% de chance de ocorrer)
  - Estratégia A: R$ 400 mil
  - Estratégia B: R$ 200 mil
  - Estratégia C: R$ 140 mil

---
![bg](nofooter_bg.png)

<!-- 
_paginate: false 
_header: ''
_footer: ''
-->

![h:620px](aula4.tree1.png)

---


<div style="text-align: center;">

**Estratégia A**
$$(0,25 \times 20) + (0,5 \times 50) + (0,25 \times 400) = 5 + 25 + 100 = 130$$
<br>

**Estratégia B**
$$(0,25 \times 40) + (0,5 \times 150) + (0,25 \times 200) = 10 + 75 + 50 = 135$$
<br>

**Estratégia C**
$$(0,25 \times 100) + (0,5 \times 120) + (0,25 \times 140) = 25 + 60 + 35 = 120$$


</div>

---

![bg](nofooter_bg.png)

<!-- 
_paginate: false 
_header: ''
_footer: ''
-->

![h:620px](aula4.tree2.png)

---

## Postura em relação ao Risco
- O que faria um indivíduo avesso ao risco? 
- E um indivíduo propenso ao risco?

---

## Decisão sob condição de Ignorância - Maximin
- Suponha que não sabemos as probabilidades de ocorrência dos cenários 1, 2 e 3. 
  - Como podemos resolver o problema utilizando o **método Maximin**?

---

### Maximin
<br>

Estratégias   | Cenário 1 | Cenário 2 | Cenário 3
--------------|:---------:|:---------:|:---------:
A (Agressiva) | 20 mil    | 50 mil    | 400 mil
B (Moderada)  | 40 mil    | 150 mil   | 200 mil
C (Contida)   | 100 mil   | 120 mil   | 140 mil

---

### Maximin
<br>

Estratégias   | Cenário 1     | Cenário 2 | Cenário 3
--------------|:-------------:|:---------:|:---------:
A (Agressiva) | **20 mil ✶**  | 50 mil    | 400 mil
B (Moderada)  | **40 mil ✶**  | 150 mil   | 200 mil
C (Contida)   | **100 mil ✶** | 120 mil   | 140 mil

---

### Maximin
<br>

Estratégias        | Cenário 1     | Cenário 2 | Cenário 3
-------------------|:-------------:|:---------:|:---------:
A (Agressiva)      | **20 mil ✶**  | 50 mil    | 400 mil
B (Moderada)       | **40 mil ✶**  | 150 mil   | 200 mil
**C (Contida) ✶✶** | **100 mil ✶** | 120 mil   | 140 mil


#### **Solução (Maximin)**: Estratégia C (Contida)

---

## Decisão sob condição de Ignorância - Minimax
- Ainda supondo que não sabemos as probabilidades de ocorrência dos cenários. 
  - Como podemos resolver o problema utilizando o **método Minimax**?

---

### Minimax
<br>

<div class = "columns">
<div>

Estratégias | C1  | C2 | C3
:----------:|:---:|:---:|:----:
A           | 20  | 50  | 400 
B           | 40  | 150 | 200 
C           | 100 | 120 | 140 
</div>
<div>

</div>
</div>

---

### Minimax
<br>

<div class = "columns">
<div>

Estratégias | C1  | C2  | C3
:----------:|:---:|:---:|:---:
A           | 20  | 50  | 400 
B           | 40  | 150 | 200 
C           | 100 | 120 | 140 
</div>
<div>

C1        | C2        | C3
:--------:|:---------:|:---------:
100 - 20  | 150 - 50  | 400 - 400 
100 - 40  | 150 - 150 | 400 - 200
100 - 100 | 150 - 120 | 400 - 140
</div>
</div>

---

### Minimax
<br>

<div class = "columns">
<div>

Estratégias | C1  | C2  | C3
:----------:|:---:|:---:|:---:
A           | 20  | 50  | 400 
B           | 40  | 150 | 200 
C           | 100 | 120 | 140 
</div>
<div>

C1   | C2  | C3
:---:|:---:|:---:
80   | 100 | 0 
60   | 0   | 200
0    | 30  | 260
</div>
</div>

---

### Minimax
<br>

<div class = "columns">
<div>

Estratégias | C1  | C2  | C3
:----------:|:---:|:---:|:---:
A           | 20  | 50  | 400 
B           | 40  | 150 | 200 
C           | 100 | 120 | 140 
</div>
<div>

C1 | C2        | C3
:-:|:---------:|:---------:
80 | **100 ✶** | 0 
60 | 0         | **200 ✶**
0  | 30        | **260 ✶**
</div>
</div>

---

### Minimax
<br>

<div class = "columns">
<div>

Estratégias | C1   | C2   | C3
:----------:|:----:|:----:|:---:
**A ✶✶**    | 20   | 50   | 400 
B           | 40   | 150  | 200 
C           | 100  | 120  | 140 
</div>
<div>

C1  | C2        | C3
:--:|:---------:|:---------:
80  | **100 ✶** | 0 
60  | 0         | **200 ✶**
0   | 30        | **260 ✶**
</div>
</div>

#### **Solução (Minimax)**: Estratégia A (Agressiva)

