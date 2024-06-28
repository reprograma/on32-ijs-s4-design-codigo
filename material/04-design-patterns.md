# Padrões de Design

> "Há um desafio fundamental no design de software que se destaca: a capacidade de manutenção. Avaliar se o código é sustentável é essencialmente responder às perguntas cruciais do design de software. Tudo o mais - como a escolha entre React, uma arquitetura hexagonal ou funções sem servidor - é secundário. Essas são apenas opções;"

Padrões de design, também conhecidos como padrões de projeto, são soluções para problemas recorrentes no desenvolvimento de software. Eles representam as melhores práticas acumuladas ao longo do tempo por desenvolvedores experientes e são documentados de forma a permitir que outras desenvolvedores os apliquem em suas próprias soluções.

Esses padrões fornecem um conjunto de diretrizes e abstrações para projetar software de forma eficiente e robusta, promovendo a reutilização de soluções comprovadamente eficazes para problemas comuns. Eles ajudam a resolver desafios de design de software de forma sistemática e organizada, resultando em sistemas mais flexíveis, fáceis de manter e escaláveis.

Os padrões de design não são soluções prontas para todos os problemas, mas sim modelos e abstrações que podem ser adaptados e aplicados de acordo com as necessidades específicas de cada projeto. Eles são divididos em várias categorias, como padrões de criação, padrões estruturais e padrões comportamentais, cada um focado em uma área específica do design de software.

Ao usar padrões de design, os desenvolvedores podem aproveitar as experiências passadas, evitar a reinvenção da roda e seguir práticas comprovadas para construir sistemas de software de alta qualidade. Em resumo, os padrões de design são ferramentas essenciais para arquitetar e implementar soluções de software robustas, flexíveis e de fácil manutenção.

Os padrões são frequentemente confundidos com algoritmos, porque ambos os conceitos descrevem soluções típicas para alguns problemas conhecidos. Enquanto um algoritmo sempre define um conjunto claro de ações para atingir uma meta, um padrão é mais uma descrição de alto nível de uma solução. O código do mesmo padrão aplicado para dois programas distintos pode ser bem diferente.

## Do que consiste um padrão?

Um padrão, no âmbito dos padrões de design de software, é uma solução abrangente para desafios recorrentes que surgem durante o projeto de sistemas de software. Ele integra as melhores práticas e abordagens estabelecidas, oferecendo uma estratégia consolidada para lidar com problemas específicos de design.

Os elementos essenciais de um padrão de design incluem:

Nome: O padrão é identificado por um nome único que descreve sucintamente o problema e a solução.

Problema: Descreve a situação ou problema que o padrão visa resolver. Isso ajuda a entender em que contexto o padrão é aplicável.

Solução: Descreve a abordagem recomendada para resolver o problema. Isso inclui a estrutura e interações entre os componentes do padrão.

Consequências: Descreve as vantagens e desvantagens de aplicar o padrão. Isso ajuda os desenvolvedores a entender as implicações de usar o padrão em seu código.

Exemplos: Pode incluir exemplos de código ou diagramas que ilustram como o padrão é implementado na prática.

Os padrões de design não são códigos prontos para uso, mas sim conceitos e diretrizes que podem ser aplicados e adaptados para resolver problemas específicos. Eles são valiosos porque permitem que aproveitamos as experiências passadas e evitem reinventar a roda ao projetar novos sistemas. Além disso, eles promovem a consistência, a reutilização e a manutenibilidade do código.

## Classificação dos padrões

Os padrões de design podem ser classificados em várias categorias com base em sua finalidade e área de aplicação. As categorias comuns de padrões de design incluem:

1. **Padrões de Criação (Creational Patterns)**

   - Esses padrões lidam com a criação de objetos, fornecendo mecanismos para criar objetos de forma flexível, encapsulada e reutilizável. Exemplos incluem Singleton, Factory Method, Abstract Factory, Builder e Prototype.

2. **Padrões Estruturais (Structural Patterns)**

   - Esses padrões lidam com a composição de classes e objetos para formar estruturas maiores e mais complexas. Eles ajudam a garantir que as mudanças na estrutura de um sistema não afetem seus componentes individuais. Exemplos incluem Adapter, Decorator, Composite, Facade e Proxy.

3. **Padrões Comportamentais (Behavioral Patterns)**

   - Esses padrões lidam com a comunicação entre objetos e a distribuição de responsabilidades entre eles. Eles se concentram em como os objetos interagem uns com os outros e como o comportamento de um objeto pode ser modificado dinamicamente. Exemplos incluem Observer, Strategy, Chain of Responsibility, Command e State.

4. **Padrões Arquiteturais (Architectural Patterns)**

   - Esses padrões são de nível mais alto e definem a estrutura geral de um sistema de software. Eles fornecem diretrizes para organizar o código e os componentes de um sistema para garantir que ele seja robusto, escalável e fácil de manter. Exemplos incluem Model-View-Controller (MVC), Model-View-ViewModel (MVVM), Microservices e Layered Architecture.

5. **Padrões de Concorrência (Concurrency Patterns)**

   - Esses padrões lidam com a escrita de código que lida com a execução simultânea de várias tarefas. Eles fornecem estruturas e abstrações para lidar com problemas relacionados à concorrência, como deadlock, condições de corrida e exclusão mútua. Exemplos incluem Thread Pool, Mutex, Semaphore e Monitor.

Essas categorias ajudam a organizar e compreender os diferentes padrões de design, facilitando a identificação e seleção do padrão mais apropriado para resolver um problema específico de design de software.

### Quais padrões vamos aprender? 💖

1. Factory
2. Adapter
3. Observer

## Links úteis

- [Refactoring Guru](https://refactoring.guru/pt-br/design-patterns/what-is-pattern)
- [Catálogo de padrões](https://refactoring.guru/pt-br/design-patterns/catalog)
