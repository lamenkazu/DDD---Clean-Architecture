# DDD (Domain-Driven Design)

Design Diridigo à Domínio -> Como vamos desenhar a aplicação. Não está relacionado como será implementado, mas como converter o problema do cliente em algo palpável. Um Software que resolve o problema do cliente.

## Domínio

Tudo gira em volta de domínio.
Uma área de entendimento -> todas as pessoas envolvidas na construção do software tenha conhecimentos semelhantes.

- Domain Experts
  -> as pessoas que entendem à fundo a problematica do software. As pessoas que estão no dia a dia lidando com as situações que o software vai trabalhar.

  - Conversa
    -> A conversa é fundamental. Necessária para a criação da linguagem ubíqua.

- Linguagem ubíqua
  -> Uma linguagem universal em que todas as pessoas envolvidas com a resolução do software conseguem conversar por igual.

# Sistema de Fórum

Conversa: - Muita dificuldade em _saber_ as _dúvidas_ dos _alunos_ - Eu tenho que _responder_ os alunos e eu me perco em quais dúvidas já foram respondidas

### Entidades (Entities)

Entidades são as palavras chaves que são coisas palpáveis.

- Eu, Dúvidas, Alunos

### Casos de Uso (Use-Cases / Services)

São como as entidades conversam entre si.

- Saber, responder, etc.

### Value Objects

Classes que representam um valor que é importante para o domínio, mas que não possui uma identidade própria. Basicamente um objeto que é definido pelos seus atributos, em vez de ser definido por uma identidade exclusiva.
