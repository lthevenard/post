// ============================================================================
// About Copy
// ============================================================================

export function buildAboutCopy(lang) {
  const isEn = lang === "en";

  return {
    title: isEn ? "About" : "Sobre",
    text: isEn
      ? `
        <p style="line-height: 180%; margin-bottom: 15px;">
          This app was designed so that Law students at <a href="https://direitorio.fgv.br/">FGV's Rio de Janeiro Law School</a>
          could practice some of the concepts they are learning in their 2nd year course on Decision Theory.
          Because it is a course designed for students that do not possess graduate-level math skills, the course is not intended
          to provide a deep mathematical understanding of Decision Theory. Instead, the focus of the course is to give a general
          overview of the field, introducing students to some of the merits and challenges of Decision Theory, specially as it
          relates to legal considerations regarding the consequences of legal decisions and public policy choices.
        </p>
        <p style="line-height: 180%; margin-bottom: 15px;">
          Nevertheless, the course does offer a first contact with the typical decision problems and solution methods presented by
          Decision Theory, including a brief introduction to Game Theory. By dealing with simple, discrete examples, and focusing
          more on the conceptual foundations of the discipline, our goal is to prepare an interesting and effective introduction to
          Decision Theory. By not shying away completely from the analytical foundations of the discipline, we intend to guide
          students towards a solid understanding of rational choice theory and of its applications to legal problems.
        </p>
        <p style="line-height: 180%; margin-bottom: 15px;">
          Given these objectives, this app is intended to be a <i>playground</i> or <i>testing field</i> where students can go to
          practice some of the concepts they learned during classes. It is an ambitious project, that will be implemented gradually
          and will probably have to be revised many times in the future by its sole active developer. Currently, the app only has a
          couple of exercise-types that deal with decisions under ignorance. In the future, I hope to include many more options,
          making the experience a little richer for the students that decide to visit the app.
        </p>
      `
      : `
        <p style="line-height: 180%; margin-bottom: 15px;">
          Este app foi desenvolvido para que alunos de Direito da <a href="https://direitorio.fgv.br/">FGV Direito Rio</a>
          possam praticar alguns dos conceitos aprendidos na disciplina de Teoria da Decisão. Como é um curso voltado a estudantes
          sem formação matemática avançada, o foco não é aprofundar o conteúdo técnico, mas apresentar um panorama do campo e seus
          principais desafios, especialmente no que diz respeito às consequências de decisões jurídicas e escolhas de políticas públicas.
        </p>
        <p style="line-height: 180%; margin-bottom: 15px;">
          Ainda assim, o curso oferece um primeiro contato com problemas e métodos típicos da Teoria da Decisão, incluindo uma breve
          introdução à Teoria dos Jogos. Ao trabalhar com exemplos simples e discretos e dar ênfase às bases conceituais, nosso objetivo
          é oferecer uma introdução interessante e efetiva, preparando os alunos para compreender a teoria da escolha racional e suas
          aplicações a problemas jurídicos.
        </p>
        <p style="line-height: 180%; margin-bottom: 15px;">
          Diante desses objetivos, este app funciona como um <i>laboratório</i> onde os alunos podem praticar os conceitos vistos em sala.
          É um projeto ambicioso, implementado gradualmente e sujeito a revisões futuras. Atualmente, o app cobre apenas alguns tipos de
          exercícios sobre decisões sob ignorância. No futuro, esperamos incluir novas opções e enriquecer a experiência.
        </p>
      `,
  };
}
